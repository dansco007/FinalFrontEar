function init(){
    // console.log('CALL INIT (scaleIdentification)');
    notesAndCardsInit();
    scaleBottomNote = pickScaleBottomNote();
    scaleIdAllCheckOnChangeAction();
    initButtons();
    if (!storedScaleIdTempo) setAutoplayTempo();
    // updateUI(); //  on veut exécuter l'update dès le départ

    commonInit();
}

// Variables globales pour 'scaleId' :

let answerCount = 0;
let givenAnswer = -1;
let correctAnswer;
let isAutoPlaying = false;
let timeoutBetweenScaleNotesMs = 300;
let seqHistory = [];
let currentHistoryIndex = -1;
let scaleSpeed = 5; let speedMini = 1; let speedMaxi = 15;

let tirage = {};

let scaleBottomNote;
// let scaleBottomNote = pickScaleBottomNote();
let scaleDirection = 'ascending';
let currentScale = {};

let answerButtonsActivationStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1 pour on, 0 pour Off (9 boutons)

// Chks
const majMinChk = document.getElementById("majMinChk");
const majModesChk = document.getElementById("majModesChk");
const altModesChk = document.getElementById("altModesChk");
const ascendingChk = document.getElementById("ascendingChk");
const descendingChk = document.getElementById("descendingChk");

const startAndTargetNotesD = document.getElementById('startAndTargetNotesDiv');
const buttonHearAgainD = document.getElementById('buttonHearAgainDiv');
const buttonHearAgain = document.getElementById('buttonHearAgain');
const buttonPlayStart = document.getElementById('buttonPlayStartNote');
const scoreTxtDiv = document.getElementById(id = "scoreTxtDiv");
const timeTxtDiv = document.getElementById(id = "timeTxtDiv");

// Answers
const answerButtonsD = document.getElementById(id = "answerButtonsDiv");
const buttonMajorIonian_1 = document.getElementById(id = "answerButtonDiv_1");
const buttonMinorEolian_2 = document.getElementById(id = "answerButtonDiv_2");
const buttonHarMin_3 = document.getElementById(id = "answerButtonDiv_3");
const buttonMelMin_4 = document.getElementById(id = "answerButtonDiv_4");
const buttonLydian_5 = document.getElementById(id = "answerButtonDiv_5");
const buttonMixo_6 = document.getElementById(id = "answerButtonDiv_6");
const buttonDorian_7 = document.getElementById(id = "answerButtonDiv_7");
const buttonPhrygian_8 = document.getElementById(id = "answerButtonDiv_8");
const buttonLocrian_9 = document.getElementById(id = "answerButtonDiv_9");
const buttonLydAug_10 = document.getElementById(id = "answerButtonDiv_10");
const buttonLydDom_11 = document.getElementById(id = "answerButtonDiv_11");
const buttonMixob6_12 = document.getElementById(id = "answerButtonDiv_12");
const buttonPhryN6_13 = document.getElementById(id = "answerButtonDiv_13");
const buttonLocrianN2_14 = document.getElementById(id = "answerButtonDiv_14");
const buttonAltered_15 = document.getElementById(id = "answerButtonDiv_15");


// Gestion des données localStorage 
const storedConfigMajMinChk = localStorage.getItem('scaleIdConfigMajMinChk');
const storedConfigMajModesChk = localStorage.getItem('scaleIdConfigMajModesChk');
const storedConfigAltModesChk = localStorage.getItem('scaleIdConfigAltModesChk');
const storedConfigAscendingChk = localStorage.getItem('scaleIdConfigAscendingChk');
const storedConfigDescendingChk = localStorage.getItem('scaleIdConfigDescendingChk');
const storedConfigAllChk = localStorage.getItem('scaleIdConfigAllChk');

const storedScaleIdTempo = Number(localStorage.getItem('scaleIdTempo'));
const storedScaleSpeed = localStorage.getItem('scaleSpeed');

// Astuce pour faire de la storedVariable (chaine 'true' ou 'false') un booléen
if (storedConfigMajMinChk) majMinChk.checked = (storedConfigMajMinChk === 'true'); 
if (storedConfigMajModesChk) majModesChk.checked = (storedConfigMajModesChk === 'true'); 
if (storedConfigAltModesChk) altModesChk.checked = (storedConfigAltModesChk === 'true'); 
if (storedConfigAscendingChk) ascendingChk.checked = (storedConfigAscendingChk === 'true'); 
if (storedConfigDescendingChk) descendingChk.checked = (storedConfigDescendingChk === 'true'); 
if (storedConfigAllChk) allChk.checked = (storedConfigAllChk === 'true'); 
let allButtonsButAll = [majMinChk, majModesChk, altModesChk, ascendingChk, descendingChk];
let allChkButAllAndDirection = [majMinChk, majModesChk, altModesChk];
if (storedScaleIdTempo) tempoAutoplay = Number(storedScaleIdTempo); // 1 tempo différent par mode
if (storedScaleSpeed) scaleSpeed = Number(storedScaleSpeed);

function updateModeSpecificLocalyStoredTempoValue(){
    console.log('updateModeSpecificLocalyStoredTempoValue - ');
    localStorage.setItem('singTempo', tempoAutoplay)
}

// scaleIdAllCheckOnChangeAction();

// Gestion d'interaction utilisateur

// ________________________________________________________ 
// ________________________________________________________ 


// initButtons();
// if (!storedScaleIdTempo) setAutoplayTempo();
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
    
    // prevNoteDiv.style.justifyContent = 'start';
    cardNameD.style.color = 'black';
    // cardNameD.style.padding = 0;
    cardNameD.style.padding = '4px 0px 0px 0px';
    cardDiv.style.alignItems = 'center';

    counterNumberDiv.style.padding = '4px';

    prevNoteTxtD.style.color = 'darkBlue';
}

function updateUI() {
    // console.warn("updateUI()")

    // Mise à jour de la config en fonction de l'état des checkboxes ________
    function dealWithConfigButtons() {
        //console.log('dealWithConfigButtons');
        majMinChk.onchange = function () {
            if (!majModesChk.checked && !altModesChk.checked) { majMinChk.checked = true };
            checkCheckAndAction(majMinChk)
        }
        majModesChk.onchange = function () {
            if (!majMinChk.checked && !altModesChk.checked) { majModesChk.checked = true };
            checkCheckAndAction(majModesChk)
        }
        altModesChk.onchange = function () {
            if (!majMinChk.checked && !majModesChk.checked) { altModesChk.checked = true };
            checkCheckAndAction(altModesChk)
        }
        ascendingChk.onchange = function () {
            if (!ascendingChk.checked && !descendingChk.checked) { ascendingChk.checked = true };
            checkCheckAndAction(ascendingChk)
        }
        descendingChk.onchange = function () {
            if (!ascendingChk.checked && !descendingChk.checked) { ascendingChk.checked = true };
            checkCheckAndAction(descendingChk)
        }
 
        allChk.onchange = function () {scaleIdAllCheckOnChangeAction()}
    }

    // Updates _____________________________________________________________

    function updateButtonsConfigAndProb() {
        //console.log('updateButtons - counter : ' + counter);

        // Mises à jour 
        // - des boutons de navigation et du bouton principal 'buttonPick'
        updateNavButtonsAndPickButton();
        // - des probas
        calculateScaleProbabilities(buildFocusChkConfig());
        // - du bouton pickButton en fonction de l'état autoplay
        updatePickButtonWithAutoplayState(givenAnswer, answerRequiredChk.checked);
        // - de la config
        dealWithConfigButtons();
    }

    function updatePrevNameAndTargetNameDivs() {
        // console.log('updatePrevNameAndTargetNameDivs - counter = ' + counter);
        if (counter > 0) {
            prevNoteD.style.display = 'flex';
            prevNoteTxtD.innerText = scaleBottomNote.fullName;
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

    // Réaction à la modification de la vitesse de la gamme _______________
    function updateSpeedDisplay() {
        // console.log('decreaseSpeedAction - scaleSpeed -> ' + scaleSpeed);
        speedTxtDiv.innerText = 'L' + scaleSpeed;
    }

    

    function updateConfigChksLocalStorage() {
        // Mise à jour des valeurs localyStored des checkboxes de la config
        majMinChk.addEventListener('change', () => {localStorage.setItem('scaleIdConfigMajMinChk', majMinChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        majModesChk.addEventListener('change', () => {localStorage.setItem('scaleIdConfigMajModesChk', majModesChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        altModesChk.addEventListener('change', () => {localStorage.setItem('scaleIdConfigAltModesChk', altModesChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        ascendingChk.addEventListener('change', () => {localStorage.setItem('scaleIdConfigAscendingChk', ascendingChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        descendingChk.addEventListener('change', () => {localStorage.setItem('scaleIdConfigDescendingChk', descendingChk.checked); localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
        allChk.addEventListener('change', () => {localStorage.setItem('scaleIdConfigAllChk', allChk.checked)});
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
}


// ------------------------------------------------------------------------------------------


function initButtons() {

    //let buttonNewCard = document.getElementById('pickCardButton');
    buttonPick.addEventListener('click', buttonNewCardAction);

    // bouton 'Counter' et 'Hear Again' (Play the two notes)
    let buttonPlayBothAction = function () {
        console.log('buttonPlayBothAction');
        playScale(playedScale);
    }
    counterD.addEventListener('click', buttonPlayBothAction);
    cardD.addEventListener('click', buttonPlayBothAction);
    buttonHearAgain.addEventListener('click', buttonPlayBothAction);

    // bouton 'PlaystartNote' 
    function buttonPlayStartNoteAction() {
        //console.log('buttonPreviousAction');
        playNotes(scaleBottomNote);
    }
    prevNoteD.addEventListener('click', buttonPlayStartNoteAction);

    // decrease Speed
    function decreaseSpeedAction() {
        // console.log('decreaseSpeedAction');
        if (scaleSpeed > speedMini) {
            scaleSpeed -= 1;
            localStorage.setItem('scaleSpeed', scaleSpeed)
            updateUI();
        }
    }
    let decSpeedD = document.getElementById('decSpeedDiv');
    decSpeedD.addEventListener('click', () => {decreaseSpeedAction()});


    // increase Speed
    function increaseSpeedAction() {
        // console.log('increaseSpeedAction');
        if (scaleSpeed < speedMaxi) {
            scaleSpeed += 1;
            localStorage.setItem('scaleSpeed', scaleSpeed)
            updateUI();
        }
    }
    let incSpeedD = document.getElementById('incSpeedDiv');
    incSpeedD.addEventListener('click', () => {increaseSpeedAction()});
  

    // Maj des answerButtons qd changement de focus
    majMinChk.addEventListener('input', updateUI);
    majModesChk.addEventListener('input', updateUI);
    altModesChk.addEventListener('input', updateUI);


    function reactToAnswerAction(answerButtonScaleId) { // déclenché par un des bouton de réponse
        //console.log('reactToAnswerAction');
        //console.log('answerButtonScaleId = ' + answerButtonScaleId);
        //console.log(Ansbutton); 
        correctAnswer = currentScale.id;
        let answerIsRight = false;
        if (answerButtonsActivationStatus[answerButtonScaleId] === 0) { console.log('reactToAnswerAction - DEACTIVATED'); return };
        answerCount++;
        // console.log ('reactToAnswerAction tirage -> ', tirage);
        givenAnswer = answerButtonScaleId;
        updateAnswerButtonsAndScore(givenAnswer, false);
   
        answerIsRight = (givenAnswer == correctAnswer);

        cardTimeElapsed = (Date.now()- newCardStartTime) / 1000;
        console.log('(reactToAnswerAction) - cardTimeElapsed : ' + cardTimeElapsed);

        historize({currentScale, playedScale, scaleDirection, givenAnswer, answerIsRight, cardTimeElapsed}, true);
        answerButtonsActivationStatus = answerButtonsActivationStatus.map((el) => { return 0 }); // On désactive toutes les réponses            
        if (answerIsRight) {
            console.log("%c right answer", 'color: green;');
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

    buttonMajorIonian_1.addEventListener('click', function () { reactToAnswerAction(1) }, false)
    buttonMinorEolian_2.addEventListener('click', function () { reactToAnswerAction(2) }, false)
    buttonHarMin_3.addEventListener('click', function () { reactToAnswerAction(3) }, false)
    buttonMelMin_4.addEventListener('click', function () { reactToAnswerAction(4) }, false)
    buttonLydian_5.addEventListener('click', function () { reactToAnswerAction(5) }, false)
    buttonMixo_6.addEventListener('click', function () { reactToAnswerAction(6) }, false)
    buttonDorian_7.addEventListener('click', function () { reactToAnswerAction(7) }, false)
    buttonPhrygian_8.addEventListener('click', function () { reactToAnswerAction(8) }, false)
    buttonLocrian_9.addEventListener('click', function () { reactToAnswerAction(9) }, false)
    buttonLydAug_10.addEventListener('click', function () { reactToAnswerAction(10) }, false)
    buttonLydDom_11.addEventListener('click', function () { reactToAnswerAction(11) }, false)
    buttonMixob6_12.addEventListener('click', function () { reactToAnswerAction(12) }, false)
    buttonPhryN6_13.addEventListener('click', function () { reactToAnswerAction(13) }, false)
    buttonLocrianN2_14.addEventListener('click', function () { reactToAnswerAction(14) }, false)
    buttonAltered_15.addEventListener('click', function () { reactToAnswerAction(15) }, false)

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

// Gestion de l'affichage des boutons de réponse
// showAnswerbuttons = function () {
function showAnswerbuttons() {
    function updateAnswerButtonShow(focusButt) {
        switch (focusButt) {
            case majMinChk:
                if (focusButt.checked) {
                    buttonMajorIonian_1.style.display = 'flex';
                    buttonMinorEolian_2.style.display = 'flex';
                    buttonHarMin_3.style.display = 'flex';
                    buttonMelMin_4.style.display = 'flex';
                }
                else {
                    buttonMajorIonian_1.style.display = 'none';
                    buttonMinorEolian_2.style.display = 'none';
                    buttonHarMin_3.style.display = 'none';
                    buttonMelMin_4.style.display = 'none';
                }
                break;
            case majModesChk:
                if (focusButt.checked) {
                    buttonMajorIonian_1.style.display = 'flex';
                    buttonMinorEolian_2.style.display = 'flex';
                    buttonLydian_5.style.display = 'flex';
                    buttonMixo_6.style.display = 'flex';
                    buttonDorian_7.style.display = 'flex';
                    buttonPhrygian_8.style.display = 'flex';
                    buttonLocrian_9.style.display = 'flex';
                } else {
                    if (!majMinChk) {
                        buttonHarMin_3.style.display = 'none';
                        buttonMelMin_4.style.display = 'none';
                        buttonMajorIonian_1.style.display = 'none';
                        buttonMinorEolian_2.style.display = 'none';
                    }
                    buttonLydian_5.style.display = 'none';
                    buttonMixo_6.style.display = 'none';
                    buttonDorian_7.style.display = 'none';
                    buttonPhrygian_8.style.display = 'none';
                    buttonLocrian_9.style.display = 'none';
                }
                break;
            
            case altModesChk:
                if (focusButt.checked) {
                    buttonMelMin_4.style.display = 'flex';
                    buttonLydAug_10.style.display = 'flex';
                    buttonLydDom_11.style.display = 'flex';
                    buttonMixob6_12.style.display = 'flex';
                    buttonPhryN6_13.style.display = 'flex';
                    buttonLocrianN2_14.style.display = 'flex';
                    buttonAltered_15.style.display = 'flex';
                } else {
                    if (!majMinChk) {
                        buttonHarMin_3.style.display = 'none';
                        buttonMelMin_4.style.display = 'none';
                        buttonMajorIonian_1.style.display = 'none';
                        buttonMinorEolian_2.style.display = 'none';
                    }
                    buttonLydAug_10.style.display = 'none';
                    buttonLydDom_11.style.display = 'none';
                    buttonMixob6_12.style.display = 'none';
                    buttonPhryN6_13.style.display = 'none';
                    buttonLocrianN2_14.style.display = 'none';
                    buttonAltered_15.style.display = 'none';
                }
                break;

        }
    }
    updateAnswerButtonShow(majMinChk);
    updateAnswerButtonShow(majModesChk);
    updateAnswerButtonShow(altModesChk);
}


// bouton 'Pick a scale (and direction)'
function buttonNewCardAction(whoCalledMe = 'user') {
    // console.log('buttonNewCardAction - whoCalledMe : ' + whoCalledMe);
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
    if (counter == 1) startTime = Date.now(); // Première carte : on démarre le chrono global
    if (givenAnswer < 0 && counter > 1){
        cardTimeElapsed = (Date.now()- newCardStartTime) / 1000; // On démarre le chrono de la carte
        // console.log('buttonNewCardAction - cardTimeElapsed (NO REPLY): ' +cardTimeElapsed);
        seqHistory[seqHistory.length-1].cardTimeElapsed = cardTimeElapsed; // On historise le chrono de la carte (cas de non-réponse)
    }
    // console.log('buttonNewCardAction - seqHistory : ', seqHistory);

    givenAnswer = -1; // on réinit la réponse

    newCardStartTime = Date.now();
    
    // On sélectionne une première note (la borne basse de la gamme)
    scaleBottomNote = pickScaleBottomNote();
    previouslyPlayedNote = scaleBottomNote;
    //console.log('%c   ScaleBottomNote : ' + scaleBottomNote.fullName, "color: darkBlue");

    // On calcul les proba de chaque carte possible
    calculateScaleProbabilities(config);

    // On tire une carte
    let tirage = getRandomScaleAndDirection();
    // console.log ('buttonNewCardAction tirage -> ' , console.log (tirage))
    currentScale = tirage.scale ; scaleDirection = tirage.direction
    playedScale = buildPlayedScale(currentScale.id, scaleBottomNote);
    // currentScale.id = (scaleDirection === 'ascending')? Number(currentScale.id) : -Number(currentScale.id);
    
    let answerIsRight  = undefined;
    // on stocke (on historise), sans remplacer
    historize({ currentScale, playedScale, scaleDirection, givenAnswer, answerIsRight}, false);
    // console.log('Après historize, seqHistory:', seqHistory);
    seqHistory.forEach((item, index) => { 
        // console.log(`Item ${index} :`, item);
    });

    // answerIsRight = (givenAnswer == correctAnswer);
    //On reset les boutons de réponse //avec un peit delay
    if (counter > 0) {
        // let delayR = 0
        // if (answerIsRight) { delayR = delayForResetAnswersMs };
        // setTimeout(() => applyToAllAnswerButtons(b => { b.className = "answerButton activated" }), delayR);
        // answerButtonsActivationStatus = answerButtonsActivationStatus.map((el) => { return 1 }); // On réactive toutes les réponses
        applyToAllAnswerButtons(b => { b.className = "answerButton activated" });
        answerButtonsActivationStatus = answerButtonsActivationStatus.map((el) => { return 1 }); // On réactive toutes les réponses
   
    }

    // On joue la gamme
    playScale(playedScale)

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

    updateUI();
    // FIN buttonNewCardAction
}

//________________________


function buildPlayedScale(scaleId, bottomNote) {
    // console.log('scaleBottomNote : ' + bottomNote.fullName);
    // console.log('buildPlayedScale : ' + scaleDirection + ' ' + scales[scaleId].enName);
    const playedScale = []
    //let followingScaleNote, previousScaleNote; // ???????
    playedScale[0] = bottomNote;
    // previousScaleNote = playedScale[0];
    for (let s = 0; s < scales[scaleId].nbOfSteps; s++) {
        const stepCard = cards.find((card) => { return (card.enName === scales[scaleId].steps[s]) });
        //console.log ('StepCard : ' + stepCard.enName);
        let { foundNote } = findNextNote(stepCard, playedScale[0], register);
        //followingScaleNote = foundNote;
        playedScale[s + 1] = foundNote;
    }
    if (scaleDirection == 'descending') playedScale.reverse();
    // previousScaleNote = playedScale[0];
    // console.log ('playedScale : ');
    // console.log (playedScale);
    return playedScale;
}

function pickScaleBottomNote() {
    //console.log('register :');
    //console.log(register);
    let pickedNote;
    let semitonesMargin = 12
    // on veut avoir au moins un octave (semitonesMargin) au-dessus
    let upperlimitNoteForNoteChoice = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === (register.highLimitNote.pianoKey - semitonesMargin)) });
    let rand = Math.floor(Math.random() * (upperlimitNoteForNoteChoice.pianoKey - register.lowLimitNote.pianoKey) + register.lowLimitNote.pianoKey);
    // console.log('rand ' + rand);

    // On renvoit
    let pickedNaturalAndFlatNote = onlyNaturalAndFlatNotes.find((note) => { return (note.pianoKey === rand) });
    pickedNote = notes.find((note) => { return (note.fullName === pickedNaturalAndFlatNote.fullName) });
    console.log('%c   ScaleBottomNote : ' + pickedNote.fullName, "color: darkBlue");
    return pickedNote;
}

function updateAnswerButtonsAndScore(answerScaleId, calledForHistoryNavigation) {
    applyToAllAnswerButtons(button => {
        //console.log ('answerScaleId -> ' + answerScaleId);
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
            pressedButtonIsRightAnswer = (butId == Math.abs(currentScale.id));
            // console.log('pressedButtonIsRightAnswer -> ' + pressedButtonIsRightAnswer);
            if (answerScaleId > -1) {
                switch (true) {
                    // Il y a eu une réponse
                    case (pressedButtonIsRightAnswer && butId == answerScaleId): 
                        // console.log ("cas1");
                        // On est sur le bouton de la réponse exact // Et c'est le bouton cliqué (il y a eu une réponse)
                        button.className = "answerButton correct solution deactivated";
                        if (!calledForHistoryNavigation) {correctAnswersCount ++}
                        break;
                    case (pressedButtonIsRightAnswer && butId !== answerScaleId): 
                        // console.log ("cas2");
                        // On est sur le bouton de la réponse exact mais c'est pas le bouton cliqué (il y a eu une réponse)
                        button.className = "answerButton solution deactivated";
                        break;
                    case (!pressedButtonIsRightAnswer && butId !== answerScaleId):
                        // console.log ("cas3");
                        // On est sur le bouton d'une réponse incorrecte mais c'est pas le bouton cliqué (il y a eu une réponse)
                        button.className = "answerButton deactivated greyedOut";
                        break;
                    case (!pressedButtonIsRightAnswer && butId == answerScaleId): 
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

async function playScale(builtScale) {
    // console.log('playScale - scaleSpeed = ' + scaleSpeed);
    // console.log ('builtScale : ');
    // console.log (builtScale);

    // On joue la première note
    if (!isNotePlayable(builtScale[0])) {
        console.log('builtScale[' + 0 + '] (' + builtScale[0].fullName + ') is out of sound bank');
        return false;
    }
    playNotes(builtScale[0]);

    // On joue les notes suivante avec le timeOut
    for (let s = 0; s < builtScale.length; s++) {
        if (!isNotePlayable(builtScale[s])) {
            console.log('builtScale[' + s + '] (' + builtScale[s].fullName + ') is out of sound bank');
            return false;
        }
        playNotes(builtScale[s]);
        await sleep(1200/(scaleSpeed));
    }
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function countPossibleScales() {
    // console.log('CALL countPossibleScales');
    let scaleCount = 0
    if (config.majMin) scaleCount += 4; //* numberOfDirections;
    if (config.majModes) {
        if (config.majMin) {
            scaleCount += 5; //* numberOfDirections;
        } else {
            scaleCount += 7; //* numberOfDirections;
        }
    }
    if (config.altModes) {
        if (config.majMin) {
            scaleCount += 6; //* numberOfDirections;
        } else {
            scaleCount += 7; //* numberOfDirections;
        }
    }
    // console.log('countPossibleScales - count =', scaleCount);
    return (scaleCount)
}


function calculateScaleProbabilities(config) {
    // console.log('CALL calculateScaleProbabilities');
    // console.log('calculateScaleProbabilities - config :', config);

    const scaleDeck = scales;
    let count = countPossibleScales();
    const equiprobability = 100 / count;

    // Reset all to 0
    scaleDeck.forEach(scale => scale.probaPourCent = 0);

    scaleDeck.forEach(scale => {
        const name = scale.enName.toLowerCase();

        // console.log('config.majMin: ' +  config.majMin);
        if (config.majMin) {   
            if (
                name == 'major' ||
                name == 'natural minor' ||
                name == 'harmonic minor' ||
                name == 'melodic minor'
            ) {
                scale.probaPourCent = equiprobability;
            }
        }

        // console.log('config.majModes: ' +  config.majModes);
        if (config.majModes) {
            if (!config.majMin) {
                if (
                    name == 'major' ||
                    name == 'natural minor'
                ) {
                    scale.probaPourCent = equiprobability;
                }
            }
            const modeNames = ['lydian', 'mixolydian', 'dorian', 'phrygian', 'locrian'];
            if (modeNames.some(mode => name == mode)) {
                scale.probaPourCent = equiprobability;
            }
        }

        // console.log('config.altModes : ' + config.altModes);
        if (config.altModes) {
            if (!config.majMin) {
                if (name == 'melodic minor'){
                    scale.probaPourCent = equiprobability;
                }
            }
            const altModeNames = ['lydian augmented', 'lydian dominant', 'mixolydian ♭6', 'phrygian ♮6', 'locrian ♮2', 'altered'];
            if (altModeNames.some(altMode => name == altMode)) {
                scale.probaPourCent = equiprobability;
            }
        }
    });

    /* const reducedScaleSet = scaleDeck.map(scale => ({
        EnName: scale.enName,
        pourcentPb: scale.probaPourCent
    }));
    console.log('reducedScaleSet :', reducedScaleSet); */
}


function getRandomScaleAndDirection() {
    // console.log('getRandomScaleAndDirection -----');

    // Ctrl de la cohérence des pondérations fournies
    if (!isScalesSumWeightsEquals100()) {
        console.log("%c Problème : ", "color: red;", 'Somme des proba ≠ 100');
    }

    const scaleDeck = scales;

    // Créer la liste cumulée des poids
    const summedScaleWeights = [];
    let cumulative = 0;
    for (const scale of scaleDeck) {
        cumulative += scale.probaPourCent;
        summedScaleWeights.push(cumulative);
    }
    //console.log('summedScaleWeights:', summedScaleWeights);

    const random1 = Math.random() * 100;
    const pickedIndex = summedScaleWeights.findIndex(weight => random1 < weight);

    if (pickedIndex !== -1) {
        const pickedScale = scaleDeck[pickedIndex];
        //console.log("%c" + '   Picked scale -> ' + pickedScale.enName, "color:blue");
        if (config.ascending && config.descending) {
            const random2 = Math.random() * 100;
            //console.log ('random2 : ' + random2)
            pickedDirection = (random2 >= 50) ? 'ascending' : 'descending';
        } else {
            pickedDirection = (config.ascending) ? 'ascending' : 'descending';
        }
        //console.log('pickedDirection = ' + pickedDirection);
        console.log('%c   pickedScale : ' + pickedScale.enName, "color: orange");
        return {scale: pickedScale, direction: pickedDirection};
    } else {
        console.error('Problème dans getRandomScaleAndDirection : Aucune carte tirée au sort !');
        return -1;
    }
}

function isScalesSumWeightsEquals100() {
    let sumWeights = 0;
    let deck = scales;
    let tirageWeights = deck.map((scale) => {
        return scale.probaPourCent;
    });
    for (let i = 0; i < tirageWeights.length; i++) {
        sumWeights += tirageWeights[i];
    }
    //console.log("tirageWeights : ");
    //console.log(tirageWeights);
    //console.log('isSumWeightsEquals100 : sumWeights = ' + sumWeights);
    if ((sumWeights > 99.99 && sumWeights < 100.1)) {
        return true;
    } else {
        console.warn('isScalesSumWeightsEquals100 --> renvoi False')
        return false;
    }
}

// Navigation
function navigateToHistoricalRank() {
    //console.log('navigateToHistoricalRank - currentHistoryIndex : ' + currentHistoryIndex);
    let seqHistoryItem = seqHistory[currentHistoryIndex];
    // console.log('navigateToHistoricalRank - current seqHistoryItem : ', seqHistoryItem);
    ({currentScale, playedScale, tirage, givenAnswer} = seqHistoryItem); // 
    playScale(seqHistoryItem.playedScale);
    if (currentHistoryIndex === seqHistory.length-1) {
        buttonPick.className = "pickCardButton activated"; pickButtonActivationStatus = 1;
    }
    updateAnswerButtonsAndScore(givenAnswer, true);
    updateUI();
}

function scaleIdAllCheckOnChangeAction() {
    // console.log('CALL scaleIdAllCheckOnChangeAction');
    // console.log('scaleIdAllCheckOnChangeAction - allChk.checked = ' + allChk.checked)
    if (allChk.checked) {
        majMinChk.checked = true; localStorage.setItem('scaleIdConfigMajMinChk', majMinChk.checked);
        majModesChk.checked = true; localStorage.setItem('scaleIdConfigMajModesChk', majModesChk.checked);
        altModesChk.checked = true; localStorage.setItem('scaleIdConfigAltModesChk', altModesChk.checked);
        ascendingChk.checked = true; localStorage.setItem('scaleIdConfigAscendingChk', ascendingChk.checked);
        descendingChk.checked = true; localStorage.setItem('scaleIdConfigDescendingChk', descendingChk.checked);
        calculateScaleProbabilities(buildFocusChkConfig())
    }
};

function updateModeSpecificLocalyStoredTempoValue(){
    console.log('updateModeSpecificLocalyStoredTempoValue - ');
    localStorage.setItem('scaleIdTempo', tempoAutoplay)
}

function constructScaleIdAnalysisReport() {
    console.log('CALL constructChordIdAnalysisReport');
    contructAnalysis();
    analysis.sort((a, b) => a.card.steps - b.card.steps); //
    console.log('constructChordIdAnalysisReport :', JSON.stringify(analysis, null, 2));

    popupContentDiv.innerHTML = 
    `<p><b>Scale identification statistics</b></p>
    <p> ✼ </p>`;
    analysis.forEach ((statItem) => {
        console.log ('statItem : ', statItem);
        let emoji;
        const dir = (statItem.card.id > 0)? 'ascending' : 'descending';
        const pourcentage = statItem.nbRightAnswers * 100 / statItem.nbOccurences;
        const comment = getCommentOnStatItem(pourcentage); 
        console.log ('dir : ', dir);
        popupContentDiv.innerHTML +=
        '<p>' + capitalizeFirstLetterFlexible(statItem.card.enName) + 
        ' (' + dir + '): ' + 
        statItem.nbRightAnswers + '/' + statItem.nbOccurences + ' (' + pourcentage.toFixed(1) + '%) ' +
        comment + '</p>';
    })
}