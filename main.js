// ================================
// ANIMACIONES DE NÚMEROS
// ================================
function animateNumbers() {
    const numbers = document.querySelectorAll('[data-target]');
    
    numbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                num.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                num.textContent = target;
            }
        };
        
        // Usar Intersection Observer para activar animación cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(num);
    });
}

// ================================
// ANIMACIONES DE SCROLL
// ================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.cap-card, .stat-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ================================
// EFECTO PARALLAX EN FORMAS
// ================================
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;
            shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });
}

// ================================
// NAVBAR CON EFECTO AL SCROLL
// ================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ================================
// SMOOTH SCROLL PARA LINKS
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// EFECTO TYPING EN HERO
// ================================
function initTypingEffect() {
    const highlight = document.querySelector('.title-highlight');
    if (!highlight) return;
    
    const words = ['Bienestar', 'Éxito', 'Enfoque', 'Balance'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            highlight.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            highlight.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    setTimeout(type, 3000);
}

// ================================
// CURSOR PERSONALIZADO
// ================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .cap-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// ================================
// EFECTO RIPPLE EN BOTONES
// ================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-impacto, .cta-button, .cta-nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initScrollAnimations();
    initParallax();
    initNavbarScroll();
    initSmoothScroll();
    initTypingEffect();
    initRippleEffect();
    // initCustomCursor(); // Descomentar para cursor personalizado
    
    console.log('✨ Manual de Bienestar Universitario cargado');
});

// ================================
// AÑADIR ESTILOS DINÁMICOS
// ================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        z-index: 9999;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
    
    .cursor-hover {
        width: 60px;
        height: 60px;
        border-color: rgba(236, 72, 153, 0.5);
        background: rgba(99, 102, 241, 0.1);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(dynamicStyles);
