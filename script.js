/* ==========================================================================
   Razhan Bahman | Modern Portfolio Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Sticky Navigation & ScrollSpy
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('header[id], section[id]');

    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function handleScrollSpy() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleScrollSpy();
    }, { passive: true });

    // Initial check
    handleNavbarScroll();
    handleScrollSpy();

    // ----------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ----------------------------------------------------
    // 3. Dynamic Typing Animation
    // ----------------------------------------------------
    const typingElement = document.querySelector('.typing-text');
    const prefixElement = document.querySelector('.hero-subtitle-prefix');

    if (typingElement) {
        const titles = [
            "Co-founder of ibyte.krd",
            "IT Systems & Network Engineer",
            "Custom PC Builder & Hardware Specialist",
            "Production Team Member at Mass Iraq",
            "Computer Science Graduate",
            "Student Guidance Assistant"
        ];
        let titleIndex = 0;
        let charIndex = titles[0].length;
        let isDeleting = true;
        let delay = 2500; // Display first title for a moment before erasing

        function type() {
            const currentTitle = titles[titleIndex];
            
            if (prefixElement) {
                const startsWithVowel = /^[aeiou]/i.test(currentTitle);
                prefixElement.textContent = startsWithVowel ? "I'm an" : "I'm a";
            }

            if (isDeleting) {
                typingElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                delay = 40; // Erase fast
            } else {
                typingElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                delay = 95; // Smooth typing speed
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                delay = 2400; // Hold completed word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                delay = 500; // Pause before next word
            }

            setTimeout(type, delay);
        }
        
        // Start typing loop
        setTimeout(type, delay);
    }

    // ----------------------------------------------------
    // 4. Accent Theme Switcher
    // ----------------------------------------------------
    const themeDots = document.querySelectorAll('.theme-dot');
    const root = document.documentElement;

    const accentThemes = {
        cyan: {
            color: '#38bdf8',
            glow: 'rgba(56, 189, 248, 0.28)',
            subtle: 'rgba(56, 189, 248, 0.08)',
            gradient: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)'
        },
        purple: {
            color: '#a855f7',
            glow: 'rgba(168, 85, 247, 0.28)',
            subtle: 'rgba(168, 85, 247, 0.08)',
            gradient: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)'
        },
        emerald: {
            color: '#10b981',
            glow: 'rgba(16, 185, 129, 0.28)',
            subtle: 'rgba(16, 185, 129, 0.08)',
            gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
        },
        amber: {
            color: '#f59e0b',
            glow: 'rgba(245, 158, 11, 0.28)',
            subtle: 'rgba(245, 158, 11, 0.08)',
            gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)'
        }
    };

    function setAccent(themeName) {
        const theme = accentThemes[themeName] || accentThemes.cyan;
        root.style.setProperty('--accent-color', theme.color);
        root.style.setProperty('--accent-glow', theme.glow);
        root.style.setProperty('--accent-subtle', theme.subtle);
        root.style.setProperty('--accent-gradient', theme.gradient);

        themeDots.forEach(dot => {
            if (dot.dataset.theme === themeName) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    const savedAccent = localStorage.getItem('selected-accent') || 'cyan';
    setAccent(savedAccent);

    themeDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const theme = e.currentTarget.dataset.theme;
            setAccent(theme);
            localStorage.setItem('selected-accent', theme);
        });
    });

    // ----------------------------------------------------
    // 5. Scroll Reveal (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(element => element.classList.add('active'));
    }

    // ----------------------------------------------------
    // 6. Interactive Contact Form & Toast
    // ----------------------------------------------------
    const contactForm = document.getElementById('portfolioContactForm');
    const toast = document.getElementById('toast');

    function showToast(message, type = "success") {
        if (!toast) return;
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.className = toast.className.replace("show", "").trim();
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('formName');
            const emailInput = document.getElementById('formEmail');
            const subjectInput = document.getElementById('formSubject');
            const messageInput = document.getElementById('formMessage');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
            const message = messageInput ? messageInput.value.trim() : '';

            // Validation check
            if (!name || !email || !message) {
                showToast("Please fill in your name, email, and message.", "error");
                return;
            }

            // Simple email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast("Please provide a valid email address.", "error");
                return;
            }

            // Construct mailto link
            const encodedSubject = encodeURIComponent(subject ? `[Portfolio] ${subject}` : `Message from ${name}`);
            const encodedBody = encodeURIComponent(`Hello Razhan,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`);
            const mailtoUrl = `mailto:razhanbahmanahmad@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

            showToast("Opening your email client to send message...", "success");

            setTimeout(() => {
                window.location.href = mailtoUrl;
                contactForm.reset();
            }, 1200);
        });
    }

    // ----------------------------------------------------
    // 7. Back to Top Smooth Scroll
    // ----------------------------------------------------
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
