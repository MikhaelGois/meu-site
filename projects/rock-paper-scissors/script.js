const choices = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultEl = document.getElementById('result');

function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(player, computer) {
    if (player === computer) return 'draw';
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function play(playerChoice) {
    const computerChoice = getComputerChoice();
    
    // Animate choices
    playerChoiceEl.classList.add('animate');
    computerChoiceEl.classList.add('animate');
    
    setTimeout(() => {
        playerChoiceEl.classList.remove('animate');
        computerChoiceEl.classList.remove('animate');
    }, 500);
    
    // Update displays
    playerChoiceEl.textContent = choices[playerChoice];
    computerChoiceEl.textContent = choices[computerChoice];
    
    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);
    
    // Update result
    resultEl.className = 'result ' + result;
    
    if (result === 'win') {
        resultEl.textContent = '🎉 Você ganhou!';
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (result === 'lose') {
        resultEl.textContent = '😢 Computador ganhou!';
        computerScore++;
        computerScoreEl.textContent = computerScore;
    } else {
        resultEl.textContent = '🤝 Empate!';
    }
    
    // Save scores
    localStorage.setItem('rps-player-score', playerScore);
    localStorage.setItem('rps-computer-score', computerScore);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerChoiceEl.textContent = '❓';
    computerChoiceEl.textContent = '❓';
    resultEl.className = 'result';
    resultEl.textContent = 'Escolha sua jogada!';
    localStorage.removeItem('rps-player-score');
    localStorage.removeItem('rps-computer-score');
}

// Load saved scores
window.onload = () => {
    const savedPlayerScore = localStorage.getItem('rps-player-score');
    const savedComputerScore = localStorage.getItem('rps-computer-score');
    
    if (savedPlayerScore) {
        playerScore = parseInt(savedPlayerScore);
        playerScoreEl.textContent = playerScore;
    }
    
    if (savedComputerScore) {
        computerScore = parseInt(savedComputerScore);
        computerScoreEl.textContent = computerScore;
    }
};
