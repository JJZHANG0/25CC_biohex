// ================================
// Bubble Animation System
// ================================
function createBubble() {
    const bubblesContainer = document.getElementById('bubblesContainer');
    if (!bubblesContainer) return;
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random bubble properties
    const size = Math.random() * 60 + 20; // 20px to 80px
    const leftPosition = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const delay = Math.random() * 5; // 0s to 5s delay
    const drift = (Math.random() - 0.5) * 200; // -100px to 100px drift
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${leftPosition}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.setProperty('--bubble-drift', `${drift}px`);
    
    bubblesContainer.appendChild(bubble);
    
    // Remove bubble after animation completes
    setTimeout(() => {
        bubble.remove();
    }, (duration + delay) * 1000);
}

// Create bubbles continuously
function initBubbleAnimation() {
    // Create initial batch of bubbles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createBubble(), i * 300);
    }
    
    // Continue creating bubbles
    setInterval(() => {
        createBubble();
    }, 2000);
}

// ================================
// Navigation Functionality
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
}

// ================================
// Smooth Scrolling for Anchor Links
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Intersection Observer for Animations
// ================================
function initScrollAnimations() {
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
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.problem-card, .customer-card, .member-card, .gallery-item, .press-card, .model-card, .impact-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ================================
// Timeline Animation
// ================================
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
}

// ================================
// Contact Form Handler
// ================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message (in real implementation, send to backend)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Log form data (for development)
        console.log('Form submitted:', data);
    });
}

// ================================
// Number Counter Animation
// ================================
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    };
    
    updateNumber();
}

function initNumberCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateNumber(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ================================
// Loading Animation
// ================================
function initPageTransitions() {
    // Fade in page content on load
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading state if it's not a link or anchor
            if (!this.hasAttribute('href') || this.getAttribute('href') === '#') {
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

// ================================
// Parallax Effect for Hero
// ================================
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (!heroVisual) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        heroVisual.style.transform = `translateY(${rate}px)`;
    });
}

// ================================
// Gallery Lightbox (Simple)
// ================================
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.style.cursor = 'pointer';
        
        image.addEventListener('click', () => {
            // Simple zoom effect
            image.style.transition = 'transform 0.3s ease';
            
            if (image.classList.contains('zoomed')) {
                image.classList.remove('zoomed');
                image.style.transform = 'scale(1)';
            } else {
                // Remove zoom from other images
                document.querySelectorAll('.gallery-image.zoomed').forEach(img => {
                    img.classList.remove('zoomed');
                    img.style.transform = 'scale(1)';
                });
                
                image.classList.add('zoomed');
                image.style.transform = 'scale(1.05)';
            }
        });
    });
}

// ================================
// Add Active State to Current Page
// ================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ================================
// Highlight Section on Scroll
// ================================
function initSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update URL hash without scrolling
                // history.replaceState(null, null, `#${sectionId}`);
            }
        });
    });
}

// ================================
// Tooltip System (Optional Enhancement)
// ================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--text-dark);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                pointer-events: none;
                z-index: 10000;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                element._tooltip.remove();
                element._tooltip = null;
            }
        });
    });
}

// ================================
// Performance: Reduce Bubbles on Mobile
// ================================
function adjustBubblesForDevice() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Create fewer bubbles on mobile for better performance
        return 8;
    }
    return 15;
}

// ================================
// Initialize Everything
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 CleanBot Website Initialized');
    
    // Core functionality
    initBubbleAnimation();
    initNavigation();
    initSmoothScroll();
    setActiveNavLink();
    
    // Animations
    initScrollAnimations();
    initTimelineAnimation();
    initPageTransitions();
    initParallax();
    
    // Interactive features
    initContactForm();
    initNumberCounters();
    initGalleryLightbox();
    initSectionHighlight();
    initTooltips();
    
    // Log loaded
    console.log('✅ All features loaded successfully');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll handlers can go here
}, 100));

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Adjust bubble count if needed
    console.log('Window resized');
}, 250));