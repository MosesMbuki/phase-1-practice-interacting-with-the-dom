// DOM Elements
const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');
const likesList = document.querySelector('.likes');

// Application state
let count = 0;
let timer;
let isPaused = false;
const likes = {};

// Function to update counter display
function updateCounter() {
    counter.textContent = count;
}

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            count++;
            updateCounter();
        }
    }, 1000);
}

// Plus button functionality
plusBtn.addEventListener('click', () => {
    if (!isPaused) {
        count++;
        updateCounter();
    }
});

// Minus button functionality
minusBtn.addEventListener('click', () => {
    if (!isPaused) {
        count--;
        updateCounter();
    }
});

// Like button functionality
heartBtn.addEventListener('click', () => {
    if (!isPaused) {
        const currentCount = count;

        // Initialize like count if not exists
        if (!likes[currentCount]) {
            likes[currentCount] = 0;
        }

        // Increment like count
        likes[currentCount]++;

        // Find or create like item
        let likeItem = document.querySelector(`[data-number="${currentCount}"]`);
        if (!likeItem) {
            likeItem = document.createElement('li');
            likeItem.dataset.number = currentCount;
            likesList.appendChild(likeItem);
        }

        // Update like display
        likeItem.textContent = `${currentCount} has ${likes[currentCount]} like${likes[currentCount] === 1 ? '' : 's'}`;
    }
});

// Pause/Resume functionality
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;

    if (isPaused) {
        // Pause behavior
        clearInterval(timer);
        pauseBtn.textContent = 'resume';

        // Disable all buttons except pause
        [plusBtn, minusBtn, heartBtn].forEach(btn => {
            btn.disabled = true;
        });
    } else {
        // Resume behavior
        startTimer();
        pauseBtn.textContent = 'pause';

        // Enable all buttons
        [plusBtn, minusBtn, heartBtn].forEach(btn => {
            btn.disabled = false;
        });
    }
});

// Comment functionality
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentItem = document.createElement('p');
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);
        commentInput.value = '';
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    updateCounter();
    startTimer();
});