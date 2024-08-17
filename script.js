const levels = [
    {
        mainImage: 'kukka.avif',
        mainSound: 'kukka.mp3',
        options: [
            { image: 'hammas.avif', sound: 'hammas.mp3' },
            { image: 'kukko.avif', sound: 'kukko.mp3' },
            { image: 'sukka.avif', sound: 'sukka.mp3' }
        ],
        correctOption: 'sukka.avif'
    },
    {
        mainImage: 'kokki.avif',
        mainSound: 'kokki.mp3',
        options: [
            { image: 'katto.avif', sound: 'katto.mp3' },
            { image: 'lokki.avif', sound: 'lokki.mp3' },
            { image: 'kattila.avif', sound: 'kattila.mp3' }
        ],
        correctOption: 'lokki.avif'
    },
    {
        mainImage: 'kuu.avif',
        mainSound: 'kuu.mp3',
        options: [
            { image: 'paistinpannu.avif', sound: 'paistinpannu.mp3' },
            { image: 'luu.avif', sound: 'luu.mp3' },
            { image: 'peruna.avif', sound: 'peruna.mp3' }
        ],
        correctOption: 'luu.avif'
    },
    {
        mainImage: 'lukko.avif',
        mainSound: 'lukko.mp3',
        options: [
            { image: 'kukko.avif', sound: 'kukko.mp3' },
            { image: 'mansikka.avif', sound: 'mansikka.mp3' },
            { image: 'matto.avif', sound: 'matto.mp3' }
        ],
        correctOption: 'kukko.avif'
    },
    {
        mainImage: 'katto.avif',
        mainSound: 'katto.mp3',
        options: [
            { image: 'matto.avif', sound: 'matto.mp3' },
            { image: 'kukka.avif', sound: 'kukka.mp3' },
            { image: 'tiskiharja.avif', sound: 'tiskiharja.mp3' }
        ],
        correctOption: 'matto.avif'
    },
    {
        mainImage: 'puu.avif',
        mainSound: 'puu.mp3',
        options: [
            { image: 'luuta.avif', sound: 'luuta.mp3' },
            { image: 'suu.avif', sound: 'suu.mp3' },
            { image: 'taulu.avif', sound: 'taulu.mp3' }
        ],
        correctOption: 'suu.avif'
    },
    {
        mainImage: 'laulu.avif',
        mainSound: 'laulu.mp3',
        options: [
            { image: 'kokki.avif', sound: 'kokki.mp3' },
            { image: 'sukka.avif', sound: 'sukka.mp3' },
            { image: 'taulu.avif', sound: 'taulu.mp3' }
        ],
        correctOption: 'taulu.avif'
    },
    {
        mainImage: 'sukka.avif',
        mainSound: 'sukka.mp3',
        options: [
            { image: 'kukka.avif', sound: 'kukka.mp3' },
            { image: 'lukko.avif', sound: 'lukko.mp3' },
            { image: 'imuri.avif', sound: 'imuri.mp3' }
        ],
        correctOption: 'kukka.avif'
    },
    {
        mainImage: 'lokki.avif',
        mainSound: 'lokki.mp3',
        options: [
            { image: 'saippua.avif', sound: 'saippua.mp3' },
            { image: 'lintu.avif', sound: 'lintu.mp3' },
            { image: 'kokki.avif', sound: 'kokki.mp3' }
        ],
        correctOption: 'kokki.avif'
    },
    {
        mainImage: 'hammas.avif',
        mainSound: 'hammas.mp3',
        options: [
            { image: 'kukko.avif', sound: 'kukko.mp3' },
            { image: 'lammas.avif', sound: 'lammas.mp3' },
            { image: 'mansikka.avif', sound: 'mansikka.mp3' }
        ],
        correctOption: 'lammas.avif'
    },
    {
        mainImage: 'suu.avif',
        mainSound: 'suu.mp3',
        options: [
            { image: 'lammas.avif', sound: 'lammas.mp3' },
            { image: 'luu.avif', sound: 'luu.mp3' },
            { image: 'peruna.avif', sound: 'peruna.mp3' }
        ],
        correctOption: 'luu.avif'
    },
    {
        mainImage: 'kukko.avif',
        mainSound: 'kukko.mp3',
        options: [
            { image: 'lukko.avif', sound: 'lukko.mp3' },
            { image: 'kukka.avif', sound: 'kukka.mp3' },
            { image: 'kuu.avif', sound: 'kuu.mp3' }
        ],
        correctOption: 'lukko.avif'
    }
];

let currentQuestions = [];
let currentQuestion = 0;
let selectedOption = 0;
let correctAnswers = 0;
let checkButtonClicked = false;
let endAudio;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('star-area').style.visibility = 'visible';
    document.getElementById('stars-container').style.visibility = 'visible';
    currentQuestions = getRandomQuestions(5);
    loadQuestion();
}

function getRandomQuestions(count) {
    const shuffled = [...levels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function preloadImages(srcs) {
    return Promise.all(srcs.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }));
}

function loadQuestion() {
    const question = currentQuestions[currentQuestion];
    
    preloadImages([
        question.mainImage,
        question.options[0].image,
        question.options[1].image,
        question.options[2].image
    ]).then(() => {
        document.getElementById('paakuva').src = question.mainImage;
        document.getElementById('option1').src = question.options[0].image;
        document.getElementById('option2').src = question.options[1].image;
        document.getElementById('option3').src = question.options[2].image;

        document.getElementById('check-button').style.display = 'block';
        document.getElementById('next-arrow').style.display = 'none';
        checkButtonClicked = false;

        setTimeout(() => playAudio('main'), 100);
    });
}

function selectOption(option) {
    selectedOption = option;
    const options = document.querySelectorAll('.option');
    options.forEach(optionElement => {
        optionElement.classList.remove('selected');
    });
    document.getElementById(`option${option}`).classList.add('selected');
    playAudio(option.toString());
}

function checkAnswer() {
    if (checkButtonClicked) return;
    
    checkButtonClicked = true;
    const question = currentQuestions[currentQuestion];
    if (document.getElementById(`option${selectedOption}`).src.includes(question.correctOption)) {
        document.getElementById(`option${selectedOption}`).classList.add('correct');
        correctAnswers++;
        updateStars(); 
        console.log("Correct answer, stars updated");
    } else {
        document.getElementById(`option${selectedOption}`).classList.add('incorrect');
        document.querySelector(`[src*="${question.correctOption}"]`).classList.add('correct');
    }
    
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('next-arrow').style.display = 'block';
}

function updateStars() {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '';
    for (let i = 0; i < correctAnswers; i++) {
        const starImg = document.createElement('img');
        starImg.src = 'tahti.avif';
        starImg.alt = 'tähti';
        starImg.className = 'star-icon';
        starsContainer.appendChild(starImg);
    }
}

function nextQuestion() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    currentQuestion++;
    if (currentQuestion >= currentQuestions.length) {
        showResult();
    } else {
        selectedOption = 0;
        loadQuestion();
    }
}

function showResult() {
    let starsHtml = '';
    for (let i = 0; i < correctAnswers; i++) {
        starsHtml += '<img src="tahti.avif" alt="tähti" class="star-icon">';
    }
    
    document.getElementById('question-container').innerHTML = `
        <p id="result">SAIT ${correctAnswers} / ${currentQuestions.length} OIKEIN</p>
        <div id="final-stars-container">${starsHtml}</div>
        <button onclick="restartGame()" style="background-color: transparent; color: black; border: 2px solid black; margin-top: 20px;">PELAA UUDELLEEN</button>
    `;
    document.getElementById('star-area').style.display = 'none';
}

function restartGame() {   
    currentQuestion = 0;
    selectedOption = 0;
    correctAnswers = 0;
    checkButtonClicked = false;
    currentQuestions = getRandomQuestions(5);
    
    document.getElementById('question-container').innerHTML = `
        <h1>ETSI RIIMIPARI SANALLE:</h1>
        <img id="paakuva" src="" alt="Pääkuva" class="main-image" onclick="playAudio('main')">
        <div class="options">
            <img id="option1" class="option" onclick="selectOption(1)" alt="Vaihtoehto 1">
            <img id="option2" class="option" onclick="selectOption(2)" alt="Vaihtoehto 2">
            <img id="option3" class="option" onclick="selectOption(3)" alt="Vaihtoehto 3">
        </div>
        <div id="game-controls">
            <button id="check-button" onclick="checkAnswer()">TARKISTA</button>
            <img id="next-arrow" src="nuoli.avif" onclick="nextQuestion()" style="display: none;" alt="Seuraava kysymys">
        </div>
    `;
    
    // Tyhjennä ja alusta tähtialue
    document.getElementById('stars-container').innerHTML = '';
    document.getElementById('star-area').style.display = 'block';
    document.getElementById('stars-container').style.visibility = 'visible';
    
    loadQuestion();
}

function playAudio(type) {
    const question = currentQuestions[currentQuestion];
    let audio;
    if (type === 'main') {
        audio = new Audio(question.mainSound);
    } else {
        const optionIndex = parseInt(type) - 1;
        audio = new Audio(question.options[optionIndex].sound);
    }
    audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startGame);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && document.getElementById('next-arrow').style.display !== 'none') {
            nextQuestion();
        }
    });
});