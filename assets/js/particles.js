// =============================================
// PARTICLES SYSTEM - MINING THEME
// =============================================

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
        // Configuration
        this.config = {
            particleCount: 100,
            particleSize: 2,
            particleSpeed: 0.5,
            connectionDistance: 120,
            mouseInteraction: true,
            colors: {
                particle: '#b87333',  // Copper
                connection: 'rgba(184, 115, 51, 0.15)',  // Copper transparent
                hover: '#f59e0b'  // Gold
            }
        };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        // Set canvas size
        this.resize();
        
        // Create particles
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * this.config.particleSpeed,
            vy: (Math.random() - 0.5) * this.config.particleSpeed,
            size: Math.random() * this.config.particleSize + 1,
            color: this.config.colors.particle,
            originalColor: this.config.colors.particle
        };
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx = -particle.vx;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy = -particle.vy;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Mouse interaction
            if (this.config.mouseInteraction && this.mouse.x !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const forceX = (dx / distance) * force * 0.5;
                    const forceY = (dy / distance) * force * 0.5;
                    
                    particle.vx -= forceX;
                    particle.vy -= forceY;
                    
                    // Change color when near mouse
                    particle.color = this.config.colors.hover;
                } else {
                    particle.color = particle.originalColor;
                }
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(184, 115, 51, ${opacity * 0.15})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        // Adjust particle count based on screen size
        const area = this.canvas.width * this.canvas.height;
        const baseArea = 1920 * 1080;
        const ratio = area / baseArea;
        this.config.particleCount = Math.floor(100 * ratio);
        
        // Recreate particles if needed
        if (this.particles.length !== this.config.particleCount) {
            const diff = this.config.particleCount - this.particles.length;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    this.particles.push(this.createParticle());
                }
            } else {
                this.particles = this.particles.slice(0, this.config.particleCount);
            }
        }
    }
    
    setupEventListeners() {
        // Mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Mouse leave
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    
    // Public methods
    setParticleCount(count) {
        this.config.particleCount = count;
        this.resize();
    }
    
    setColors(colors) {
        Object.assign(this.config.colors, colors);
        this.particles.forEach(particle => {
            particle.color = this.config.colors.particle;
            particle.originalColor = this.config.colors.particle;
        });
    }
    
    toggleMouseInteraction() {
        this.config.mouseInteraction = !this.config.mouseInteraction;
    }
    
    destroy() {
        // Clean up event listeners
        this.canvas.removeEventListener('mousemove');
        this.canvas.removeEventListener('mouseleave');
        window.removeEventListener('resize');
    }
}

// =============================================
// Initialize Particle System
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        window.particleSystem = new ParticleSystem(canvas);
        
        // Theme change handler
        const handleThemeChange = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                window.particleSystem.setColors({
                    particle: '#d4915c',
                    connection: 'rgba(212, 145, 92, 0.1)',
                    hover: '#f59e0b'
                });
            } else {
                window.particleSystem.setColors({
                    particle: '#b87333',
                    connection: 'rgba(184, 115, 51, 0.15)',
                    hover: '#f59e0b'
                });
            }
        };
        
        // Listen for theme changes
        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Performance optimization for mobile
        if (window.innerWidth < 768) {
            window.particleSystem.setParticleCount(50);
        }
    }
});