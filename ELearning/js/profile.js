// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});

function loadProfile() {
    // Sync status from localStorage before rendering completed section
    syncCourseCompletionFromStorage();
    const completedCourses = getCompletedCourses();
    const completedCoursesContainer = document.getElementById('completedCoursesContainer');
    
    if (completedCourses.length > 0) {
        completedCoursesContainer.innerHTML = '<ol class="lesson-list">';
        completedCourses.forEach(course => {
            completedCoursesContainer.innerHTML += `<li>${course.name} - ${course.duration}</li>`;
        });
        completedCoursesContainer.innerHTML += '</ol>';
    } else {
        completedCoursesContainer.innerHTML = '<p class="text-muted">No completed courses yet.</p>';
    }
    
    // Load quiz history
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const quizHistoryBody = document.getElementById('quizHistoryBody');
    
    if (quizHistory.length > 0) {
        quizHistoryBody.innerHTML = '';
        quizHistory.forEach(quiz => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${quiz.date}</td>
                <td>${quiz.quiz}</td>
                <td>${quiz.score}%</td>
                <td><span class="badge bg-${quiz.passed ? 'success' : 'danger'}">
                    ${quiz.passed ? 'PASSED' : 'FAILED'}
                </span></td>
            `;
            quizHistoryBody.appendChild(row);
        });
    }
    
    // Calculate total points
    const totalPoints = (completedCourseIds.length * 100) + (quizHistory.filter(q => q.passed).length * 50);
    document.getElementById('totalPoints').textContent = totalPoints;
}