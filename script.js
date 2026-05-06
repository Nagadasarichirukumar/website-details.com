

// TYPING ANIMATION for multiple roles (professional)
const roles = ["Freelance Architect", "UI/UX Specialist", "Full‑Stack Pro", "Brand Partner"];
let idx = 0, charIdx = 0, deleting = false;
const roleSpan = document.getElementById("rotatingRole");
function animateTyping() {
    if (!roleSpan) return;
    const currentText = roles[idx];
    if (!deleting) {
        roleSpan.textContent = currentText.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === currentText.length) {
            deleting = true;
            setTimeout(animateTyping, 2000);
            return;
        }
    } else {
        roleSpan.textContent = currentText.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            idx = (idx + 1) % roles.length;
            setTimeout(animateTyping, 300);
            return;
        }
    }
    const speed = deleting ? 55 : 95;
    setTimeout(animateTyping, speed);
}
setTimeout(animateTyping, 500);

// mobile menu toggle
const menuBtn = document.getElementById('menuToggle');
const navMenu = document.getElementById('navLinks');
if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('show');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// Close mobile menu on window resize to larger screen
window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
        navMenu.classList.remove('show');
    }
});

// active nav + smooth scroll
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let currentActive = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) currentActive = sec.getAttribute('id');
    });
    navAnchors.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${currentActive}`) {
            link.classList.add('active-nav');
        }
    });
});

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navMenu.classList.contains('show')) navMenu.classList.remove('show');
        }
    });
});

// form handling professional
const form = document.getElementById('contactFreelanceForm');
const feedback = document.getElementById('formMessage');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('fullName').value.trim();
        const emailVal = document.getElementById('emailId').value.trim();
        const messageVal = document.querySelector('textarea').value.trim();
        if (!nameVal || !emailVal || !messageVal) {
            feedback.style.color = "#ffb347";
            feedback.innerText = "Please fill in all fields.";
            return;
        }
        feedback.style.color = "#a3e0a0";
        feedback.innerText = "Message sent successfully! I'll get back to you soon.";
        form.reset();
    });
}

// service card animation (original CSS version)
const serviceCards = document.querySelectorAll('.service-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(serviceCards).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.15}s`;
            entry.target.classList.add('show-card');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

serviceCards.forEach(card => observer.observe(card));

// services slider
const servicesContainer = document.querySelector('.services-container');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = 5; // 5 cards
let isMobile = window.innerWidth <= 850;
let autoSlideInterval;

function updateSlider() {
    if (isMobile) {
        // On mobile, use scroll-based positioning
        const cardWidth = 200 + 16; // card width + gap
        servicesContainer.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    } else {
        const slideWidth = 250 + 32; // card width + gap
        servicesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Update dots visibility based on screen size
    if (isMobile) {
        dots.forEach(dot => dot.style.display = 'none');
    } else {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
            dot.style.display = 'block';
        });
    }
}

function nextSlide() {
    if (!isMobile) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
}

function handleResize() {
    isMobile = window.innerWidth <= 850;
    updateSlider();
    if (isMobile) {
        clearInterval(autoSlideInterval);
    } else {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Touch/swipe functionality for mobile
let startX = 0;
let isDragging = false;

servicesContainer.addEventListener('touchstart', (e) => {
    if (!isMobile) return;
    startX = e.touches[0].clientX;
    isDragging = true;
});

servicesContainer.addEventListener('touchmove', (e) => {
    if (!isMobile || !isDragging) return;
    e.preventDefault();
});

servicesContainer.addEventListener('touchend', (e) => {
    if (!isMobile || !isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0 && currentSlide < totalSlides - 1) {
            currentSlide++;
        } else if (diffX < 0 && currentSlide > 0) {
            currentSlide--;
        }
        updateSlider();
    }
});

// Initialize
handleResize();
window.addEventListener('resize', handleResize);
