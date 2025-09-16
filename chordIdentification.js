function init(){
    // console.log('CALL INIT (chordIdentification)');
    notesAndCardsInit();
    chordIdAllCheckOnChangeAction();
    initButtons();
    if (!storedChordIdTempo) setAutoplayTempo();
    // updateUI(); //  on veut exécuter l'update dès le départ

    commonInit();
}

// Variables globales pour 'scaleId' :

let answerCount = 0;
let givenAnswer = -1;
let correctAnswer;
let isAutoPlaying = false
let timeoutBetweenScaleNotesMs = 300;
let seqHistory = [];
let currentHistoryIndex = -1;
let chordSpeed = 5; let speedMini = 1; let speedMaxi = 50;
let currentChord; 

const answerButtonsActivationStatusMap = new Map(chords.map(c => [c.nature, false])); // Créé un map (tableau avec clé) avec la nature de l'accord (voir l'objet) et false pour l'init du status de chaque accord

const startAndTargetNotesD = document.getElementById('startAndTargetNotesDiv');
const buttonHearAgainD = document.getElementById('buttonHearAgainDiv');
const buttonHearAgain = document.getElementById('buttonHearAgain');
const buttonPlayStart = document.getElementById('buttonPlayStartNote');
const scoreTxtDiv = document.getElementById(id = "scoreTxtDiv");
const timeTxtDiv = document.getElementById(id = "timeTxtDiv");

// Chks
const arpeggioChk = document.getElementById("arpeggioChk");
const triadsChk = document.getElementById("triadsChk");
const fourNotesChordsChk = document.getElementById("fourNotesChordsChk");
const extChords1Chk = document.getElementById("extChords1Chk");
const modalChordsMajChk = document.getElementById("modalChordsMajChk");
const modalChordsAltChk = document.getElementById("modalChordsAltChk");
const includeInversionsAndNonCloseChk = document.getElementById("includeInversionsAndNonCloseChk");

// Answers
const answerButtonsD = document.getElementById(id = "answerButtonsDiv");
const buttonMaj_0 = document.getElementById(id = "answerButtonDiv_0");
const buttonMin_1 = document.getElementById(id = "answerButtonDiv_1");
const buttonDim_2 = document.getElementById(id = "answerButtonDiv_2");
const buttonAug_3 = document.getElementById(id = "answerButtonDiv_3");
const buttonSus4_4 = document.getElementById(id = "answerButtonDiv_4");
const buttonSus2_5 = document.getElementById(id = "answerButtonDiv_5");

const buttonMaj7_10 = document.getElementById(id = "answerButtonDiv_10");
const button7_11 = document.getElementById(id = "answerButtonDiv_11");
const buttonMin7_12 = document.getElementById(id = "answerButtonDiv_12");
const buttonMin7b5_13 = document.getElementById(id = "answerButtonDiv_13");
const button7sus4_14 = document.getElementById(id = "answerButtonDiv_14");
const button6_15 = document.getElementById(id = "answerButtonDiv_15");
const buttonAugMaj7_16 = document.getElementById(id = "answerButtonDiv_16");
const buttonAug7_17 = document.getElementById(id = "answerButtonDiv_17");
const buttonMinMaj7_18 = document.getElementById(id = "answerButtonDiv_18");
const buttonDim7_19 = document.getElementById(id = "answerButtonDiv_19");
const buttonDimMaj7_20 = document.getElementById(id = "answerButtonDiv_20");
const buttonMin6_21 = document.getElementById(id = "answerButtonDiv_21");

const buttonAugMaj9_50 = document.getElementById(id = "answerButtonDiv_50");
const buttonMaj9_51 = document.getElementById(id = "answerButtonDiv_51");
const button79_52 = document.getElementById(id = "answerButtonDiv_52");
const button7b9_53 = document.getElementById(id = "answerButtonDiv_53");
const button7Aug9_54 = document.getElementById(id = "answerButtonDiv_54");
const buttonAug7_9_55 = document.getElementById(id = "answerButtonDiv_55");
const buttonMin9_56 = document.getElementById(id = "answerButtonDiv_56");
const button69_57 = document.getElementById(id = "answerButtonDiv_57");
const buttonMin69_58 = document.getElementById(id = "answerButtonDiv_58");
const button7sus49_59 = document.getElementById(id = "answerButtonDiv_59");
const buttonMin7b59_60 = document.getElementById(id = "answerButtonDiv_60");

const buttonLydian_100 = document.getElementById(id = "answerButtonDiv_100");
const buttonIonian_101 = document.getElementById(id = "answerButtonDiv_101");
const buttonMixo_102 = document.getElementById(id = "answerButtonDiv_102");
const buttonDorian_103 = document.getElementById(id = "answerButtonDiv_103");
const buttonEolian_104 = document.getElementById(id = "answerButtonDiv_104");
const buttonPhrygian_105 = document.getElementById(id = "answerButtonDiv_105");
const buttonLocrian_106 = document.getElementById(id = "answerButtonDiv_106");

// const buttonLydianAug_25 = document.getElementById(id = "answerButtonDiv_25");
// const buttonLydianDom_26 = document.getElementById(id = "answerButtonDiv_26");
// const buttonMixob6_27 = document.getElementById(id = "answerButtonDiv_27");
// const buttonMinMel_28 = document.getElementById(id = "answerButtonDiv_28");
// const buttonPhrygianN6_29 = document.getElementById(id = "answerButtonDiv_29");
// const buttonLocrianN2_30 = document.getElementById(id = "answerButtonDiv_30");
// const buttonAltered_31 = document.getElementById(id = "answerButtonDiv_31");

// Gestion des données localStorage 
const storedConfigTriadsChk = localStorage.getItem('chordsIdConfigTriadsChk');
const storedConfigFourNotesChordsChk = localStorage.getItem('chordsIdConfigFourNotesChordsChk');
const storedConfigExtChords1Chk = localStorage.getItem('chordsIdConfigExtChords1Chk');
const storedConfigModalChordsMajChk = localStorage.getItem('chordsIdConfigModalChordsMajChk');
const storedConfigModalChordsAltChk = localStorage.getItem('chordsIdConfigModalChordsAltChk');
const storedConfigAllChk = localStorage.getItem('chordsIdConfigAllChk');
const storedConfigIncludeInvAndNonCloseChk = localStorage.getItem('chordsIdConfigIncludeInvAndNonCloseChk');
// console.log('storedConfigIncludeInvAndNonCloseChk = ' + storedConfigIncludeInvAndNonCloseChk);
const storedArpeggioChk = localStorage.getItem('arpeggioChk');
const storedChordSpeed = localStorage.getItem('chordSpeed');
const storedChordIdTempo = Number(localStorage.getItem('chordIdTempo'));

// Astuce pour faire de la storedVariable (chaine 'true' ou 'false') un booléen
if (storedConfigTriadsChk) triadsChk.checked = (storedConfigTriadsChk === 'true'); 
if (storedConfigFourNotesChordsChk) fourNotesChordsChk.checked = (storedConfigFourNotesChordsChk === 'true'); 
if (storedConfigExtChords1Chk) extChords1Chk.checked = (storedConfigExtChords1Chk === 'true'); 
if (storedConfigModalChordsMajChk) modalChordsMajChk.checked = (storedConfigModalChordsMajChk === 'true'); 
if (storedConfigModalChordsAltChk) modalChordsAltChk.checked = (storedConfigModalChordsAltChk === 'true'); 
if (storedConfigAllChk) allChk.checked = (storedConfigAllChk === 'true'); 
if (storedConfigIncludeInvAndNonCloseChk) includeInversionsAndNonCloseChk.checked = (storedConfigIncludeInvAndNonCloseChk === 'true');

// const allButtonsButAll = [triadsChk, fourNotesChordsChk, extChords1Chk, storedConfigIncludeInvAndNonCloseChk]; // , includeInversionsAndNonCloseChk];
const allButtonsButAll = [triadsChk, fourNotesChordsChk, extChords1Chk, modalChordsMajChk, modalChordsAltChk]; // , includeInversionsAndNonCloseChk];

if (storedArpeggioChk) arpeggioChk.checked = (storedArpeggioChk === 'true');
if (storedChordSpeed) chordSpeed = Number(storedChordSpeed);
if (storedChordIdTempo) tempoAutoplay = storedChordIdTempo; // 1 tempo différent par mode

// chordIdAllCheckOnChangeAction();

// let triadsChkPreviousState;
let includeInversionsAndNonCloseChkPreviousState;

// Gestion d'interaction utilisateur

// ________________________________________________________ 
// ________________________________________________________ 


// initButtons();
// if (!storedChordIdTempo) setAutoplayTempo();
// updateUI(); //  on veut exécuter l'update dès le départ

showCardChk.addEventListener('click',() => updateUI());

// ________________________________________________________ 
// ________________________________________________________ 


// FUNCTIONS :

function adaptStylingsToMode() {
    // On met ici tout ce qui n'est pas 'par défaut' dans le CSS (ce qui est propre au mode)
    document.documentElement.style.setProperty('--displayHeight', 'auto');
    document.documentElement.style.setProperty('--displayWidth', '600px');
    // document.documentElement.style.setProperty('--labelWidth', '60px');
    
    // prevNoteDiv.style.justifyContent = 'start';
    cardNameD.style.color = 'black';
    cardNameD.style.padding = '4px 0px 0px 0px';
    cardDiv.style.alignItems = 'center';

    counterNumberDiv.style.padding = '4px';

    prevNoteTxtD.style.color = 'darkBlue';
}

function updateUI() {
    // console.warn("updateUI()")

    // Mise à jour de la config en fonction de l'état des checkboxes ________
    function dealWithConfigButtons() {
        // console.log('CALL dealWithConfigButtons');
        
        function triadsChkChecking() {
            // console.log('CALL triadsChecking');
            if (triadsChk.checked) {
                // console.log('dealWithConfigButtons - includeInversionsAndNonCloseChkPreviousState = ' + includeInversionsAndNonCloseChkPreviousState);
                // console.log('dealWithConfigButtons - triadsChkPreviousState = ' + triadsChkPreviousState);
                if (includeInversionsAndNonCloseChkPreviousState) includeInversionsAndNonCloseChk.checked = true;
                includeInversionsAndNonCloseChk.disabled = false;
                includeInversionsAndNonCloseChk.classList.remove('disabled');
            } else {
                // console.log('On grise includeInversionsAndNonCloseChk');
                includeInversionsAndNonCloseChk.checked = false;
                includeInversionsAndNonCloseChk.disabled = true;
                includeInversionsAndNonCloseChk.classList.add('disabled');
            }
        }
        triadsChkChecking(); // check au départ

        triadsChk.onchange = function() {
            console.log('--dealWithConfigButtons - onchange triadsChk.checked = ' + triadsChk.checked);
            checkCheckAndAction(triadsChk)
            triadsChkChecking(); // check au départ sur change
        }
        fourNotesChordsChk.onchange = function() {
            checkCheckAndAction(fourNotesChordsChk)
            modalChordsMajChk.checked = false; localStorage.setItem('chordsIdConfigModalChordsMajChk', modalChordsMajChk.checked);
            modalChordsAltChk.checked = false; localStorage.setItem('chordsIdConfigModalChordsAltChk', modalChordsAltChk.checked);
        }
        extChords1Chk.onchange = function() {
            checkCheckAndAction(extChords1Chk)
            modalChordsMajChk.checked = false; localStorage.setItem('chordsIdConfigModalChordsMajChk', modalChordsMajChk.checked);
            modalChordsAltChk.checked = false; localStorage.setItem('chordsIdConfigModalChordsAltChk', modalChordsAltChk.checked);
        }
        modalChordsMajChk.onchange = function() {
            checkCheckAndAction(modalChordsMajChk);
            if (modalChordsMajChk.checked) {
                // console.log('dealWithConfigButtons - modalChordsMajChk.checked = ' + modalChordsMajChk.checked);
                fourNotesChordsChk.checked = false; localStorage.setItem('chordsIdConfigFourNotesChordsChk', fourNotesChordsChk.checked);
                // fourNotesChordsChk.disabled = true;
                // fourNotesChordsChk.classList.add('disabled');
                extChords1Chk.checked = false; localStorage.setItem('chordsIdConfigExtChords1Chk', extChords1Chk.checked);
                // extChords1Chk.disabled = true;
                // extChords1Chk.classList.add('disabled');
                allChk.checked = false;

            } else {
                // fourNotesChordsChk.disabled = false; 
                // fourNotesChordsChk.classList.remove('disabled'); 
                // extChords1Chk.disabled = false; 
                // extChords1Chk.classList.remove('disabled');  
            }
        }
        modalChordsAltChk.onchange = function() {
            checkCheckAndAction(modalChordsAltChk)
        }
        includeInversionsAndNonCloseChk.onchange = function() {
            includeInversionsAndNonCloseChkPreviousState = includeInversionsAndNonCloseChk.checked;
            checkCheckAndAction(includeInversionsAndNonCloseChk)
        }
        allChk.onchange = function () {chordIdAllCheckOnChangeAction()}
    }

    // Updates _____________________________________________________________

    function updateButtonsConfigAndProb() {
        //console.log('updateButtons - counter : ' + counter);

        // Mises à jour 
        // - des boutons de navigation et du bouton principal 'buttonPick'
        updateNavButtonsAndPickButton();
        // - des probas
        calculateChordProbabilities(buildFocusChkConfig());
        // - du bouton pickButton en fonction de l'état autoplay
        updatePickButtonWithAutoplayState(givenAnswer, answerRequiredChk.checked);
        // - de la config
        dealWithConfigButtons();
    }

    function updatePrevNameAndTargetNameDivs() {
        // console.log('updatePrevNameAndTargetNameDivs - counter = ' + counter);
        if (counter > 0) {
            prevNoteD.style.display = 'flex';
            prevNoteTxtD.innerText = chordBottomTonicNote.fullName;
        } else {
            prevNoteD.style.display = 'none';
        }   
    }

    // On réagit dans le cas d'une absence d'historique (c'est le tout-début)
    if (seqHistory[counter-1] == undefined) {
            // console.log ('updateUI - (seqHistory[counter-1] = 0)');
            // console.log ('Appel updateAnswerButtonsAndScore(-1, false) ligne 238')
            updateAnswerButtonsAndScore(-1, false);
    }

      // Show DisplayQ (ou pas)
      //console.log('showCardChk : ' + showCardChk.checked);
    if (showCardChk.checked && counter > 0) {
        displayQuestion.style.display = 'flex';
        updateCardDiv();
    } else {
        displayQuestion.style.display = 'none';
        updateCardDiv();
    }

    // Réaction à la modification de la vitesse de l'accord  _______________
    function updateSpeedDisplay() {
        // console.log('decreaseSpeedAction - chordSpeed -> ' + chordSpeed);
        speedTxtDiv.innerText = 'L' + chordSpeed;
    }

    function updateConfigChksLocalStorage() {
        // Mise à jour des valeurs localyStored des checkboxes de la config
        triadsChk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigTriadsChk', triadsChk.checked); localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
        fourNotesChordsChk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigFourNotesChordsChk', fourNotesChordsChk.checked); localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
        extChords1Chk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigExtChords1Chk', extChords1Chk.checked); localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
        modalChordsMajChk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigModalChordsMajChk', modalChordsMajChk.checked); localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
        modalChordsAltChk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigModalChordsAltChk', modalChordsAltChk.checked); localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
        allChk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
        includeInversionsAndNonCloseChk.addEventListener('change', () => {localStorage.setItem('chordsIdConfigIncludeInvAndNonCloseChk', includeInversionsAndNonCloseChk.checked); localStorage.setItem('chordsIdConfigAllChk', allChk.checked)});
    }

    updateButtonsConfigAndProb();
    updateCardDiv();
    updatePrevNameAndTargetNameDivs();
    updateCounterAndScoreDiv();
    updateRegister();
    adaptStylingsToMode();
    updateTempoDisplay();
    updateSpeedDisplay();
    updateSustainDisplay();
    updateSettingsShows();
    showAnswerbuttons();
    updateConfigChksLocalStorage();

    // fin UpdateUI
}


// ------------------------------------------------------------------------------------------


function initButtons() {

    //let buttonNewCard = document.getElementById('pickCardButton');
    buttonPick.addEventListener('click', buttonNewCardAction);

    // bouton 'Counter' et 'Hear Again' (Play the two notes)
    let buttonHearAgainAction = function () {
        console.log('buttonHearAgainAction');
        playChord(playedChord);
    }

    counterD.addEventListener('click', buttonHearAgainAction);
    cardD.addEventListener('click', buttonHearAgainAction);
    buttonHearAgain.addEventListener('click', buttonHearAgainAction);

    // bouton 'PlaystartNote' 
    function buttonPlayStartNoteAction() {
        //console.log('buttonPreviousAction');
        playNotes(chordBottomTonicNote);
    }
    prevNoteD.addEventListener('click', buttonPlayStartNoteAction);

    // decrease Speed
    function decreaseSpeedAction() {
        // console.log('decreaseSpeedAction');
        if (chordSpeed > speedMini) {
            chordSpeed -= 1;
            localStorage.setItem('chordSpeed', chordSpeed)
            updateUI();
        }
    }
    let decSpeedD = document.getElementById('decSpeedDiv');
    decSpeedD.addEventListener('click', () => {decreaseSpeedAction()});


    // increase Speed
    function increaseSpeedAction() {
        // console.log('increaseSpeedAction');
        if (chordSpeed < speedMaxi) {
            chordSpeed += 1;
            localStorage.setItem('chordSpeed', chordSpeed)
            updateUI();
        }
    }
    let incSpeedD = document.getElementById('incSpeedDiv');
    incSpeedD.addEventListener('click', () => {increaseSpeedAction()});


    // Maj des answerButtons qd changement de focus

    // Inutile : ?
    // triadsChk.addEventListener('input', updateUI);
    // fourNotesChordsChk.addEventListener('input', updateUI);

    reactToAnswerAction = function(chordNatureId) { // déclenché par un des bouton de réponse
        // console.log ('reactToAnswerAction currentChord name -> ' + currentChord.enName??);
        console.log(`CALL reactToAnswerAction currentChord name -> ${currentChord?.enName ?? "pas d'accord"}`);

        //console.log('reactToAnswerAction');
        // console.log('chordNatureId = ' + chordNatureId);
        //console.log(Ansbutton); 
        if (typeof currentChord === "undefined") {console.log('currentChord undefined, réaction annulée'); return;};
        correctAnswer = currentChord.nature;
        let answerIsRight = false

        const buttActivationStatus = answerButtonsActivationStatusMap.get(chordNatureId);
        // console.log('reactToAnswerAction - buttActivationStatus : ' + buttActivationStatus);
        if (!buttActivationStatus) { console.log('reactToAnswerAction - BUTTON DEACTIVATED'); return };
        
        answerCount++;
        // console.log ('reactToAnswerAction currentChord name -> ' + currentChord.enName);
        givenAnswer = chordNatureId;
        updateAnswerButtonsAndScore(givenAnswer, false);
        
        answerIsRight = (givenAnswer == correctAnswer);

        cardTimeElapsed = (Date.now()- newCardStartTime) / 1000;
        console.log('(reactToAnswerAction) - cardTimeElapsed : ' + cardTimeElapsed);

        historize({currentChord, playedChord, givenAnswer, answerIsRight, cardTimeElapsed}, true);
        for (const k of answerButtonsActivationStatusMap.keys()) answerButtonsActivationStatusMap.set(k, false); // On désactive toutes les réponses 
        
        if (answerIsRight) {
            console.log("%c right answer", 'color: orange;');
            playFeedbackSound(true);
            if (rightAnswerTrigChk.checked) {
                setTimeout(() => {
                buttonNewCardAction('goodAnswer');
                }, rightAnswerTrigTimout);
                
            } else {
                updateUI();
            }
        } else {
            console.log("%c wrong answer", 'color:magenta')
            playFeedbackSound(false);
            updateUI();
        }
    }
    
    // Triads
    buttonMaj_0.addEventListener('click', function () { reactToAnswerAction(0) }, false);
    buttonMin_1.addEventListener('click', function () { reactToAnswerAction(1) }, false);
    buttonDim_2.addEventListener('click', function () { reactToAnswerAction(2) }, false);
    buttonAug_3.addEventListener('click', function () { reactToAnswerAction(3) }, false);
    buttonSus4_4.addEventListener('click', function () { reactToAnswerAction(4) }, false);
    buttonSus2_5.addEventListener('click', function () { reactToAnswerAction(5) }, false);

    // Basic 4 notes chords
    buttonMaj7_10.addEventListener('click', function () { reactToAnswerAction(10) }, false);
    button7_11.addEventListener('click', function () { reactToAnswerAction(11) }, false);
    buttonMin7_12.addEventListener('click', function () { reactToAnswerAction(12) }, false);
    buttonMin7b5_13.addEventListener('click', function () { reactToAnswerAction(13) }, false);
    button7sus4_14.addEventListener('click', function () { reactToAnswerAction(14) }, false);
    button6_15.addEventListener('click', function () { reactToAnswerAction(15) }, false);
    buttonAugMaj7_16.addEventListener('click', function () { reactToAnswerAction(16) }, false);
    buttonAug7_17.addEventListener('click', function () { reactToAnswerAction(17) }, false);
    buttonMinMaj7_18.addEventListener('click', function () { reactToAnswerAction(18) }, false);
    buttonDim7_19.addEventListener('click', function () { reactToAnswerAction(19) }, false);
    buttonDimMaj7_20.addEventListener('click', function () { reactToAnswerAction(20) }, false);
    buttonMin6_21.addEventListener('click', function () { reactToAnswerAction(21) }, false);

    // ExtChords 1
    buttonAugMaj9_50.addEventListener('click', function () { reactToAnswerAction(50) }, false);
    buttonMaj9_51.addEventListener('click', function () { reactToAnswerAction(51) }, false);
    button79_52.addEventListener('click', function () { reactToAnswerAction(52) }, false);
    button7b9_53.addEventListener('click', function () { reactToAnswerAction(53) }, false);
    button7Aug9_54.addEventListener('click', function () { reactToAnswerAction(54) }, false);
    buttonAug7_9_55.addEventListener('click', function () { reactToAnswerAction(55) }, false);
    buttonMin9_56.addEventListener('click', function () { reactToAnswerAction(56) }, false);
    button69_57.addEventListener('click', function () { reactToAnswerAction(57) }, false);
    buttonMin69_58.addEventListener('click', function () { reactToAnswerAction(58) }, false);
    button7sus49_59.addEventListener('click', function () { reactToAnswerAction(59) }, false);
    buttonMin7b59_60.addEventListener('click', function () { reactToAnswerAction(60) }, false);

    // Modal chords (Maj)
    buttonLydian_100.addEventListener('click', function () { reactToAnswerAction(100) }, false);
    buttonIonian_101.addEventListener('click', function () { reactToAnswerAction(101) }, false);
    buttonMixo_102.addEventListener('click', function () { reactToAnswerAction(102) }, false);
    buttonDorian_103.addEventListener('click', function () { reactToAnswerAction(103) }, false);
    buttonEolian_104.addEventListener('click', function () { reactToAnswerAction(104) }, false);
    buttonPhrygian_105.addEventListener('click', function () { reactToAnswerAction(105) }, false);
    buttonLocrian_106.addEventListener('click', function () { reactToAnswerAction(106) }, false);

    // Mise à jour du locallystored arpeggioChk
    arpeggioChk.addEventListener('change', () => {localStorage.setItem('arpeggioChk', arpeggioChk.checked)});

    // Etat triadsChk précédent le clic sur triadsChk --> utile pour gérer le includeInv...
    // triadsChk.addEventListener('mousedown', () => {triadsChkPreviousState = triadsChk.checked; console.log('initButtons - triadsChkPreviousState = ' + triadsChkPreviousState)});
    includeInversionsAndNonCloseChk.addEventListener('change', () => {triadsChkPreviousState = triadsChk.checked; console.log('initButtons - triadsChkPreviousState = ' + triadsChkPreviousState)});
    
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
}


// showAnswerbuttons = function() {
function showAnswerbuttons() {
    function updateAnswerButtonShow(focusButt, answerButt) {
        // console.log('updateAnswerButtonShow - focusButt = ' + focusButt + ' | answerButt = ' + answerButt);
        if (focusButt.checked) {
            answerButt.style.display = 'flex';
        } else {
            answerButt.style.display = 'none';
        }
    }
    updateAnswerButtonShow(triadsChk, buttonMaj_0);
    updateAnswerButtonShow(triadsChk, buttonMin_1);
    updateAnswerButtonShow(triadsChk, buttonDim_2);
    updateAnswerButtonShow(triadsChk, buttonAug_3);
    updateAnswerButtonShow(triadsChk, buttonSus4_4);
    updateAnswerButtonShow(triadsChk, buttonSus2_5);

    updateAnswerButtonShow(fourNotesChordsChk, buttonMaj7_10);
    updateAnswerButtonShow(fourNotesChordsChk, button7_11);
    updateAnswerButtonShow(fourNotesChordsChk, buttonMin7_12);
    updateAnswerButtonShow(fourNotesChordsChk, buttonMin7b5_13);
    updateAnswerButtonShow(fourNotesChordsChk, button7sus4_14);
    updateAnswerButtonShow(fourNotesChordsChk, button6_15);
    updateAnswerButtonShow(fourNotesChordsChk, buttonAugMaj7_16);
    updateAnswerButtonShow(fourNotesChordsChk, buttonAug7_17);
    updateAnswerButtonShow(fourNotesChordsChk, buttonMinMaj7_18);
    updateAnswerButtonShow(fourNotesChordsChk, buttonDim7_19);
    updateAnswerButtonShow(fourNotesChordsChk, buttonDimMaj7_20);
    updateAnswerButtonShow(fourNotesChordsChk, buttonMin6_21);

    updateAnswerButtonShow(extChords1Chk, buttonAugMaj9_50);
    updateAnswerButtonShow(extChords1Chk, buttonMaj9_51);
    updateAnswerButtonShow(extChords1Chk, button79_52);
    updateAnswerButtonShow(extChords1Chk, button7b9_53);
    updateAnswerButtonShow(extChords1Chk, button7Aug9_54);
    updateAnswerButtonShow(extChords1Chk, buttonAug7_9_55);
    updateAnswerButtonShow(extChords1Chk, buttonMin9_56);
    updateAnswerButtonShow(extChords1Chk, button69_57);
    updateAnswerButtonShow(extChords1Chk, buttonMin69_58);
    updateAnswerButtonShow(extChords1Chk, button7sus49_59);
    updateAnswerButtonShow(extChords1Chk, buttonMin7b59_60);

    updateAnswerButtonShow(modalChordsMajChk, buttonLydian_100);
    updateAnswerButtonShow(modalChordsMajChk, buttonIonian_101);
    updateAnswerButtonShow(modalChordsMajChk, buttonMixo_102);
    updateAnswerButtonShow(modalChordsMajChk, buttonDorian_103);
    updateAnswerButtonShow(modalChordsMajChk, buttonEolian_104);
    updateAnswerButtonShow(modalChordsMajChk, buttonPhrygian_105);
    updateAnswerButtonShow(modalChordsMajChk, buttonLocrian_106);
    
    // updateAnswerButtonShow(modalChordsAltChk, buttonLydianAug_25);
    // updateAnswerButtonShow(modalChordsAltChk, buttonLydianDom_26);
    // updateAnswerButtonShow(modalChordsAltChk, buttonMixob6_27);
    // updateAnswerButtonShow(modalChordsAltChk, buttonMinMel_28);
    // updateAnswerButtonShow(modalChordsAltChk, buttonPhrygianN6_29);
    // updateAnswerButtonShow(modalChordsAltChk, buttonLocrianN2_30);
    // updateAnswerButtonShow(modalChordsAltChk, buttonAltered_31);
}


// bouton 'Pick a scale (and direction)'
function buttonNewCardAction(whoCalledMe) {
    // console.log('CALL buttonNewCardAction - whoCalledMe : ' + whoCalledMe);
    // givenAnswer = -1; // on réinit la réponse

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

    // --------------
    // Actions du bouton PickCard
    // On incrémente le compteur
    incrementCounter();
    if (counter == 1) startTime = Date.now();
    if (givenAnswer < 0 && counter > 1){
        cardTimeElapsed = (Date.now()- newCardStartTime) / 1000; // On démarre le chrono de la carte
        // console.log('buttonNewCardAction - cardTimeElapsed (NO REPLY): ' +cardTimeElapsed);
        seqHistory[seqHistory.length-1].cardTimeElapsed = cardTimeElapsed; // On historise le chrono de la carte (cas de non-réponse)
    }
    // console.log('buttonNewCardAction - seqHistory : ', seqHistory);

    givenAnswer = -1; // on réinit la réponse

    newCardStartTime = Date.now();

    // On calcul les proba de chaque carte possible
    calculateChordProbabilities(config);

    // Dans 'chordId', on a besoin de choisir l'accord avant la bottomNote, de façon à pourvoir appliquer les règles de limite d'intervalle grave.
    // On tire une carte
    currentChord = getRandomChord();
    // console.log('buttonNewCardAction - currentChord : ' + currentChord.enName);

    // On sélectionne une première note (la fondamentale, en bas de l'accord, même pour un renversement)
    chordBottomTonicNote = pickChordBottomTonicNote(currentChord);
    previouslyPlayedNote = chordBottomTonicNote;
    // console.log('buttonNewCardAction - chordBottomTonicNote : ' + chordBottomTonicNote.fullName);
    // console.log('%c   previouslyPlayedNote : ' + previouslyPlayedNote.fullName, "color: darkBlue");
    playedChord = buildPlayedChord(currentChord, chordBottomTonicNote);
    
    // on stocke (on historise), sans remplacer
    let answerIsRight  = undefined;
    historize({currentChord, playedChord, givenAnswer, answerIsRight}, false);
    // console.log('Après historize, seqHistory:', seqHistory);

    // answerIsRight = (givenAnswer == correctAnswer);

    //On reset les boutons de réponse // avec un peit delay
    if (counter > 0) {
        // let delayR = 0
        // if (answerIsRight) { delayR = delayForResetAnswersMs }
        // setTimeout(() => applyToAllAnswerButtons(b => { b.className = "answerButton activated" }), delayR);
        applyToAllAnswerButtons(b => { b.className = "answerButton activated" });
        for (const k of answerButtonsActivationStatusMap.keys()) answerButtonsActivationStatusMap.set(k, true);
    }

    // On joue la gamme
    playChord(playedChord)

    // ____________________


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

    // givenAnswer = -1; // on réinit la réponse
    updateUI();
    // FIN buttonNewCardAction
}
//________________________


function buildPlayedChord(chord, bottomNote) {
    // console.log('chordId : ' + chordId);
    // console.log('chordBottomTonicNote : ' + bottomNote.fullName);
    // console.log('buildPlayedChord : ' + chords[chordId].enName);
    const playedChord = [];
    //let followingScaleNote, previousScaleNote;
    // const firstStep = cards.find((card) => { return (card.enName === chords[chordId].steps[0])});
    const firstStep = cards.find((card) => { return (card.enName === chord.steps[0])});

    const { foundNote } = findNextNote(firstStep, bottomNote, register);
    playedChord[0] = foundNote;
    // console.log('playedChord[0] : ', playedChord[0])
    // for (let s = 1; s < chords[chordId].nbOfNotes; s++) {
    for (let s = 1; s < chord.nbOfNotes; s++) {

        // const stepCard = cards.find((card) => { return (card.enName === chords[chordId].steps[s])});
        const stepCard = cards.find((card) => { return (card.enName === chord.steps[s])});

        // console.log ('StepCard : ' + stepCard.enName);
        const { foundNote } = findNextNote(stepCard, bottomNote, register);
        if (foundNote.pianoKey > register.highLimitNote.pianoKey) {
            console.warn ("La note " + foundNote.fullName + " pour la construction de l'accord est au-dessus du registre");
        }
        playedChord[s] = foundNote;
        // console.log ('playedChord['+s+'] : ', playedChord[s]);
    }
    console.log ('playedChord : ', playedChord);
    return playedChord;
}

function pickChordBottomTonicNote(chord) {
    console.log('CALL pickChordBottomTonicNote - chord : ', chord);
    console.log('register : ', register);

    // Ici, on veut sélectionner une note du bas de l'accord en respectant les limites d'intervalle grave
    // Mais on ne va s'intéresser qu'au premier intervalle (du bas de l'accord)

    // On trouve une référence pour la note du bas (ce n'est pas forcément la tonique : 3ce, 5te.../ tonique)
    const fundamentalToBottomNoteInterval = cards.find((card) => { return (card.enName === chord.steps[0])});
    const fundamentalToSecondChordNoteInterval = cards.find((card) => { return (card.enName === chord.steps[1])});
    console.log('chord.steps[chord.steps.length-1] : ', chord.steps[chord.steps.length-1]);
    const fundamentalToChordTopNoteInterval = cards.find((card) => { return (card.enName === chord.steps[chord.steps.length-1])});
    console.log('fundamentalToBottomNoteInterval : ', fundamentalToBottomNoteInterval);
    console.log('fundamentalToSecondChordNoteInterval : ', fundamentalToSecondChordNoteInterval);
    console.log('fundamentalToChordTopNoteInterval : ', fundamentalToChordTopNoteInterval);

    // On calcule la taille du premier intervalle (bas de l'accord) en demi-tons
    const lowestIntervalHalfSteps = fundamentalToSecondChordNoteInterval.halfSteps - fundamentalToBottomNoteInterval.halfSteps;
    const halfStepsFromBottomToTopNote = fundamentalToChordTopNoteInterval.halfSteps - fundamentalToBottomNoteInterval.halfSteps;
    
    // console.log('lowestIntervalHalfSteps : ' + lowestIntervalHalfSteps);
    // console.log('halfStepsFromBottomToTopNote : ' + halfStepsFromBottomToTopNote);

    const chordWidthInHalfSteps = fundamentalToChordTopNoteInterval.halfSteps // on veut avoir le registre suffisant pour l'accord en entier

    const lowestPossibleBottomChordNote = findLowestPossibleBottomChordNote(chord);
    if (!lowestPossibleBottomChordNote) {console.warn('lowestPossibleBottomChordNote is undefined'); return;}
    const highestPossibleBottomChordNote = findHighestPossibleBottomChordNote(chord, chordWidthInHalfSteps);
    if (!highestPossibleBottomChordNote) {console.warn('highestPossibleBottomChordNote is undefined'); return;}

    // console.log('lowestPossibleBottomChordNote (before correction for register) = ' + lowestPossibleBottomChordNote.fullName);
    // console.log('highestPossibleBottomChordNote (before correction for register) = ' + highestPossibleBottomChordNote.fullName);

    // console.log('pickChordBottomTonicNote - lowestIntervalHalfSteps = ' + lowestIntervalHalfSteps);
    const lowestPossibleChordFundamental = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === (lowestPossibleBottomChordNote.pianoKey - fundamentalToBottomNoteInterval.halfSteps)) })
    // console.log('lowestPossibleChordFundamental = ' + lowestPossibleChordFundamental.fullName);

    // Si la limite trouvé est en dessous du registre, on prend la note la plus basse du registre
    if (lowestPossibleBottomChordNote.pianoKey < register.lowLimitNote.pianoKey) {lowestPossibleBottomChordNote = register.lowLimitNote};
    // console.log('lowestPossibleBottomChordNote (corrected for register) = ' + lowestPossibleBottomChordNote.fullName);

    // let upperlimitNoteForNoteChoice = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === (register.highLimitNote.pianoKey - chordWidthInHalfSteps)) });
    // On procède au tirage entre les deux limites trouvées
    const rand = Math.floor(Math.random() * (highestPossibleBottomChordNote.pianoKey - lowestPossibleChordFundamental.pianoKey) + lowestPossibleChordFundamental.pianoKey);
    // let rand = Math.floor(Math.random() * (upperlimitNoteForNoteChoice.pianoKey - lowestPossibleChordFundamental.pianoKey) + lowestPossibleChordFundamental.pianoKey);
    // console.log('rand ' + rand);

    // On renvoit
    const pickedNaturalAndFlatNote = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === rand) });
    const pickedNote = notes.find((note) => { return (note.fullName === pickedNaturalAndFlatNote.fullName) });
    console.log('%c   pickChordBottomTonicNote - found chordBottomTonicNote : ' + pickedNote.fullName, "color: darkBlue");
    return pickedNote;
}

// function getChordById(id) {return chords.find(c => c.id === id) || null};

function findLowestPossibleBottomChordNote(chord){
    // console.log('CALL findLowestPossibleBottomChordNote - chord = ', chord);

    // Il faut tester tous les intervalles de l'accord (entre la bottom note et chaque note) et retenir la limite la plus basse
    let lowestPossibleBottomChordNoteForTestedInterval;
    let foundLowestPossibleBottomChordNote = register.lowLimitNote;
    // for (let s = 0; s < chords[chord.id].nbOfNotes; s++) {
    for (let s = 0; s < chord.nbOfNotes; s++) {

        // null si introuvable
        // const stepName = getChordById(chord.id).steps(s);
        // console.log('findLowestPossibleBottomChordNote - stepName : ' + stepName)
        // const testedInterval = cards.find((card) => { return (card.enName === chords[chord.id].steps[s])});
        // console.log('chord.steps[' + s + '] = ' + chord.steps[s])
        const testedInterval = cards.find((card) => { return (card.enName === chord.steps[s])});

        // console.log ('testedInterval : ', testedInterval);
        // On détermine la limite inférieure de cet intervalle, selon sa taille
        switch (true) {
            case (testedInterval.halfSteps == 0):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 4) }) // C1 (pianoKey 4) pas de limite pour les unissons
            break;
            case (testedInterval.halfSteps == 1):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 32) }) // E3 (pianoKey 32) est la limite pour les secondes mineure
            break;
            case (testedInterval.halfSteps == 2):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 31) }) // Eb3 (pianoKey 31) est la limite pour les secondes majeures
            break;
            case (testedInterval.halfSteps == 3):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 28) }) // C3 (pianoKey 28) est la limite pour les tierces mineures
            break;
            case (testedInterval.halfSteps == 4 || testedInterval.halfSteps == 5 || testedInterval.halfSteps == 6):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 26) }) // Bb3 (pianoKey 26) est la limite pour les tierces majeures, les quartes et les tritons
            break;
            case (testedInterval.halfSteps == 7):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 14) }) // Bb1 (pianoKey 14) est la limite pour les quintes
            break;
            case (testedInterval.halfSteps == 8):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 23) }) // G2 (pianoKey 23) est la limite pour les sixtes mineures
            break;
            case (testedInterval.halfSteps == 9 || testedInterval.halfSteps == 10 || testedInterval.halfSteps == 11):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 21) }) // F2 (pianoKey 21) est la limite pour les sixtes majeures, les 7èmes mineures et les 7èmes majeures
            break;
            case (testedInterval.halfSteps == 12):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 4) }) // C1 (pianoKey 4) Pas de limite pour les octaves
            break;
            case (testedInterval.halfSteps == 13):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 20) }) // E2 (pianoKey 20) est la limite pour les neuvièmes mineures
            break;
            case (testedInterval.halfSteps == 14):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 19) }) // Eb2 (pianoKey 19) est la limite pour les neuvièmes majeures
            break;
            case (testedInterval.halfSteps == 15):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 16) }) // C2 (pianoKey 16) est la limite pour les dixièmes mineures
            break;
            case (testedInterval.halfSteps == 16 || testedInterval.halfSteps == 17 || testedInterval.halfSteps == 18):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 14) }) // Bb1 (pianoKey 14) est la limite pour les dixièmes mineures, les 11èmes juste et les 11ème# ou 12è bémol
            break;
            case (testedInterval.halfSteps == 19):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 4) }) // C1 (pianoKey 4) est la limite pour les 12è justes (5te + octave)
            break;
            case (testedInterval.halfSteps == 20):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 11) }) // G1 (pianoKey 11) est la limite pour les 13èmes mineures
            break;
            case (testedInterval.halfSteps == 21 || testedInterval.halfSteps == 22 || testedInterval.halfSteps == 23):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 9) }) // F1 (pianoKey 9) est la limite pour les 13èmes majeures, les 14èmes mineures et les 14èmes majeures
            break;
            case (testedInterval.halfSteps == 24):
                lowestPossibleBottomChordNoteForTestedInterval = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === 4) }) // C1 (pianoKey 4) pas de limite pour les doubles-octaves (15èmes justes)
            break;
        }
        // console.log ('lowestPossibleBottomChordNoteForTestedInterval : ' + lowestPossibleBottomChordNoteForTestedInterval.fullName);
        if (lowestPossibleBottomChordNoteForTestedInterval.pianoKey > foundLowestPossibleBottomChordNote.pianoKey) {
            foundLowestPossibleBottomChordNote = lowestPossibleBottomChordNoteForTestedInterval;
        }
    }
    console.log('findLowestPossibleBottomChordNote - result : ' + foundLowestPossibleBottomChordNote.fullName);
    return foundLowestPossibleBottomChordNote;
}

function findHighestPossibleBottomChordNote(chord, chordWidthInHalfSteps){
    console.log('CALL findHighestPossibleBottomChordNote - chord = ', chord);

    // Il faut :
    // - 1) que l'accord entier tienne dans le registre imposé : highest bottomNote = haut du registre - taille de l'accord ()
    // - 2) que l'accord sonne correctement (pas trop aigu) --> dépend de la nature de l'accord (ok pour des triades, moins pour d'autres)
    
    // 1)
    const highestBottomNoteImposedByRegister = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === (register.highLimitNote.pianoKey - chordWidthInHalfSteps)) });
    // 2)
    const highestBottomNoteForEsthetic = onlyNaturalAndFlatNotes.find((note) => { return (note.fullName === chord.bottomNoteHighLimit) });
    
    const resultingNote = onlyNaturalAndFlatNotes.find((note) => { return note.pianoKey === Math.min(highestBottomNoteImposedByRegister.pianoKey, highestBottomNoteForEsthetic.pianoKey) });
    console.log('findHighestPossibleBottomChordNote - result : ' + resultingNote.fullName);

    return resultingNote;
}

function updateAnswerButtonsAndScore(chordNatureIdGivenAnswer, calledForHistoryNavigation) {
    applyToAllAnswerButtons(button => {
        //console.log ('chordNatureIdGivenAnswer -> ' + chordNatureIdGivenAnswer);
        // console.log ('seqHistory[counter-1] = ' + seqHistory[counter-1]);        
        // console.log('calledForHistoryNavigation = ' + calledForHistoryNavigation);
        let pressedButtonIsRightAnswer;
        // On détermine la valeur associée au bouton à partir de son id
        let butId = (parseInt(button.id.split('_')[1], 10)); // On récupère le nombre après le '_' dans le nom du bouton
        // console.log ('butId : ' + butId);
        
       
        if (seqHistory[counter-1] == undefined) {
            // On est au tout début
            // console.log ("cas0");    
            button.className = "answerButton deactivated greyedOut";
        } else {
            pressedButtonIsRightAnswer = (butId == currentChord.nature);
            // console.log('pressedButtonIsRightAnswer -> ' + pressedButtonIsRightAnswer);
            if (chordNatureIdGivenAnswer > -1) {
                switch (true) {
                    // Il y a eu une réponse
                    case (pressedButtonIsRightAnswer && butId == chordNatureIdGivenAnswer): 
                        // console.log ("cas1");
                        // On est sur le bouton de la réponse exact // Et c'est le bouton cliqué (il y a eu une réponse)
                        button.className = "answerButton correct solution deactivated";
                        if (!calledForHistoryNavigation) {correctAnswersCount ++}
                        break;
                    case (pressedButtonIsRightAnswer && butId !== chordNatureIdGivenAnswer): 
                        // console.log ("cas2");
                        // On est sur le bouton de la réponse exact mais c'est pas le bouton cliqué (il y a eu une réponse)
                        button.className = "answerButton solution deactivated";
                        break;
                    case (!pressedButtonIsRightAnswer && butId !== chordNatureIdGivenAnswer):
                        // console.log ("cas3");
                        // On est sur le bouton d'une réponse incorrecte mais c'est pas le bouton cliqué (il y a eu une réponse)
                        button.className = "answerButton deactivated greyedOut";
                        break;
                    case (!pressedButtonIsRightAnswer && butId == chordNatureIdGivenAnswer): 
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
        }
    })
}

async function playChord(builtChord) {
    // console.log('playChord - chordSpeed = ' + chordSpeed);
    // console.log ('builtChord : ');
    // console.log (builtChord);

    // On joue la première note
    if (!isNotePlayable(builtChord[0])) {
        console.warn('builtChord[' + 0 + '] (' + builtChord[0].fullName + ') is out of sound bank');
        return false;
    }
    // playNotes(builtScale[0]);

    // On joue les notes suivante avec le timeOut
    for (let s = 0; s < builtChord.length; s++) {
        if (!isNotePlayable(builtChord[s])) {
            console.warn('builtScale[' + s + '] (' + builtChord[s].fullName + ') is out of sound bank');
            return false;
        }
        playNotes(builtChord[s]);
        if (arpeggioChk.checked) {await sleep(1200/(chordSpeed));}
    }
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function countPossibleChords() {
    // console.log('countPossibleChords - config : ', config);
    let chordCount = 0;
    if (config.triads) chordCount += 6; // 6 triads close 
    if (config.triads && config.includeInversionsAndNonClose) chordCount += 22 // 22 inversions & non close struct.
    if (config.fourNotesChords) chordCount += 12;
    if (config.extChords1) chordCount += 11;
    if (config.modalChordsMaj) chordCount += 7;
    // console.log('countPossibleChords - count =', chordCount);
    return (chordCount);
}

function calculateChordProbabilities(config) {
    // console.log('calculateChordProbabilities - config :', config);

    const chordDeck = chords;
    let count = countPossibleChords();
    const equiprobability = 100 / count;

    // Reset all to 0
    chordDeck.forEach(chord => chord.probaPourCent = 0);

    // Chords NameSets
    let triadNames = ['major triad', 'minor triad', 'diminished triad', 'augmented triad', 
        'sus4 triad', 'sus2 triad', 'major triad /3', 'major triad /5', 'minor triad /b3', 'minor triad /5', 
        'major triad d2', 'minor triad d2', 'major triad d2 /3', 'major triad d2 /5', 'minor triad d2 /b3', 'minor triad d2 /5',
        'diminished triad /b3', 'diminished triad /b5', 'diminished triad d2', 'diminished triad d2 /b3', 'diminished triad d2 /b5',
        'augmented triad /3', 'augmented triad /#5', 'augmented triad d2', 'augmented triad d2 /3', 'augmented triad d2 /#5',
        'sus4 triad d2', 'sus2 triad d2'];
    let filteredTriadNamesToExcludeInversionsAndNonClose = triadNames;
    if (!config.includeInversionsAndNonClose) {
        filteredTriadNamesToExcludeInversionsAndNonClose = triadNames.filter(name => 
        !name.includes('/') && !/d\d/.test(name) // /d\d/ → cherche un d suivi d’un chiffre | 
        // .test() c’est une méthode super utile en JavaScript pour tester si une chaîne de caractères correspond à une expression régulière (RegExp) -> regex.test(phrase)
        );
        // console.log('calculateChordProbabilities - (include) filteredTriadNamesToExcludeInversionsAndNonClose : ', filteredTriadNamesToExcludeInversionsAndNonClose)
    }
    const fourNotesChordsNames = ['maj7 chord', '7 chord', 'min7 chord', 'min7b5 chord', '7sus4 chord', '6 chord', 
        '+Maj7 chord', '+7 chord', '-Maj7 chord', 'dim7 chord', 'dimMaj7 chord', 'min6 chord'];
    const extChords1 = ['+maj9 chord', 'maj9 chord', '7,9 chord', '7,b9 chord', '7#9 chord', '+7,9 chord', 
                'min9 chord', '6,9 chord', 'min6,9 chord', '7sus4,9 chord', '-7b5,9 chord'];
    const modalChordsMajNatures = [100, 101, 102, 103, 104, 105, 106]; // Nature (voir les objets Chords)

    // Assign prob chord by chord
    chordDeck.forEach(chord => {
        const name = chord.enName.toLowerCase();
        const id = chord.id;

        if (config.triads) {
            if (filteredTriadNamesToExcludeInversionsAndNonClose.some(chordName => name == chordName)) {
                chord.probaPourCent = equiprobability;
            }
        }
        if (config.fourNotesChords) {
            if (fourNotesChordsNames.some(chordName => name.includes(chordName))) {
                chord.probaPourCent = equiprobability;
            }
        }
        if (config.extChords1) {
            if (extChords1.some(chordName => name.includes(chordName))) {
                chord.probaPourCent = equiprobability;
            }
        }
        if (config.modalChordsMaj) {
            if (modalChordsMajNatures.some(id => (id === chord.nature))) {
                chord.probaPourCent = equiprobability;
            }
        }
    });

    // const reducedChordSet = chordDeck.map(chord => ({
    //     EnName: chord.enName,
    //     pourcentPb: chord.probaPourCent
    // }));
    // console.log('reducedChordSet :', reducedChordSet);
}

function getRandomChord(){
    // console.log('getRandchoomChord -----');
    // test = chords[9];
    // return (test);

    // Ctrl de la cohérence des pondérations fournies
    if (!isChordsSumWeightsEquals100()) {
        console.log("%c Problème : ", "color: red;", 'Somme des proba ≠ 100');
    }

    const chordDeck = chords;

    // Créer la liste cumulée des poids
    const summedChordWeights = [];
    let cumulative = 0;
    for (const chord of chordDeck) {
        cumulative += chord.probaPourCent;
        summedChordWeights.push(cumulative);
    }
    // console.log('summedChordWeights:', summedChordWeights);

    const random1 = Math.random() * 100;
    // console.log('getRandomChord - random1:', random1);
    const pickedIndex = summedChordWeights.findIndex(weight => random1 < weight);
    // console.log('getRandomChord - pickedIndex:', pickedIndex);

    if (pickedIndex !== -1) {
        const pickedChord = chordDeck[pickedIndex];
        console.log("%c" + '   Picked chord -> ' + pickedChord.enName, "color:blue");

        return (pickedChord); //, direction: pickedDirection};
    } else {
        console.error('Problème dans getRandomScaleAndDirection : Aucune carte tirée au sort !');
        return -1;
    }
}


function isChordsSumWeightsEquals100() {
    let sumWeights = 0;
    let deck = chords;
    let tirageWeights = deck.map((tirage) => {
        return tirage.probaPourCent;
    });
    for (let i = 0; i < tirageWeights.length; i++) {
        sumWeights += tirageWeights[i];
    }
    // console.log("tirageWeights : ");
    // console.log(tirageWeights);
    //console.log('isSumWeightsEquals100 : sumWeights = ' + sumWeights);
    if ((sumWeights > 99.99 && sumWeights < 100.1)) {
        return true;
    } else {
        console.warn('isChordsSumWeightsEquals100 --> renvoi False | sumWeights = ' + sumWeights)
        return false;
    }
}

// Navigation
function navigateToHistoricalRank() {
    //console.log('navigateToHistoricalRank - currentHistoryIndex : ' + currentHistoryIndex);
    let seqHistoryItem = seqHistory[currentHistoryIndex];
    console.log('navigateToHistoricalRank - current seqHistoryItem : ');
    console.log(seqHistoryItem);
    ({currentChord, playedChord, tirage, givenAnswer} = seqHistoryItem); // 
    playChord(seqHistoryItem.playedChord);
    if (currentHistoryIndex === seqHistory.length-1) {
        buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
    }
    updateAnswerButtonsAndScore(givenAnswer, true);
    updateUI();
}

function chordIdAllCheckOnChangeAction() {
    // console.log('chordIdAllCheckOnChangeAction - allChk.checked = ' + allChk.checked)
    if (allChk.checked) {
        triadsChk.checked = true; localStorage.setItem('chordsIdConfigTriadsChk', triadsChk.checked);
        fourNotesChordsChk.disabled = false; 
        fourNotesChordsChk.classList.remove('disabled'); 
        fourNotesChordsChk.checked = true; localStorage.setItem('chordsIdConfigFourNotesChordsChk', fourNotesChordsChk.checked);
        extChords1Chk.disabled = false; 
        extChords1Chk.classList.remove('disabled'); 
        extChords1Chk.checked = true; localStorage.setItem('chordsIdConfigExtChords1Chk', extChords1Chk.checked);
        includeInversionsAndNonCloseChk.checked = true; localStorage.setItem('chordsIdConfigIncludeInvAndNonCloseChk', includeInversionsAndNonCloseChk.checked);
        modalChordsMajChk.checked = false; localStorage.setItem('chordsIdConfigModalChordsMajChk', modalChordsMajChk.checked);
        modalChordsAltChk.checked = false; localStorage.setItem('chordsIdConfigModalChordsAltChk', modalChordsAltChk.checked);
    }
    calculateChordProbabilities(buildFocusChkConfig())
};

function updateModeSpecificLocalyStoredTempoValue(){
    console.log('updateModeSpecificLocalyStoredTempoValue - ');
    localStorage.setItem('chordIdTempo', tempoAutoplay)
}

function constructChordIdAnalysisReport() {
    console.log('CALL constructChordIdAnalysisReport');
    contructAnalysis();
    analysis.sort((a, b) => a.card.steps - b.card.steps); //
    console.log('constructChordIdAnalysisReport :', JSON.stringify(analysis, null, 2));

    popupContentDiv.innerHTML = 
    `<p><b>Chord identification statistics</b></p>
    <p> --- ✼ --- </p>`;
    analysis.forEach ((statItem) => {
        console.log ('statItem : ', statItem);
        const dir = (statItem.card.id > 0)? 'ascending' : 'descending';
        const pourcentage = statItem.nbRightAnswers * 100 / statItem.nbOccurences;
        const emoji = getEmojiOnStatItem(pourcentage); 
        console.log ('dir : ', dir);
        popupContentDiv.innerHTML +=
        '<p>' + capitalizeFirstLetterFlexible(statItem.card.enName) + 
        ' (' + dir + '): ' + 
        statItem.nbRightAnswers + '/' + statItem.nbOccurences + ' (' + pourcentage.toFixed(1) + '%) ' +
        emoji + '</p>';
    })
}