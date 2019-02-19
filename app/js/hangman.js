"use strict";

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

// the secret words		
let words = [];

fetch('http://localhost:8080')
    .then(httpResp => httpResp.json())
    .then(response => words = response.words)
    .then(() => initialize())
    .catch(error => console.log(error));

function postData() {
    // let Msg ='';
    return fetch('http://localhost:8080',{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        body: JSON.stringify({inputValue: document.getElementById('dataInput').value}), // body data type must match "Content-Type" header
    })
        // .then(() => postData());
}

// the secret word from the above words chosen randomly at initialization
let secretWord;
// the secret word partially guessed - array of its letters
let word = [];
// number of lives
let lives = 6;

function displayWord() {
    let wordHtml = "";
    for (let i = 0; i < word.length; i++) {
        wordHtml = wordHtml + word[i] + " &nbsp; ";
    }
    document.getElementById("hold").innerHTML = wordHtml;
}


function displayLives() {
    if (lives == 0) {
        document.getElementById("mylives").innerHTML = "You lost the game!";
    } else {
        document.getElementById("mylives").innerHTML = "You have " + lives + " lives";
    }
}

function winGame() {
    let won = false;
    if (lives > 0) {
        won = true;

        for (let i = 0; i < word.length; i++) {
            if (word[i] == '_') {
                won = false;
            }
        }

        if (won) {
            document.getElementById("mylives").innerHTML = "You win the game!";
        }
    }

    return won;
}

function chooseLetter(letter) {
    if (lives == 0) {
        displayLives();
        return;
    }

    if (winGame()) {
        return;
    }

    let guessed = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] == letter) {
            guessed = true;
            word[i] = letter;
        }
    }
    if (guessed) {
        displayWord();
    } else {
        lives = lives - 1;
        displayLives();
    }

    winGame();
    document.getElementById("but" + letter).disabled = true;
}

// run at page load
function initialize() {
    // take a random word
    let i = Math.floor(Math.random() * words.length);
    secretWord = words[i];

    // init guessed word
    for (let i = 0; i < secretWord.length; i++) {
        if (i == 0 || i == secretWord.length - 1) {
            word[i] = secretWord[i];
        } else {
            word[i] = "_";
        }
    }

    // display alphabet
    let alphabetHtml = "";
    for (i = 0; i < alphabet.length; i++) {
        alphabetHtml = alphabetHtml + "<button id=\"but" + alphabet[i] + "\" onclick=\"chooseLetter('" + alphabet[i] + "');\">" + alphabet[i] + "</button>";
    }
    document.getElementById("buttons").innerHTML = alphabetHtml;

    displayLives();
    displayWord();
}

function playAgain() {
    location.reload();
}

