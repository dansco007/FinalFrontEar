// Détermination du mode 
const modes = {
    'index.html': 'sing',
    'intervallicDictation.html': 'intervalId',
    'scaleIdentification.html': 'scaleId',
    'chordIdentification.html': 'chordId'
};


let page = window.location.pathname.split('/').pop();
let mode = modes[page] || null; // null si la page n'est pas reconnue
console.log ('Début commonProcess - mode -> ' + mode);
let dedicatedScript;
let modeFullName;
let modeAbbreviation;

switch (mode) {
    case 'sing':
        dedicatedScript = 'intervallicSinging.js';
        modeFullName = 'Intervallic singing';
        modeAbbreviation = 'sing';
        cardName = 'interval';
        break;
    case 'intervalId':
        dedicatedScript = 'intervallicDictation.js';
        modeFullName = 'Intervallic dictation';
        modeAbbreviation = 'intDict';
        cardName = 'interval';
        break;
    case 'scaleId':
        dedicatedScript = 'scaleIdentification.js';
        modeFullName = 'scale identification';
        modeAbbreviation = 'scaleId';
        cardName = 'scale';
        break;
    case 'chordId':
        dedicatedScript = 'chordIdentification.js';
        modeFullName = 'chord identification';
        modeAbbreviation = 'chordId';
        cardName = 'chord';
        break;
}

function loadScript(url, callback) {
  const script = document.createElement('script');
  script.src = url;
//   console.log ("chargement de " + url);
  script.onload = callback;
  document.head.appendChild(script);
}

// Chargement dans le bon ordre
loadScript('soundManagement.js', () => {
    loadScript('notesAndCards.js', () => {
        loadScript('commonInterfaceManagement.js', () => {
            loadScript('commonProcess.js', () => {
                loadScript(dedicatedScript, () => { // 'intervallicDictation.js', () => {
                    // Tous les scripts chargés, on peut lancer l'initialisation
                    // console.log('Tous les scripts chargés, appel à init');
                    if (typeof init === 'function') {
                        init();  // une fonction d'initialisation qui appelle tout
                    }
                }); 
            });  
        });
    });   
});