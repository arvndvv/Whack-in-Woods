let holes;
const scoreBoard = document.querySelector('.score');
let moles;
const displayBoard = document.querySelector('.displayBoard');
const startButton = document.querySelector('.startButton');
const timeboard = document.querySelector('.timeboard');
const hscore = document.querySelector('.hs');
const bgm = document.querySelector('#bgm');
bgm.volume = 0.3;
const whacSound = document.querySelector('#whacSound');
const moleSound = document.querySelector('#moleSound');
const restart = document.querySelector('.restart');
let lastHole;
let timeUp = false;
let timeLimit;
let score = 0;
let display;
let once;
let timeCountdown;
let hitWords = ['Dont Hit Me!', 'whack!', 'Ouch!', 'Smash!', 'Bang!', 'That Hurts!', 'Oh! Dear.', 'Be Kind!', 'Sooo cruelll!', 'Bleeding!', 'Noooooo!']

const getHolesAndMoles = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth < 800) {
        holes = document.querySelectorAll('.sm.hole');
        moles = document.querySelectorAll('.sm.mole');


    } else {
        holes = document.querySelectorAll('.hole');
        moles = document.querySelectorAll('.mole');


    }
}
getHolesAndMoles();
window.addEventListener('resize', (e) => {
    getHolesAndMoles();
});


let hS = localStorage.getItem('HighScore') || 0;
// check and display highscore
const updateHighscore = () => {
    if (score > hS) {
        hS = score;
        localStorage.setItem('HighScore', score);
        hscore.style.color = 'lawngreen';
        scoreBoard.style.color = 'lawngreen';
    }
    hscore.textContent = 'HighScore: ' + hS;

}
updateHighscore();


function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 800 + 200;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');

    moleSound.play();
    setTimeout(function() {
        hole.classList.remove('up');
        moleSound.pause();
        moleSound.currentTime = 0;


        if (!timeUp) popOut();

    }, time)
}
// popOut();

function startGame() {

    startButton.style.pointerEvents = 'none';
    timeCountdown = 40;
    timeboard.textContent = timeCountdown;
    timeLimit = 40000;
    display = 3;
    once = true;
    scoreBoard.textContent = 0;
    scoreBoard.dataset.score = 0;
    scoreBoard.style.display = 'block';
    displayBoard.textContent = display;
    timeup = false;
    score = 0;

    let startCountdown = setInterval(() => {
        if (display > 0) {
            display -= 1;
            displayBoard.textContent = display;

        } else {

            if (once) {
                once = false;
                displayBoard.textContent = 'Lets begin!';
                setTimeout(() => {
                    displayBoard.textContent = '';

                    popOut();

                }, 1000);
            }

            timeboard.textContent = timeCountdown;
            timeCountdown--;
            setTimeout(function() {
                timeUp = true;
                clearInterval(startCountdown);
                displayBoard.textContent = 'Game Over!';
                displayBoard.style.color = "#ea4849";
                restart.classList.remove('hide');

                updateHighscore();
            }, timeLimit);


        }
    }, 1000);
}

function restartGame() {
    location.reload();
}
startButton.addEventListener('click', startGame);
restart.addEventListener('click', restartGame);

function whack(e) {
    score++;
    hitWordsIndex = Math.floor(Math.random() * hitWords.length);
    displayBoard.textContent = hitWords[hitWordsIndex];
    whacSound.currentTime = 0.65;
    whacSound.play();
    updateHighscore();
    this.style.pointerEvents = 'none';
    this.style.backgroundImage = 'url("./img/yoda2.png")';
    setTimeout(() => {

        this.style.pointerEvents = 'all';
        this.style.backgroundImage = 'url("./img/yoda1.png")';
    }, 800);
    scoreBoard.textContent = score;
    scoreBoard.dataset.score = score;
}
moles.forEach(mole => {
    mole.addEventListener('click', whack);
})

function hideLoader() {
    setTimeout(() => {
        document.querySelector('.loadercontainer').classList.add('hideloader');

    }, 1000);
}