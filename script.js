//Make sure the html is loaded before running script
$(document).ready(function() {

//Quiz Variables
const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timer = document.getElementById('timer');
const submitButton = document.getElementById('submit-btn');
const dataContainer = document.getElementById('data-container');
const scoreEl = document.getElementById('score');

// Timer Variables
let count = 60;
var timeInt; 

// Score Variable
let score = 0;

// Shuffle Variables
let shuffledQuestions, currentQuestionIndex;

// Start Button Function
$(startButton).on('click', function() {
    startGame();
})

// Decriment Time
function counter() {
    $('#timer').text('Time Remaining: ' + --count);
    if (count < 1) {
        stopQuiz();
    }
}

// Next Button Function
$(nextButton).on('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Start Game Function
function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    dataContainer.classList.remove('hide');
    timeInt = setInterval(counter, 1000);
    setNextQuestion();
}

// Next Random Question Function
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Show Next Question Function
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button);
    });
}

// Reset Visible and Hidden Elements Function
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstElementChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

// Answer Checker Function
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        submitButton.classList.remove('hide')
        stopQuiz();
        // clearInterval(timeInt);
        // alert('You finished with ' + count + ' seconds left.');
        // var initials = prompt('Enter Initials for High Score Board!');
        // alert(initials + 's time left was ' + count + ' seconds');
    }
}

function stopQuiz(){
    clearInterval(timeInt);
    alert('You finished with ' + count + ' seconds left and ' + score + ' points!');
    var initials = prompt('Enter Initials for High Score Board!');
    alert(initials + 's score was ' + score + ' with ' + count + ' seconds left on the clock!');
    $(submitButton).on('click', resetState);
}

// Correct/Wrong Class Assignment Function
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
        score = ++score;
        scoreEl.innerText = 'Score: ' + score;
    } else {
        element.classList.add('wrong')
    }
    
}

// Corrct/Wrong Class Removal Function
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Questions
const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'What is 3 + 3?',
        answers: [
            {text: '6', correct: true},
            {text: '33', correct: false}
        ]
    },
    {
        question: 'What is 4 + 4?',
        answers: [
            {text: '8', correct: true},
            {text: '44', correct: false}
        ]
    },
    {
        question: 'What is 5 + 5?',
        answers: [
            {text: '10', correct: true},
            {text: '55', correct: false}
        ]
    }
]

})