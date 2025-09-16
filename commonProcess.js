// Fichier commun aux différents modes, or SoundManagement et NoteAndCards

// Variables globales communes aux différents modes
let counter = 0;
let correctAnswersCount = 0;
let startTime = 0;
let newCardStartTime;
let cardTimeElapsed;
let rightAnswerTrigTimout = 1200; // (ms)

const onlyNaturalAndFlatNotes = getOnlyNaturalAndFlatNotes();

let previouslyPlayedNote = notes.find((note) => {return (note.fullName === 'E3')})

/* // Gestion de la soundBank avec localStorage 
changeSoundBankWithLocalStorageValue(); // Mise à jour du sélecteur dans l'interface

// Actions relatives aux choix de la banque son (en fonction du sélecteur)
changeSoundBankAction('none'); // le paramètre est la dernière note jouée. */

let notesLimitsOk = true;
let octaveMiniOk = true;
let config;
let delayForResetAnswersMs = 400;

let autoplayTimout;
let tempoAutoplay= 20; 
let tempoMini = 30; let tempoMaxi = 100; // Valeurs arbitraire, déterminées ailleurs
let noteSustainInSecondsMini = 0.4; let noteSustainInSecondsMaxi = 7;

let analysis = []

/* // Gestion des données localStorage 
const storedTempo = localStorage.getItem('tempo');
if (storedTempo) tempoAutoplay = storedTempo; */


// fin variable globales ================================================================


console.log("%c<-- Keyboard shortcut for NewCard or 'Start Autoplay' = spacebar -->", "color: darkGreen")

// Détermination du tempo
function setAutoplayTempo() {
    //console.log('setAutoplayTempo - selon mode :', mode);
    switch(mode) {
        case 'sing':
            tempoAutoplay = 10;
            tempoMini = 3;
            tempoMaxi = 40;
            break;
        case 'intervalId':
            tempoAutoplay = 12;
            tempoMini = 5;
            tempoMaxi = 40;
            
            break;
        case 'scaleId':
            tempoAutoplay = 11;
            tempoMini = 5;
            tempoMaxi = 40;
            break;
        case 'chordId':
            tempoAutoplay = 12;
            tempoMini = 5;
            tempoMaxi = 40;
            break;
    }
    //console.log('setAutoplayTempo -> tempoAutoplay : ' + tempoAutoplay);
}
setAutoplayTempo()

// Incrémentation du compteur
function incrementCounter() {
    counter++;
    // console.log('   incrementCounter= ' + counter);
}

// Pour réagir si toutes les checks sont décochées (Gestion de la config (checkboxes))
function allConfigChecksAreUnckecked () {
    let result = true;
    let allChkTest = [];
    // console.log ('allConfigChecksAreUnckecked -  mode = ' + mode);
    allChkTest = (mode === 'intervalId' || mode === 'scaleId')? allChkButAllAndDirection : allButtonsButAll;
    console.log('checkCheckAndAction - allChkTest : ', allChkTest);
    allChkTest.forEach((chk) => {
        // console.log('* checkCheckAndAction - chk : ', chk);
        // console.log('* checkCheckAndAction - chkValue : '+ chk.checked);
        if (chk.checked) { result = false };
    });
    //console.log('checkIfAllChecksAreUnchecked renvoi ' + result);
    return result
}

// Réaction à un changement de config (select)
function checkCheckAndAction(check) {
    // console.log('checkCheckAndAction - check = ', check);
    // console.log('checkCheckAndAction - check.checked = ' + check.checked);
    if (!check.checked) {
        if (mode==='chordId'){
            if (!check.checked && !(check === includeInversionsAndNonCloseChk)) { // la coche de includeInversionsAndNonCloseChk ne provoque pas la décoche de allChk
                // console.log('Cas décoche "all"');
                allChk.checked = false;
            }
        } else {
            allChk.checked = false;
        }
        
        if (allConfigChecksAreUnckecked()) {
            check.checked = true;
            const localStValueName = modeAbbreviation + 'Config' + capitalizeFirstLetterFlexible(check.id);
            // console.log('checkCheckAndAction - localStValueName = ' + localStValueName);
            localStorage.setItem(localStValueName, check.checked);
        };
    }
    
    switch(mode) {
        case ('sing'):
            calculateIntervalProbabilities(buildFocusChkConfig());
        break;
        case ('intervalId'):
            showAnswerbuttons();
            calculateIntervalProbabilities(buildFocusChkConfig());
        break;
        case ('scaleId'):
            showAnswerbuttons();
            calculateScaleProbabilities(buildFocusChkConfig());
        break;
        case ('chordId'):
            showAnswerbuttons();
            calculateChordProbabilities(buildFocusChkConfig());
        break;
    }
}

// Construction de la config en fonction des sélections et du mode
function buildFocusChkConfig () {
        //console.log('buildFocusChkConfig');
        switch(mode){
            case 'sing':
                config = {
                    seconds: secondsChk.checked,
                    thirds: thirdsChk.checked,
                    fourths: fourthsChk.checked,
                    fifths: fifthsChk.checked,
                    sixths: sixthsChk.checked,
                    sevenths: seventhsChk.checked,
                    ninths: ninthsChk.checked,
                    augFourthsAndDimFifths: augFourthsAndDimFifthsChk.checked,
                    augFithsAndDimFourths: augFithsAndDimFourthsChk.checked,
                    augUnisonSecondsAndOctaves: augUnisonSecondsAndOctavesChk.checked
                }
                break;
            case 'intervalId':
                config = {
                    seconds: secondsChk.checked,
                    thirds: thirdsChk.checked,
                    fourths: fourthsChk.checked,
                    fifths: fifthsChk.checked,
                    tritones : tritonesChk.checked,
                    sixths: sixthsChk.checked,
                    sevenths: seventhsChk.checked,
                    ninths: ninthsChk.checked,
                    tenths: tenthsChk.checked
                }
                break;
            case 'scaleId':
                config = {
                    majMin: majMinChk.checked,
                    majModes: majModesChk.checked,
                    altModes: altModesChk.checked,
                    ascending: ascendingChk.checked,
                    descending: descendingChk.checked
                }
                break;
            case 'chordId':
                config = {
                    triads: triadsChk.checked,
                    fourNotesChords: fourNotesChordsChk.checked,
                    extChords1: extChords1Chk.checked,
                    modalChordsMaj: modalChordsMajChk.checked,
                    modalChordsAlt: modalChordsAltChk.checked,
                    includeInversionsAndNonClose: includeInversionsAndNonCloseChk.checked
                }
                break;
        }
        //console.log('buildFocusChkConfig - fin / config : ');
        //console.log(config);
        return config;
    }

// Décision d'éxécution ou non du code de pickButton selon le contexte d'autoplay
function shouldThePickButtonActionBeExecuted(callingCode, autoPlayingState) {
    // console.log('shouldThePickButtonActionBeExecuted : callingCode = ' + callingCode);
    // console.log('shouldThePickButtonActionBeExecuted : autoPlayingState = ' + autoPlayingState);

    // decision : should this code be executed ? (autoplay handle...)
        // callingCode = "program" si le code est appelé par le mode autoPlay actif
        // callingCode = "goodAnswer" si le code est appelé par une bonne réponse et que la coche 'triggered by good answer' est cochée
        // callingCode = "user" sinon (bouton ou barre d'espace en raccourci)
        // L'enjeu ici est de déclencher ou le code d'action du bouton pickCard (buttonNewCardAction)
    let execute = false;

    if (autoPlayingState) { // L'autoplay est en cours
        if (callingCode == 'program'){
            if (autoPlayChk.checked) { // coche autoplay cochée --> on garde l'autoplay actif
                // console.log("%c   Case 1 : Click(prog) PickACard (by autoPlay) ", "color: fireBrick");
                execute =  true;
                return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState};

            } else { // décoche de l'option autoplay --> arrêt du mode autoplay
                // console.log("%c   Case 2 : Click(prog) PickACard (stopping autoplay by checkbox) - ABORTED ", "color: darkMagenta");
                autoPlayingState = false;
                // autoPlayChk.checked = false; // <-- elle est déjà décochée
                execute =  false;
                return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState};
            }
        } else { // C'est un click de l'utilisateur (le bouton affiche 'stop autoplay' puisque l'autoplay est actif)
            // On stoppe l'autoplay 
            // console.log("%c   Case 3 : Click(prog) PickACard (stopping autoplay by button) - ABORTED ", "color: darkMagenta");
            autoPlayingState = false;
            execute =  false;
            return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState}
        }
    } else { // L'autoplay n'est pas (ou plus) en cours
        if (callingCode == 'program') { // c'est le dernier appel de ce type (A CLARIFIER)
            if (autoPlayChk.checked) {
                // console.log("%c   Case 8 : autoplay was stop by pickCard, and checkbox still checked (pick showing 'start Autoplay'", "color: fireBrick")
                execute =  false;
                autoPlayingState = false;
                return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState}
            } 
        } else { // le code n'est pas appelé par l'autoplay
            if (callingCode == 'goodAnswer'){ // cas du trigger par bonne réponse : pas de mise à jour particulière (similaire à l'action user, sans le clic de l'utilisateur)
                // Ce cas n'existe pas dans si le mode autoplay est activé (coche désactivée)
                // console.log("%c   Case 4 : Click(prog) PickACard (triggered by right answer)", "color: darkGreen");
                execute =  true;
                return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState}
            } else {
                if (pickButtonActivationStatus === 0) { // le bouton pickCard est désactivé (cas d'une absence de réponse?)
                    // console.log('%c   Case 5 : Click (user click) - DEACTIVATED (not autoplaying)', "color: darkMagenta");
                    execute =  false;
                    return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState}
                } else { // Le bouton pickCard (ou le bouton 'Start Autoplay') est activé (cas le plus usuel) et on est pas en autoplay activé
                    // Peut aussi correspondre au click sur le bouton pickCard avec la mention 'start Auto play'
                    if (autoPlayChk.checked) {autoPlayingState = true}; // Activation de l'autoPlay si la case est coché (le bouton pickCard affiche 'start Auto play')
                    // console.log('%c   Case 6 : Click (user click) PickACard (new Card or StartAutoplay)', "color: fireBrick");
                    execute =  true;
                    return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState} 
                }
            }
        }
    }
    console.log('%c   Case 7 : unexepected (to be debugged)', "color: fireBrick");
    return {pickCodeShouldLaunch: execute, updatedPlayingState: autoPlayingState};
}

// Mise à jour de l'affiche de la carte (compteur + détails du tirage)
function updateCardDiv() {
    // console.log('CALL updateCardDiv');
    if (counter > 0) {
        buttonHearAgainD.style.display = 'flex';
        if (showCardChk.checked) {
            counterD.style.display = 'flex';
            prevNoteD.style.display = 'flex';
            //displayQ.style.display = 'flex';
            cardDiv.style.display = 'flex';
            switch(mode) {
                case ('intervalId'):
                    console.log('updateCardDiv - intervalDirection : ' + intervalDirection);
                    const mouvementDirection = (intervalDirection > 0)? 'asc.' : 'desc.';
                    cardNameD.innerText = capitalizeFirstLetterFlexible(card.enName) + '  (' + mouvementDirection + ')';
                break;
                case ('scaleId'):
                    const scaleName = capitalizeFirstLetterFlexible(currentScale.enName);
                    //console.log('currentScale.AbbrStepNames -> ' + currentScale.AbbrStepNames);
                    const scaleStructure = '1 ' + (currentScale.AbbrStepNames.slice(0, -1).join(' ')) + " 1"
                    //console.log('scaleStructure ->' + scaleStructure);
                    cardNameD.innerText = scaleName;
                    // let cardNameD = document.getElementById('cardNameDiv');
                    scaleStructureDiv.innerText = ' (' + scaleStructure + ')';
                    break;
                case ('chordId'):
                    const chordName = capitalizeFirstLetterFlexible(currentChord.enName);
                    //console.log('currentChord.AbbrStepNames -> ' + currentChord.AbbrStepNames);
                    const chordStructure = currentChord.AbbrStepNames.slice(0).join(' ');
                    const chordType = capitalizeFirstLetterFlexible(currentChord.structuretype);
                    //console.log('chordStructure ->' + chordStructure);
                    cardNameD.innerText = chordName.replace(/\bchord\b/g, '');
                    // let cardNameD = document.getElementById('cardNameDiv');
                    chordStructureDiv.innerText = chordType + ': ' + chordStructure;
                break;
            }
            let remainder = counter % colors.length;
            cardNameD.style.color = colors[remainder];
        }

    } else {
        buttonHearAgainD.style.display = 'none';
        counterD.style.display = 'none';
        //displayQ.style.display = 'none';
        cardDiv.style.display = 'none';
    }
}

// Mise à jour des boutons de navigation et du bouton principal 'buttonPick'
function updateNavButtonsAndPickButton() {
    // console.log('updateNavButtonsAndPickButton - currentHistoryIndex => ' + currentHistoryIndex)
    // console.log('counter => ' + counter);
    // console.log('seqHistory => ', seqHistory);
    //if (counter <= 1) { // Là c'est le début
    if (seqHistory.length <= 1) { // Là c'est le tout début (pas d'historique)
        // console.log('updateNavButtonsAndPickButton - currentHistoryIndex => c le début');
        buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
        if (autoPlayChk.checked) {
            buttonPick.innerText = 'Start autoplay';
        } else {
            setPickButtonLabelWithMode();
        }
        navButtonsD.style.display='none';
        
    //}
    //if (counter > 1) { // 
    } else { // 
        // Là c'est pas le tout début (il y a un historique)
        if (isAutoPlaying) {
            navButtonsD.style.display='none';
        } else {
            navButtonsD.style.display='flex'; // Pas de navigation si en mode autoPlay
        }
            
        // Par défaut tout est visible et activé sauf le bouton pickCard
        buttonRestartD.className = "buttonType1 restart activated"; navButtonsActivationStatus[4] = 1;
        buttonFirstD.className = "buttonType1 nav activated"; navButtonsActivationStatus[0] = 1;
        buttonPreviousD.className = "buttonType1 nav activated"; navButtonsActivationStatus[1] = 1;
        buttonNextD.className = "buttonType1 nav activated"; navButtonsActivationStatus[2] = 1;
        buttonLastD.className = "buttonType1 nav activated"; navButtonsActivationStatus[3] = 1;
        buttonPick.className = "pickCardButton deactivated greyedOut"; pickButtonActivationStatus = 0;
        
        // Si on navigue sur le tout premier item, on ne peut pas aller plus en arrière
        if (currentHistoryIndex == 0) { // On est sur le premier item de l'historique
            // console.log("On est sur le premier item de l'historique - currentHistoryIndex = " + currentHistoryIndex);
            buttonFirstD.className = "buttonType1 nav deactivated greyedOut"; navButtonsActivationStatus[0] = 0; //.style.visibility = "hidden";
            buttonPreviousD.className = "buttonType1 nav deactivated greyedOut"; navButtonsActivationStatus[1] = 0;//.style.visibility = "hidden";
        }

        // Si on navigue sur le dernier item, on ne peut pas aller plus en avant, et on active le bouton pickCard
        // (tenir compte de la présence d'une réponse ou pas est assuré ailleurs (updatePickButtonWithAutoplayState))
        if (currentHistoryIndex == seqHistory.length-1) { // On est sur le dernier item historisé
            //console.log ('cas currentHistoryIndex == seqHistory.length-1');
            buttonNextD.className = "buttonType1 nav deactivated greyedOut"; navButtonsActivationStatus[2] = 0; //.style.visibility = "hidden";
            buttonLastD.className = "buttonType1 nav deactivated greyedOut"; navButtonsActivationStatus[3] = 0;//.style.visibility = "hidden";
            buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
        }
    } 
}


// Mise à jour du pickButton en fonctionne de l'état de autoPlay _______________
function updatePickButtonWithAutoplayState(givenAnswer = -1, answerRequired = false) {
    // console.log('updatePickButtonWithAutoplayState - givenAnswer = ' + givenAnswer + ' | answerRequired = ' + answerRequired);
    // console.log('currentHistoryIndex = ' + currentHistoryIndex + ' | counter = ' + counter);
    if ((currentHistoryIndex === (seqHistory.length - 1)) ){ //&& (counter != 0)) { // Fin de l'array : on est sur le dernbier history item
        switch (true) {
            case (isAutoPlaying && autoPlayChk.checked):
                // console.log('%c Case 1 : isAutoPlaying && autoPlayChk.checked', "color: blue"); 
                buttonPick.innerText = 'Stop autoplay'; // Le bouton principal affiche 'stop'
                buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
                break;
            case (isAutoPlaying && !autoPlayChk.checked):
                // console.log('%c Case 2 : isAutoPlaying && !autoPlayChk.checked', "color: blue"); 
                setPickButtonLabelWithMode();
                buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
                break;
            case (!isAutoPlaying && autoPlayChk.checked):
                // console.log('%c Case 3 : !isAutoPlaying && autoPlayChk.checked', "color: blue"); 
                buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
                buttonPick.innerText = 'Start autoplay'; // Le bouton principal n'affiche plus 'stop' sauf si on a coché autoplay
                break;
            case (!isAutoPlaying && !autoPlayChk.checked):
                // console.log('%c Case 4 : !isAutoPlaying && !autoPlayChk.checked', "color: red"); 
                setPickButtonLabelWithMode();
                if (givenAnswer > -1) {
                    buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
                } else if (counter > 0) {
                    if (answerRequired) {
                        // console.log('%c Case 5 : !isAutoPlaying && !autoPlayChk.checked && pas de réponse', "color: blue"); 
                        buttonPick.className = "pickCardButton deactivated greyedOut"; pickButtonActivationStatus = 0;
                    } else {
                        // console.log('%c Case 6 : !isAutoPlaying && !autoPlayChk.checked && on a une réponse', "color: blue"); 
                        buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
                    } //else {}

                } else { 
                    // console.log('%c Case 7 : !isAutoPlaying && !autoPlayChk.checked && counter <=0', "color: blue"); 
                    buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1 
                }
                break;
            default:
                console.log('%c Case 8 : Default unexpected case updateButtons - DEACTIVATED', "color: red");
        }
    } 
}


function updateRegister() {
    // Register
    //console.log('UPDATE : register : ');
    //console.log(register);
    
    lowLimitNoteNameD.innerText = register.lowLimitNote.fullName;
    highLimitNoteNameD.innerText = register.highLimitNote.fullName;
    //console.log('update : octaveMiniOk = ' + octaveMiniOk);

    // Si la bottom note est pas en dessous de F3 (key 21 dans onlyflats), on affiche pas le check des limites d'intervalle grave
    if (register.lowLimitNote.pianoKey >= 21 || mode == 'scaleId') {
        respectLILDiv.style.display = 'none';
    } else {
        respectLILDiv.style.display = 'flex';
    }
}

// Réactions à la modification du registre _______________
// Augmentation de la limite registre basse incLowLimitD
let incLowLimitAction = function () {
    let newRegisterNoteIndex = onlyNaturalAndFlatNotes.indexOf(register.lowLimitNote) + 1;
    ({ notesLimitsOk, octaveMiniOk } = isRegisterNoteOK(register, onlyNaturalAndFlatNotes, 1, 'low'));
    // console.log('notesLimitsOk : ' + notesLimitsOk + ' | octaveMiniOk =  : ' + octaveMiniOk);
    if (notesLimitsOk && octaveMiniOk) {
        register.lowLimitNote = onlyNaturalAndFlatNotes[newRegisterNoteIndex];
        registerMsgD.style.display = 'none';
    } else if (!octaveMiniOk) {
        displayOctaveLimitMsg();
    }
    playNotes(register.lowLimitNote);
    updateUI();
}

// Diminution de la limite registre basse decLowLimitD _______________
let decLowLimitAction = function () {
    let newRegisterNoteIndex = onlyNaturalAndFlatNotes.indexOf(register.lowLimitNote) - 1;
    ({ notesLimitsOk, octaveMiniOk } = isRegisterNoteOK(register, onlyNaturalAndFlatNotes, -1, 'low'));
    // console.log('notesLimitsOk : octaveMiniOk = ' + notesLimitsOk + ' : ' + octaveMiniOk);
    if (notesLimitsOk && octaveMiniOk) {
        register.lowLimitNote = onlyNaturalAndFlatNotes[newRegisterNoteIndex];
        registerMsgD.style.display = 'none';
    } else if (!octaveMiniOk) {
        displayOctaveLimitMsg();
    }
    playNotes(register.lowLimitNote);
    updateUI();
}

// Augmentation de la limite registre haute incHighLimitD _______________
function incHighLimitAction() {
    // console.log('IncHighLimitAction');
    let newRegisterNoteIndex = onlyNaturalAndFlatNotes.indexOf(register.highLimitNote) + 1;
    ({ notesLimitsOk, octaveMiniOk } = isRegisterNoteOK(register, onlyNaturalAndFlatNotes, 1, 'high'));
    //console.log('notesLimitsOk : octaveMiniOk = ' + notesLimitsOk + ' : ' + octaveMiniOk);
    if (notesLimitsOk && octaveMiniOk) {
        register.highLimitNote = onlyNaturalAndFlatNotes[newRegisterNoteIndex];
        registerMsgD.style.display = 'none';
    } else if (!octaveMiniOk) {
        displayOctaveLimitMsg();
    }
    playNotes(register.highLimitNote);
    updateUI();
}

// Diminution de la limite registre haute incHighLimitD _______________
function decHighLimitAction() {
    //console.log('decHighLimitAction');
    let newRegisterNoteIndex = onlyNaturalAndFlatNotes.indexOf(register.highLimitNote) - 1;
    //console.log('Action - newRegisterNoteIndex = ' + newRegisterNoteIndex);
    ({ notesLimitsOk, octaveMiniOk } = isRegisterNoteOK(register, onlyNaturalAndFlatNotes, -1, 'high'));
   //  console.log('notesLimitsOk : octaveMiniOk = ' + notesLimitsOk + ' : ' + octaveMiniOk);
    if (notesLimitsOk && octaveMiniOk) {
        register.highLimitNote = onlyNaturalAndFlatNotes[newRegisterNoteIndex];
        registerMsgD.style.display = 'none';
    } else if (!octaveMiniOk) {
        displayOctaveLimitMsg();
    }
    playNotes(register.highLimitNote);
    updateUI();
}
let decLowLimitD = document.getElementById('decLowLimitDiv');
decLowLimitD.addEventListener('click', () => decLowLimitAction());
let incLowLimitD = document.getElementById('incLowLimitDiv');
incLowLimitD.addEventListener('click', () => incLowLimitAction());
let decHighLimitD = document.getElementById('decHighLimitDiv');
decHighLimitD.addEventListener('click', () => decHighLimitAction());
let incHighLimitD = document.getElementById('incHighLimitDiv');
incHighLimitD.addEventListener('click',() => incHighLimitAction());


// Play the register limit notes
function playRegisterLimitNote(note) {playNotes(note);}
let lowLimitTile = document.getElementById('lowLimitDiv');
lowLimitTile.addEventListener('click',  () => playRegisterLimitNote(register.lowLimitNote));
let highLimitTile = document.getElementById('highLimitDiv');
highLimitTile.addEventListener('click', () => playRegisterLimitNote(register.highLimitNote));


// Autoplay or not
function checkAutoPlayAction() {
    // En mode Autoplay, les fonctionnalités answerRequired et rightAnswerTrig sont désactivées (mode 'sing' non concerné)
    // console.log('checkAutoPlayAction');
    if (autoPlayChk.checked) {
        setPickButtonLabelWithMode();
        if (mode != 'sing') {
            answerRequiredChk.checked = false;
            rightAnswerTrigChk.checked = false;
            // answerRequiredChk.setAttribute('disabled', 'true'); answerRequiredChk.classList.add('disabled');
            answerRequiredChk.disabled = true; answerRequiredChk.classList.add('disabled');
            rightAnswerTrigChk.disabled = true; rightAnswerTrigChk.classList.add('disabled');
        }
    } else {
        // console.log('isAutoPlaying = ' + isAutoPlaying + ' | typeof autoplayTimout = ' + typeof autoplayTimout);
        if (isAutoPlaying && !(typeof autoplayTimout === 'undefined')) {
            clearTimeout(autoplayTimout);
            isAutoPlaying = false;
        }
        if (mode != 'sing') {
            answerRequiredChk.checked = true;
            answerRequiredChk.disabled = false; answerRequiredChk.classList.remove('disabled');
            rightAnswerTrigChk.disabled = false; rightAnswerTrigChk.classList.remove('disabled');
        }

    }
    updateUI();
}
autoPlayChk.addEventListener('input', checkAutoPlayAction);


// Answer required or not & Right answer triggers new card or not
function checkAnswerRequiredOrTriggersAction() {
    // console.log('checkRightAnswerTriggerdAction : rightAnswerTrigChk inputState = ' + rightAnswerTrigChk.checked);
    // si on coche autoplay, la coche de answerRequiredChk et rightAnswerTrigChk est sans effet
    if (autoPlayChk.checked && mode != 'sing') { 
        answerRequiredChk.checked = false;
        rightAnswerTrigChk.checked = false;
    }
    updateUI();
}
if (mode != 'sing') {
    rightAnswerTrigChk.addEventListener('input', checkAnswerRequiredOrTriggersAction);
    answerRequiredChk.addEventListener('input', checkAnswerRequiredOrTriggersAction);
}

// decrease Tempo
function decreaseTempoAction() {
    // console.log('decreaseTempoAction');
    if (tempoAutoplay > tempoMini) {
        tempoAutoplay -= 1;
    updateModeSpecificLocalyStoredTempoValue();
    updateUI();
    }
}

// increase Tempo
function increaseTempoAction() {
    // console.log('increaseTempoAction');
    if (tempoAutoplay < tempoMaxi) {
        tempoAutoplay += 1;
    updateModeSpecificLocalyStoredTempoValue();
    updateUI();
    }
}
let decTempoD = document.getElementById('decTempoDiv');
decTempoD.addEventListener('click', () => {decreaseTempoAction()});
let incTempoD = document.getElementById('incTempoDiv');
incTempoD.addEventListener('click', () => {increaseTempoAction()});

// decrease noteSustainInSeconds
function decreaseNoteSustainAction() {
    console.log('decreaseNoteSustainAction');
    if (noteSustainInSeconds > noteSustainInSecondsMini) {
        noteSustainInSeconds = Number((noteSustainInSeconds - 0.5).toFixed(1));
        console.log('noteSustainInSeconds -> ' + noteSustainInSeconds);
        localStorage.setItem('sustain', noteSustainInSeconds);  
        updateUI();
    }
}

// increase noteSustainInSeconds
function increaseNoteSustainAction() {
    console.log('increaseNoteSustainAction');
    if (noteSustainInSeconds < noteSustainInSecondsMaxi) {
        noteSustainInSeconds = Number((noteSustainInSeconds + 0.5).toFixed(1));
        console.log('noteSustainInSeconds -> ' + noteSustainInSeconds);
        localStorage.setItem('sustain', noteSustainInSeconds);  
        updateUI();
    }
}
let decNoteSustainD = document.getElementById('decNoteSustainDiv');
decNoteSustainD.addEventListener('click', () => {decreaseNoteSustainAction()});
let incNoteSustainD = document.getElementById('incNoteSustainDiv');
incNoteSustainD.addEventListener('click', () => {increaseNoteSustainAction()});


// Réactions au changement de banque de sons _______________
function changeSoundBankAction(formerNote = 'none') {
    // console.log('changeSoundBankAction - formerNote -> ' , formerNote);  
    // console.log('storedSoundBank pas trouvé');
    let elts = document.querySelectorAll('input');
    for (let i = 0; i < elts.length; i++) {
        if (elts[i].name === 'soundBank') {
            if (elts[i].checked === true) {
                soundBank = elts[i].value;
            };
        }
    }
    // Dans les deux cas, on met à jour la soundBank dans le localStorage
    localStorage.setItem('soundBank', soundBank);

    // console.log('Soundbank sélectionnée => ' + soundBank);
    // console.log('Soundbank du local storage => ' + soundBank);

    // On met à jour le registre selon la banque de sons
    register = getRegisterAndSettingsFromSoundBank();
    //console.log(register);

    // On fait attendre (en attendant que la sound bank soit chargée) en désactivant le pickButton
    buttonPick.className = "pickCardButton deactivated greyedOut"; pickButtonActivationStatus = 0; 
    const previousPickCardButtonLabel = pickCardButton.innerText;
    pickCardButton.innerText = "Hold on...";
    // on précharge les fichiers sons qui sont dans le registre
    preloadRegisterSoundBankFiles().then(() => {
        const soundBankName = 
        console.log("%cLa soundbank '" + soundBankNames[Number(soundBank)-1] + "' est chargée.", "color: green") //; font-weight: bold;");
        // Si la note en cours (si elle est déjà définie) est hors registre, on reset le tout sinon c'est pas propre
        if (formerNote != 'none'){
            if (formerNote.pianoKey < register.lowestSoundBankNote.pianoKey || formerNote.pianoKey > register.highestSoundBankNote.pianoKey) {
                console.log('RESET')
                resetAction(false, mode);
            }   
            if (isNotePlayable(formerNote)) {
                playNotes(formerNote);
            } else {
                playNotes(register.lowLimitNote);
            }
        }
        // On réactive pickButton
        pickCardButton.innerText = previousPickCardButtonLabel;
        pickButtonActivationStatus = 1;

        updateUI();
    })
    localStorage.setItem('soundBank', soundBank);
}
let soundForm = document.getElementById(id = "soundSelectForm");
soundForm.addEventListener('input', () => {changeSoundBankAction(previouslyPlayedNote)});


// Réactions au bouton reset _______________
function resetAction(ninthsChecked, mode) {
    // console.log('resetAction');
    // console.log('navButtonsActivationStatus[4] = ' + navButtonsActivationStatus[4]);
    if (navButtonsActivationStatus[4] == 1) {
        correctAnswersCount = 0;
        counter = 0;
        seqHistory = [];
        analysis = []
        currentHistoryIndex = -1;
        currentNote = pickDictationNote1(ninthsChecked, mode);
        previousNote = currentNote;
        limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, cards);
        console.log('*** RESTART currentNote : ' + previousNote.fullName);
        replacedEnharmonism = '';
        octaveTransposition = '';
        if (mode =='intervalId' || mode =='scaleId') {
            applyToAllAnswerButtons(button => {
                //console.log('On est sur un bouton hors réaction (ni cliqué, ni bonne réponse)');
                button.className = "answerButton deactivated greyedOut";
            });
        }
        updateUI();
    } 
}
// bouton 'Restart'
buttonRestartD.addEventListener('click', () => {resetAction()});

// function pour appliquer une fonction (func) à tous les bouton-reponse de la div
function applyToAllAnswerButtons(func) { 
    let elements = answerButtonsD.getElementsByTagName("button");
    //console.log('forEachButton - elements.length = ' + elements.length);
    for(let i = 0, len = elements.length; i < len; i++) {
        func(elements[i]);
    }
}

function historize(seqHistoryItem, replacementWanted) {
    // console.log('historize');
    // console.log('currentHistoryIndex ->' + currentHistoryIndex + ' | counter ->' + counter);
    // console.log('historize - replacementWanted : ' + replacementWanted + ' | seqHistory : ');
    // console.log('seqHistory before historize : ', seqHistory);
    seqHistoryItem.index = currentHistoryIndex; // on ajoute l'index à l'objet seqHistoryItem
    if (replacementWanted) {
        seqHistoryItem.index = currentHistoryIndex; // on ajoute l'index à l'objet seqHistoryItem (inutilisé)
        // seqHistoryItem.analysed = false;
        seqHistory[counter-1] = seqHistoryItem;
        // console.log('historize NO-PUSH (update hist-item)');
    } else {
        currentHistoryIndex ++ ;
        // seqHistoryItem.analysed = false;
        seqHistoryItem.index = currentHistoryIndex; // on ajoute l'index à l'objet seqHistoryItem (inutilisé)
        seqHistory.push(seqHistoryItem);
        // console.log('historize PUSH');
    }
    // console.log('historize - seqHistory : ', seqHistory);
    // console.log('historize - replacementWanted : ' + replacementWanted + ' | seqHistory : ');
}; 

function contructAnalysis() {
    // console.log('CALL contructAnalysis');
    // console.log('contructAnalysis - seqHistory : ', seqHistory);
    analysis = [];
    // console.log('contructAnalysis - analysis : ', analysis);
    seqHistory.forEach ((seqItem) => { // On prend chaque item d'historique
        let seqItemId; let seqItemDirection; let seqObject;
        let seqCardTimeElapsed = (seqItem.cardTimeElapsed)? seqItem.cardTimeElapsed : 0
        switch (mode) {
            case ('intervalId'):
                seqItemId = seqItem.card.id;
                seqItemDirection = (seqItem.card.id > 0)? 'ascending' : 'descending';
                seqObject = seqItem.card
                
                break;
            case ('scaleId'):
                seqItemId = (seqItem.scaleDirection === 'ascending')? Number(seqItem.currentScale.id) : -Number(seqItem.currentScale.id);
                seqItemDirection = seqItem.scaleDirection;
                seqObject = seqItem.currentScale;
                break;
            case ('chordId'):
                seqItemId = seqItem.currentChord.id;
                seqItemDirection = 'ascending';
                seqObject = seqItem.currentChord;
                break;
        }
        // console.log('seqHistory : ', seqHistory);
        // console.log('seqItem.card.id:', seqItem.card?.id);
        // console.log('answerIsRight:', seqItem.answerIsRight);

        let rightAnswersIncrement = (seqItem.answerIsRight)? 1 : 0 ; // si l'item d'historique indique une bonne réponse, l'incrément de bonne réponse vaut 1, sinon 0

        //console.log('analysis actuel AVANT find:', JSON.stringify(analysis, null, 2));

        // On cherche si la Card de l'item d'historique existe déjà dans l'analyse. Si on la trouve, on la met dans analysedCard
        let analysedCard = analysis.find((analysisCard) => {
            return Number(seqItemId) === Number(analysisCard.id);
        });

        // console.log('analysedCard : ', analysedCard);
        // console.log('seqItem.analysed : ', seqItem.analysed);

        if (analysedCard == undefined) { 
            // analysedCard est vide : la Card de l'item d'historique est absente de l'analyse
            // console.log('analysedCard est falsy');
            const analysisItem = {
                id:seqItemId,
                card: seqObject, //seqItem.card, 
                direction: seqItemDirection,
                nbOccurences: 1,
                nbRightAnswers: rightAnswersIncrement,
                totalCardTimeElapsed: seqCardTimeElapsed,
                associatedSeqItems: [seqItem.index]}
            // console.log ('analysisItem to push: ', analysisItem)
            analysis.push (analysisItem); // on ajoute la Card de l'item d'historique dans l'analyse 

        } else { 
            // On a trouvé la card du seqItem dans l'analyse (analysedCard existe)
            // console.log ('analysedCard.associatedSeqItems : ', analysedCard.associatedSeqItems)

            // On voit si l'item d'historique a déjà été traité pour ce type de Card
            if (!analysedCard.associatedSeqItems.includes(seqItem.index)){
                // l'analysedCard ne contient pas cet item d'historique
                // console.log ('index non inclus : ' + seqItem.index)
                // Dans ce cas on ajoute l'item d'historique au items traités pour ce type de Card et on incrémente le compteur d'occurence de ce type de Card
                analysedCard.nbOccurences ++; // On incrémente le nb d'occurence de cette AnalysedCard dans l'analyse
                analysedCard.totalCardTimeElapsed += seqCardTimeElapsed; // On ajoute le temps de l'item d'historique
                analysedCard.associatedSeqItems.push(seqItem.index); // on ajoute l'index de l'item d'historique à la liste des items associés à cette analysedCard
                // analysedCard.nbRightAnswers += rightAnswersIncrement;
            }
            // seqItem préexistant ou non, on incrémente le compteur de bonnes réponses selon la qualité de la réponse dans l'item d'historique
            analysedCard.nbRightAnswers += rightAnswersIncrement;
        }
    });
}

function constructAnalysisReport() {
    // console.log('CALL constructChordIdAnalysisReport');
    contructAnalysis();
    analysis.forEach ((statItem) => {
        statItem.rightPourcentage = statItem.nbRightAnswers * 100 / statItem.nbOccurences;
    })
    analysis.forEach ((statItem) => {
        statItem.averageCardTimeElapsed = statItem.totalCardTimeElapsed / statItem.nbOccurences;
    })
    analysis.sort((a, b) => a.rightPourcentage - b.rightPourcentage); //
    // console.log('constructChordIdAnalysisReport :', JSON.stringify(analysis, null, 2));
    // const popup = document.getElementById('popup');
    const popupTitleDiv = document.getElementById('popupTitleDiv');
    const popupContentTxtDiv = document.getElementById('popupContentTxtDiv');
    popupContentTxtDiv.innerHTML = "";
    // popupContentDiv.innerHTML = 
    // `<p><b>Chord identification statistics</b></p>
    // <p> --- ✼ --- </p>`;

    popupTitleDiv.innerHTML = 
    '<p><b>' + capitalizeFirstLetterFlexible(modeFullName) + ' statistics</b></p>' 
    +  '__________________________';

    let htmlStr = '<table style = "line-height: 1.2em;">';
    htmlStr += '<tbody>';
    htmlStr += '<tr style = "line-height: 1.5em;">';
    htmlStr += '<td style="width: 20px; white-space: nowrap;"></td>'
    htmlStr += '<td style="width: auto; white-space: nowrap;">' + capitalizeFirstLetterFlexible(cardName) + '</td>'
    htmlStr += '<td style="width: auto; white-space: nowrap; text-align: center;"> Score </td>';
    htmlStr += '<td style="width: auto; white-space: nowrap; text-align: center;"> % </td>';
    htmlStr += '<td style="width: auto; white-space: nowrap; text-align: left;"> Av. time </td>';
    htmlStr += '</tr>';
    analysis.forEach ((statItem) => {
        // console.log ('statItem : ', statItem);
        const dir = (statItem.direction === 'ascending')? 'asc' : 'desc';
        // console.log ('dir : ', dir);
        const dirInfo = (mode === 'chordId')? '' : '(' + dir + ')';
        const pourcentage = statItem.nbRightAnswers * 100 / statItem.nbOccurences;
        const emoji = getEmojiForStatItem(pourcentage); 
        const colorPellet = getColorPelletForStatItem(pourcentage); 
        htmlStr += '<tr>';
        htmlStr += '<td style="width: 20px;">' + colorPellet + '</td>'
        htmlStr += '<td style="width: auto; white-space: nowrap;">' + capitalizeFirstLetterFlexible(statItem.card.enName) + '&nbsp' + dirInfo + '&nbsp&nbsp</td>'
        htmlStr += '<td style="width: auto; white-space: nowrap;">' + statItem.nbRightAnswers + '/' + statItem.nbOccurences + '</td>';
        htmlStr += '<td style="width: auto; white-space: nowrap;">' + ' → &nbsp' + pourcentage.toFixed(0) + '%&nbsp</td>';
        htmlStr += '<td style="width: auto; white-space: nowrap;">' + '(' + statItem.averageCardTimeElapsed.toFixed(1) + 's)</td>';
        htmlStr += '</tr>';
    })
    htmlStr += '</tbody></table>';
    popupContentTxtDiv.innerHTML += htmlStr;
}

// function padText(text, desiredLength) {
//     const len = text.length;
//     if (len >= desiredLength) return text; // si déjà assez long
//     const spacesToAdd = desiredLength - len;
//     return text + ' '.repeat(spacesToAdd);
// }