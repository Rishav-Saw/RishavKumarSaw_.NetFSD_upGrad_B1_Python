// Quiz functionality with async/await and Promises
let userAnswers = {};

document.addEventListener('DOMContentLoaded', function() {
    loadQuiz();
});

// Simulate async quiz loading with Promise
function loadQuizData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(quizQuestions);
        }, 1500);
    });
}

// Async function to load quiz
async function loadQuiz() {
    try {
        const questions = await loadQuizData();
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('quizContent').style.display = 'block';
        renderQuestions(questions);
    } catch (error) {
        console.error('Error loading quiz:', error);
        alert('Failed to load quiz. Please try again.');
    }
}

// Render quiz questions dynamically
function renderQuestions(questions) {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        
        let optionsHTML = '<div class="options">';
        q.options.forEach((option, optionIndex) => {
            optionsHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${q.id}" 
                           id="q${q.id}option${optionIndex}" value="${optionIndex}"
                           onchange="handleAnswerChange(${q.id}, ${optionIndex})">
                    <label class="form-check-label" for="q${q.id}option${optionIndex}">
                        ${option}
                    </label>
                </div>
            `;
        });
        optionsHTML += '</div>';
        
        questionDiv.innerHTML = `
            <h4>Question ${index + 1}</h4>
            <p class="lead">${q.question}</p>
            ${optionsHTML}
        `;
        
        container.appendChild(questionDiv);
    });
    
    // Add submit event listener
    document.getElementById('submitQuiz').onclick = submitQuiz;
}

// Handle answer selection - onchange event
function handleAnswerChange(questionId, selectedOption) {
    userAnswers[questionId] = selectedOption;
}

// Submit quiz - onclick event
function submitQuiz() {
    if (Object.keys(userAnswers).length < quizQuestions.length) {
        alert('Please answer all questions before submitting!');
        return;
    }
    
    const result = calculateGrade(userAnswers);
    displayResults(result);
    saveQuizResult(result);
}

// Calculate grade using if-else
function calculateGrade(answers) {
    let correctCount = 0;
    
    quizQuestions.forEach(question => {
        if (answers[question.id] === question.correctAnswer) {
            correctCount++;
        }
    });
    
    const percentage = calculatePercentage(correctCount, quizQuestions.length);
    const passed = determinePassFail(percentage);
    
    return {
        correctCount: correctCount,
        totalQuestions: quizQuestions.length,
        percentage: percentage,
        passed: passed
    };
}

// Calculate percentage
function calculatePercentage(correct, total) {
    return Math.round((correct / total) * 100);
}

// Determine pass/fail
function determinePassFail(percentage) {
    if (percentage >= 70) {
        return true;
    } else {
        return false;
    }
}

// Display results
function displayResults(result) {
    const feedbackMessage = getPerformanceFeedback(result.percentage);
    
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${result.correctCount}/${result.totalQuestions} (${result.percentage}%)`;
    document.getElementById('feedbackMessage').innerHTML = `
        <strong>${feedbackMessage}</strong><br>
        Status: ${result.passed ? '<span class="text-success">PASSED ✓</span>' : '<span class="text-danger">FAILED ✗</span>'}
    `;


}

// Performance feedback using switch statement
function getPerformanceFeedback(percentage) {
    switch(true) {
        case (percentage >= 90):
            return "Outstanding! You're a JavaScript expert!";
        case (percentage >= 80):
            return "Excellent work! You have a strong understanding!";
        case (percentage >= 70):
            return "Good job! You passed the quiz!";
        case (percentage >= 50):
            return "Not bad, but you need more practice!";
        default:
            return "Keep learning! Review the course materials and try again!";
    }
}

// Save quiz result to localStorage
function saveQuizResult(result) {
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    
    const quizRecord = {
        date: new Date().toLocaleDateString(),
        quiz: "JavaScript Fundamentals",
        score: result.percentage,
        passed: result.passed,
        correctAnswers: result.correctCount,
        totalQuestions: result.totalQuestions
    };
    
    quizHistory.push(quizRecord);
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
    localStorage.setItem('lastQuizResult', JSON.stringify(result));

    if (result.passed) {
        markCourseAsCompleted(1); // JS Fundamentals course is the quiz topic
    }
}