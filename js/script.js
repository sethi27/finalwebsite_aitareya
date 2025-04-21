/**
 * Mobile Menu Functionality
 *  the mobile navigation menu,  hamburger button toggle,
 * overlay interactions,  dropdown menu behavior
 */
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    if (hamburger && navLinks && menuOverlay) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Handle dropdowns in mobile view
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
        
        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a:not(.nav-link)');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * DOM Content Loaded Event Listener
 *  all necessary functionality when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initQuiz();
});

/**
 * Dish Card Popup Functionality
 *  the popup behavior for dish cards, including:
 * - Opening popups when clicking "Read More"
 * - Closing popups via close button or overlay
 * - Handling overlay interactions
 */
const cards = document.querySelectorAll('.dish-card');
const overlay = document.querySelector('.overlay');
const popups = document.querySelectorAll('.popup-content');
const closeButtons = document.querySelectorAll('.close-btn');

if (cards.length > 0 && overlay && popups.length > 0 && closeButtons.length > 0) {
    cards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const dishType = card.getAttribute('data-dish');
                const popup = document.getElementById(`${dishType}-popup`);
                if (popup) {
                    popup.classList.add('active');
                    overlay.classList.add('active');
                }
            });
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            popups.forEach(popup => popup.classList.remove('active'));
            overlay.classList.remove('active');
        });
    });

    overlay.addEventListener('click', function() {
        popups.forEach(popup => popup.classList.remove('active'));
        overlay.classList.remove('active');
    });
}

/**
 * Helper Function: getDisplayName
 * Converts file paths to human-readable display names
 * @param {string} path - The file path to convert
 * @returns {string} The formatted display name
 */
function getDisplayName(path) {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const nameWithoutExt = filename.replace('.html', '');
    
    // Special cases
    if (nameWithoutExt === 'index') return 'Home';
    if (nameWithoutExt === 'dishes') return 'Dishes';
    if (nameWithoutExt === 'map') return 'Interactive Map';
    
    // For dish pages
    if (nameWithoutExt === 'dish-tale') return 'Butter Chicken';
    if (nameWithoutExt === 'tacodishtale') return 'Tacos';
    if (nameWithoutExt === 'pizzamargeritatale') return 'Pizza Margherita';
    if (nameWithoutExt === 'australian-pie') return 'Australian Pie';
    
    // For other pages, capitalize words
    return nameWithoutExt.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

/**
 * Dish Card Expansion Functionality
 * Handles the expansion and collapse of dish cards
 * - Expands cards on click
 * - Closes expanded cards via close button or overlay
 * - Manages overlay visibility
 */
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.dish-card');
    const overlay = document.querySelector('.overlay');

    if (cards.length > 0 && overlay) {
        cards.forEach(card => {
            card.addEventListener('click', function() {
                if (!this.classList.contains('expanded')) {
                    this.classList.add('expanded');
                    overlay.classList.add('active');
                }
            });

            const closeButton = card.querySelector('.close-button');
            if (closeButton) {
                closeButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    card.classList.remove('expanded');
                    overlay.classList.remove('active');
                });
            }
        });

        overlay.addEventListener('click', function() {
            const expandedCard = document.querySelector('.dish-card.expanded');
            if (expandedCard) {
                expandedCard.classList.remove('expanded');
                overlay.classList.remove('active');
            }
        });
    }
});

/**
 * Quiz Data
 * Array of quiz questions with their options, correct answers, and explanations
 * Each question object contains:
 * - question: The quiz question text
 * - options: Array of possible answers
 * - correctAnswer: The correct answer
 * - explanation: Explanation of the correct answer
 */
const quizQuestions = [
    {
        question: "In which decade was Butter Chicken invented?",
        options: ["1940s", "1950s", "1960s", "1970s"],
        correctAnswer: "1950s",
        explanation: "Butter Chicken was born in the heart of Delhi in the 1950s at the iconic Moti Mahal restaurant."
    },
    {
        question: "Who invented Butter Chicken?",
        options: ["Kundan Lal Gujral", "Harpal Singh", "Vikram Patel", "Rajesh Kumar"],
        correctAnswer: "Kundan Lal Gujral",
        explanation: "It was invented by Kundan Lal Gujral, a Punjabi chef and restaurateur who was also one of the creators of tandoori chicken."
    },
    {
        question: "What is the origin of the word 'taco' in Mexican cuisine?",
        options: ["Spanish word for food", "Nahuatl word meaning 'half' or 'in the middle'", "Mayan word for wrap", "Aztec word for tortilla"],
        correctAnswer: "Nahuatl word meaning 'half' or 'in the middle'",
        explanation: "The word 'taco' comes from the Nahuatl word 'tlahco' which means 'half' or 'in the middle,' referring to the way it is formed."
    },
    {
        question: "When was Pizza Margherita created?",
        options: ["1869", "1879", "1889", "1899"],
        correctAnswer: "1889",
        explanation: "Pizza Margherita was created in 1889 by pizzaiolo Raffaele Esposito in honor of Queen Margherita of Savoy during her visit to Naples."
    },
    {
        question: "What do the colors of Pizza Margherita represent?",
        options: ["Naples city colors", "Mediterranean ingredients", "Italian flag", "Royal family colors"],
        correctAnswer: "Italian flag",
        explanation: "The pizza's colors were intentionally chosen to represent the Italian flag: red tomatoes, white mozzarella, and green basil."
    },
    {
        question: "How was Butter Chicken accidentally invented?",
        options: [
            "By mixing spices incorrectly",
            "By using leftover tandoori chicken with tomato gravy",
            "By adding too much cream to curry",
            "By overcooking the chicken"
        ],
        correctAnswer: "By using leftover tandoori chicken with tomato gravy",
        explanation: "The dish was created as a happy accident — leftover tandoori chicken was mixed with a rich tomato-based gravy made with butter and cream to prevent it from drying out."
    },
    {
        question: "When did tacos first appear in the United States?",
        options: ["1885", "1895", "1905", "1915"],
        correctAnswer: "1905",
        explanation: "The first mention of tacos in the United States appeared in a newspaper in 1905, and by the 1920s, taco stands were common in Los Angeles."
    },
    {
        question: "What recognition did Neapolitan pizza making receive in 2017?",
        options: [
            "World's Best Food Award",
            "UNESCO Intangible Cultural Heritage status",
            "European Union Protected Status",
            "Italian National Treasure designation"
        ],
        correctAnswer: "UNESCO Intangible Cultural Heritage status",
        explanation: "In 2017, the art of Neapolitan pizza making was recognized by UNESCO as an Intangible Cultural Heritage."
    },
    {
        question: "What was the earliest known form of tacos in Mexico?",
        options: [
            "Meat-filled corn tortillas",
            "Bean-filled wheat tortillas",
            "Fish-filled corn tortillas",
            "Vegetable-filled tortillas"
        ],
        correctAnswer: "Fish-filled corn tortillas",
        explanation: "Evidence suggests that indigenous people in the Valley of Mexico traditionally ate tacos filled with small fish."
    },
    {
        question: "What makes Pizza Margherita's mozzarella special?",
        options: [
            "It's aged for 3 months",
            "It's made from cow's milk",
            "It's made from water buffalo milk from Campania",
            "It's imported from France"
        ],
        correctAnswer: "It's made from water buffalo milk from Campania",
        explanation: "The mozzarella is made from the milk of water buffalo raised in the Campania region."
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let questionAnswered = false;

// DOM Elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const timerDisplay = document.getElementById('timer-display');
const timerBar = document.querySelector('.timer-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

/**
 * Quiz Initialization
 * Sets up the quiz functionality when the page loads
 * - Initializes quiz state
 * - Loads first question
 * - Sets up event listeners
 */
function initQuiz() {
    loadQuestion();
    startTimer();
    updateNavButtons();
}

/**
 * Load Question
 * Displays the current question and its options
 * - Updates question text
 * - Populates option buttons
 * - Resets option states
 */
function loadQuestion() {
    const current = quizQuestions[currentQuestion];
    questionEl.textContent = current.question;
    questionAnswered = false;
    
    optionsEl.innerHTML = '';
    current.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsEl.appendChild(button);
    });

    // Reset timer
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('time-up');
    timerBar.style.transform = 'rotate(0deg)';
}

/**
 * Option Selection Handler
 * Processes user's answer selection
 * @param {number} index - Index of the selected option
 */
function selectOption(index) {
    if (questionAnswered) return;
    questionAnswered = true;
    
    const buttons = optionsEl.getElementsByClassName('option-btn');
    
    // Remove previous selections
    Array.from(buttons).forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = true; // Disable all buttons immediately
    });

    const correctAnswerIndex = quizQuestions[currentQuestion].options.indexOf(quizQuestions[currentQuestion].correctAnswer);
    
    // Check if correct
    if (quizQuestions[currentQuestion].options[index] === quizQuestions[currentQuestion].correctAnswer) {
        buttons[index].classList.add('correct');
        score++;
        scoreEl.textContent = score;
    } else {
        buttons[index].classList.add('incorrect');
        buttons[correctAnswerIndex].classList.add('correct');
    }

    // Clear the timer and proceed to next question after 2 seconds
    clearInterval(timer);
    setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
            nextQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

/**
 * Timer Functionality
 * Manages the countdown timer for each question
 * - Starts countdown
 * - Updates timer display
 * - Handles time expiration
 */
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('time-up');
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Update timer bar rotation
        const rotation = (15 - timeLeft) * 24; 
        timerBar.style.transform = `rotate(${rotation}deg)`;

        if (timeLeft <= 5) {
            timerDisplay.classList.add('time-up');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!questionAnswered) {
                const buttons = optionsEl.getElementsByClassName('option-btn');
                const correctAnswerIndex = quizQuestions[currentQuestion].options.indexOf(quizQuestions[currentQuestion].correctAnswer);
                
                // Disable all buttons and show correct answer
                Array.from(buttons).forEach((btn, idx) => {
                    btn.disabled = true;
                    if (idx === correctAnswerIndex) {
                        btn.classList.add('correct');
                    }
                });
                
                questionAnswered = true;
                
                // Move to next question after delay
                setTimeout(() => {
                    if (currentQuestion < quizQuestions.length - 1) {
                        nextQuestion();
                    } else {
                        showResult();
                    }
                }, 2000);
            }
        }
    }, 1000);
}

/**
 * Navigation Functions
 * Handles moving between questions
 */
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
        startTimer();
        updateNavButtons();
    } else {
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        startTimer();
        updateNavButtons();
    }
}

/**
 * Update Navigation Buttons
 * Enables/disables prev/next buttons based on current question
 */
function updateNavButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next';
}

/**
 * Show Quiz Results
 * Displays final score and performance feedback
 */
function showResult() {
    clearInterval(timer);
    document.querySelector('.question-container').style.display = 'none';
    document.querySelector('.quiz-controls').style.display = 'none';
    resultEl.style.display = 'block';
    
    const scoreDisplay = document.querySelector('.score-display');
    
    if (score === 10) {
        resultMessage.textContent = 'Congratulations! You scored full! 🎉';
        scoreDisplay.classList.add('perfect');
        checkScore(score); // This will trigger the confetti
    } else {
        resultMessage.textContent = 'Well tried! Try again to get a perfect score!';
        scoreDisplay.classList.remove('perfect');
    }
}

/**
 * Restart Quiz
 * Resets quiz state and starts over
 */
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;
    resultEl.style.display = 'none';
    document.querySelector('.question-container').style.display = 'block';
    document.querySelector('.quiz-controls').style.display = 'flex';
    initQuiz();
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Start the quiz
initQuiz(); 


let confetti = [];
let isConfettiActive = false;

/**
 * Confetti Animation Class
 * Creates and manages confetti particles for celebration effects
 */
class Confetti {
    constructor() {
        this.x = random(width);
        this.y = random(-height, 0);
        this.size = random(5, 15);
        this.speed = random(2, 8);
        this.color = color(
            random(100, 255),
            random(100, 255),
            random(100, 255)
        );
        this.rotation = random(TWO_PI);
        this.rotationSpeed = random(-0.2, 0.2);
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > height) {
            this.y = random(-100, 0);
            this.x = random(width);
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        fill(this.color);
        noStroke();
        rect(0, 0, this.size, this.size);
        pop();
    }
}

/**

 * Handles the confetti animation canvas
 */
function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('confetti-container');
    for (let i = 0; i < 100; i++) {
        confetti.push(new Confetti());
    }
    noLoop();
}

function draw() {
    if (!isConfettiActive) return;
    
    clear();
    for (let piece of confetti) {
        piece.update();
        piece.display();
    }
}

/**
 * Window Resize Handler
 * Adjusts canvas size when window is resized
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/**
 * Start Confetti Animation
 * Initiates the celebration effect
 */
function startConfetti() {
    isConfettiActive = true;
    loop();
    setTimeout(() => {
        isConfettiActive = false;
        noLoop();
        clear();
    }, 5000);
}

/**
 * Score Check
 * Evaluates quiz performance and triggers appropriate celebration
 * @param {number} score - The user's final score
 */
function checkScore(score) {
    if (score === 10) {
        startConfetti();
    }
}