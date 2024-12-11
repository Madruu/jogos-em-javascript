//Gustavo Henrique Severiano
//Vitor Encinas Negrão de Tulio

// Lista de palavras para o jogo
const words = ["javascript", "programacao", "computador", "desenvolvimento", "internet"];
let wordToGuess = "";
let guessedWord = [];
let timeLeft = 45;
let timerInterval;
let gameOver = false;


function startGame() {
  gameOver = false;
  document.getElementById("message").textContent = "";
  document.getElementById("resetGame").style.display = "none";
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(wordToGuess.length).fill("_");
  updateWordDisplay();
  startTimer();
  document.getElementById("submitGuess").disabled = false;
}

function updateWordDisplay() {
  document.getElementById("word").textContent = guessedWord.join(" ");
}


function startTimer() {
  document.getElementById("timer").textContent = timeLeft;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver = true;
      document.getElementById("message").textContent = "Tempo esgotado! A palavra era: " + wordToGuess;
      document.getElementById("submitGuess").disabled = true;
      document.getElementById("resetGame").style.display = "block";
    } else {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
    }
  }, 1000);
}

function guessLetter() {
  if (gameOver) return;
  const guess = document.getElementById("guess").value.toLowerCase();
  if (guess && guess.length === 1 && /^[a-zA-Z]+$/.test(guess)) {
    let correctGuess = false;
    for (let i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === guess && guessedWord[i] === "_") {
        guessedWord[i] = guess;
        correctGuess = true;
      }
    }
    updateWordDisplay();
    
    if (guessedWord.join("") === wordToGuess) {
      clearInterval(timerInterval);
      document.getElementById("message").textContent = "Parabéns! Você adivinhou a palavra!";
      document.getElementById("submitGuess").disabled = true;
      document.getElementById("resetGame").style.display = "block";
    } else if (!correctGuess) {
      document.getElementById("message").textContent = "Letra incorreta, tente novamente!";
    }
    
    document.getElementById("guess").value = "";
  }
}

function resetGame() {
  timeLeft = 45;
  startGame();
}


//EventListeners
document.getElementById("submitGuess").addEventListener("click", guessLetter);
document.getElementById("resetGame").addEventListener("click", resetGame);

startGame();