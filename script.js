// ===== Treasure Chest Interaction =====
const treasureChest = document.getElementById('treasureChest');
let isChestOpen = false;

treasureChest.addEventListener('click', () => {
    if (!isChestOpen) {
        treasureChest.classList.add('open');
        isChestOpen = true;
        triggerConfetti();
    }
});

// ===== Confetti System =====
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let confettiParticles = [];

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.opacity = 1;
    }

    getRandomColor() {
        const colors = [
            '#FF6B9D', '#FFA07A', '#FFB6C1', '#98D8C8', '#DDA0DD',
            '#F0E68C', '#87CEEB', '#FFC0CB', '#FFD700', '#FF69B4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Fade out near bottom
        if (this.y > canvas.height * 0.8) {
            this.opacity -= 0.02;
        }

        // Remove if off screen
        if (this.y > canvas.height || this.opacity <= 0) {
            return false;
        }
        return true;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function triggerConfetti() {
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            confettiParticles.push(new ConfettiParticle());
        }, i * 15);
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

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(triggerConfetti, 500);
});

// ===== Smooth Scroll for Scroll Indicator =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('letter').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ===== Intersection Observer for Fade-In Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe message cards and letter elements
document.querySelectorAll('.message-card, .letter-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===== Camera Interaction =====
const camera = document.querySelector('.camera');
const cameraShutter = document.querySelector('.camera-shutter');

if (camera && cameraShutter) {
    // Camera shutter click - trigger flash and confetti
    cameraShutter.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling

        // Add flash class
        camera.classList.add('flash');

        // Trigger confetti
        triggerConfetti();

        // Remove flash class after animation
        setTimeout(() => {
            camera.classList.remove('flash');
        }, 500);
    });

    // Camera hover effect
    camera.addEventListener('mouseenter', () => {
        camera.style.animationPlayState = 'paused';
    });

    camera.addEventListener('mouseleave', () => {
        camera.style.animationPlayState = 'running';
    });
}

// Observe camera section for fade-in
const cameraDescription = document.querySelector('.camera-description');
if (cameraDescription) {
    cameraDescription.style.opacity = '0';
    cameraDescription.style.transform = 'translateX(-30px)';
    cameraDescription.style.transition = 'opacity 1s ease, transform 1s ease';
    observer.observe(cameraDescription);
}
