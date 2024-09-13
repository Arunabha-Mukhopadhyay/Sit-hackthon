const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue');
const quizSection = document.querySelector('.quiz-section');
const questionText = document.querySelector('.question-text');
const options = document.querySelectorAll('.option');
const nextBtn = document.querySelector('.next-btn');
const headerScore = document.querySelector('.header-score');
const questionTotal = document.querySelector('.question-total');

let questionIndex = 0;
let score = 0;
let totalQuestions = fundamentalDutiesQuestions.length;

// Function to load a new question
function loadQuestion(index) {
  const currentQuestion = fundamentalDutiesQuestions[index];
  questionText.textContent = currentQuestion.question;

  options.forEach((option, i) => {
    option.textContent = currentQuestion.options[i];
    option.classList.remove('correct', 'incorrect', 'disabled'); // Reset option styles and enable them
    option.onclick = null; // Clear previous click events
    option.onclick = () => checkAnswer(option, currentQuestion.answer); // Add new click event
  });

  questionTotal.textContent = `${index + 1} of ${totalQuestions} Questions`;
  nextBtn.style.display = 'none'; // Hide the "Next" button initially
  quitBtn.style.display = 'inline-block'; // Make sure "Quit Quiz" button is visible
}

// Function to check the selected answer
function checkAnswer(option, correctAnswer) {
  // Disable all options once an answer is selected
  options.forEach(opt => {
    opt.classList.add('disabled');
    opt.onclick = null; // Disable the click event on all options
  });

  if (option.textContent.trim() === correctAnswer.trim()) {
    option.classList.add('correct');
    score++;
  } else {
    option.classList.add('incorrect');
    // Highlight the correct answer
    options.forEach((opt) => {
      if (opt.textContent.trim() === correctAnswer.trim()) {
        opt.classList.add('correct');
      }
    });
  }

  headerScore.textContent = `Score: ${score}/${totalQuestions}`;
  nextBtn.style.display = 'inline-block'; // Show the "Next" button after selecting an answer
}

// Event listener for the "Next" button
nextBtn.onclick = () => {
  if (questionIndex < totalQuestions - 1) {
    questionIndex++;
    loadQuestion(questionIndex);
  } else {
    showFinalScore(); // Show the final score after the last question
  }
};

// Function to display the final score
function showFinalScore() {
  alert(`Quiz completed! Your final score is ${score}/${totalQuestions}`);
  nextBtn.disabled = true; // Disable the "Next" button after the final question
}

// Event listeners for start, exit, continue buttons, and quit quiz
startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
};

exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};

continueBtn.onclick = () => {
  quizSection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  document.querySelector('.header').classList.add('hidden');
  document.querySelector('.home').classList.add('hidden');
  loadQuestion(questionIndex); // Load the first question
};

// Function to reset and start the quiz
function resetQuiz() {
  score = 0;
  questionIndex = 0;
  headerScore.textContent = `Score: ${score}/${totalQuestions}`;
  loadQuestion(questionIndex); // Start with the first question
}

const quitBtn = document.querySelector('.quit-btn');

quitBtn.onclick = () => {
  // Logic to quit the quiz and return to the home section
  quizSection.classList.remove('active'); // Hide the quiz section
  document.querySelector('.header').classList.remove('hidden'); // Show header
  document.querySelector('.home').classList.remove('hidden'); // Show home section
  resetQuiz(); // Reset the quiz if needed
};