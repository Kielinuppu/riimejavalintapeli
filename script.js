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
let currentAudio = null;
let isFirstQuestion = true;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('star-area').style.display = 'block';
    currentQuestions = getRandomQuestions(5);
    isFirstQuestion = true;
    loadQuestion();
}

function getRandomQuestions(count) {
    const shuffled = [...levels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function loadQuestion() {
    const question = currentQuestions[currentQuestion];
    
    document.getElementById('paakuva').src = question.mainImage;
    document.getElementById('option1').src = question.options[0].image;
    document.getElementById('option2').src = question.options[1].image;
    document.getElementById('option3').src = question.options[2].image;

    document.getElementById('check-button').style.display = 'block';
    document.getElementById('next-arrow').style.display = 'none';
    checkButtonClicked = false;
    selectedOption = 0;
    
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    updateCheckButtonState();

    if (isFirstQuestion) {
        playAudio('valitse.mp3', () => {
            playAudio('main');
        });
        isFirstQuestion = false;
    } else {
        playAudio('main');
    }
}

function selectOption(option) {
    selectedOption = option;
    const options = document.querySelectorAll('.option');
    options.forEach(optionElement => {
        optionElement.classList.remove('selected');
    });
    document.getElementById(`option${option}`).classList.add('selected');
    playAudio(option.toString());
    updateCheckButtonState();
}

function updateCheckButtonState() {
    const checkButton = document.getElementById('check-button');
    checkButton.disabled = selectedOption === 0;
    checkButton.classList.toggle('disabled', selectedOption === 0);
}

function checkAnswer() {
    if (checkButtonClicked || selectedOption === 0) return;
    
    checkButtonClicked = true;
    const question = currentQuestions[currentQuestion];
    const selectedElement = document.getElementById(`option${selectedOption}`);
    
    if (selectedElement.src.includes(question.correctOption)) {
        selectedElement.classList.add('correct');
        correctAnswers++;
        updateStars();
        playAudio('oikein.mp3');
    } else {
        selectedElement.classList.add('incorrect');
        document.querySelector(`[src*="${question.correctOption}"]`).classList.add('correct');
        playAudio('vaarin.mp3');
    }
    
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('next-arrow').style.display = 'block';
}

function updateStars() {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '<img src="tahti.avif" alt="Tähti" class="star-icon">'.repeat(correctAnswers);
}

function nextQuestion() {
    stopAllAudio();
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    currentQuestion++;
    if (currentQuestion >= currentQuestions.length) {
        showResult();
    } else {
        loadQuestion();
    }
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h1>RIIMEJÄ</h1>
        <p id="result">SAIT ${correctAnswers} / ${currentQuestions.length} OIKEIN</p>
        <div id="final-stars-container">${'<img src="tahti.avif" alt="Tähti" class="star-icon">'.repeat(correctAnswers)}</div>
        <button onclick="restartGame()">PELAA UUDELLEEN</button>
    `;
    document.getElementById('star-area').style.display = 'none';
}

function restartGame() {
    stopAllAudio();
    currentQuestion = 0;
    selectedOption = 0;
    correctAnswers = 0;
    checkButtonClicked = false;
    isFirstQuestion = true;
    currentQuestions = getRandomQuestions(5);
    
    updateDOM();
    
    document.getElementById('star-area').style.display = 'block';
    document.getElementById('stars-container').innerHTML = '';
    
    loadQuestion();
}

function updateDOM() {
    document.getElementById('question-container').innerHTML = `
        <h2>VALITSE OIKEA KUVA:</h2>
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
}

function stopAllAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

function playAudio(type, callback) {
    stopAllAudio();

    let audioSrc;
    if (type === 'main') {
        audioSrc = currentQuestions[currentQuestion].mainSound;
    } else if (type === 'oikein.mp3' || type === 'vaarin.mp3' || type === 'valitse.mp3') {
        audioSrc = type;
    } else {
        const optionIndex = parseInt(type) - 1;
        audioSrc = currentQuestions[currentQuestion].options[optionIndex].sound;
    }

    currentAudio = new Audio(audioSrc);
    currentAudio.play().catch(error => console.error('Error playing audio:', error));

    if (callback) {
        currentAudio.onended = callback;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startGame);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && document.getElementById('next-arrow').style.display !== 'none') {
            nextQuestion();
        }
    });
});