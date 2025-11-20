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

// ===== Dynamic Carousel Image Loading =====
function loadCarouselImages() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    // imagesディレクトリ内の画像ファイル名のリスト
    const imageFiles = [
        'photo1.png',
        'photo2.png',
        'photo3.png',
        'photo4.png',
        'photo5.png',
        'photo6.png'
    ];

    // 最初のセットを追加
    imageFiles.forEach((filename, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';

        const img = document.createElement('img');
        img.src = `images/${filename}`;
        img.alt = `思い出${index + 1}`;

        carouselItem.appendChild(img);
        carouselTrack.appendChild(carouselItem);
    });

    // 無限ループのために同じ画像を複製
    imageFiles.forEach((filename, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';

        const img = document.createElement('img');
        img.src = `images/${filename}`;
        img.alt = `思い出${index + 1}`;

        carouselItem.appendChild(img);
        carouselTrack.appendChild(carouselItem);
    });
}

// Load carousel images on page load
loadCarouselImages();

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

// ===== Gift Box Interaction =====
const giftLid = document.getElementById('giftLid');
const qmark = document.querySelector('.qmark');
const cameraGift = document.querySelector('.camera-gift');
const messageDialog = document.getElementById('messageDialog');
const closeDialogBtn = document.getElementById('closeDialog');
let isOpen = false;
let wasOpen = false;

if (giftLid) {
    giftLid.addEventListener('click', () => {
        if (!isOpen) {
            // Open the box
            giftLid.classList.remove('close');
            giftLid.classList.add('open');
            isOpen = true;
            wasOpen = true;

            // Change ? to !
            if (qmark) {
                qmark.textContent = '!';
            }

            // Show camera icon
            if (cameraGift) {
                cameraGift.classList.add('show');
            }

            // Trigger confetti
            triggerConfetti();

            // Show message dialog after 1.5 seconds
            setTimeout(() => {
                if (messageDialog) {
                    messageDialog.classList.add('show');
                }
            }, 1500);
        } else {
            // Close the box
            giftLid.classList.remove('open');
            giftLid.classList.add('close');
            isOpen = false;

            // Change ! back to ?
            if (qmark) {
                qmark.textContent = '?';
            }

            // Hide camera icon
            if (cameraGift) {
                cameraGift.classList.remove('show');
            }
        }
    });
}

// Close dialog button
if (closeDialogBtn) {
    closeDialogBtn.addEventListener('click', () => {
        if (messageDialog) {
            messageDialog.classList.remove('show');
        }
    });
}

// Close dialog when clicking overlay
if (messageDialog) {
    const overlay = messageDialog.querySelector('.dialog-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            messageDialog.classList.remove('show');
        });
    }
}
