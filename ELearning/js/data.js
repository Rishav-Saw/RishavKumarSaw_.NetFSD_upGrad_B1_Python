// Course Data in Array of Objects
const courses = [
    {
        id: 1,
        name: "JavaScript Fundamentals",
        duration: "6 weeks",
        description: "Learn the core concepts of JavaScript programming",
        lessons: [
            "Introduction to JavaScript",
            "Variables and Data Types",
            "Functions and Scope",
            "Arrays and Objects",
            "DOM Manipulation",
            "Asynchronous JavaScript"
        ],
        progress: 75,
        status: "in-progress"
    },
    {
        id: 2,
        name: "HTML & CSS Mastery",
        duration: "4 weeks",
        description: "Master modern web design with HTML5 and CSS3",
        lessons: [
            "HTML Semantics",
            "CSS Selectors and Specificity",
            "Flexbox Layout",
            "CSS Grid",
            "Responsive Design",
            "Animations and Transitions"
        ],
        progress: 100,
        status: "completed"
    },
    {
        id: 3,
        name: "React Development",
        duration: "8 weeks",
        description: "Build modern web applications with React",
        lessons: [
            "React Basics",
            "Components and Props",
            "State Management",
            "Hooks",
            "Routing",
            "Advanced Patterns"
        ],
        progress: 30,
        status: "in-progress"
    },
    {
        id: 4,
        name: "Node.js Backend",
        duration: "6 weeks",
        description: "Create powerful backend applications with Node.js",
        lessons: [
            "Node.js Introduction",
            "Express Framework",
            "RESTful APIs",
            "Database Integration",
            "Authentication",
            "Deployment"
        ],
        progress: 0,
        status: "not-started"
    }
];

// Quiz Questions in Array of Objects
const quizQuestions = [
    {
        id: 1,
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
            "var myVariable;",
            "variable myVariable;",
            "v myVariable;",
            "declare myVariable;"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "Which method is used to add an element at the end of an array?",
        options: [
            "append()",
            "push()",
            "add()",
            "insert()"
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Oriented Markup",
            "Document Oriented Method"
        ],
        correctAnswer: 0
    },
    {
        id: 4,
        question: "Which keyword is used to create a function in JavaScript?",
        options: [
            "func",
            "function",
            "def",
            "method"
        ],
        correctAnswer: 1
    },
    {
        id: 5,
        question: "What is the result of: typeof []",
        options: [
            "array",
            "object",
            "list",
            "collection"
        ],
        correctAnswer: 1
    }
];

// Course completion storage helper functions
function getCompletedCourseIds() {
    const stored = JSON.parse(localStorage.getItem('completedCourses')) || [];
    if (!Array.isArray(stored)) {
        return [];
    }
    return stored.map(id => Number(id)).filter(id => !isNaN(id));
}

function syncCourseCompletionFromStorage() {
    const completedCourseIds = getCompletedCourseIds();
    courses.forEach(course => {
        if (completedCourseIds.includes(course.id)) {
            course.status = 'completed';
            course.progress = 100;
        }
    });
}

function getCompletedCourses() {
    syncCourseCompletionFromStorage();
    return courses.filter(course => course.status === 'completed');
}

function markCourseAsCompleted(courseId) {
    const completedCourseIds = getCompletedCourseIds();
    if (!completedCourseIds.includes(courseId)) {
        completedCourseIds.push(courseId);
        localStorage.setItem('completedCourses', JSON.stringify(completedCourseIds));
    }
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.status = 'completed';
        course.progress = 100;
    }
}
