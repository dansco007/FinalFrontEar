// ______________________ INIT
console.log(localStorage);

const buttonPick = document.getElementById('pickCardButton');

let navButtonsActivationStatus = [0, 0, 0, 0, 1]; // 1 pour on, 0 pour Off (5 boutons: first, prev, next, last, et restart)

const modeButton1D = document.getElementById('modeButton1Div');
const modeButton2D = document.getElementById('modeButton2Div');
const modeButton3D = document.getElementById('modeButton3Div');
const modeButton4D = document.getElementById('modeButton4Div');

// chks
const autoPlayChk = document.getElementById("autoPlayChk");
const showCardChk = document.getElementById("showCardChk");
const allChk = document.getElementById("allChk");
let answerRequiredChk; let rightAnswerTrigChk;
if (mode != 'sing'){
    answerRequiredChk = document.getElementById("answerRequiredChk");
    rightAnswerTrigChk = document.getElementById("rightAnswerTrigChk");
}

// others
const displayQ = document.getElementById('displayQuestion');
const cardD = document.getElementById('cardDiv');
const cardNameD = document.getElementById('cardNameDiv');
const prevNoteD = document.getElementById('prevNoteDiv');
const prevNameD = document.getElementById('prevNameDiv');
const prevNoteTxtD = document.getElementById('prevNoteTxtDiv');
const targetNoteD = document.getElementById(id = "targetNoteDiv");
const targetNameD = document.getElementById('targetNameDiv');
const counterD = document.getElementById('counterDiv');
const libDivCounterD = document.getElementById('libDivCounter')
const counterNumD = document.getElementById('counterNumberDiv');

const playAndNavD = document.getElementById('playAndNavDiv');
const navButtonsD = document.getElementById('navButtonsDiv');
const buttonPreviousD = document.getElementById('buttonPreviousDiv');
const buttonNextD = document.getElementById('buttonNextDiv');
const buttonFirstD = document.getElementById('buttonFirstDiv');
const buttonLastD = document.getElementById('buttonLastDiv');
const buttonRestartD = document.getElementById('buttonRestartDiv');
const lowLimitNoteNameD = document.getElementById('lowLimitNoteNameDiv');
const highLimitNoteNameD = document.getElementById('highLimitNoteNameDiv');
const registerMsgD = document.getElementById('registerMsgDiv');
const respectLILChk = document.getElementById('respectLILChk');
const tempoTxtDiv = document.getElementById('tempoTxtDiv');

const buttonShowRegisterD = document.getElementById(id="buttonShowRegisterDiv");
const buttonShowRegister = document.getElementById(id="buttonShowRegister");
// const buttonCloseRegisterD = document.getElementById(id="buttonCloseRegisterDiv");
const buttonCloseRegister = document.getElementById(id="buttonCloseRegister");
const registerContainerD = document.getElementById(id="registerContainer");
const buttonShowSoundSelectD = document.getElementById(id="buttonShowSoundSelectDiv");
const buttonShowSoundSelect = document.getElementById(id="buttonShowSoundSelect");
const buttonCloseSoundSelectD = document.getElementById(id="buttonCloseSoundSelectDiv");
const buttonCloseSoundSelect = document.getElementById(id="buttonCloseSoundSelect");
const registerBinaryDiv = document.getElementById(id="registerBinaryDiv");
const soundSelectBinaryDiv = document.getElementById(id="soundSelectBinaryDiv");

// if (mode != 'sing') {
//     const popupContentDiv = document.getElementById(id="popupContentDiv");
//     popupContentDiv.innerHTML = '';
// }

const colors = ['#aa920a','#c52a2a','#b42695','#4e2ac5','#2681b6','#25a334','#424d01']

//console.log ("window.location.pathname.split('/').pop(); -> " + window.location.pathname.split('/').pop())

let showRegister = false;
let showSoundSelection = false;
// console.log(typeof(showSoundSelection))


// Gestion des données localStorage 
const storedAnswerRequired = localStorage.getItem('answerRequired');
const storedRightAnswerTriggers = localStorage.getItem('rightAnswerTriggers');
const storedSustainValue = localStorage.getItem('sustain');
const storedShowCardChoice = localStorage.getItem('showCardChoice');
const storedRegister = localStorage.getItem('register');
const storedShowRegister = localStorage.getItem('showRegister');
const storedRespectLILChoice = localStorage.getItem('respectLILChoice');
const storedSoundBank = localStorage.getItem('soundBank');
const storedShowSoundSelection = localStorage.getItem('showSoundSelection');

// Astuce pour faire de la storedVariable (chaine 'true' ou 'false') un booléen
if (mode !== 'sing'){
    if (storedAnswerRequired) answerRequiredChk.checked = (storedAnswerRequired === 'true'); 
    if (storedRightAnswerTriggers) rightAnswerTrigChk.checked = (storedRightAnswerTriggers === 'true'); 
} 
if (storedShowCardChoice) showCardChk.checked = (storedShowCardChoice === 'true');
if (storedShowRegister) showRegister = (storedShowRegister === 'true'); 
if (mode != 'scaleId') {if (storedRespectLILChoice) respectLILChk.checked = (storedRespectLILChoice === 'true');} 
if (storedShowSoundSelection) showSoundSelection = (storedShowSoundSelection === 'true'); 
if (storedSustainValue) noteSustainInSeconds = Number(storedSustainValue);

// Maj interface
updateSettingsShows();


// Mode buttons
changeURLIntSing = function(){window.location = 'index.html';}
changeURLIntDict = function(){window.location = 'intervallicDictation.html';}
changeURLScaleId = function(){window.location = 'scaleIdentification.html';}
changeURLChordId = function(){window.location = 'chordIdentification.html';}
modeButton1D.addEventListener('click', changeURLIntSing)
modeButton2D.addEventListener('click', changeURLIntDict)
modeButton3D.addEventListener('click', changeURLScaleId)
modeButton4D.addEventListener('click', changeURLChordId)

// Respect LIL
respectLILChk.addEventListener('change', () => {localStorage.setItem('respectLILChoice', respectLILChk.checked);});


// _____________________________ FUNCTIONS

function setPickButtonLabelWithMode() {
    switch (mode) {
        case 'sing':
            buttonPick.innerText = 'New interval';
            break;
        case 'intervalId':
            buttonPick.innerText = 'New interval';
            break;
        case 'scaleId':
            buttonPick.innerText = 'New scale';
            break;
        case 'chordId':
            buttonPick.innerText = 'New chord';
            break;
    }
}


function updateSettingsShows() {
    // console.log('updateSettingsShows - showRegister = ' + showRegister);
    // console.log('updateSettingsShows - showSoundSelection = ' + showSoundSelection);
    // register
    if (showRegister) {
        buttonShowRegisterD.style.display = "none";
        // buttonCloseRegisterD.style.display = "flex";
        registerContainerD.style.display = "flex";
    } else {
        buttonShowRegisterD.style.display = "flex";
        // buttonCloseRegisterD.style.display = "none";
        registerContainerD.style.display = "none";
    }
    // soundBanks
    if (showSoundSelection) {
        buttonShowSoundSelectD.style.display = "none";
        // buttonCloseSoundSelectD.style.display = "flex";
        soundSelectionDiv.style.display = "flex";
    } else {
        buttonShowSoundSelectD.style.display = "flex";
        // buttonCloseSoundSelectD.style.display = "none";
        soundSelectionDiv.style.display = "none";
    }  
}

function displayOctaveLimitMsg(){
    console.log('displayOctaveLimitMsg');
    registerMsgD.style.display = 'flex';
    setTimeout(() => {
        registerMsgD.style.display = 'none';
    }, "4000");
}

// Réactions à la modification du tempo d'autoplay _______________
function updateTempoDisplay() {
    // console.log('updateTempoDisplay - tempoAutoplay = ' + tempoAutoplay);
    let tempoTxtDiv = document.getElementById('tempoTxtDiv');
    tempoTxtDiv.innerText = tempoAutoplay + ' bpm';
}

// Réactions à la modification du sustain _______________
function updateSustainDisplay() {
    // console.log('updateSustainDisplay - noteSustainInSeconds = ' + noteSustainInSeconds);
    noteSustainInSTxtDiv.innerText = noteSustainInSeconds + ' s';
}

// Chargement de la banque de son à la lecture ddu local storage (storedSoundBank) _______________
function changeSoundBankWithLocalStorageValue() {
    if (storedSoundBank) { // Si on a une valeur stockée, utiliser celle-là
        // console.log('storedSoundBank OK => ' + storedSoundBank);
        // utiliser cette valeur
        soundBank = storedSoundBank;
        // Et mettre l'interface à jour
        const radioBtn = document.querySelector(`input[name="soundBank"][value="${soundBank}"]`);
        if (radioBtn) {
            radioBtn.checked = true;
        }
    }
}

// Mise à jour du compteur et du score
function updateCounterAndScoreDiv() {     
    //console.log('updateCounterAndScoreDiv');
    counterNumD.innerText = currentHistoryIndex + 1;
    counterNumD.style.color = 'black' //'#1a1926';
    if (mode != 'sing') {
        if (counter === 0) {
            scoreDiv.style.display = 'none'; // on affiche pas le score avant le premier intervalle
            //counterNumD.innerText = currentHistoryIndex + 1;
        } else {
            scoreDiv.style.display = 'flex';
            let dNow = Date.now()
            //console.log('dNow = ' + dNow);
            let timeElapsed = (dNow - startTime) / 1000;
            // const counterForScore = counter;
            // if (givenAnswer < 0) {counterForScore -= 1} 
            //console.log('timeElapsed = ' + timeElapsed);
            scoreTxtDiv.innerText = 'Score : ' + correctAnswersCount + ' on ' + counter;
            timeTxtDiv.innerText = '  in ' + timeElapsed.toFixed(1) + 's';
        }
    }
}

// Show Register or not
function buttonShowRegisterAction() {
    showRegister = !showRegister;
    console.log('buttonShowRegisterAction : current showRegister = ' + showRegister);
    // on met à jour la showRegister dans le localStorage
    localStorage.setItem('showRegister', showRegister);    
    updateUI();
}
buttonShowRegisterD.addEventListener('click', buttonShowRegisterAction);
buttonCloseRegister.addEventListener('click', buttonShowRegisterAction);


// Show SoundSelect or not
function buttonShowSoundSelectAction() {
    console.log('buttonShowSoundSelectAction - showSoundSelection ' + showSoundSelection);
    showSoundSelection = !showSoundSelection;
    // on met à jour la soundBank dans le localStorage
    localStorage.setItem('showSoundSelection', showSoundSelection);
    updateUI();
}
buttonShowSoundSelectD.addEventListener('click', buttonShowSoundSelectAction);
buttonCloseSoundSelect.addEventListener('click', buttonShowSoundSelectAction);


// Udpate de l'affichage du timout entre 2 notes (intervalId)
function updateNoteLagDisplay() {
    let noteLagTxtD = document.getElementById('noteLagInMsDivTxtDiv');
    noteLagTxtD.innerText = noteLagInMs + ' ms';
}


// bouton 'First'
function buttonFirstAction() {
    if (navButtonsActivationStatus[0] === 0) { console.log('buttonFirstAction - DEACTIVATED'); return};
    //console.log('buttonFirstAction');
    currentHistoryIndex = 0;
    navigateToHistoricalRank();
}
// let buttonFirst = document.getElementById('buttonFirst');
buttonFirst.addEventListener('click', buttonFirstAction);

// bouton 'Previous'
function buttonPreviousAction() {
    if (navButtonsActivationStatus[1] === 0) { console.log('buttonPreviousAction - DEACTIVATED'); return};
    //console.log('buttonPreviousAction');
    currentHistoryIndex--;
    navigateToHistoricalRank();
}
// let buttonPrevious = document.getElementById('buttonPrevious');
buttonPrevious.addEventListener('click', buttonPreviousAction);

// bouton 'Next'
function buttonNextAction() {
    if (navButtonsActivationStatus[2] === 0) { console.log('buttonNextAction - DEACTIVATED'); return};
    //console.log('buttonNextAction');
    currentHistoryIndex++;
    navigateToHistoricalRank();
}
// let buttonNext = document.getElementById('buttonNext');
buttonNext.addEventListener('click', buttonNextAction);

// bouton 'Last'
function buttonLastAction() {
    if (navButtonsActivationStatus[3] === 0) { console.log('buttonLastAction - DEACTIVATED'); return};
    // console.log('buttonLastAction : seqHistory.length = ' + seqHistory.length);
    currentHistoryIndex = seqHistory.length-1;
    navigateToHistoricalRank();
}
// let buttonLast = document.getElementById('buttonLast');
buttonLast.addEventListener('click', buttonLastAction);


// Fonction qui est appelée par init.js en fin de chargement (sinon updateUI n'est pas encore chargée)
function commonInit() {
    // console.log('CALL Appel de la fonction commonInit');
    // code d'initialisation spécifique, déclarer fonctions ou autre

    // Gestion de la soundBank avec localStorage 
    changeSoundBankWithLocalStorageValue(); // Mise à jour du sélecteur dans l'interface

    // Actions relatives aux choix de la banque son (en fonction du sélecteur)
    changeSoundBankAction('none'); // le paramètre est la dernière note jouée.

    // Mise à jour de la localStored valeur de answerRequiredChk
    if (mode !== 'sing') {
        answerRequiredChk.addEventListener('change', () => {localStorage.setItem('answerRequired', answerRequiredChk.checked)});
        // showCardChk.addEventListener('change', () => {localStorage.setItem('showCardChoice', showCardChk.checked)});
        rightAnswerTrigChk.addEventListener('change', () => {localStorage.setItem('rightAnswerTriggers', rightAnswerTrigChk.checked)});
        updateUI();
    }

    showCardChk.addEventListener('change', () => {
        localStorage.setItem('showCardChoice', showCardChk.checked);
        updateUI();
    })
    document.body.classList.add('loaded'); // Apparition du body après chargement
}

// Gestion de l'affichage de l'analyse de la perf
// if (mode == 'intervalId') {
if (mode != 'sing') {
    // console.log ('Gestion Popup');
    const scoreDiv = document.getElementById('scoreDiv');
    const scoreAnalysisOverlayedDiv = document.getElementById('scoreAnalysisOverlayedDiv');
    const closePopup = document.getElementById('closePopup');

    scoreDiv.addEventListener('click', () => {
        /* switch (mode) {
            case ('intervalId'):
                constructIntDictationAnalysisReport();
                break;
            case ('scaleId'):
                constructScaleIdAnalysisReport();
                break;
            case ('chordId'):
                constructChordIdAnalysisReport();
                break;
        }  */
        constructAnalysisReport();
        scoreAnalysisOverlayedDiv.classList.remove('hidden');
    });

    closePopup.addEventListener('click', () => {
        scoreAnalysisOverlayedDiv.classList.add('hidden');
    });

    // Optionnel : clic en dehors du popup pour fermer
     scoreAnalysisOverlayedDiv.addEventListener('click', (e) => {
        if (e.target === scoreAnalysisOverlayedDiv) {
            scoreAnalysisOverlayedDiv.classList.add('hidden');
        }
    });
}

function getEmojiForStatItem(pourcentage) {
    let emoji = '😩'
        if (pourcentage > 25) emoji = '🥲';
        if (pourcentage > 50) emoji = '😔'; 
        if (pourcentage > 70) emoji = '😎'; 
        if (pourcentage > 80) emoji = '🥳'; 
        if (pourcentage > 99) emoji = '😍🎉';  
    const comment = emoji;
    return comment;
}

function getColorPelletForStatItem(pourcentage) {
    let color = 'grey'; // couleur par défaut
    let level = 255 * pourcentage/100
    let rouge = 255-level;
    let vert = level;
    let bleu = 0;
    color= `rgb(${rouge}, ${vert}, ${bleu})`
    // if (pourcentage > 25) color = 'orange';
    // if (pourcentage > 50) color = 'yellow'; 
    // if (pourcentage > 70) color = 'green'; 
    // if (pourcentage > 80) color = 'blue'; 
    // if (pourcentage > 99) color = 'red';  

    // Retourner une petite pastille en HTML
    return `<span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${color};"></span>`;
}

function capitalizeFirstLetterFlexible(str) {
  // La regexp capture optionalement un "+" ou un espace, puis la première lettre
  return str.replace(/^(\+?\s*)([a-z])/, function(match, p1, p2) {
    return p1 + p2.toUpperCase();
  });
}

