// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    // Sync status from localStorage then compute values
    syncCourseCompletionFromStorage();
    const completedCourseCount = getCompletedCourses().length;
    const lastQuizResult = JSON.parse(localStorage.getItem('lastQuizResult')) || { percentage: 0 };
    
    // Update dashboard statistics
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('completedCourses').textContent = completedCourseCount;
    document.getElementById('avgScore').textContent = lastQuizResult.percentage + '%';
    
    // Display progress for each course
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.innerHTML = '';
    
    courses.forEach(course => {
        const progressDiv = document.createElement('div');
        progressDiv.className = 'mb-4';
        progressDiv.innerHTML = `
            <div class="d-flex justify-content-between mb-2">
                <h5>${course.name}</h5>
                <span>${course.progress}%</span>
            </div>
            <progress value="${course.progress}" max="100"></progress>
        `;
        progressContainer.appendChild(progressDiv);
    });
    
}