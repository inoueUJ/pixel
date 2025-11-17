// Screen management
let currentScreen = 'welcome';

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
    }, 100);
}

// Start button - Begin countdown
document.getElementById('startBtn').addEventListener('click', () => {
    showScreen('countdown');
    startCountdown();
});

// Countdown functionality
function startCountdown() {
    let count = 5;
    const countdownElement = document.getElementById('countdownNumber');

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.textContent = count;
            // Re-trigger animation
            countdownElement.style.animation = 'none';
            setTimeout(() => {
                countdownElement.style.animation = 'countdownPulse 1s ease';
            }, 10);
        } else {
            clearInterval(interval);
            showScreen('birthday');
            triggerConfetti();
        }
    }, 1000);
}

// Continue button - Go to treasure
document.getElementById('continueBtn').addEventListener('click', () => {
    showScreen('treasure');
});

// Treasure chest interaction
const treasureChest = document.getElementById('treasureChest');
let chestOpened = false;

treasureChest.addEventListener('click', () => {
    if (!chestOpened) {
        treasureChest.classList.add('open');
        chestOpened = true;
        triggerConfetti();

        // Show messages button after chest opens
        setTimeout(() => {
            document.getElementById('messagesBtn').style.display = 'inline-block';
        }, 1500);
    }
});

// Messages button
document.getElementById('messagesBtn').addEventListener('click', () => {
    showScreen('messages');
    triggerConfetti();
});

// Restart button
document.getElementById('restartBtn').addEventListener('click', () => {
    // Reset chest
    treasureChest.classList.remove('open');
    chestOpened = false;
    document.getElementById('messagesBtn').style.display = 'none';

    // Reset countdown
    document.getElementById('countdownNumber').textContent = '5';

    // Go back to welcome
    showScreen('welcome');
});

// Confetti functionality
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = [
            '#FF6B9D', '#C44569', '#FEA47F', '#F97F51',
            '#58B19F', '#3B3B98', '#EAB543', '#F8B500',
            '#FC427B', '#BDC581'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            return false;
        }
        return true;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function triggerConfetti() {
    // Create 100 confetti particles
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            confettiParticles.push(new ConfettiParticle());
        }, i * 10);
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles = confettiParticles.filter(particle => {
        particle.draw();
        return particle.update();
    });

    requestAnimationFrame(animateConfetti);
}

// Start confetti animation loop
animateConfetti();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add shake effect to treasure chest on hover
treasureChest.addEventListener('mouseenter', () => {
    if (!chestOpened) {
        treasureChest.style.animation = 'shake 0.5s ease';
    }
});

treasureChest.addEventListener('animationend', () => {
    treasureChest.style.animation = '';
});

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(1.05); }
        25% { transform: translateX(-10px) scale(1.05); }
        75% { transform: translateX(10px) scale(1.05); }
    }
`;
document.head.appendChild(style);

// Hide messages button initially
document.getElementById('messagesBtn').style.display = 'none';

// Keyboard shortcuts (optional enhancement)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (currentScreen === 'welcome') {
            document.getElementById('startBtn').click();
        } else if (currentScreen === 'birthday') {
            document.getElementById('continueBtn').click();
        } else if (currentScreen === 'treasure' && chestOpened) {
            document.getElementById('messagesBtn').click();
        }
    }
});
