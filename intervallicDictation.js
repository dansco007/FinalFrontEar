function init(){
    // console.log('CALL INIT (intDictation)');
    notesAndCardsInit();
    currentNote = pickDictationNote1(tenthsChk, 'intervalId');
    previousNote = currentNote;
    limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, dictationCards);

    intDictAllCheckOnChangeAction();

    initButtons();
    if (!storedIntDictTempo) setAutoplayTempo();
    //updateUI(); //  on veut exécuter l'update dès le départ
    commonInit();
}


// Variables globales pour 'intervalId' :

let answerCount = 0;
let givenAnswer = -1;
let correctAnswer;
let isAutoPlaying = false;
let intervalDirection = 1;

let seqHistory = [], currentHistoryIndex = -1;

let replacedEnharmonism = '';
let octaveTransposition = '';
// let currentNote = getNoteWithFullName('G3');

// Chks
const secondsChk = document.getElementById("secondsChk");
const thirdsChk = document.getElementById("thirdsChk");
const fourthsChk = document.getElementById("fourthsChk");
const tritonesChk = document.getElementById("tritonesChk");
const fifthsChk = document.getElementById("fifthsChk");
const sixthsChk = document.getElementById("sixthsChk");
const seventhsChk = document.getElementById("seventhsChk");
const ninthsChk = document.getElementById("ninthsChk");
const tenthsChk = document.getElementById("tenthsChk");
const ascendingChk = document.getElementById("ascendingChk");
const descendingChk = document.getElementById("descendingChk");
const randomNoteLagChk = document.getElementById("randomNoteLagChk");

let currentNote;
let previousNote;
// let previousNote = currentNote;
let card = {};

let noteLagInMs = 200;
let usedNoteLagInMs = noteLagInMs;

// let twoNotesRandomPlayOrder = true;

// Buttons
const startAndTargetNotesD = document.getElementById('startAndTargetNotesDiv');
const buttonHearAgainD = document.getElementById('buttonHearAgainDiv');
const buttonHearAgain = document.getElementById('buttonHearAgain');
const buttonPlayStart = document.getElementById('buttonPlayStartNote');
const scoreTxtDiv = document.getElementById(id="scoreTxtDiv");
const timeTxtDiv = document.getElementById(id="timeTxtDiv");

// Answers
let answerButtonsActivationStatus = Array(16).fill(0); // 1 pour on, 0 pour Off (12 boutons) - Important pour la désactivation des réponses (<=> answerButtonsActivationStatus = [0, 0, 0, 0, 0, ...])
const answerButtonsD = document.getElementById(id="answerButtonsDiv");
const buttonMinor2 = document.getElementById(id="buttonInt1Div");
const buttonMajor2 = document.getElementById(id="buttonInt2Div");
const buttonMinor3 = document.getElementById(id="buttonInt3Div");
const buttonMajor3 = document.getElementById(id="buttonInt4Div");
const buttonPerfect4 = document.getElementById(id="buttonInt5Div");
const buttonTritone = document.getElementById(id="buttonInt6Div");
const buttonPerfect5 = document.getElementById(id="buttonInt7Div");
const buttonMinor6 = document.getElementById(id="buttonInt8Div");
const buttonMajor6 = document.getElementById(id="buttonInt9Div");
const buttonMinor7 = document.getElementById(id="buttonInt10Div");
const buttonMajor7 = document.getElementById(id="buttonInt11Div");
const buttonOctave = document.getElementById(id="buttonInt12Div");
const buttonMinor9= document.getElementById(id="buttonInt13Div");
const buttonMajor9 = document.getElementById(id="buttonInt14Div");
// const buttonAug9 = document.getElementById(id="buttonInt15Div");
const buttonMinor10 = document.getElementById(id="buttonInt15Div");
const buttonMajor10 = document.getElementById(id="buttonInt16Div");

// console.log('INIT intDict - dictationCards : ', dictationCards);
// limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, dictationCards);
const allButtonsButAll = [secondsChk, thirdsChk, fourthsChk, fifthsChk, sixthsChk, seventhsChk, tritonesChk, ninthsChk, tenthsChk, ascendingChk, descendingChk];
const allChkButAllAndDirection = [secondsChk, thirdsChk, fourthsChk, fifthsChk, sixthsChk, seventhsChk, tritonesChk, ninthsChk, tenthsChk];

// Gestion des données localStorage 
const storedConfigSecondsChk = localStorage.getItem('intDictConfigSecondsChk');
const storedConfigThirdsChk = localStorage.getItem('intDictConfigThirdsChk');
const storedConfigFourthsChk = localStorage.getItem('intDictConfigFourthsChk');
const storedConfigTritonesChk = localStorage.getItem('intDictConfigTritonesChk');
const storedConfigFifthsChk = localStorage.getItem('intDictConfigFifthsChk');
const storedConfigSixthsChk = localStorage.getItem('intDictConfigSixthsChk');
const storedConfigSeventhsChk = localStorage.getItem('intDictConfigSeventhsChk');
const storedConfigNinthsChk = localStorage.getItem('intDictConfigNinthsChk');
const storedConfigTenthsChk = localStorage.getItem('intDictConfigTenthsChk');
const storedConfigAscendingChk = localStorage.getItem('intDictConfigAscendingChk');
const storedConfigDescendingChk = localStorage.getItem('intDictConfigDescendingChk');
const storedConfigAllChk = localStorage.getItem('intDictConfigAllChk');
const storedRandomNoteLagChoice = localStorage.getItem('randomNoteLagChk');
const storedNoteLagValue = localStorage.getItem('noteLagValue');

const storedIntDictTempo = Number(localStorage.getItem('intDictTempo'));

// Astuce pour faire de la storedVariable (chaine 'true' ou 'false') un booléen
if (storedConfigSecondsChk) secondsChk.checked = (storedConfigSecondsChk === 'true'); 
if (storedConfigThirdsChk) thirdsChk.checked = (storedConfigThirdsChk === 'true'); 
if (storedConfigFourthsChk) fourthsChk.checked = (storedConfigFourthsChk === 'true'); 
if (storedConfigTritonesChk) tritonesChk.checked = (storedConfigTritonesChk === 'true'); 
if (storedConfigFifthsChk) fifthsChk.checked = (storedConfigFifthsChk === 'true'); 
if (storedConfigSixthsChk) sixthsChk.checked = (storedConfigSixthsChk === 'true'); 
if (storedConfigSeventhsChk) seventhsChk.checked = (storedConfigSeventhsChk === 'true'); 
if (storedConfigNinthsChk) ninthsChk.checked = (storedConfigNinthsChk === 'true'); 
if (storedConfigTenthsChk) tenthsChk.checked = (storedConfigTenthsChk === 'true'); 
if (storedConfigAscendingChk) ascendingChk.checked = (storedConfigAscendingChk === 'true'); 
if (storedConfigDescendingChk) descendingChk.checked = (storedConfigDescendingChk === 'true'); 
if (storedConfigAllChk) allChk.checked = (storedConfigAllChk === 'true'); 
if (storedRandomNoteLagChoice) randomNoteLagChk.checked = (storedRandomNoteLagChoice === 'true'); 
if (storedNoteLagValue) noteLagInMs = Number(storedNoteLagValue); 
if (storedIntDictTempo) tempoAutoplay = storedIntDictTempo; // 1 tempo différent par mode

// intDictAllCheckOnChangeAction();

// Gestion d'interaction utilisateur

// ________________________________________________________ 
// ________________________________________________________ 


// initButtons();
// if (!storedIntDictTempo) setAutoplayTempo();
// updateUI(); //  on veut exécuter l'update dès le départ

showCardChk.addEventListener('click',() => updateUI());

// ________________________________________________________ 
// ________________________________________________________ 


// FUNCTIONS :

function adaptStylingsToMode() {
    // On met ici tout ce qui n'est pas 'par défaut' dans le CSS (ce qui est propre au mode)
    document.documentElement.style.setProperty('--displayHeight', 'auto');
    document.documentElement.style.setProperty('--displayWidth', '600px');
    document.documentElement.style.setProperty('--labelWidth', '60px');
    
    //previousNoteDiv.style.justifyContent = center;
    prevNoteD.style.flexDirection = 'row';
    prevNoteD.style.height = '40px';
    // prevNoteD.style.width = '110px';
    prevNoteD.style.alignItems = 'center';

    targetNoteD.style.flexDirection = 'row';
    targetNoteD.style.height = '40px';
    // targetNoteD.style.width = '110px';
    targetNoteD.style.alignItems = 'center';
    counterNumberDiv.style.padding = '7px';

    cardNameD.style.color = 'black';
    cardDiv.style.alignItems = 'center';
    cardNameDiv.style.padding = '7px';
    targetNameD.style.color = 'fireBrick';
    prevNoteTxtD.style.color = 'darkBlue';
    libDivCounterD.style.width = '30px';
}

function updateUI() {
    // console.warn("updateUI()")
    
    // _____________________________________________________________
    // Gestion de la config (checkboxes)
    function dealWithConfigButtons() {
        console.log('dealWithConfigButtons');
        secondsChk.onchange = function() {
            checkCheckAndAction(secondsChk);
        }
        thirdsChk.onchange = function() {
            checkCheckAndAction(thirdsChk);
        }
        fourthsChk.onchange = function() {
            checkCheckAndAction(fourthsChk);
        }
        fifthsChk.onchange = function() {
            checkCheckAndAction(fifthsChk);
        }
        sixthsChk.onchange = function() {
            checkCheckAndAction(sixthsChk);
        }
        seventhsChk.onchange = function() {
            checkCheckAndAction(seventhsChk);
        }
        ninthsChk.onchange = function() {
            checkCheckAndAction(ninthsChk);
        }
        tenthsChk.onchange = function() {
            checkCheckAndAction(tenthsChk);
        }
        tritonesChk.onchange = function() {
            checkCheckAndAction(tritonesChk);
        }
        ascendingChk.onchange = function () {
            if (!ascendingChk.checked && !descendingChk.checked) { ascendingChk.checked = true };
            checkCheckAndAction(ascendingChk);
        }
        descendingChk.onchange = function () {
            if (!ascendingChk.checked && !descendingChk.checked) { descendingChk.checked = true };
            checkCheckAndAction(descendingChk);
        }
        allChk.onchange = function() {intDictAllCheckOnChangeAction()} 
    }


    function updateButtonsConfigAndProb() {
        //console.log('updateButtons - counter : ' + counter);

        // Mises à jour 
        // - des boutons de navigation et du bouton principal 'buttonPick'
        updateNavButtonsAndPickButton();
        // - des probas
        calculateIntervalProbabilities(buildFocusChkConfig());
        // - du bouton pickButton en fonction de l'état autoplay
        updatePickButtonWithAutoplayState(givenAnswer, answerRequiredChk.checked);
        // - de la config
        dealWithConfigButtons();
    }

    function updatePrevNameAndTargetNameDivs() {
        // console.log('updatePrevNameAndTargetNameDivs - counter = ' + counter);
        if (counter > 0) {
            prevNoteD.style.display='flex';
            prevNoteTxtD.innerText = previousNote.fullName;
            targetNoteD.style.display='flex';
            targetNameD.innerText = currentNote.fullName;

        } else {
            prevNoteD.style.display='none';
            targetNoteD.style.display='none';
        } 
    }
    
    updateButtonsConfigAndProb();

    // Mise à jour des boutons-réponses selon si c'est le tout-début ou pas
    if (seqHistory[counter-1] == undefined) {
            //console.log ('updateUI - seqHistory[counter-1] == undefined)');
            //console.log ('Appel updateAnswerButtonsAndScore(-1, false) ligne 238')
            updateAnswerButtonsAndScore(-1, false);
    } 

    // Show DisplayQ (ou pas)
    //console.log('showCardChk : ' + showCardChk.checked);
    if (showCardChk.checked && counter > 0) {
        displayQuestion.style.display = 'flex';
        console.log('updateUI - intervalDirection : ' + intervalDirection);
        updateCardDiv();
    } else {
        displayQ.style.display = 'none';
        updateCardDiv();
    }

    

    function updateConfigChksLocalStorage() {
        // Mise à jour des valeurs localyStored des checkboxes de la config
        secondsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigSecondsChk', secondsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        thirdsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigThirdsChk', thirdsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        fourthsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigFourthsChk', fourthsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        tritonesChk.addEventListener('change', () => {localStorage.setItem('intDictConfigTritonesChk', tritonesChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        fifthsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigFifthsChk', fifthsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        sixthsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigSixthsChk', sixthsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        seventhsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigSeventhsChk', seventhsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        ninthsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigNinthsChk', ninthsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        tenthsChk.addEventListener('change', () => {localStorage.setItem('intDictConfigTenthsChk', tenthsChk.checked); localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        ascendingChk.addEventListener('change', () => {localStorage.setItem('intDictConfigAscendingChk', ascendingChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        descendingChk.addEventListener('change', () => {localStorage.setItem('intDictConfigDescendingChk', descendingChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        allChk.addEventListener('change', () => {localStorage.setItem('intDictConfigAllChk', allChk.checked)});
        randomNoteLagChk.addEventListener('change', () => {localStorage.setItem('randomNoteLagChk', randomNoteLagChk.checked)}); 
    }

    updatePrevNameAndTargetNameDivs();
    updateCounterAndScoreDiv();
    updateRegister();
    adaptStylingsToMode();
    updateNoteLagDisplay();
    updateTempoDisplay();
    updateSustainDisplay();
    updateSettingsShows();
    showAnswerbuttons();
    updateConfigChksLocalStorage();

    // FIN updateUI
}


// ------------------------------------------------------------------------------------------


function initButtons() {


    //let buttonNewCard = document.getElementById('pickCardButton');
    buttonPick.addEventListener('click', buttonNewCardAction);

    // bouton 'Counter' (Play the two notes)
    function buttonPlayBothAction() {
        console.log('buttonPlayBothAction');
        play2Notes(previousNote, currentNote, usedNoteLagInMs);
    }
    counterD.addEventListener('click', buttonPlayBothAction);
    cardD.addEventListener('click', buttonPlayBothAction);
    buttonHearAgain.addEventListener('click', buttonPlayBothAction);
    
    // bouton 'PlaystartNote' 
    function buttonPlayStartNoteAction() {
        //console.log('buttonPreviousAction');
        playNotes(previousNote);
    }
    prevNoteD.addEventListener('click', buttonPlayStartNoteAction);

    // bouton 'PlayTarget'
    function buttonPlayTargetNoteAction() {
        //console.log('buttonPlayTargetNoteAction');
        playNotes(currentNote);
    }
    // let targetNoteD = document.getElementById('targetNoteDiv');
    targetNoteD.addEventListener('click', buttonPlayTargetNoteAction);


    // Réactions à la modification du timout entre les deux notes (intervalId) _______________
    // decrease noteLagInMs
    function decreaseNoteLagAction() {
        console.log('decreaseNoteLagAction');
        if (noteLagInMs > 0) {
            noteLagInMs -= 50;
            localStorage.setItem('noteLagValue', noteLagInMs);
            updateUI();
        }
    }
    // increase noteLagInMs
    function increaseNoteLagAction() {
        console.log('increaseNoteLagAction');
        if (noteLagInMs < 2000) {
            noteLagInMs += 50;
            localStorage.setItem('noteLagValue', noteLagInMs);
            updateUI();
        }
    }
    let decNotageLagD = document.getElementById('decNoteLagDiv');
    decNotageLagD.addEventListener('click', () => {decreaseNoteLagAction()});
    let incNotageLagD = document.getElementById('incNoteLagDiv');
    incNotageLagD.addEventListener('click', () => {increaseNoteLagAction()});

    // Maj des answerButtons qd changement de focus
    secondsChk.addEventListener('change', updateUI);
    thirdsChk.addEventListener('change', updateUI);
    fourthsChk.addEventListener('change', updateUI);
    tritonesChk.addEventListener('change', updateUI);
    fifthsChk.addEventListener('change', updateUI);
    sixthsChk.addEventListener('change', updateUI);
    seventhsChk.addEventListener('change', updateUI);
    ninthsChk.addEventListener('change', updateUI);
    tenthsChk.addEventListener('change', updateUI);
    allChk.addEventListener('change', updateUI);


    reactToAnswerAction = function(answerInHalfSteps) {
        // console.log('reactToAnswerAction');
        // console.log('answerInHalfSteps = ' + answerInHalfSteps);
        // console.log('correctAnswer = ' + correctAnswer);
        //console.log(Ansbutton); 
        correctAnswer = card.halfSteps;
        let answerIsRight = false;
        if (answerButtonsActivationStatus[answerInHalfSteps-1] === 0) { 
            console.log('reactToAnswerAction - DEACTIVATED'); return};
        answerCount ++;            
        //console.log('reactToAnswerAction - answerButtonsActivationStatus :' + answerButtonsActivationStatus);
        givenAnswer = answerInHalfSteps;
        // console.log ('Appel updateAnswerButtonsAndScore(givenAnswer, true) ligne 605 | givenAnswer = ' + givenAnswer)
        updateAnswerButtonsAndScore(givenAnswer, false);
        
        answerIsRight = (answerInHalfSteps == correctAnswer);

        cardTimeElapsed = (Date.now()- newCardStartTime) / 1000;
        console.log('(reactToAnswerAction) - cardTimeElapsed : ' + cardTimeElapsed);

        historize({previousNote, currentNote, replacedEnharmonism, octaveTransposition, card, intervalDirection, givenAnswer, answerIsRight, cardTimeElapsed}, true);
        
        // On désactive toutes les réponses
        answerButtonsActivationStatus = answerButtonsActivationStatus.map((el) => {return 0}); 
        
        if (answerIsRight) {
            console.log ("%c right answer", 'color: orange;');
            playFeedbackSound(true);
            if (rightAnswerTrigChk.checked) {
                setTimeout(() => {
                buttonNewCardAction('goodAnswer');
                }, rightAnswerTrigTimout);
            // if (rightAnswerTrigChk.checked) {
            //     buttonNewCardAction('goodAnswer');
            } else {
                updateUI();
            }
        } else {
            console.log ("%c wrong answer", 'color:magenta')
            playFeedbackSound(false);
            updateUI();
        }
        
    }

    buttonMinor2.addEventListener('click', function(){reactToAnswerAction(1)}) 
    buttonMajor2.addEventListener('click', function(){reactToAnswerAction(2)}) 
    buttonMinor3.addEventListener('click', function(){reactToAnswerAction(3)}) 
    buttonMajor3.addEventListener('click', function(){reactToAnswerAction(4)}) 
    buttonPerfect4.addEventListener('click', function(){reactToAnswerAction(5)}) 
    buttonTritone.addEventListener('click', function(){reactToAnswerAction(6)}) 
    buttonPerfect5.addEventListener('click', function(){reactToAnswerAction(7)}) 
    buttonMinor6.addEventListener('click', function(){reactToAnswerAction(8)}) 
    buttonMajor6.addEventListener('click', function(){reactToAnswerAction(9)}) 
    buttonMinor7.addEventListener('click', function(){reactToAnswerAction(10)}) 
    buttonMajor7.addEventListener('click', function(){reactToAnswerAction(11)}) 
    buttonOctave.addEventListener('click', function(){reactToAnswerAction(12)}) 
    buttonMinor9.addEventListener('click', function(){reactToAnswerAction(13)}) 
    buttonMajor9.addEventListener('click', function(){reactToAnswerAction(14)}) 
    // buttonAug9.addEventListener('click', function(){reactToAnswerAction(15)})
    buttonMinor10.addEventListener('click', function(){reactToAnswerAction(15)})
    buttonMajor10.addEventListener('click', function(){reactToAnswerAction(16)})

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
    // FIN INIT BUTTONS
}

// Gestion de l'affichage des boutons de réponse
// showAnswerbuttons = function () {
function showAnswerbuttons() {
    function updateAnswerButtonShow(focusButt, answerButt) {
        if (focusButt.checked) {
            answerButt.style.display = 'flex';
        } else {
            answerButt.style.display = 'none';
        }
    }
    updateAnswerButtonShow(secondsChk, buttonMinor2);
    updateAnswerButtonShow(secondsChk, buttonMajor2);
    updateAnswerButtonShow(thirdsChk, buttonMinor3);
    updateAnswerButtonShow(thirdsChk, buttonMajor3);
    updateAnswerButtonShow(fourthsChk, buttonPerfect4);
    updateAnswerButtonShow(tritonesChk, buttonTritone);
    updateAnswerButtonShow(fifthsChk, buttonPerfect5);
    updateAnswerButtonShow(sixthsChk, buttonMinor6);
    updateAnswerButtonShow(sixthsChk, buttonMajor6);
    updateAnswerButtonShow(seventhsChk, buttonMinor7);
    updateAnswerButtonShow(seventhsChk, buttonMajor7);
    updateAnswerButtonShow(ninthsChk, buttonMajor9);
    updateAnswerButtonShow(ninthsChk, buttonMinor9);
    // updateAnswerButtonShow(ninthsChk, buttonAug9);  
    updateAnswerButtonShow(tenthsChk, buttonMinor10);
    updateAnswerButtonShow(tenthsChk, buttonMajor10); 
}

// bouton 'Pick a card'
function buttonNewCardAction(whoCalledMe = 'user') {
    // console.log('CALL buttonNewCardAction - counter = ' + counter);
    // console.log('buttonNewCardAction - whoCalledMe : ' + whoCalledMe);

    // givenAnswer = -1; // on réinit la réponse

    // Décision d'éxécution ou non du code de pickButton selon le contexte d'autoplay
    const reply = shouldThePickButtonActionBeExecuted(whoCalledMe, isAutoPlaying);
    const pickCodeShouldLaunch = reply.pickCodeShouldLaunch;
    // console.log('reply', reply)
    isAutoPlaying = reply.updatedPlayingState;
    // Si on est pas en autoPlay et que le timout a été défini, on l'annule :
    if (!isAutoPlaying && !(typeof autoplayTimout === 'undefined')) clearTimeout(autoplayTimout);
    //console.log('pickCodeShouldLaunch ' + pickCodeShouldLaunch)
    // console.log('buttonNewCardAction - isAutoPlaying = ' + isAutoPlaying)
    //console.log('autoPlayChk.checked ' + autoPlayChk.checked)
    updateUI();
    if (!pickCodeShouldLaunch) return;

    // --------------
    // console.log('buttonNewCardAction - action is called');
    // Action du bouton PickCard

    // On incrémente le compteur
    incrementCounter();
    if (counter == 1) startTime = Date.now(); // Première carte : on démarre le chrono global
    if (givenAnswer < 0 && counter > 1){
        cardTimeElapsed = (Date.now()- newCardStartTime) / 1000; // On démarre le chrono de la carte
        // console.log('buttonNewCardAction - cardTimeElapsed (NO REPLY): ' +cardTimeElapsed);
        seqHistory[seqHistory.length-1].cardTimeElapsed = cardTimeElapsed; // On historise le chrono de la carte (cas de non-réponse)
    }
    // console.log('buttonNewCardAction - seqHistory : ', seqHistory);

    givenAnswer = -1; // on réinit la réponse

    newCardStartTime = Date.now();

    // On sélectionne une première note et on limite éventuellement pour les intervalles graves
    previousNote = pickDictationNote1(tenthsChk.checked, 'intervalId');
    previouslyPlayedNote = previousNote;
    
    limitedToLILCards = limitCardstoLowIntervalLimits(previousNote, dictationCards);

    // On calcul les proba de chaque carte possible
    calculateIntervalProbabilities(config);

    // On tire une carte
    card = getNextIntervallicDictCard(previousNote); // on cherche la prochaine carte
    // console.log("%c   Picked - interval :", "color: darkGreen", card.enName);

    // on cherche la 2ème note (et on cherche un meilleur choix si la note trouvée est problématique)
    ({foundNote, replacedEnharmonism, octaveTransposition} = findNextNote(card, previousNote, register)); // on cherche la note suivante et les infos associées
    currentNote = foundNote;

    // On détermine le timout entre les deux notes
    if (randomNoteLagChk.checked) {usedNoteLagInMs = Math.random()*noteLagInMs} else {usedNoteLagInMs = noteLagInMs}
    //console.log('Pick - usedNoteLagInMs = ' + usedNoteLagInMs + ' - noteLagInMs = ' + noteLagInMs);

    let alteredForDirectionCardId;
    // On décide d'une direction du mouvement
    intervalDirection = 1;
    switch (true) {
        case (ascendingChk.checked && descendingChk.checked):
            // Mélange aléatoire si ascending et descending sont cochés
            const directionRandom = Math.random();
            intervalDirection = (directionRandom > 0.5) ? 1 : -1;
            alteredForDirectionCardId = (intervalDirection>0)? Number(card.id) : -Number(card.id);
            card.id = alteredForDirectionCardId;
            break;
        case (ascendingChk.checked && !descendingChk.checked):
            intervalDirection = 1;
            alteredForDirectionCardId = Number(card.id);
            card.id = alteredForDirectionCardId;
            break;
        case (!ascendingChk.checked && descendingChk.checked):
            intervalDirection = -1;
            alteredForDirectionCardId = -Number(card.id);
            card.id = alteredForDirectionCardId;
            break;
    }
    card.id = alteredForDirectionCardId;
    console.log('buttonNewCardAction - intervalDirection : ' + intervalDirection);

    let answerIsRight  = undefined;
    // on stocke (on historise), sans remplacer
    historize({previousNote, currentNote, replacedEnharmonism, octaveTransposition, card, intervalDirection, givenAnswer, answerIsRight}, false);
    console.log("%c   Picked bottomNote :", "color: darkBlue", previousNote.fullName);
    console.log("%c   Picked topNote :", "color: blue", currentNote.fullName);

    // answerIsRight = (givenAnswer == correctAnswer);

    //On reset les boutons de réponse // avec un petit délai
    if (counter > 0) {
        // let delayR = 250;
        // if (answerIsRight) {delayR = delayForResetAnswersMs};
        // setTimeout(() => applyToAllAnswerButtons(b => {b.className = "answerButton activated"}), delayR);
        // answerButtonsActivationStatus = answerButtonsActivationStatus.map((el) => {return 1}); // On réactive toutes les réponses
        applyToAllAnswerButtons(b => {b.className = "answerButton activated"});
        answerButtonsActivationStatus = answerButtonsActivationStatus.map((el) => {return 1}); // On réactive toutes les réponses
    } 

    // On joue les deux notes
    play2Notes(previousNote, currentNote, usedNoteLagInMs);

    // ______________

    function autoPlayIfChecked() { 
    // console.log('autoPlayIfChecked - autoPlayChk.checked = ' + autoPlayChk.checked + ' isAutoPlaying = ' + isAutoPlaying);
        if (isAutoPlaying) {
            // console.log('autoPlayIfChecked - AUTOPLAY ACTIVE');
            autoplayTimout = setTimeout(() => {
                console.log ('FIN timeOut Autoplay');
                updateUI();
                buttonNewCardAction('program');
            }, (1000 * 60/tempoAutoplay));
        } else {
            // console.log('autoPlayIfChecked - AUTOPLAY DESACTIVE');     
        }
    }
    autoPlayIfChecked() // On lance la suite si autoPlay;
    console.log('buttonNewCardAction2 - intervalDirection : ' + intervalDirection);
    updateUI();
    // Fin buttonNewCardAction
}



function updateAnswerButtonsAndScore(givenAnswer, calledForHistoryNavigation) {
    applyToAllAnswerButtons(button => {
        //console.log ('applyToAllAnswerButtons - answerInHalfSteps --> ' + givenAnswer)
        //console.log ('givenAnswer' + givenAnswer);
        // On détermine la valeur associée au bouton à partir de son id
        let butId = Math.floor(button.id.substring(9));// de la forme 'buttonInt10'
        // console.log('butId = ' + butId);
        // console.log('givenAnswer = ' + givenAnswer);
        // console.log('calledForHistoryNavigation = ' + calledForHistoryNavigation);
       
        if (seqHistory[counter-1] == undefined) {
            // On est au tout début
            // console.log ("cas0");    
            button.className = "answerButton deactivated greyedOut";
        } else if (givenAnswer > 0) {
            switch (true) {
                // Il y a eu une réponse
                case (butId == card.halfSteps && butId == givenAnswer): 
                    // console.log ("cas1");
                    // On est sur le bouton de la réponse exact // Et c'est le bouton cliqué (il y a eu une réponse)
                    button.className = "answerButton correct solution deactivated";
                    if (!calledForHistoryNavigation) {correctAnswersCount ++}
                    break;
                case (butId == card.halfSteps && butId !== givenAnswer): 
                    // console.log ("cas2");
                    // On est sur le bouton de la réponse exact mais c'est pas le bouton cliqué (il y a eu une réponse)
                    button.className = "answerButton solution deactivated";
                    break;
                case (butId !== card.halfSteps && butId !== givenAnswer):
                    // console.log ("cas3");
                    // On est sur le bouton d'une réponse incorrecte mais c'est pas le bouton cliqué (il y a eu une réponse)
                    button.className = "answerButton deactivated greyedOut";
                    break;
                case (butId !== card.halfSteps && butId == givenAnswer): 
                    // console.log ("cas4");
                    // On est sur le bouton d'une réponse incorrecte mais c'est pas le bouton cliqué (il y a eu une réponse)
                    button.className = "answerButton incorrect deactivated";
                    break;
            }
        } else {
            // Il n'y a pas encore eu de réponse
            // console.log ("cas pas de réponse");
            button.className = "answerButton activated";
        }
    })
}

function play2Notes(note1, note2, timeBetween = 0) {
    //console.log('CALL play2Notes - timeBetween = ' + timeBetween);
    //console.log('play2Notes : note 1 = ' + note1.fullName + ' / note2 = ' + note2.fullName);
    
    const [firstNote, secondNote] = (card.id > 0)? [note1, note2] : [note2, note1];
    if (!isNotePlayable(firstNote)) {
        console.error('Bottom note is out of sound bank');
        return false;
    }
    if (!isNotePlayable(secondNote)) {
        console.error('Top note is out of sound bank');
        return false;
    }
    playNotes(firstNote)
    setTimeout(() => {playNotes(secondNote)}, timeBetween);
    return true;
}


// Navigation
function navigateToHistoricalRank() {
    //console.log('navigateToHistoricalRank - currentHistoryIndex : ' + currentHistoryIndex);
    let seqHistoryItem = seqHistory[currentHistoryIndex];
    //console.log('navigateToHistoricalRank - current seqHistoryItem : ');
    console.log(seqHistoryItem);
    // destructuration :
    ({previousNote, currentNote, replacedEnharmonism, octaveTransposition, card, intervalDirection, givenAnswer} = seqHistoryItem); 
    play2Notes(previousNote, currentNote, usedNoteLagInMs);
    // maj de l'état du bouton pickCard
    if (currentHistoryIndex === seqHistory.length-1) {
        buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
    }
    updateAnswerButtonsAndScore(givenAnswer, true);
    updateUI();
}

function intDictAllCheckOnChangeAction() {
    // console.log('intDictAllCheckOnChangeAction - allChk.checked = ' + allChk.checked)
    if (allChk.checked) {
        secondsChk.checked = true; localStorage.setItem('intDictConfigSecondsChk', secondsChk.checked);
        thirdsChk.checked = true; localStorage.setItem('intDictConfigThirdsChk', thirdsChk.checked);
        fourthsChk.checked = true; localStorage.setItem('intDictConfigFourthsChk', fourthsChk.checked);
        tritonesChk.checked = true; localStorage.setItem('intDictConfigTritonesChk', tritonesChk.checked);
        fifthsChk.checked = true; localStorage.setItem('intDictConfigFifthsChk', fifthsChk.checked);
        sixthsChk.checked = true; localStorage.setItem('intDictConfigSixthsChk', sixthsChk.checked);
        seventhsChk.checked = true; localStorage.setItem('intDictConfigSeventhsChk', seventhsChk.checked);
        ninthsChk.checked = true; localStorage.setItem('intDictConfigNinthsChk', ninthsChk.checked);
        tenthsChk.checked = true; localStorage.setItem('intDictConfigTenthsChk', tenthsChk.checked);
        ascendingChk.checked = true; localStorage.setItem('intDictConfigAscendingChk', ascendingChk.checked);
        descendingChk.checked = true; localStorage.setItem('intDictConfigDescendingChk', descendingChk.checked);
    }
    calculateIntervalProbabilities(buildFocusChkConfig())
}

function updateModeSpecificLocalyStoredTempoValue(){
    console.log('updateModeSpecificLocalyStoredTempoValue - tempoAutoplay = ' + tempoAutoplay);
    localStorage.setItem('intDictTempo', tempoAutoplay)
}


