let currentQuestion = 0;
let score = 0;
let misses = 0;
let totalQuestionsPerRound = 5;
let maxMisses = 3;
let currentTheme = '';
let correctWord = '';

// Access the themes object from script.js
const themes = window.themes;

// Shuffle an array (for randomizing options)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate a fake word for incorrect options
function generateFakeWord(theme) {
    if (!themes[theme]) {
        console.error(`Theme '${theme}' not found.`);
        return "FakeWordError";
    }

    const { prefixes, roots, suffixes } = themes[theme];
    if (!prefixes.length || !roots.length || !suffixes.length) {
        console.error(`Theme '${theme}' has insufficient parts for fake word generation.`);
        return "FakeWordError";
    }

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const root = roots[Math.floor(Math.random() * roots.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix}-${root}-${suffix}`;
}

// Generate a new question
function generateQuestion() {
    // Use generateWordAndDefinition from script.js
    const { word, definition } = generateWordAndDefinition('pre-root-suf', currentTheme);
    correctWord = word;

    // Generate 3 fake words
    const fakeWords = [];
    while (fakeWords.length < 3) {
        const fakeWord = generateFakeWord(currentTheme);
        if (fakeWord !== correctWord && !fakeWords.includes(fakeWord) && fakeWord !== "FakeWordError") {
            fakeWords.push(fakeWord);
        }
    }

    // Combine and shuffle options
    const options = shuffleArray([correctWord, ...fakeWords]);

    // Update UI
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of ${totalQuestionsPerRound}`;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('misses').textContent = `Misses: ${misses}/${maxMisses}`;
    document.getElementById('wordDefinition').textContent = definition;
    document.getElementById('feedback').textContent = '';

    // Populate options
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsDiv.appendChild(button);
    });

    document.getElementById('nextButton').style.display = 'none';
}

// Check the user's answer
function checkAnswer(selected, button) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => btn.disabled = true); // Disable all buttons

    const feedback = document.getElementById('feedback');
    if (selected === correctWord) {
        button.classList.add('correct');
        feedback.textContent = 'Correct!';
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
    } else {
        button.classList.add('incorrect');
        feedback.textContent = `Incorrect! The correct word was "${correctWord}".`;
        misses++;
        document.getElementById('misses').textContent = `Misses: ${misses}/${maxMisses}`;
        // Highlight the correct answer
        options.forEach(btn => {
            if (btn.textContent === correctWord) {
                btn.classList.add('correct');
            }
        });
    }

    currentQuestion++;
    if (misses >= maxMisses) {
        showGameOver();
    } else if (currentQuestion >= totalQuestionsPerRound) {
        document.getElementById('nextButton').textContent = 'Start New Round';
        document.getElementById('nextButton').style.display = 'block';
        currentQuestion = 0; // Reset for the next round
    } else {
        document.getElementById('nextButton').textContent = 'Next Question';
        document.getElementById('nextButton').style.display = 'block';
    }
}

// Show the game over screen
function showGameOver() {
    document.getElementById('gameArea').style.display = 'none';
    const gameOverDiv = document.getElementById('gameOver');
    gameOverDiv.style.display = 'block';
    document.getElementById('finalScore').textContent = `Final Score: ${score}`;
}

// Start the game
function startGame() {
    currentTheme = document.getElementById('gameThemeType').value;
    if (!themes[currentTheme]) {
        alert(`Theme '${currentTheme}' is not available. Please wait for data to load or select another theme.`);
        return;
    }
    document.getElementById('themeSelection').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    misses = 0;
    generateQuestion();
}

// Restart the game
function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('themeSelection').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    misses = 0;
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    // loadWordParts() is called by script.js, so we just need to ensure data is ready
    const waitForData = setInterval(() => {
        if (Object.keys(themes).length > 0) {
            clearInterval(waitForData);
            document.getElementById('startButton').addEventListener('click', startGame);
            document.getElementById('nextButton').addEventListener('click', generateQuestion);
            document.getElementById('restartButton').addEventListener('click', restartGame);
        }
    }, 100);
});