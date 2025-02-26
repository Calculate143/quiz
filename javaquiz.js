let currentQuestion = 0;
let userAnswers = new Array(10).fill(null);
let timer;
let score = 0;
const questions = [
    {
        question: "What is the JVM?",
        options: [
            "Java Variable Manager",
            "Javascript Version Manager",
            "Java Virtual Machine",
            "Just-in-Time Virtual Memory"
        ],
        correct: 2
    },
    {
        question: "Which keyword defines a class in Java?",
        options: [
            "struct",
            "class",
            "object",
            "interface"
        ],
        correct: 1
    },
    {
        question: "What is the correct signature for the `main` method?",
        options: [
            "public void main(String[] args)",
            "static int main()",
            "public static void main(String[] args)",
            "private void main(String args)"
        ],
        correct: 2
    },
    {
        question: "Which data type is NOT primitive?",
        options: [
            "int",
            "double",
            "String",
            "boolean"
        ],
        correct: 2
    },
    {
        question: "What is garbage collection?",
        options: [
            "A design pattern",
            "Deleting unused variables manually",
            "Automatic memory management",
            "A compiler error"
        ],
        correct: 2
    },
    {
        question: "How do you inherit a class in Java?",
        options: [
            "using",
            "inherits",
            "implements",
            "extends"
        ],
        correct: 3
    },
    {
        question: "Which package is used for input/output operations?",
        options: [
            "java.util",
            "java.net",
            "java.math",
            "java.io"
        ],
        correct: 3
    },
    {
        question: "What is an exception?",
        options: [
            "A logical error",
            "A compiler warning",
            "A runtime error",
            "A syntax error"
        ],
        correct: 2
    },
    {
        question: "Which keyword creates an object?",
        options: [
            "create",
            "alloc",
            "new",
            "object"
        ],
        correct: 2
    },
    {
        question: "What is the parent class of all Java classes?",
        options: [
            "Class",
            "Root",
            "Super",
            "Object"
        ],
        correct: 3
    }
];


// Function to start the quiz
function startQuiz() {
    // Add animation effect
    document.querySelector('.modal-content').classList.add('fade-out');
    
    // Store username if provided
    const usernameInput = document.getElementById('username');
    
    // Hide modal and show quiz with slight delay for animation
    setTimeout(() => {
        document.getElementById('instructionModal').classList.remove('show');
        document.getElementById('instructionModal').classList.add('d-none');
        document.getElementById('quizContainer').style.display = 'flex';
        
        // Animate card entrance
        const quizCard = document.querySelector('#quizContainer .card');
        quizCard.classList.add('card-animate');
        
        showQuestion();
        startTimer();
    }, 300);
}

// Function to display the current question
function showQuestion() {
    const q = questions[currentQuestion];
    
    // Update question text and counter with fade effect
    const questionText = document.getElementById('questionText');
    questionText.style.opacity = '0';
    
    setTimeout(() => {
        questionText.textContent = q.question;
        document.getElementById('currentQ').textContent = currentQuestion + 1;
        document.getElementById('totalQ').textContent = questions.length;
        questionText.style.opacity = '1';
    }, 200);
    
    // Clear and populate options with staggered animation
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'col-md-6';
        
        const btn = document.createElement('button');
        btn.className = 'btn option-btn w-100 mb-2 text-start';
        btn.innerHTML = option;
        btn.onclick = () => selectAnswer(index);
        btn.style.animationDelay = `${index * 0.1}s`;
        
        div.appendChild(btn);
        optionsDiv.appendChild(div);
    });
}

// Function to handle option selection
function selectAnswer(optionIndex) {
    // Visual feedback for selection
    const buttons = document.querySelectorAll('#options .btn');
    buttons.forEach((btn, index) => {
        if (index === optionIndex) {
            btn.classList.add('selected');
        }
        btn.disabled = true;
    });
    
    userAnswers[currentQuestion] = optionIndex;
    clearInterval(timer);
    
    // Brief delay before moving to next question
    setTimeout(() => {
        nextQuestion();
    }, 1);
}

// Function to manage the timer
function startTimer() {
    let timeLeft = 15;
    document.getElementById('timer').textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        // Add warning class when time is running low
        if(timeLeft <= 5) {
            document.getElementById('timer').classList.add('timer-warning');
        }
        
        if(timeLeft <= 0) {
            clearInterval(timer);
            userAnswers[currentQuestion] = null;
            
            // Flash timer on timeout
            document.getElementById('timer').classList.add('timer-flash');
            
            setTimeout(() => {
                nextQuestion();
            }, 800);
        }
    }, 1000);
}

// Function to move to the next question
function nextQuestion() {
    // Reset timer styling
    document.getElementById('timer').classList.remove('timer-warning', 'timer-flash');
    
    currentQuestion++;
    if(currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        // Fade out quiz container
        const quizContainer = document.getElementById('quizContainer');
        quizContainer.style.opacity = '0';
        
        setTimeout(() => {
            showResults();
        }, 1);
    }
}

// Function to display the results
function showResults() {
    let finalScore = 0; // Reset score before calculation
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'container mt-5';
    
    let resultsHTML = `
        <div class="card shadow">
            <div class="card-body">
                <h2 class="text-center mb-4">Quiz Results</h2>
                <div class="score-board mb-4">
                    <h4 class="text-center">Score: <span id="finalScore">0</span>/20</h4>
                </div>
    `;

    // Generate results for each question
    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correct;
        
        if (isCorrect) finalScore += 2;

        resultsHTML += `
            <div class="question-result mb-4 p-3 border rounded">
                <h5>Question ${index + 1}: ${q.question}</h5>
                <div class="options-container mt-2">
                    ${q.options.map((option, i) => `
                        <div class="option ${i === q.correct ? 'correct' : ''} 
                            ${userAnswer === i && !isCorrect ? 'incorrect' : ''}">
                            ${option}
                            ${i === q.correct ? '<span class="badge bg-success ms-2">Correct</span>' : ''}
                            ${userAnswer === i && !isCorrect ? '<span class="badge bg-danger ms-2">Your Answer</span>' : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="mt-2 fw-bold ${isCorrect ? 'text-success' : 'text-danger'}">
                    ${isCorrect ? 'Correct! (+2)' : 'Wrong! (+0)'}
                </div>
            </div>
        `;
    });

    resultsHTML += `
            <div class="text-center mt-4">
                <button class="btn btn-primary" onclick="printCertificate()">Print Certificate</button>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = resultsHTML;
    document.body.innerHTML = '';
    document.body.appendChild(resultsContainer);

    // Animate results appearance
    const resultCard = document.querySelector('.card');
    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultCard.style.opacity = '1';
        resultCard.style.transform = 'translateY(0)';
    }, 100);

    // Update final score on screen with counter animation
    const finalScoreElement = document.getElementById('finalScore');
    animateCounter(finalScoreElement, 0, finalScore, 1500);

    // Store final score for certificate generation
    sessionStorage.setItem('score', finalScore);
}

// Function for score counter animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to generate and print certificate
function printCertificate() {
    const printWindow = window.open('', '_blank');
    const username = sessionStorage.getItem('username') || 'Student';
    const score = sessionStorage.getItem('score') || 'N/A';
    const date = new Date().toLocaleString();
    
    printWindow.document.write(`
        <html>
<head>
    <title>Java Quiz Certificate</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="print.css">
</head>
<body>
    <div class="certificate-container">
        <div class="certificate">
            <div class="badge">Java</div>
            <div class="header">
                <h1 class="title">Certificate of Completion</h1>
                <h2 class="subtitle">Java Quiz Mastery</h2>
            </div>
            <div class="content">
                <div class="watermark">CERTIFIED</div>
                <p class="completion-text">This is to certify that</p>
                <h3 class="student-name">${username}</h3>
                <p class="completion-text">has successfully completed the Java Quiz</p>
                <div class="score">Score: ${score}/20</div>
                <p class="date">Date: ${date}</p>
            </div>
            <div class="certificate-footer">
                <div class="signature"></div>
                <div class="signature-title">Authorized Signature</div>
            </div>
            <button class="print-btn" onclick="window.print()">Print Certificate</button>
        </div>
    </div>
</body>
</html>
`);
    printWindow.document.close();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Show instruction modal on page load
    const modal = document.getElementById('instructionModal');
    if (modal) {
        modal.classList.add('show');
        modal.classList.remove('d-none');
    }
});