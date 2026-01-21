const quizData = [
    {
        question: "Qual é a linguagem de programação mais usada para desenvolvimento web front-end?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correct: 1
    },
    {
        question: "O que significa HTML?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: 0
    },
    {
        question: "Qual propriedade CSS é usada para mudar a cor do texto?",
        options: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "Qual método JavaScript é usado para adicionar um elemento ao final de um array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "O que é uma API?",
        options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Interface", "Automated Programming Interface"],
        correct: 0
    },
    {
        question: "Qual é a porta padrão para servidores HTTP?",
        options: ["8080", "443", "80", "3000"],
        correct: 2
    },
    {
        question: "O que significa CSS?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: 1
    },
    {
        question: "Qual tag HTML é usada para criar um link?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Qual é o operador de igualdade estrita em JavaScript?",
        options: ["==", "=", "===", "!="],
        correct: 2
    },
    {
        question: "O que é React?",
        options: ["Uma linguagem de programação", "Um banco de dados", "Uma biblioteca JavaScript", "Um servidor web"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');
const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');

totalEl.textContent = quizData.length;

function loadQuestion() {
    const data = quizData[currentQuestion];
    questionEl.textContent = data.question;
    
    optionsEl.innerHTML = '';
    data.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => selectOption(index);
        optionsEl.appendChild(button);
    });
    
    currentEl.textContent = currentQuestion + 1;
    progressEl.style.width = ((currentQuestion + 1) / quizData.length) * 100 + '%';
    nextBtn.style.display = 'none';
    selectedOption = null;
}

function selectOption(index) {
    if (selectedOption !== null) return;
    
    selectedOption = index;
    const options = optionsEl.querySelectorAll('.option');
    const correctIndex = quizData[currentQuestion].correct;
    
    options.forEach((option, i) => {
        option.classList.add('disabled');
        if (i === correctIndex) {
            option.classList.add('correct');
        }
        if (i === index && i !== correctIndex) {
            option.classList.add('incorrect');
        }
    });
    
    if (index === correctIndex) {
        score++;
        scoreEl.textContent = score;
    }
    
    nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizEl.style.display = 'none';
    resultEl.style.display = 'block';
    
    document.getElementById('final-score').textContent = score;
    
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '🏆 Perfeito! Você é um expert!';
    } else if (percentage >= 70) {
        message = '🎯 Muito bem! Excelente resultado!';
    } else if (percentage >= 50) {
        message = '👍 Bom trabalho! Continue estudando!';
    } else {
        message = '📚 Continue praticando! Você vai melhorar!';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    scoreEl.textContent = '0';
    quizEl.style.display = 'block';
    resultEl.style.display = 'none';
    loadQuestion();
}

// Initialize quiz
loadQuestion();
