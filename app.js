let listOfSortedNumbers = [];
let maxNumber = 100;
let secretNumber = generateNumber();
let attempts = 1;



function showTextInScreen(tag, text) {
    let camp = document.querySelector(tag);
    camp.innerHTML = text;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function showInicialMessage(){
    showTextInScreen('h1', 'Welcome to the Secret Number Game');
    showTextInScreen('p', 'Chose a number from 1 to 100');
}
showInicialMessage();

function validGuess() {
    let chute = document.querySelector('input').value;
    if (secretNumber== chute) {
        showTextInScreen('h1', 'You won the game!');
        let wordAttempts = attempts > 1 ? 'Attempts' : 'Attempt';
        let messageattempts = `You got the secret number right with ${attempts} ${wordAttempts}`;
        showTextInScreen('p', messageattempts);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (secretNumber > chute) {
            showTextInScreen('p','The secret number is higher.');
        } else {
            showTextInScreen('p', 'The secret number is lower.')
        }
        attempts++;
        cleanScreen();
    }
    console.log(chute == secretNumber);
}

function generateNumber() {
   let chosedNumber = parseInt(Math.random() * maxNumber + 1);
   let elementsQuantityInList = listOfSortedNumbers.length;

    if(elementsQuantityInList == maxNumber){
        listOfSortedNumbers = [];
    }

   if (listOfSortedNumbers.includes(chosedNumber)){
    return generateNumber();
   } else {
    listOfSortedNumbers.push(chosedNumber);
    console.log(listOfSortedNumbers);
    return chosedNumber;
   }
}

function cleanScreen(){
    chute = document.querySelector('input');
    chute.value = '';
}


function restartGame(){
    secretNumber = generateNumber();
    cleanScreen();
    attempts = 1;
    showInicialMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}