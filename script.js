// ===== SINGLE PAGE APP NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navMenu = document.getElementById('navLinks');
const serviceRevealBtn = document.getElementById('serviceRevealBtn');
const serviceActionButtons = document.getElementById('serviceActionButtons');

// Function to show/hide sections
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active-section');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });
    document.querySelector(`[data-section="${sectionId}"]`)?.classList.add('active-nav');

    // Open service header options when user visits the services section
    if (sectionId === 'services' && serviceActionButtons) {
        serviceActionButtons.classList.remove('hidden');
        if (serviceRevealBtn) {
            serviceRevealBtn.textContent = 'Hide Options';
        }
    }

    // Close mobile menu if open
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
    }
}

// Add click event listeners to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Handle nav buttons (Start Project, Explore Services, etc.)
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('nav-btn')) {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                showSection(sectionId);
            }
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const menuBtn = document.getElementById('menuToggle');

if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('show');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuBtn && !menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// Close mobile menu on window resize to larger screen
window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
        navMenu.classList.remove('show');
    }
});

// ===== SERVICE REVEAL BUTTON =====
if (serviceRevealBtn && serviceActionButtons) {
    serviceRevealBtn.addEventListener('click', () => {
        serviceActionButtons.classList.toggle('hidden');
        serviceRevealBtn.textContent = serviceActionButtons.classList.contains('hidden') ? 'View Process & Pricing' : 'Hide Options';
    });
}

// ===== FORM HANDLING =====
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

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            feedback.style.color = "#ffb347";
            feedback.innerText = "Please enter a valid email address.";
            return;
        }

        feedback.style.color = "#a3e0a0";
        feedback.innerText = "Message sent successfully! I'll get back to you soon.";

        // Clear form after 2 seconds
        setTimeout(() => {
            form.reset();
            feedback.innerText = "";
        }, 2000);
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

// Observe service items and process cards for staggered animations
document.querySelectorAll('.service-item, .process-card, .benefit-card, .project-card, .testimonial-card, .pricing-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
});

// ===== LIVE PREVIEW BUTTON FUNCTIONALITY =====
document.querySelectorAll('.live-preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Live preview link would go here. This is a demo!');
    });
});

// ===== SMOOTH SCROLL BEHAVIOR (already handled by CSS) =====
document.documentElement.style.scrollBehavior = 'smooth';

// ===== PAGE LOAD INITIALIZATION =====
window.addEventListener('load', () => {
    // Ensure home section is visible on page load
    showSection('home');
    
    // Add staggered fade-in animation to hero elements
    const heroElements = document.querySelectorAll('.hero-content, .hero-visual');
    heroElements.forEach((el, index) => {
        el.style.animation = `fadeUp 0.7s ease-out ${index * 0.2}s both`;
    });

    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
    }
    startTypingAnimation();
});

function startTypingAnimation() {
    const typingElement = document.getElementById('typingCode');
    if (!typingElement) return;

    const codeLines = [
        "const project = 'Modern Website';",
        "const goal = 'Business Growth';",
        "function buildSite() {",
        "  return `${project} for ${goal}`;",
        "}",
        "buildSite();"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    typingElement.textContent = '';

    function typeNextChar() {
        if (lineIndex >= codeLines.length) {
            const cursor = document.createElement('span');
            cursor.className = 'code-cursor';
            typingElement.appendChild(cursor);
            return;
        }

        const currentLine = codeLines[lineIndex];
        if (charIndex < currentLine.length) {
            typingElement.textContent += currentLine[charIndex];
            charIndex++;
            setTimeout(typeNextChar, 60);
        } else {
            typingElement.textContent += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeNextChar, 300);
        }
    }

    typeNextChar();
}

// ===== UTILITY: Prevent form submission on Enter in textarea =====
const textarea = document.querySelector('textarea');
if (textarea) {
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
}
