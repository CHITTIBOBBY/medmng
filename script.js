// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(31, 53, 104, 0.15)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ========================================

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const element = document.querySelector(href);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const navHeight = navbar.offsetHeight;
            
            window.scrollTo({
                top: elementPosition - navHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SLIDESHOW FUNCTIONALITY - FIXED
// ========================================

let currentSlideIndex = 1;
let slideTimer = null;

function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlides(currentSlideIndex += n);
    startSlideshow();
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(currentSlideIndex = n);
    startSlideshow();
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    // Remove active class from all slides and dots
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Add active class to current slide and dot
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

function startSlideshow() {
    slideTimer = setTimeout(() => {
        currentSlideIndex++;
        showSlides(currentSlideIndex);
        startSlideshow();
    }, 5000); // Change slide every 5 seconds
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showSlides(currentSlideIndex);
        startSlideshow();
    }, 100);
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, impact cards, and founder section
document.querySelectorAll('.service-card, .impact-card, .founder-section, .about-us').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const statsObserverOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNum = entry.target.querySelector('.stat-number');
            if (statNum && !statNum.hasAttribute('data-animated')) {
                const numText = statNum.textContent;
                const number = parseInt(numText.replace(/[^\d]/g, ''));
                
                if (!isNaN(number) && number > 0) {
                    animateCounter(statNum, number, 2000);
                    statNum.setAttribute('data-animated', 'true');
                }
                
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, statsObserverOptions);

document.querySelectorAll('.stat-box').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// FORM SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            hospital: formData.get('hospital'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        console.log('Form submitted:', data);
        
        alert(`Thank you ${data.name}! Your inquiry has been received. We'll contact you soon at ${data.phone}.`);
        
        contactForm.reset();
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #1F3568';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

console.log('MediManage Solutions website initialized successfully!');