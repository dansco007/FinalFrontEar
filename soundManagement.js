const activeVoices = new Map();
let voiceCounter = 0;
let noteSustainInSeconds = 3;
let releaseSustainFadeTimeInSeconds = .4;
let buffersCache = new Map();
const cutFadeTime = 0.008; // 8 ms; // fadeOut sur chaque lecture de fichier audio (éviter les clics)
// Requis dans chaque fichier HTML indépendant
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const soundBankNames = ['Piano mf','Piano pp','Clarinet','Guitar','Vibraphone damped','Vibraphone short sustain','Tenor trombone']

// _________________ Traitement Audio : Comp + Filt + Limiter + Gin global
// Déclaration Compresseur global
const globalCompressor = audioContext.createDynamicsCompressor();
globalCompressor.threshold.setValueAtTime(-10, audioContext.currentTime);
globalCompressor.knee.setValueAtTime(10, audioContext.currentTime);
globalCompressor.ratio.setValueAtTime(5, audioContext.currentTime);
globalCompressor.attack.setValueAtTime(0.001, audioContext.currentTime);
globalCompressor.release.setValueAtTime(0.20, audioContext.currentTime);

// Déclaration Compresseur final = Limiteur doux
const finalLimiterCompressor = audioContext.createDynamicsCompressor();
finalLimiterCompressor.threshold.setValueAtTime(-10, audioContext.currentTime); // agressif
finalLimiterCompressor.knee.setValueAtTime(1, audioContext.currentTime); // pas de marge
finalLimiterCompressor.ratio.setValueAtTime(20, audioContext.currentTime); // très haut ratio
finalLimiterCompressor.attack.setValueAtTime(0.0001, audioContext.currentTime); // attaque instantanée
finalLimiterCompressor.release.setValueAtTime(0.05, audioContext.currentTime); // relâche rapide

// Master gain pour ajuster après compression
const masterGainNode = audioContext.createGain();
masterGainNode.gain.value = .6;

// Déclaration d'un highPass (appliqué non-global)
/* const highpass = audioContext.createBiquadFilter();
highpass.type = "highpass";
highpass.frequency.setValueAtTime(300, audioContext.currentTime); */

/* //  Crée l'analyser
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // petite taille, assez rapide pour l'amplitude globale
//  buffer de données pour la lecture
const dataArray = new Uint8Array(analyser.frequencyBinCount); */

// Chaine de branchement global :
globalCompressor
  .connect(masterGainNode)
  //.connect(finalLimiterCompressor)
  .connect(audioContext.destination);
/* globalCompressor.connect(masterGainNode).connect(limiter).connect(audioContext.destination);
masterGainNode.gain.value = .6; */

// Activer l'analyseur
/* const canvas = document.getElementById('volumeMeter');
const canvasCtx = canvas.getContext('2d'); */

// ___________________________

// By Gvg

let soundBank = '4';
var maxVol = .5;

function isRegisterNoteOK (register, filteredNotes, direction, limit) {
    // (Il faut vérifier que la note choisie n'est pas en dehors de 'notes',)
    // mais surtout qu'elle soit dans le registre de l'instrument
    // Et il faut vérifier qu'on a au moins deux octaves de registre
    // console.log('isRegisterNoteOK - register : ', register);

    let result = false;
    let newRegisterNoteIndex;
    let registerSizeInHalfSteps;
    let registerlimitNote;

    if (limit=='low') {registerlimitNote = register.lowLimitNote;} else {registerlimitNote = register.highLimitNote;}
    // console.log('isRegisterNoteOK - register.lowLimitNote = ', register.lowLimitNote);
    // console.log('isRegisterNoteOK - register.highLimitNote = ', register.highLimitNote);
    // console.log('isRegisterNoteOK - registerlimitNote = ', registerlimitNote);
    // console.log('isRegisterNoteOK - filteredNotes.indexOf(registerlimitNote) = ', filteredNotes.indexOf(registerlimitNote))

    newRegisterNoteIndex = filteredNotes.indexOf(registerlimitNote) + direction;
    // console.log('isRegisterNoteOK - newRegisterNoteIndex = ', newRegisterNoteIndex);
    // Cas où la nouvelle limite de registres n'est pas dans le set de notes
    if (newRegisterNoteIndex === -1) {
        console.warn('Note not found in filteredNotes');
        return {notesLimitsOk: false, octaveMiniOk: false};
    }
    if (direction > 0) {
        //newRegisterNoteIndex = filteredNotes.indexOf(registerlimitNote) + direction;
        if (newRegisterNoteIndex <= filteredNotes.indexOf(register.highestSoundBankNote)) { // filteredNotes.length-1) {
            // console.log('isRegisterNoteOK? - newNote is not too high - newRegisterNoteIndex = ' + newRegisterNoteIndex)
            result = true;
        }
    } else {
        //newRegisterNoteIndex = filteredNotes.indexOf(registerlimitNote) + direction;
        //console.log('isRegisterNoteOK - newNote est pas trop bas ? - newRegisterNoteIndex = ' + newRegisterNoteIndex)
        if (newRegisterNoteIndex >= filteredNotes.indexOf(register.lowestSoundBankNote)) {
            // console.log('isRegisterNoteOK? - newNote is not too low - newRegisterNoteIndex = ' + newRegisterNoteIndex)
            result = true;
        }
    }

    // Et il faut vérifier qu'on a au moins deux octaves de registre
    if (!result) {
        console.log("%c" + 'isRegisterNoteOK?  -> Oops new limit note is out of bank limits', "color: red");
        return {notesLimitsOk: false, octaveMiniOk: true};
    } else {
        let newRegisterNote = filteredNotes[newRegisterNoteIndex];
        // console.log('newRegisterNote : ' + newRegisterNote.fullnmae);
        if (limit == 'low') { 
            registerSizeInHalfSteps = Math.abs(newRegisterNote.pianoKey - register.highLimitNote.pianoKey);
        } else {
            registerSizeInHalfSteps = Math.abs(register.lowLimitNote.pianoKey - newRegisterNote.pianoKey);
        }
    }
    // console.log('isRegisterNoteOK - registerSizeInHalfSteps = ' + registerSizeInHalfSteps);
    if (registerSizeInHalfSteps < 24) { // 24 = 2 octaves
        if ((limit == 'low' && direction > 0) || (limit == 'high' && direction < 0)) {
            result = false
            console.log("%c" + 'isRegisterNoteOK?  -> Oops new limit note results in a too narrow register', "color: red");
        } 
    }
    // console.log('isRegisterNoteOK -> notesLimitsOk : ' +notesLimitsOk + ' + (octaveOk)  : ' + result);
    return {notesLimitsOk: true, octaveMiniOk: result};
}


function getRegisterAndSettingsFromSoundBank() {
    // console.log('getRegisterAndSettingsFromSoundBank - soundBank : ' + soundBank);
    // console.log('getRegisterAndSettingsFromSoundBank - onlyNaturalAndFlatNotes : ');
    // console.log(onlyNaturalAndFlatNotes);
    let lowLimitNote, highLimitNote;
    switch(soundBank) {
        case '1': // ff Piano
            if (mode == 'intervalId') {
                lowLimitNote = onlyNaturalAndFlatNotes[4]; // 12 = C2
                highLimitNote = onlyNaturalAndFlatNotes[50]; //[onlyNaturalAndFlatNotes.length-1];
            } else {
                lowLimitNote = onlyNaturalAndFlatNotes[12]; 
                highLimitNote = onlyNaturalAndFlatNotes[60]; // 60 = C6
            }
            lowestSoundBankNote = onlyNaturalAndFlatNotes[0];
            highestSoundBankNote = onlyNaturalAndFlatNotes[onlyNaturalAndFlatNotes.length-1];
            maxVol = .8;
            if (!storedSustainValue) noteSustainInSeconds = 0;
            releaseSustainFadeTimeInSeconds = 0.7;
            break;
        case '2': // pp Piano;
            if (mode == 'intervalId') {
                lowLimitNote = onlyNaturalAndFlatNotes[4]; 
                highLimitNote = onlyNaturalAndFlatNotes[50]; // 50 = D5 //[onlyNaturalAndFlatNotes.length-1];
            } else {
                lowLimitNote = onlyNaturalAndFlatNotes[12]; // 19 = G2// limit à Ab3 (keyNote 36)
                highLimitNote = onlyNaturalAndFlatNotes[60]; // 60 = C6 ; 43 = G4
            }
            lowestSoundBankNote = onlyNaturalAndFlatNotes[0];
            highestSoundBankNote = onlyNaturalAndFlatNotes[onlyNaturalAndFlatNotes.length-1];
            maxVol = .9;
            if (!storedSustainValue) noteSustainInSeconds = 0;
            releaseSustainFadeTimeInSeconds = 0.7;
            break;
        case '3': // Clarinet
            lowLimitNote = onlyNaturalAndFlatNotes[27]; // 27 = Eb3 (clar register bottom)
            highLimitNote = onlyNaturalAndFlatNotes[59]; // 59 = B5
            lowestSoundBankNote = onlyNaturalAndFlatNotes[27];
            highestSoundBankNote = onlyNaturalAndFlatNotes[67]; // 67 = G6 (clar register top)
            maxVol = .1;
            if (!storedSustainValue) noteSustainInSeconds = 1.5;
            releaseSustainFadeTimeInSeconds = 0.4;
            break;
        case '4': // Guitar
            lowLimitNote = onlyNaturalAndFlatNotes[16]; // 16 = E2
            highLimitNote = onlyNaturalAndFlatNotes[59]; // 28 = E3 ; 24 = C3 ; 40 = E4; 59 = B5
            lowestSoundBankNote = onlyNaturalAndFlatNotes[16];
            highestSoundBankNote = onlyNaturalAndFlatNotes[59];
            maxVol = .3;
            if (!storedSustainValue) noteSustainInSeconds = 2;
            releaseSustainFadeTimeInSeconds = 0.4;
            break; 
        case '5': // Dampen Vibra
            lowLimitNote = onlyNaturalAndFlatNotes[24]; // 24 = C3
            highLimitNote = onlyNaturalAndFlatNotes[65];
            lowestSoundBankNote = onlyNaturalAndFlatNotes[24];
            highestSoundBankNote = onlyNaturalAndFlatNotes[65]; // 64 = F6
            maxVol = .2;
            if (!storedSustainValue) noteSustainInSeconds = 1;
            releaseSustainFadeTimeInSeconds = 0.4;
            break;
        case '6': // Dampen Vibra
            lowLimitNote = onlyNaturalAndFlatNotes[24]; // 24 = C3
            highLimitNote = onlyNaturalAndFlatNotes[65];
            lowestSoundBankNote = onlyNaturalAndFlatNotes[24];
            highestSoundBankNote = onlyNaturalAndFlatNotes[65]; // 64 = F6
            maxVol = .15;
            if (!storedSustainValue) noteSustainInSeconds = 1;
            releaseSustainFadeTimeInSeconds = 0.4;
            break;
        case '7': // Tenor Trombone
            lowLimitNote = onlyNaturalAndFlatNotes[20]; 
            highLimitNote = onlyNaturalAndFlatNotes[43];
            lowestSoundBankNote = onlyNaturalAndFlatNotes[16];
            highestSoundBankNote = onlyNaturalAndFlatNotes[47];
            maxVol = .1;
            if (!storedSustainValue) noteSustainInSeconds = 1;
            releaseSustainFadeTimeInSeconds = 0.4;
            break; 
    }
    let register = {
        lowLimitNote: lowLimitNote,
        lowestSoundBankNote: lowestSoundBankNote,
        highLimitNote: highLimitNote,
        highestSoundBankNote: highestSoundBankNote
    }
    // console.log ('Fin getRegisterAndSettingsFromSoundBank - register : ', register);
    return register;
}

function preloadRegisterSoundBankFiles() {
    //console.log('soundBank = ' + soundBank);
    // Scenario : on veut charger toutes les notes possibles
    // On commence par vider la map en cours
    buffersCache.clear;
    const promises = []; // On créé un tableau de promesses (traitements asynchrone). 
    // Principe : Le traitement ne bloque pas le reste du code et retourne une promesse qui sera résolue plus tard.
    const notesToPreload = [];
    onlyNaturalAndFlatNotes.forEach(note => {
        if (note.pianoKey >= register.lowestSoundBankNote.pianoKey // register.lowLimitNote.pianoKey
            && note.pianoKey <= register.highestSoundBankNote.pianoKey){ // register.highLimitNote.pianoKey) {
                notesToPreload.push({noteToPreload: note, soundURL: getSoundFilePathFromNote(note)});
            }
    });
    //console.log('notesToPreload : ', notesToPreload);

    // Sons right ans wrong ajoutés à notesToPreload
    notesToPreload.push({noteToPreload: {fullName: 'right'}, soundURL: 'Sounds/right.mp3'});
    notesToPreload.push({noteToPreload: {fullName: 'wrong'}, soundURL: 'Sounds/wrong.mp3'});
    // console.log('notesToPreload : ', notesToPreload);

    // Pour chaque note, précharger dans la map de buffers
    notesToPreload.forEach(assoc => {
        // Ici, assoc est une note, on obtient son fullName, etc.
        // par exemple, si assoc a une propriété fullName
        const noteName = assoc.noteToPreload.fullName;
        // Créer l'url (à adapter si votre nom de fichier diffère)
        const url = assoc.soundURL;//"chemin/vers/vos/fichiers/" + noteName + ".mp3"; // exemple
        promises.push(
            fetch(url)
            .then(res => res.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                buffersCache.set(noteName, audioBuffer); // Chaque fichier ajouté au tableau promises est une promesse qui sera tenue en suspens jusqu’à ce qu’elle se résolve.
            })
            .catch(error => {
            console.error('Erreur lors de la récupération du fichier audio :', error);
            })
        );
    });
    return Promise.all(promises); // Promise.all() retourne une nouvelle promesse.
}


function getSoundFilePathFromNote(note) {
    //console.log('____début getSoundFilePathFromNote');
    // on va commencer par associer toutes les notes bécarre et bémol à leur pianoKey
    // En suite on associe un fichier son pour chaque pianoKey

    result = onlyNaturalAndFlatNotes.find((assoc) => { 
            //console.log('assoc.pianoKey : ' + assoc.pianoKey);
            //console.log('note.pianoKey : ' + note.pianoKey);
            return (assoc.pianoKey == note.pianoKey);
        })
    //console.log('getSoundFilePathFromNote -> fileNote : ', note);
    if (!result) {
        console.error('Note not found in onlyNaturalAndFlatNotes:', note);
    return null;
}
    let filePath;
    // console.log('soundBank => ' + soundBank);
    switch(soundBank) {
        case '1':
            filePath = 'Sounds/MISpianoMp3/' + 'Piano.mf.' + result.fullName + '.mp3';
            //console.log('case 1');
            break;
        case '2':
            filePath = 'Sounds/MISpianoMp3/' + 'Piano.pp.' + result.fullName + '.mp3';
            //console.log('case 2');
            break;
        case '3': // Clarinet
            filePath = 'Sounds/BbClarinetMp3/' + 'BbClarinet.ff.' + result.fullName + '.stereo.mp3';
            //console.log('case 3');
            break;
        case '4': // Guitar
            filePath = 'Sounds/GuitarMfMp3/' + 'Guitar.mf.' + result.fullName + '.mp3';
            //console.log('case 4');
            break; 
        case '5': // Vibra étouffé
            //console.log('case 5');
            filePath = 'Sounds/Vibraphone.dampen/' + 'Vibraphone.dampen.ff.' + result.fullName + '.ster.mp3';
            break;
        case '6': // Vibra sustain
            //console.log('case 6');
            filePath = 'Sounds/Vibraphone.shortsustain/' + 'Vibraphone.shortsustain.ff.' + result.fullName + '.stereo.mp3';
            break;
        case '7': // Trombone
            filePath = 'Sounds/TenorTromboneMp3/' + 'TenorTrombone.ff.' + result.fullName + '.stereo.mp3';
            //console.log('case 7');        
            break; 
    }
    
    //console.log('filePath : ' + filePath);
    //console.log(result);
    return filePath;
}

function isNotePlayable(note) {
    return note.pianoKey >= register.lowestSoundBankNote.pianoKey &&
           note.pianoKey <= register.highestSoundBankNote.pianoKey;
}

function loadAudioBuffer(url) {
    /**
     * Fonction pour charger un fichier audio et retourner un AudioBuffer
     * @param {string} url - Chemin vers le fichier audio
     * @returns {Promise<AudioBuffer>}
     */
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

function killVoice(voiceId, fadeDuration = cutFadeTime) { // aide par Chat
    // console.log('killVoice = ' + voiceId);
    const voice = activeVoices.get(voiceId);
    if (!voice) return;

    const now = audioContext.currentTime;
    const currentGain = voice.gainNode.gain.value;

    // Applique un fade-out
    voice.gainNode.gain.setValueAtTime(currentGain, now);
    voice.gainNode.gain.linearRampToValueAtTime(0, now + fadeDuration);

    // Stoppe après le fade
    voice.source.stop(now + fadeDuration + 10);
    activeVoices.delete(voiceId);
}

function playNotes(playedNote) {
    // console.log ('playNotes - note = ', playedNote)

    if (!isNotePlayable(playedNote)) {
        console.error('playNotes - note to be played is not playable -> ' + playedNote.fullName);
        return;
    }

    // On chope la note dans le set avec que des naturelle ou bémol
    const note = onlyNaturalAndFlatNotes.find((assoc) => { 
            //console.log('assoc.pianoKey : ' + assoc.pianoKey);
            //console.log('note.pianoKey : ' + note.pianoKey);
            return (assoc.pianoKey == playedNote.pianoKey);
        })

    const buffer = buffersCache.get(note.fullName); 
    if (!buffer) {
    console.error("Buffer audio non trouvé pour", note.fullName);
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    //const voice = { source, gainNode };

    // Si nombreux voix, tuer la plus ancienne
    if (activeVoices.size >= 12) {
        const oldestKey = activeVoices.keys().next().value;
        killVoice(oldestKey);
    }

    // Volume initial
    const newMaxVol = maxVol / (Math.sqrt(activeVoices.size + 1)/1.2);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(newMaxVol, audioContext.currentTime + cutFadeTime);

    // Filtre si note grave
    if (note.pianoKey < 14 && activeVoices.size >= 1) {
        filter.type = 'highpass';
        filter.frequency.value = 300;
    } else {
        filter.type = 'allpass';
    }

    // Connecter la voix
    source.connect(filter).connect(gainNode).connect(globalCompressor);
    source.start();

    const duration = buffer.duration;

    // Définir la durée de sustain désirée
    let fadeOutTime = 0.2; // en secondes
    let sustainTime = Math.min(noteSustainInSeconds, duration);
    // let sustainCase;
    if (noteSustainInSeconds < duration) { 
        sustainTime = noteSustainInSeconds; // on prend le sustain choisi par l'utilisateur
        //sustainCase = true;
        fadeOutTime = releaseSustainFadeTimeInSeconds; // en secondes
    } else {
        sustainTime = duration; // On prend la durée totale du fichier audio
        //sustainCase = false;
        fadeOutTime = cutFadeTime; // en secondes
    }
    // Définir la durée total de l'audio à lire
    const endTime = audioContext.currentTime + sustainTime + fadeOutTime;
    //console.log ('sustain : ' + sustainCase + ' | sustainTime = ' + sustainTime + ' | fadeOutTime = ' + fadeOutTime + ' | duration = ' + duration + ' | endTime = ' + endTime);

    // Planifier le fade out avant l'arrêt
    gainNode.gain.setValueAtTime(newMaxVol, endTime - fadeOutTime);
    gainNode.gain.linearRampToValueAtTime(0, endTime);


    // Arrêter la source après la durée de lecture
    setTimeout(() => {if (source) killVoice(source);},(sustainTime + fadeOutTime) * 1000);

    // Stockage de la voix
    const voiceId = `${note.fullName}-${voiceCounter}`;
    activeVoices.set(voiceId, { source, gainNode });

    source.onended = () => {
        activeVoices.delete(voiceId);
    };
        // })
}

function playFeedbackSound(isAnswerRight) {
    let soundName; let vol;
    if (isAnswerRight) {soundName = 'right'; vol = 0.2} else {soundName = 'wrong'; vol = 0.15}
    const buffer = buffersCache.get(soundName); 
    if (!buffer) {
    console.error("Buffer audio non trouvé pour", note.fullName);
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    const gainNode = audioContext.createGain(); gainNode.gain.value = vol;

    // Connecter la voix
    source.connect(gainNode).connect(globalCompressor);
    source.start();

    /* let soundPath, audioP;

    if (isAnswerRight) {
        soundPath = 'Sounds/right.mp3';
    } else {
        soundPath = 'Sounds/wrong.mp3';
    }
    audioP = new Audio(soundPath);
    audioP.volume = .07;
    audioP.play();
    //console.log('playFeedbackSound using "' + soundPath + '"') */
}