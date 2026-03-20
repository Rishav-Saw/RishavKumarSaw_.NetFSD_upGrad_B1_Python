// Courses page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

function loadCourses() {
    // Sync status from localStorage before rendering
    syncCourseCompletionFromStorage();

    // Populate course table
    const tableBody = document.getElementById('courseTableBody');
    tableBody.innerHTML = '';
    
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.duration}</td>
            <td><span class="badge bg-${getStatusBadge(course.status)}">${course.status}</span></td>
            <td>${course.progress}%</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Populate course cards
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = '';
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.setAttribute('data-course-status', course.status);
        
        // Create ordered list of lessons
        let lessonsList = '<ol class="lesson-list">';
        course.lessons.forEach(lesson => {
            lessonsList += `<li>${lesson}</li>`;
        });
        lessonsList += '</ol>';
        
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                    <small>Progress</small>
                    <small>${course.progress}%</small>
                </div>
                <progress value="${course.progress}" max="100"></progress>
            </div>
            <h5 class="mt-3">Lessons:</h5>
            ${lessonsList}
            <button class="btn btn-custom mt-3 w-100" onclick="markComplete(${course.id})">
                ${course.status === 'completed' ? 'Completed ✓' : 'Mark as Complete'}
            </button>
        `;
        
        courseContainer.appendChild(card);
    });
}

function getStatusBadge(status) {
    switch(status) {
        case 'completed':
            return 'success';
        case 'in-progress':
            return 'warning';
        case 'not-started':
            return 'secondary';
        default:
            return 'secondary';
    }
}

function markComplete(courseId) {
    // mark course as complete via shared helper and re-render page
    markCourseAsCompleted(courseId);
    alert('Course marked as complete!');
    loadCourses();
}