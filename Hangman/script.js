const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrongletters');
const restartButton = document.getElementById('restart');
const popup = document.getElementById('popup-container');
const slider = document.getElementById('slider-container');
const message = document.getElementById('win-lose');
const hangmanParts = document.querySelectorAll('.hangman-part');

const wordsPool = ['javascript', 'computer', 'hangman', 'facebook', 'youtube'];

//random word to show on screen
let selectedWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];


//array to classifu=y the input of te user
let correctedLetters = [];
let incorrect = [];

//function to display the selected letter on the screen

const displaySelectedWord = () => {

    word.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
            <span class="letter"> 
            ${correctedLetters.includes(letter) ? letter : ''}
            </span>
        `
            )
            .join('')
        }
`;

    const wordText = word.innerText.replace(/\n/g, '');

    if (wordText === selectedWord) {
        message.innerText = 'You Won!';
        popup.style.display = 'flex';
    }

}

//function to update wrong letter
const updateWrongLetters = () => {
    //
    wrongLetters.innerHTML = `
    ${incorrect.length > 0 ? `<p>Wrong</p>` : ''}
    ${incorrect.map(letter => `<span>${letter}</span>`)}
    `;

    //display hangman part on Incorrect Input
    hangmanParts.forEach((part, index) => {
        const error = incorrect.length;

        if (index < error) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    //if popup is lost
    if (incorrect.length === hangmanParts.length) {
        message.innerText = 'You Lose!';
        popup.style.display = 'flex';
    }

}




//show notication slider 
function showNotification() {
    slider.classList.add('show');
    setTimeout(() => { slider.classList.remove('show'); }, 3000);
}


//Event Listener
restartButton.addEventListener('click', () => {

    //empty array
    correctedLetters.splice(0);
    incorrect.splice(0);

    //get a new letter from the pool
    let selectedWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];

    //update display
    displaySelectedWord();

    //update wrongletter
    updateWrongLetters();

    //update popup  
    popup.style.display = 'none'
})


window.addEventListener('keydown', e => {

    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctedLetters.includes(letter)) {
                correctedLetters.push(letter);
                displaySelectedWord();
            } else {
                showNotification();
            }
        } else {
            if (!incorrect.includes(letter)) {
                incorrect.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})



displaySelectedWord();