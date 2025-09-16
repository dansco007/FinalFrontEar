function init(){
    // console.log('CALL INIT (sing)');
    notesAndCardsInit();
    currentNote = pickDictationNote1(ninthsChk, 'sing'); // = notes.find((note) => {return (note.fullName === 'E3')}); // pickDictationNote1(ninthsChk.checked, 'sing');
    previousNote = currentNote;
    limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, cards);

    singAllCheckOnChangeAction();

    initButtons();
    if (!storedSingTempo) setAutoplayTempo();
    // updateUI(); //  on veut exécuter l'update dès le départ

    commonInit();
}


// Variables globales pour 'Sing' :



//let currentNote = getNoteWithFullName('G3');


// Chks
const secondsChk = document.getElementById("secondsChk");
const thirdsChk = document.getElementById("thirdsChk");
const fourthsChk = document.getElementById("fourthsChk");
const augFourthsAndDimFifthsChk = document.getElementById("augFourthsAndDimFifthsChk");
const fifthsChk = document.getElementById("fifthsChk");
const sixthsChk = document.getElementById("sixthsChk");
const seventhsChk = document.getElementById("seventhsChk");
const ninthsChk = document.getElementById("ninthsChk");
const augFithsAndDimFourthsChk = document.getElementById("augFithsAndDimFourthsChk");
const augUnisonSecondsAndOctavesChk = document.getElementById("augUnisonSecondsAndOctavesChk");

let currentNote;
let previousNote;
// let previousNote = currentNote;
let isAutoPlaying = false;
let seqHistory = [], currentHistoryIndex = -1;
// limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, cards);

let replacedEnharmonism = '';
let octaveTransposition = '';
let card = {};

let returnMoveSubstitutionProba = .80 // Probalité d'évitement d'un mouvement d'aller-retour
let twoNotesRandomPlayOrder = false;

let octaveTranspoD = document.getElementById('octaveTranspoDiv');
let octaveTranspoTextD = document.getElementById('octaveTranspoTextDiv');
let arrowD = document.getElementById('arrowDiv');
let commentTargetNoteTxt = document.getElementById('commentTargetNoteTxt');

const allButtonsButAll = [secondsChk, thirdsChk, fourthsChk, fifthsChk, sixthsChk, seventhsChk, ninthsChk, augFourthsAndDimFifthsChk, augFithsAndDimFourthsChk, augUnisonSecondsAndOctavesChk];

// Gestion des données localStorage 
const storedConfigSecondsChk = localStorage.getItem('singConfigSecondsChk');
const storedConfigThirdsChk = localStorage.getItem('singConfigThirdsChk');
const storedConfigFourthsChk = localStorage.getItem('singConfigFourthsChk');
const storedConfigAugFourthsAndDimFifthsChk = localStorage.getItem('singConfigAugFourthsAndDimFifthsChk');
const storedConfigFifthsChk = localStorage.getItem('singConfigFifthsChk');
const storedConfigSixthsChk = localStorage.getItem('singConfigSixthsChk');
const storedConfigSeventhsChk = localStorage.getItem('singConfigSeventhsChk');
const storedConfigNinthsChk = localStorage.getItem('singConfigNinthsChk');
const storedConfigAugFifthsAndDimFourthsChk = localStorage.getItem('singConfigAugFithsAndDimFourthsChk');
const storedConfigAugUnisonSecondsAndOctavesChk = localStorage.getItem('singConfigAugUnisonSecondsAndOctavesChk');
const storedConfigAllChk = localStorage.getItem('singConfigAllChk');

const storedSingTempo = Number(localStorage.getItem('singTempo'));


// Astuce pour faire de la storedVariable (chaine 'true' ou 'false') un booléen
if (storedConfigSecondsChk) secondsChk.checked = (storedConfigSecondsChk === 'true'); 
if (storedConfigThirdsChk) thirdsChk.checked = (storedConfigThirdsChk === 'true'); 
if (storedConfigFourthsChk) fourthsChk.checked = (storedConfigFourthsChk === 'true'); 
if (storedConfigAugFourthsAndDimFifthsChk) augFourthsAndDimFifthsChk.checked = (storedConfigAugFourthsAndDimFifthsChk === 'true'); 
if (storedConfigFifthsChk) fifthsChk.checked = (storedConfigFifthsChk === 'true'); 
if (storedConfigSixthsChk) sixthsChk.checked = (storedConfigSixthsChk === 'true'); 
if (storedConfigSeventhsChk) seventhsChk.checked = (storedConfigSeventhsChk === 'true'); 
if (storedConfigNinthsChk) ninthsChk.checked = (storedConfigNinthsChk === 'true'); 
if (storedConfigAugFifthsAndDimFourthsChk) augFithsAndDimFourthsChk.checked = (storedConfigAugFifthsAndDimFourthsChk === 'true'); 
if (storedConfigAugUnisonSecondsAndOctavesChk) augUnisonSecondsAndOctavesChk.checked = (storedConfigAugUnisonSecondsAndOctavesChk === 'true'); 
if (storedConfigAllChk) allChk.checked = (storedConfigAllChk === 'true'); 

if (storedSingTempo) tempoAutoplay = storedSingTempo; // 1 tempo différent par mode

// singAllCheckOnChangeAction();


// Gestion d'interaction utilisateur

// ________________________________________________________ 
// ________________________________________________________ 


// initButtons();
// if (!storedSingTempo) setAutoplayTempo();
// updateUI(); //  on veut exécuter l'update dès le départ


// ________________________________________________________ 
// ________________________________________________________ 


// FUNCTIONS :

function adaptStylingsToMode() {
    // On met ici tout ce qui n'est pas 'par défaut' dans le CSS (ce qui est propre au mode)
    let displayQFlexDir = getComputedStyle(displayQ).flexDirection;
    if (displayQFlexDir == 'column'){ 
        arrowD.innerText = '↓'
        arrowD.style.margin = '4px 0px 8px 0px'
    } else {arrowD.innerText = '➙'}

    counterNumberDiv.style.padding = '3px';
}

function updateUI() {
    //console.log("updateUI()")
    
    let previousColor = cardNameD.style.color;

    // _____________________________________________________________

    // Gestion de la config (checkboxes)
    function dealWithConfigButtons() {
        //console.log('dealWithConfigButtons');
        secondsChk.onchange = function() {
            checkCheckAndAction(secondsChk)
        }
        thirdsChk.onchange = function() {
            checkCheckAndAction(thirdsChk)
        }
        fourthsChk.onchange = function() {
            checkCheckAndAction(fourthsChk)
        }
        fifthsChk.onchange = function() {
            checkCheckAndAction(fifthsChk)
        }
        sixthsChk.onchange = function() {
            checkCheckAndAction(sixthsChk)
        }
        seventhsChk.onchange = function() {
            checkCheckAndAction(seventhsChk)
        }
        ninthsChk.onchange = function() {
            checkCheckAndAction(ninthsChk)
        }
        augFourthsAndDimFifthsChk.onchange = function() {
            checkCheckAndAction(augFourthsAndDimFifthsChk)
        }
        augFithsAndDimFourthsChk.onchange = function() {
            checkCheckAndAction(augFithsAndDimFourthsChk)
        }
        augUnisonSecondsAndOctavesChk.onchange = function() {
            checkCheckAndAction(augUnisonSecondsAndOctavesChk)
        }
        allChk.onchange = function() {singAllCheckOnChangeAction()}
    }

    // _____________________________________________________________

    function updateButtonsConfigAndProb() {
        //console.log('updateButtons - counter : ' + counter);

        // Mise à jour :
        // - des boutons de navigation et du bouton principal 'buttonPick'
        updateNavButtonsAndPickButton();
        // - des probas
        calculateIntervalProbabilities(buildFocusChkConfig())
        // - du bouton pickButton en fonction de l'état autoplay
        updatePickButtonWithAutoplayState();
        // - de la config
        dealWithConfigButtons(); 
    } 

    function updateCardDivForSingMode() {  
        // console.log('updateCardDivForSingMode - counter = ' + counter); // seqHistory.length = ' + seqHistory.length) 
        if (counter > 0) { // (seqHistory.length !== 0) { //
            // console.log("updateCardDivForSingMode - C'est pas le tout début");
            displayQ.style.display='flex';
            counterD.style.display='flex';
            cardD.style.display='flex';
            arrowD.style.display='flex';
            let directionArrow = '↗︎';
            if (card.direction < 0) directionArrow = '↘︎';
            cardNameD.innerText = directionArrow + '    ' + capitalizeFirstLetterFlexible(card.enName);
            let remainder = counter % colors.length;
            cardNameD.style.color = colors[remainder];
            targetNameD.style.color = colors[remainder];
            // console.log('updateUI : octaveTransposition: ' + octaveTransposition)
            if (octaveTransposition == '8va') {
                octaveTranspoTextD.innerText = octaveTransposition + " ⤉"; // ⤒
                octaveTranspoD.style.display='flex';
            } else if (octaveTransposition == '8vb') {
                octaveTranspoTextD.innerText = octaveTransposition + " ⤈"; // ⤓
                octaveTranspoD.style.display='flex';
            } else {octaveTranspoTextD.innerText = ''; octaveTranspoD.style.display='none';} //octaveTranspoD.style.visibility = 'hidden';}
        } else {
            // console.log('updateCardDivForSingMode - Tout début');
            displayQ.style.display='none';
            cardNameD.innerText = "             ";
            targetNameD.style.color = '#000000';
        }        
    }

    function updatePrevNameAndTargetNameDivs() {
        // console.log('updatePrevNameAndTargetNameDivs - counter = ' + counter);
        addNewChildNode = function(parentDiv, innerText, cssClass) {
            let node = document.createElement('div');
            let textnode = document.createTextNode(innerText);
            newNode = node.appendChild(textnode);
            parentDiv.appendChild(node);
            node.classList.add(cssClass);
            return node;
        }
        if (counter > 0) {
            targetNameD.innerHTML = '';
            // Re-add the child target div
            if (replacedEnharmonism.toLowerCase().startsWith('no')) {
                addNewChildNode(targetNameD, currentNote.name, 'noteNameDiv');
                commentTargetNoteTxt.innerHTML = '<p> </p>';
            } else {
                // cas où on affiche l'enharmonisme et son remplacement
                addNewChildNode(targetNameD, replacedEnharmonism, 'noteNameDiv'); // Note trouvée
                addNewChildNode(targetNameD, '→', 'noteNameDiv'); // Séparateur texte
                addNewChildNode(targetNameD, currentNote.name, 'noteNameDiv'); // Remplacement
                commentTargetNoteTxt.innerHTML = '<p>Enharmonic substitution</p>';
            }
        } else {commentTargetNoteTxt.innerText = '' }; //commentTargetNoteD.style.visibility = 'hidden'}

        prevNameD.innerText = previousNote.name;
        prevNameD.style.color = previousColor;
    }

    function updateRegister() {
        //console.log('UPDATE : register : ');
        //console.log(register);
        lowLimitNoteNameD.innerText = register.lowLimitNote.fullName;
        highLimitNoteNameD.innerText = register.highLimitNote.fullName;

        //console.log('update : octaveMiniOk = ' + octaveMiniOk);
        if (octaveMiniOk) {
            //console.log('update : octaveMiniOk est TRUE');
            registerMsgD.style.display = 'none';
        } else {
            //console.log('update : octaveMiniOk est FALSE');
            registerMsgD.style.display = 'block';
            setTimeout(() => {
                registerMsgD.style.display = 'none';
                octaveMiniOk = true;
            }, "2000");
        }
        // Si la bottom note est pas en dessous de F2 (pianoKey 21), on affiche pas le check des limites d'intervalle grave
        if (register.lowLimitNote.pianoKey >= 21 || mode == 'scaleId') {
            respectLILDiv.style.display = 'none';
        } else {
            respectLILDiv.style.display = 'flex';
        }
    }

    function updateTargetShow() {
        // Show TargetNote (ou pas)
        //console.log('showCardChk : ' + showCardChk);
        if (showCardChk.checked && counter>0) {
            //targetNoteD.style.visibility = 'visible';
            targetNoteD.style.display='flex';
            //commentTargetNoteTxt.style.visibility = 'visible';
            commentTargetNoteTxt.style.display='flex';
        } else {
            // targetNoteD.style.visibility = 'hidden';
            targetNoteD.style.display='none';
            //commentTargetNoteTxt.style.visibility = 'hidden';
            commentTargetNoteTxt.style.display='none';
        }
    }

    function updateConfigChksLocalStorage() {
        // Mise à jour des valeurs localyStored des checkboxes de la config
        secondsChk.addEventListener('change', () => {localStorage.setItem('singConfigSecondsChk', secondsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        thirdsChk.addEventListener('change', () => {localStorage.setItem('singConfigThirdsChk', thirdsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        fourthsChk.addEventListener('change', () => {localStorage.setItem('singConfigFourthsChk', fourthsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        augFourthsAndDimFifthsChk.addEventListener('change', () => {localStorage.setItem('singConfigAugFourthsAndDimFifthsChk', augFourthsAndDimFifthsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        fifthsChk.addEventListener('change', () => {localStorage.setItem('singConfigFifthsChk', fifthsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        sixthsChk.addEventListener('change', () => {localStorage.setItem('singConfigSixthsChk', sixthsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        seventhsChk.addEventListener('change', () => {localStorage.setItem('singConfigSeventhsChk', seventhsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        ninthsChk.addEventListener('change', () => {localStorage.setItem('singConfigNinthsChk', ninthsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        augFithsAndDimFourthsChk.addEventListener('change', () => {localStorage.setItem('singConfigAugFithsAndDimFourthsChk', augFithsAndDimFourthsChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        augUnisonSecondsAndOctavesChk.addEventListener('change', () => {localStorage.setItem('singConfigAugUnisonSecondsAndOctavesChk', augUnisonSecondsAndOctavesChk.checked); localStorage.setItem('singConfigAllChk', allChk.checked)});
        allChk.addEventListener('change', () => {localStorage.setItem('singConfigAllChk', allChk.checked)});

    }

    updateButtonsConfigAndProb();
    updateCardDivForSingMode();
    updatePrevNameAndTargetNameDivs();
    updateCounterAndScoreDiv();
    updateRegister();
    updateTargetShow();
    updateTempoDisplay();
    updateSustainDisplay();
    adaptStylingsToMode();
    updateSettingsShows();
    updateConfigChksLocalStorage();

    // fin updateUI
}


// ___________________________________________________________________________


function initButtons() {

    //let buttonNewCard = document.getElementById('pickCardButton');
    buttonPick.addEventListener('click', buttonNewCardAction);


    // bouton 'Play' (start Note)
    let playStartNoteAction = function() {
        // console.log('playStartNoteAction');
        playNotes(previousNote);
    }
    prevNoteD.addEventListener('click', playStartNoteAction);

    // bouton 'Counter' 
    let buttonPlayBothAction = function() {
        // console.log('buttonPlayBothAction');
        play2Notes(previousNote, currentNote, 500);
    }
    counterD.addEventListener('click', buttonPlayBothAction);
    cardD.addEventListener('click', buttonPlayBothAction);


    // bouton 'Play' (target)
    let PlayTargetNoteAction = function() {
        // console.log('PlayTargetNoteAction');
        playNotes(currentNote);
    }
    targetNoteD.addEventListener('click', PlayTargetNoteAction);

    // Show targetNote or not
    let checkShowTargetNoteAction = function() {
        // console.log('checkShowTargetNoteAction');
        updateUI();
    }
    showCardChk.addEventListener('change', checkShowTargetNoteAction);

    

    // Gestion de pression de touches
    function activateKeyboardShortcuts() {
        // console.log('activateKeyboardShortcuts');
        document.addEventListener('keydown', function(e) {
            if (e.key === ' ') { // raccourci barre d'espace (unique hors du mode autoplay)
                e.preventDefault(); // empêche le rôle par défaut du raccorci (ici clic sur le dernier focus)
                // console.log('Spacebar default action prevented');
                if (!isAutoPlaying) {
                    buttonNewCardAction('user');
                }
                if (document.activeElement) { // Pour supprimer le focus créé par le raccourci
                    // console.log('document.activeElement : ', document.activeElement);
                    document.activeElement.style.outline = 'none';
                    document.activeElement.style.boxShadow = 'none';
                    document.activeElement.blur();
                }
            }
        });
    }
    activateKeyboardShortcuts();

    // FIN initButtons
}

// bouton 'Pick a card'
function buttonNewCardAction(whoCalledMe = 'user') {
    // console.log('buttonNewCardAction - counter = ' + counter);
    // On a cliqué pour une nouvelle carte
    // console.log('buttonNewCardAction - whoCalledMe : ' + whoCalledMe);

    // Décision d'éxécution ou non du code de pickButton selon le contexte d'autoplay
    const reply = shouldThePickButtonActionBeExecuted(whoCalledMe, isAutoPlaying);
    const pickCodeShouldLaunch = reply.pickCodeShouldLaunch;
    // console.log('reply', reply)
    isAutoPlaying = reply.updatedPlayingState;
    // Si on est pas en autoPlay et que le timout a été dénifi, on l'annule :
    if (!isAutoPlaying && !(typeof autoplayTimout === 'undefined')) clearTimeout(autoplayTimout);
    //console.log('pickCodeShouldLaunch ' + pickCodeShouldLaunch)
    // console.log('buttonNewCardAction - isAutoPlaying = ' + isAutoPlaying)
    //console.log('autoPlayChk.checked ' + autoPlayChk.checked)
    updateUI();
    if (!pickCodeShouldLaunch) return;

    // Action du bouton PickCard
    // On incrémente le compteur
    incrementCounter();

    // On sélectionne une première note et on limite éventuellement pour les intervalles graves
    // currentNote = pickDictationNote1(ninthsChk, 'sing')
    previousNote = currentNote;
    previouslyPlayedNote = previousNote;
    limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, cards);

    // On calcul les proba de chaque carte possible
    calculateIntervalProbabilities(config);

    // On tire une carte
    card = getRandCard(); // cards.find((card) => {return (card.enName === 'descending major ninth')});

    ({foundNote, replacedEnharmonism, octaveTransposition} = findNextNote(card, previousNote, register, 'sing'));
    //console.log('PICK : foundNote.pianoKey  : ' + foundNote .pianoKey);
    
    // On cherche un meilleur choix si la carte tirée est problématique
    ({currentNote, replacedEnharmonism, octaveTransposition} = provideBetterChoice(foundNote, register, returnMoveSubstitutionProba, octaveTransposition)); // peut modifier 'card'
    //console.log('PICK : currentNote.pianoKey  : ' + currentNote.pianoKey);
    
    // on stocke (on historise), sans remplacer
    historize({previousNote, currentNote, replacedEnharmonism, octaveTransposition, card}, false);
    
    console.log("%c   " + 'Selected movement : ' + capitalizeFirstLetterFlexible(card.shortEnName) + ' (HalfSteps = ' + card.halfSteps + ' | Steps = ' + card.steps + ')', "color: green");        
    console.log("%c   " + 'Two final picked register-ajusted notes : ', "color: blue");
    console.log("%c   " + '-> Note1  : ' + previousNote.fullName + ' (Key ' + previousNote.pianoKey + ') index: ' +  notes.indexOf(previousNote), "color: blue"); 
    console.log("%c   " + '-> Note2 : ' + currentNote.fullName + ' (Key ' + currentNote.pianoKey + ') index: ' +  notes.indexOf(currentNote), "color: blue");
    
    // On joue la note de départ
    playNotes(previousNote);

    function autoPlayIfChecked() {
    // console.log('autoPlayIfChecked - autoPlayChk.checked = ' + autoPlayChk.checked + ' isAutoPlaying = ' + isAutoPlaying);
        if (isAutoPlaying) {
            // console.log('autoPlayIfChecked - AUTOPLAY ACTIVE');
            // isAutoPlaying = true;
            autoplayTimout = setTimeout(() => {
                // console.log ('FIN timeOut Autoplay');
                updateUI();
                buttonNewCardAction('program');
            }, (1000 * 60/tempoAutoplay));
        } else {
            // console.log('autoPlayIfChecked - AUTOPLAY DESACTIVE');     
        }
    }
    autoPlayIfChecked() // On lance la suite si autoPlay;
    updateUI();
    // Fin buttonNewCardAction
}

function play2Notes(note1, note2, timeBetween = 0) {
    // console.log('play2Notes - timeBetween = ' + timeBetween);
    // console.log('play2Notes : note 1 = ' + note1.fullName + ' / note2 = ' + note2.fullName);
    // Mélange aléatoire si activé
    const [firstNote, secondNote] = (twoNotesRandomPlayOrder && Math.random() > 0.5)
        ? [note2, note1]
        : [note1, note2];

    if (!isNotePlayable(firstNote)) {
        console.log('Bottom note is out of sound bank');
        return false;
    }
    if (!isNotePlayable(secondNote)) {
        console.log('Top note is out of sound bank');
        return false;
    }

    playNotes(note1)
    
    setTimeout(() => {playNotes(note2)}, timeBetween);
    //console.log('Top note exists in sound bank');
    return true;
}

// Navigation
function navigateToHistoricalRank() {
    // console.log('navigateToHistoricalRank - currentHistoryIndex : ' + currentHistoryIndex);
    let seqHistoryItem = seqHistory[currentHistoryIndex];;
    ({previousNote, currentNote, replacedEnharmonism, octaveTransposition, card} = seqHistoryItem); // destructuration;
    playNotes(previousNote);
    updateUI();
}

function singAllCheckOnChangeAction() {
    // console.log('singAllCheckOnChangeAction - allChk.checked = ' + allChk.checked)
    if (allChk.checked) {
        secondsChk.checked = true; localStorage.setItem('singConfigSecondsChk', secondsChk.checked);
        thirdsChk.checked = true; localStorage.setItem('singConfigThirdsChk', thirdsChk.checked);
        fourthsChk.checked = true; localStorage.setItem('singConfigFourthsChk', fourthsChk.checked);
        augFourthsAndDimFifthsChk.checked = true; localStorage.setItem('singConfigAugFourthsAndDimFifthsChk', fourthsChk.checked);
        fifthsChk.checked = true; localStorage.setItem('singConfigFifthsChk', fifthsChk.checked);
        sixthsChk.checked = true; localStorage.setItem('singConfigSixthsChk', sixthsChk.checked);
        seventhsChk.checked = true; localStorage.setItem('singConfigSeventhsChk', seventhsChk.checked);
        ninthsChk.checked = true; localStorage.setItem('singConfigNinthsChk', allChk.checked);
        augFithsAndDimFourthsChk.checked = true; localStorage.setItem('singConfigAugUnisonSecondsAndOctavesChk', allChk.checked);
        augUnisonSecondsAndOctavesChk.checked = true; localStorage.setItem('singConfigAugUnisonSecondsAndOctavesChk', allChk.checked);
    }
    calculateIntervalProbabilities(buildFocusChkConfig())
};

function updateModeSpecificLocalyStoredTempoValue(){
    console.log('updateModeSpecificLocalyStoredTempoValue - tempoAutoplay = ' + tempoAutoplay);
    localStorage.setItem('singTempo', tempoAutoplay)
}
/* function drawVolume() {
    requestAnimationFrame(drawVolume);

    analyser.getByteTimeDomainData(dataArray);

    // Calcul d'une valeur RMS approximative
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128; // centré autour de 0
        sum += val * val;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    const normalized = rms / 128; // environ entre 0.0 et 1.0

    // Affichage sur le canvas
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = normalized > 0.8 ? 'red' : 'limegreen';
    canvasCtx.fillRect(0, 0, canvas.width * normalized, canvas.height);
}
drawVolume(); */