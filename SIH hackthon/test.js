const questions = [
  {
      question: "What is the duty of every citizen to the Constitution?",
      options: [
          "To follow laws",
          "To respect the National Flag",
          "To protect and preserve the Constitution",
          "To vote in elections"
      ],
      answer: "To protect and preserve the Constitution"
  },
  {
      question: "Which article of the Indian Constitution lists the Fundamental Duties?",
      options: [
          "Article 51A",
          "Article 12",
          "Article 21",
          "Article 370"
      ],
      answer: "Article 51A"
  },
  // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result');
const progress = document.getElementById('progress');

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.textContent = question.question;
  optionsContainer.innerHTML = '';
  question.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
  });
  updateProgress();
}

function checkAnswer(selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
      score++;
  }
  nextButton.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      loadQuestion();
      nextButton.disabled = true;
  } else {
      showResult();
  }
}

function updateProgress() {
  progress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function showResult() {
  questionContainer.classList.add('hidden');
  optionsContainer.classList.add('hidden');
  nextButton.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  resultText.textContent = `You answered ${score} out of ${questions.length} questions correctly.`;
}

loadQuestion();
nextButton.disabled = true;
