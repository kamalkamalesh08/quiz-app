const questions = [
  {
    question: "What does REST stand for?",
    answers: [
      { text: "Representational State Transfer", correct: true },
      { text: "Remote Execution Standard Transfer", correct: false },
      { text: "Reliable Exchange Service Transfer", correct: false },
      { text: "Recursive Endpoint Syntax Tree", correct: false }
    ]
  },
  {
    question: "Which HTTP method is typically used for data retrieval?",
    answers: [
      { text: "GET", correct: true },
      { text: "POST", correct: false },
      { text: "PUT", correct: false },
      { text: "DELETE", correct: false }
    ]
  },
  {
    question: "Which status code means 'Not Found'?",
    answers: [
      { text: "500", correct: false },
      { text: "404", correct: true },
      { text: "200", correct: false },
      { text: "403", correct: false }
    ]
  },
  {
    question: "Which is a characteristic of RESTful APIs?",
    answers: [
      { text: "Stateful", correct: false },
      { text: "Tightly coupled", correct: false },
      { text: "Stateless", correct: true },
      { text: "Platform-specific", correct: false }
    ]
  },
  {
    question: "Which format is most commonly used for REST APIs?",
    answers: [
      { text: "HTML", correct: false },
      { text: "SOAP", correct: false },
      { text: "XML", correct: false },
      { text: "JSON", correct: true }
    ]
  },
  {
    question: "What does an HTTP 201 status code indicate?",
    answers: [
      { text: "Bad request", correct: false },
      { text: "Created", correct: true },
      { text: "No content", correct: false },
      { text: "Unauthorized", correct: false }
    ]
  },
  {
    question: "Which tool is commonly used to test APIs?",
    answers: [
      { text: "Postman", correct: true },
      { text: "Photoshop", correct: false },
      { text: "Excel", correct: false },
      { text: "Visual Studio Code", correct: false }
    ]
  },
  {
    question: "Which HTTP method is idempotent?",
    answers: [
      { text: "GET", correct: true },
      { text: "POST", correct: false },
      { text: "PATCH", correct: false },
      { text: "CONNECT", correct: false }
    ]
  },
  {
    question: "What does an API key do?",
    answers: [
      { text: "Slows down traffic", correct: false },
      { text: "Prevents encryption", correct: false },
      { text: "Authenticates requests", correct: true },
      { text: "Adds metadata", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a REST constraint?",
    answers: [
      { text: "Stateless", correct: false },
      { text: "Layered system", correct: false },
      { text: "Code on demand", correct: false },
      { text: "Session persistence", correct: true }
    ]
  },
  {
    question: "Which protocol is most commonly used for web APIs?",
    answers: [
      { text: "FTP", correct: false },
      { text: "SMTP", correct: false },
      { text: "HTTP", correct: true },
      { text: "TCP", correct: false }
    ]
  },
  {
    question: "Which HTTP method updates a resource completely?",
    answers: [
      { text: "PATCH", correct: false },
      { text: "PUT", correct: true },
      { text: "GET", correct: false },
      { text: "DELETE", correct: false }
    ]
  },
  {
    question: "What is OpenAPI formerly known as?",
    answers: [
      { text: "Postman", correct: false },
      { text: "Swagger", correct: true },
      { text: "YAML", correct: false },
      { text: "GraphQL", correct: false }
    ]
  },
  {
    question: "Which is true about SOAP?",
    answers: [
      { text: "Uses JSON", correct: false },
      { text: "Is simpler than REST", correct: false },
      { text: "Uses XML", correct: true },
      { text: "Only works in browsers", correct: false }
    ]
  },
  {
    question: "What’s a common format for API documentation?",
    answers: [
      { text: "CSV", correct: false },
      { text: "Markdown", correct: false },
      { text: "YAML or JSON", correct: true },
      { text: "TXT", correct: false }
    ]
  },
  {
    question: "Which response header contains the media type?",
    answers: [
      { text: "Content-Type", correct: true },
      { text: "Authorization", correct: false },
      { text: "User-Agent", correct: false },
      { text: "Accept-Encoding", correct: false }
    ]
  },
  {
    question: "Which tool helps define API structure in YAML?",
    answers: [
      { text: "Swagger/OpenAPI", correct: true },
      { text: "GitHub", correct: false },
      { text: "Docker", correct: false },
      { text: "Firebase", correct: false }
    ]
  },
  {
    question: "What does CORS stand for?",
    answers: [
      { text: "Cross-Origin Resource Sharing", correct: true },
      { text: "Client-Origin Routing Service", correct: false },
      { text: "Cross Output Routing Standard", correct: false },
      { text: "Custom Object Resource Set", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  nextButton.innerText = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  updateProgress();
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });
  if (isCorrect) score++;
  nextButton.style.display = 'inline-block';
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function updateProgress() {
  progressElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  progressElement.innerText = '';
  nextButton.innerText = 'Restart Quiz';
  nextButton.style.display = 'inline-block';
  nextButton.onclick = startQuiz;
}

startQuiz();
