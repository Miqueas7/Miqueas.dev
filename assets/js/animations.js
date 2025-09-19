// =============================================
// ANIMATIONS SYSTEM
// =============================================

class AnimationSystem {
    constructor() {
        this.observers = [];
        this.animatedElements = new Set();
        this.init();
    }
    
    init() {
        // Initialize all animation systems
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initParallax();
        this.initCounterAnimations();
        this.initProgressBars();
        this.initTextAnimations();
        this.initCardAnimations();
        this.initLoadingAnimations();
    }
    
    // =============================================
    // Scroll Animations
    // =============================================
    initScrollAnimations() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animation || 'fadeInUp';
                    const delay = element.dataset.delay || 0;
                    const duration = element.dataset.duration || 800;
                    
                    setTimeout(() => {
                        element.style.animation = `${animation} ${duration}ms ease-out forwards`;
                        element.classList.add('animated');
                        
                        // Trigger specific animations
                        if (element.classList.contains('skill-progress')) {
                            this.animateSkillBar(element);
                        }
                        
                        if (element.classList.contains('stat-value')) {
                            this.animateCounter(element);
                        }
                        
                        if (element.classList.contains('timeline-item')) {
                            this.animateTimelineItem(element);
                        }
                    }, delay);
                    
                    // Unobserve after animation
                    if (!element.dataset.repeat) {
                        scrollObserver.unobserve(element);
                    }
                }
            });
        }, options);
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(`
            .fade-in, .slide-in, .scale-in, .rotate-in,
            .timeline-item, .project-card, .skill-item,
            .publication-card, .cert-card, section
        `);
        
        animatableElements.forEach(el => {
            scrollObserver.observe(el);
        });
        
        this.observers.push(scrollObserver);
    }
    
    // =============================================
    // Hover Effects
    // =============================================
    initHoverEffects() {
        // Project cards hover
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRipple(e, card);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.updateTilt(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetTilt(card);
            });
        });
        
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                this.createButtonGlow(e, btn);
            });
        });
        
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.animateNavLink(link);
            });
        });
    }
    
    // =============================================
    // Parallax Effects
    // =============================================
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                
                requestAnimationFrame(() => {
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }, { passive: true });
    }
    
    // =============================================
    // Counter Animations
    // =============================================
    initCounterAnimations() {
        // Already handled in main.js, but we'll enhance it
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            counter.addEventListener('animateCounter', () => {
                this.animateCounter(counter);
            });
        });
    }
    
    animateCounter(element) {
        if (this.animatedElements.has(element)) return;
        this.animatedElements.add(element);
        
        const target = parseInt(element.dataset.target || element.textContent);
        const duration = parseInt(element.dataset.duration || 2000);
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current = Math.min(current + increment, target);
            element.textContent = Math.floor(current);
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                if (element.dataset.suffix) {
                    element.textContent += element.dataset.suffix;
                }
                // Add completion animation
                element.style.animation = 'pulse 0.5s ease';
            }
        };
        
        updateCounter();
    }
    
    // =============================================
    // Progress Bars
    // =============================================
    initProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
    
    animateSkillBar(element) {
        if (this.animatedElements.has(element)) return;
        this.animatedElements.add(element);
        
        const targetWidth = element.dataset.level || element.style.width;
        element.style.width = '0%';
        
        setTimeout(() => {
            element.style.transition = 'width 1.5s ease-out';
            element.style.width = targetWidth;
            
            // Add shimmer effect
            const shimmer = document.createElement('div');
            shimmer.className = 'skill-shimmer';
            element.appendChild(shimmer);
        }, 100);
    }
    
    // =============================================
    // Text Animations
    // =============================================
    initTextAnimations() {
        // Glitch text effect
        document.querySelectorAll('.glitch').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glitch-active');
                setTimeout(() => {
                    element.classList.remove('glitch-active');
                }, 500);
            });
        });
        
        // Split text animations
        document.querySelectorAll('[data-split-text]').forEach(element => {
            this.splitText(element);
        });
    }
    
    splitText(element) {
        const text = element.textContent;
        element.textContent = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 50}ms`;
            span.className = 'char-animated';
            element.appendChild(span);
        });
    }
    
    // =============================================
    // Card Animations
    // =============================================
    initCardAnimations() {
        const cards = document.querySelectorAll('.project-card, .skill-item, .cert-card');
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
            
            // Add stagger effect on page load
            if (!this.animatedElements.has(card)) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // =============================================
    // Timeline Animations
    // =============================================
    animateTimelineItem(element) {
        if (this.animatedElements.has(element)) return;
        this.animatedElements.add(element);
        
        const isLeft = element.classList.contains('left');
        const initialX = isLeft ? '-50px' : '50px';
        
        element.style.opacity = '0';
        element.style.transform = `translateX(${initialX})`;
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            
            // Animate the timeline dot
            const dot = element.querySelector('::after');
            if (dot) {
                dot.style.animation = 'pulse 1s ease-out';
            }
        }, 200);
    }
    
    // =============================================
    // Loading Animations
    // =============================================
    initLoadingAnimations() {
        // Skeleton loading for dynamic content
        const skeletons = document.querySelectorAll('.skeleton');
        
        skeletons.forEach(skeleton => {
            skeleton.style.background = `
                linear-gradient(
                    90deg,
                    rgba(184, 115, 51, 0.1) 25%,
                    rgba(184, 115, 51, 0.2) 50%,
                    rgba(184, 115, 51, 0.1) 75%
                )
            `;
            skeleton.style.backgroundSize = '200% 100%';
            skeleton.style.animation = 'shimmer 1.5s infinite';
        });
    }
    
    // =============================================
    // Interactive Effects
    // =============================================
    createRipple(e, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    
    updateTilt(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const rotateX = percentY * 10;
        const rotateY = percentX * 10;
        
        element.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    }
    
    resetTilt(element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    
    createButtonGlow(e, button) {
        const glow = document.createElement('div');
        glow.className = 'button-glow';
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        
        button.appendChild(glow);
        
        setTimeout(() => glow.remove(), 1000);
    }
    
    animateNavLink(link) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.animation = 'bounce 0.5s ease';
            icon.addEventListener('animationend', () => {
                icon.style.animation = '';
            });
        }
    }
    
    // =============================================
    // Utility Methods
    // =============================================
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.animatedElements.clear();
    }
    
    reset() {
        this.animatedElements.clear();
        this.init();
    }
}

// =============================================
// Initialize Animation System
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    window.animationSystem = new AnimationSystem();
});

// =============================================
// Animation Styles
// =============================================
const animationStyles = `
<style>
/* Ripple Effect */
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(184, 115, 51, 0.3);
    pointer-events: none;
    animation: rippleEffect 0.6s ease-out;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Button Glow */
.button-glow {
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(184, 115, 51, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: glowExpand 1s ease-out;
}

@keyframes glowExpand {
    to {
        transform: translate(-50%, -50%) scale(3);
        opacity: 0;
    }
}

/* Shimmer Effect */
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.skill-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    animation: shimmer 2s infinite;
}

/* Character Animation */
.char-animated {
    display: inline-block;
    animation: charFadeIn 0.5s ease-out backwards;
}

@keyframes charFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px) rotateX(90deg);
    }
    to {
        opacity: 1;
        transform: translateY(0) rotateX(0);
    }
}

/* Glitch Active */
.glitch-active {
    animation: glitchActive 0.5s ease-out;
}

@keyframes glitchActive {
    0%, 100% {
        text-shadow: 
            2px 2px 0px rgba(184, 115, 51, 0.5),
            -2px -2px 0px rgba(6, 182, 212, 0.5);
    }
    25% {
        text-shadow: 
            -2px 2px 0px rgba(245, 158, 11, 0.5),
            2px -2px 0px rgba(139, 92, 246, 0.5);
    }
    50% {
        text-shadow: 
            2px -2px 0px rgba(16, 185, 129, 0.5),
            -2px 2px 0px rgba(239, 68, 68, 0.5);
    }
}

/* Additional Animations */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes rotateIn {
    from {
        opacity: 0;
        transform: rotate(-180deg) scale(0.8);
    }
    to {
        opacity: 1;
        transform: rotate(0) scale(1);
    }
}

/* Skeleton Loading */
.skeleton {
    position: relative;
    overflow: hidden;
}

.skeleton::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(184, 115, 51, 0.1),
        transparent
    );
    animation: skeletonLoading 1.5s infinite;
}

@keyframes skeletonLoading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
</style>
`;

// Inject animation styles
document.head.insertAdjacentHTML('beforeend', animationStyles);