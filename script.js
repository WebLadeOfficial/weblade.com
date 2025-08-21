const translations = {
    ru: {
        typewriterTexts: [
            'Создаем Цифровое Совершенство',
            'Разрабатываем Веб-Приложения',
            'Продвигаем в Поисковых Системах',
            'Настраиваем Эффективную Рекламу',
            'Создаем UI/UX Дизайн',
            'Разрабатываем Мобильные Приложения'
        ]
    },
    en: {
        typewriterTexts: [
            'Crafting Digital Excellence',
            'Building Web Applications',
            'Boosting Search Rankings',
            'Creating Effective Advertising',
            'Designing UI/UX Interfaces',
            'Developing Mobile Apps'
        ]
    }
};

let currentLang = 'en';
let typewriter;



class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = options.typeSpeed || 80;
        this.deleteSpeed = options.deleteSpeed || 40;
        this.pauseTime = options.pauseTime || 2000;
        this.currentTextIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.charIndex = 0;
        this.isRunning = false;
    }

    type() {
        if (!this.isRunning) return;
        
        const fullText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.currentText = fullText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        this.element.innerHTML = this.currentText + '<span class="typewriter-cursor">|</span>';
        
        const cursor = this.element.querySelector('.typewriter-cursor');
        if (cursor) {
            cursor.style.display = 'inline';
            cursor.style.position = 'relative';
            cursor.style.marginLeft = '0';
            cursor.style.verticalAlign = 'baseline';
            cursor.style.lineHeight = 'inherit';
            
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.style.display = 'inline';
                    cursor.style.position = 'relative';
                }
            }, 0);
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === fullText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        this.timeoutId = setTimeout(() => this.type(), typeSpeed);
    }

    updateTexts(newTexts) {
        this.texts = newTexts;
        this.currentTextIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.charIndex = 0;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        this.start();
    }

    start() {
        this.isRunning = true;
        this.type();
    }

    stop() {
        this.isRunning = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const texts = translations[currentLang].typewriterTexts;
    
    if (typewriter) {
        typewriter.updateTexts(texts);
    } else {
        typewriter = new Typewriter(typewriterElement, texts, {
            typeSpeed: 80,
            deleteSpeed: 40,
            pauseTime: 2000
        });
        typewriter.start();
    }
}

function switchLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('[data-en][data-ru]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });

    initTypewriter();

    document.documentElement.lang = lang;
}

function createParticles() {
    const container = document.getElementById('particles');
    
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    let particleCount = 40;
    if (isMobile) {
        particleCount = 15;
    } else if (isTablet) {
        particleCount = 25;
    }
    
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const isCode = Math.random() < (isMobile ? 0.1 : 0.3);
        
        if (isCode) {
            const codeParticle = document.createElement('div');
            codeParticle.className = 'code-particle';
            const codeSnippets = [
                '</>', '{...}', 'const', 'function', '=>', '[]', '{}', 
                '<div>', 'npm', 'git', 'async', 'await', 'return', 
                'import', 'export', 'class', 'state', 'props', 'API',
                '404', '200', 'JSON', 'HTTP'
            ];
            codeParticle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            codeParticle.style.left = Math.random() * 100 + '%';
            codeParticle.style.animationDelay = Math.random() * 20 + 's';
            codeParticle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            codeParticle.style.fontSize = (Math.random() * 3 + 8) + 'px';
            container.appendChild(codeParticle);
        } else {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            const size = Math.random() * (isMobile ? 4 : 6) + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDelay = Math.random() * 25 + 's';
            particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
            container.appendChild(particle);
        }
    }
}

function initParallaxEffect() {
    let ticking = false;
    let lastScrollY = 0;
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        return;
    }
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        if (Math.abs(scrolled - lastScrollY) < 5) {
            ticking = false;
            return;
        }
        
        lastScrollY = scrolled;
        
        const rate1 = scrolled * -0.2;
        const rate2 = scrolled * -0.4;
        const rate3 = scrolled * -0.15;
        
        const shape1 = document.querySelector('.parallax-shape-1');
        const shape2 = document.querySelector('.parallax-shape-2');
        const shape3 = document.querySelector('.parallax-shape-3');
        
        if (shape1) shape1.style.transform = `translateY(${rate1}px) rotateZ(${scrolled * 0.05}deg)`;
        if (shape2) shape2.style.transform = `translateY(${rate2}px) rotateZ(${-scrolled * 0.03}deg)`;
        if (shape3) shape3.style.transform = `translateY(${rate3}px) rotateZ(${scrolled * 0.04}deg)`;
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

function initServiceTabs() {
    const tabs = document.querySelectorAll('.service-tab');
    const contents = document.querySelectorAll('.service-content');
    
    contents.forEach((content, index) => {
        if (index === 0) {
            content.style.display = 'block';
            content.classList.add('active');
        } else {
            content.style.display = 'none';
            content.classList.remove('active');
        }
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetService = this.dataset.service;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });
            
            this.classList.add('active');
            
            const targetContent = document.querySelector(`[data-content="${targetService}"]`);
            if (targetContent) {
                targetContent.style.display = 'block';
                setTimeout(() => targetContent.classList.add('active'), 10);
                if (window.innerWidth <= 768) {
                    targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function initScrollAnimationsUnified() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll, .fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

// (removed legacy initSmoothScrolling – enhanced version is defined later)

function initNavbarScroll() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const nav = document.querySelector('nav');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(26, 26, 26, 0.95)';
            nav.style.borderBottomColor = 'rgba(212, 175, 55, 0.5)';
            nav.style.backdropFilter = 'blur(25px)';
        } else {
            nav.style.background = 'rgba(26, 26, 26, 0.9)';
            nav.style.borderBottomColor = 'rgba(212, 175, 55, 0.3)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

function initFormHandling() {
    const form = document.querySelector('.modern-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        initRealTimeValidation(form);
        
        initNotificationHandlers();
    }
}

function initRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('valid', 'invalid');
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    field.classList.remove('valid', 'invalid');
    
    if (!value) {
        field.classList.add('invalid');
        return false;
    }
    
    let isValid = true;
    
    if (fieldName === 'name') {
        isValid = value.length >= 2;
    } else if (fieldName === 'contact') {
        isValid = value.includes('@') || value.includes('+') || value.includes('telegram') || value.includes('whatsapp');
    } else if (fieldName === 'message') {
        isValid = value.length >= 10;
    }
    
    if (isValid) {
        field.classList.add('valid');
    } else {
        field.classList.add('invalid');
    }
    
    return isValid;
}

function initNotificationHandlers() {
    const notification = document.getElementById('notification');
    const closeBtn = notification?.querySelector('.notification-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideNotification();
        });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const textElement = notification?.querySelector('.notification-text');
    
    if (notification && textElement) {
        notification.className = `notification ${type}`;
        textElement.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

function clearForm(form) {
    form.querySelectorAll('input, textarea').forEach(field => {
        field.value = '';
        field.classList.remove('valid', 'invalid');
        
        field.style.borderColor = '';
        field.style.boxShadow = '';
    });
    
    form.querySelector('input').focus();
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = document.querySelector('.modern-form');
    
    const nameInput = form.querySelector('input[name="name"]');
    const contactInput = form.querySelector('input[name="contact"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    const errors = [];
    
    const fields = [nameInput, contactInput, messageInput];
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            const fieldName = field.name === 'name' ? 'Name' : 
                            field.name === 'contact' ? 'Contact' : 'Message';
            errors.push(`${fieldName} is filled incorrectly`);
        }
    });
    
    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('.submit-btn');
    
    if (!submitBtn) {
        return;
    }
    
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = `
        <span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span>
        Sending...
    `;
    submitBtn.style.opacity = '0.7';
    submitBtn.style.transform = 'scale(0.98)';
    
    sendToTelegram(nameInput.value.trim(), contactInput.value.trim(), messageInput.value.trim()).then(() => {
        submitBtn.innerHTML = `✓ Sent!`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        showNotification('Thank you for your request! We will contact you soon.', 'success');
        
        clearForm(form);
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.style.transform = 'scale(1)';
            submitBtn.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--secondary-gold))';
        }, 1500);
    }).catch((error) => {
        submitBtn.innerHTML = `✗ Error!`;
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        
        showNotification('An error occurred while sending. Please try again.', 'error');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.style.transform = 'scale(1)';
            submitBtn.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--secondary-gold))';
        }, 1500);
    });
}

async function sendToTelegram(name, contact, message) {
    const BOT_TOKEN = '8114076800:AAFsiGCiK3zu8J4j5H9lh9QO0fBBRBIQRYs';
    const CHAT_ID = '-1002890319966';
    
    const telegramMessage = `
🆕 New request from WebLade website

👤 Name: ${name}
📱 Contact: ${contact}
💬 Message: ${message}

⏰ Time: ${new Date().toLocaleString('en-US')}
🌐 Source: ${window.location.href}
    `;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function initPortfolioEffect() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.transform = 'none';
        item.style.boxShadow = 'none';
    });
}

function initServiceCTAs() {
    document.querySelectorAll('.service-cta').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const contactForm = document.querySelector('.contact-form');
            contactForm.style.transform = 'scale(1.02)';
            contactForm.style.boxShadow = '0 25px 80px rgba(139, 92, 246, 0.3)';
            
            setTimeout(() => {
                contactForm.style.transform = 'scale(1)';
                contactForm.style.boxShadow = 'none';
            }, 1000);
        });
    });
}

// Лоадер
// Удалён вызов createLoader() и сама функция createLoader

// (removed duplicate throttle – single implementation kept below)

// Add performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance && window.performance.navigation) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    }
});

// Responsive particle recreation
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createParticles();
    }, 250);
});

// Add intersection observer for better performance
const lazyElements = document.querySelectorAll('[data-lazy]');
if (lazyElements.length > 0) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Lazy load functionality here
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    mobileMenu.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    mobileMenu.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        if (diffX > 50) {
            closeMobileMenu();
            isDragging = false;
        }
    });
    
    mobileMenu.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Handle mobile menu language switching
    const mobileLangBtns = mobileMenu.querySelectorAll('.lang-btn');
    mobileLangBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update both desktop and mobile language buttons
            const lang = this.dataset.lang;
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.remove('active');
                if (b.dataset.lang === lang) {
                    b.classList.add('active');
                }
            });
            switchLanguage(lang);
        });
    });
}

function initMobileMenuOverlay() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const closeBtn = document.querySelector('.mobile-menu-close');
    if (!mobileMenu || !overlay || !toggle || !closeBtn) return;
    function showOverlay() {
        overlay.classList.add('active');
    }
    function hideOverlay() {
        overlay.classList.remove('active');
    }
    toggle.addEventListener('click', showOverlay);
    closeBtn.addEventListener('click', hideOverlay);
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        hideOverlay();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hideOverlay();
    });
}

window.addEventListener('error', function(e) {
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
    });
}

function initProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    
    if (!progressBar || !progressFill) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = scrollPercent + '%';
    });
}

function initBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    const breadcrumbList = document.getElementById('breadcrumb-list');
    
    if (!breadcrumbs || !breadcrumbList) return;
    
    const sections = [
        { id: 'home', title: { ru: 'Главная', en: 'Home' }, icon: '🏠' },
        { id: 'services', title: { ru: 'Услуги', en: 'Services' }, icon: '⚙️' },
        { id: 'portfolio', title: { ru: 'Портфолио', en: 'Portfolio' }, icon: '💼' },
        { id: 'contact', title: { ru: 'Контакты', en: 'Contact' }, icon: '📞' }
    ];
    
    function updateBreadcrumbs() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
        
        // Find current section
        let currentSection = 'home';
        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= windowHeight * 0.3) {
                    currentSection = section.id;
                }
            }
        });
        
        // Update breadcrumbs
        breadcrumbList.innerHTML = '';
        sections.forEach((section, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';
            
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.className = 'breadcrumb-link';
            
            const icon = document.createElement('span');
            icon.className = 'breadcrumb-icon';
            icon.textContent = section.icon;
            
            const text = document.createElement('span');
            text.className = 'breadcrumb-text';
            text.textContent = section.title[currentLang];
            
            link.appendChild(icon);
            link.appendChild(text);
            li.appendChild(link);
            breadcrumbList.appendChild(li);
            
            // Stop at current section
            if (section.id === currentSection) {
                return;
            }
        });
        
        // Show/hide breadcrumbs
        if (scrollTop > 200) {
            breadcrumbs.classList.add('visible');
        } else {
            breadcrumbs.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', updateBreadcrumbs);
    updateBreadcrumbs();
}

function initEnhancedParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            const xPos = Math.sin(scrollTop * 0.001 + index) * 50;
            
            element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${scrollTop * 0.01}deg)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

function initMicroAnimations() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
    
    document.querySelectorAll('.portfolio-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            tab.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        tab.addEventListener('mouseleave', () => {
            tab.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Fast smooth scrolling with easing
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 400;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

function initEnhancedTypography() {
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('300 1em Inter'),
            document.fonts.load('400 1em Inter'),
            document.fonts.load('500 1em Inter'),
            document.fonts.load('600 1em Inter'),
            document.fonts.load('700 1em Inter'),
            document.fonts.load('300 1em Space Grotesk'),
            document.fonts.load('400 1em Space Grotesk'),
            document.fonts.load('500 1em Space Grotesk'),
            document.fonts.load('600 1em Space Grotesk'),
            document.fonts.load('700 1em Space Grotesk'),
            document.fonts.load('300 1em JetBrains Mono'),
            document.fonts.load('400 1em JetBrains Mono'),
            document.fonts.load('500 1em JetBrains Mono'),
            document.fonts.load('700 1em JetBrains Mono')
        ]).then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Text reveal animations
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        textObserver.observe(el);
    });
}

function initPerformanceOptimizations() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
        }, 16);
    });
    
    const criticalImages = [
        'img/war_room.png',
        'img/luna.png',
        'img/quantum.png',
        'img/orion.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}



function updateNavigation() {
    const sections = [
        { id: 'home', title: { ru: 'Главная', en: 'Home' }, icon: '🏠' },
        { id: 'services', title: { ru: 'Услуги', en: 'Services' }, icon: '⚙️' },
        { id: 'why-us', title: { ru: 'Почему мы', en: 'Why Us' }, icon: '⭐' },
        { id: 'portfolio', title: { ru: 'Портфолио', en: 'Portfolio' }, icon: '💼' },
        { id: 'testimonials', title: { ru: 'Отзывы', en: 'Testimonials' }, icon: '💬' },
        { id: 'contact', title: { ru: 'Контакты', en: 'Contact' }, icon: '📞' }
    ];
    
    function updateBreadcrumbs() {
        const breadcrumbs = document.querySelector('.breadcrumbs');
        const breadcrumbList = document.getElementById('breadcrumb-list');
        const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
        
        if (!breadcrumbs || !breadcrumbList) return;
        
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Find current section
        let currentSection = 'home';
        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= windowHeight * 0.3) {
                    currentSection = section.id;
                }
            }
        });
        
        // Update breadcrumbs
        breadcrumbList.innerHTML = '';
        sections.forEach((section, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';
            
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.className = 'breadcrumb-link';
            
            const icon = document.createElement('span');
            icon.className = 'breadcrumb-icon';
            icon.textContent = section.icon;
            
            const text = document.createElement('span');
            text.className = 'breadcrumb-text';
            text.textContent = section.title[currentLang];
            
            link.appendChild(icon);
            link.appendChild(text);
            li.appendChild(link);
            breadcrumbList.appendChild(li);
            
            // Stop at current section
            if (section.id === currentSection) {
                return;
            }
        });
        
        // Show/hide breadcrumbs
        if (scrollTop > 200) {
            breadcrumbs.classList.add('visible');
        } else {
            breadcrumbs.classList.remove('visible');
        }
    }
    
    // Update breadcrumbs on scroll and language change
    window.addEventListener('scroll', updateBreadcrumbs);
    
    // Update on language change
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', updateBreadcrumbs);
    });
    
    // Initial update
    updateBreadcrumbs();
}

function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.classList.add('visible');
                
                const delay = entry.target.dataset.delay;
                if (delay) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, parseInt(delay));
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    const contentSections = [
        'hero-content',
        'services-content', 
        'portfolio-content',
        'contact-content'
    ];
    
    contentSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });
}

function initEnhancedMicroAnimations() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
    
    document.querySelectorAll('.portfolio-item, .why-us-item, .testimonial').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            tab.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        tab.addEventListener('mouseleave', () => {
            tab.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    document.querySelectorAll('.why-us-icon, .feature-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
    
    switchLanguage('en');
    initTypewriter();
    
    initProgressBar();
    initEnhancedParallax();
    initEnhancedMicroAnimations();
    initSmoothScrolling();
    initEnhancedTypography();
    initPerformanceOptimizations();
    updateNavigation();
    initEnhancedScrollAnimations();
    
    initNavbarScroll();
    initPortfolioEffect();
    initMobileMenu();
    initFormHandling();
    createParticles();
    initServiceTabs();
    initServiceCTAs();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.dataset.lang);
        });
    });


    initMobileMenuOverlay();
});
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced scroll handler with throttling
const throttledScrollHandler = throttle(() => {
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressFill.style.width = scrollPercent + '%';
    }
    
    // Update breadcrumbs
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (breadcrumbs) {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 200) {
            breadcrumbs.classList.add('visible');
        } else {
            breadcrumbs.classList.remove('visible');
        }
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);