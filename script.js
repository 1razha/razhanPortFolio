document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Typing Animation
    // ----------------------------------------------------
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const titles = [
            "Computer Science Student",
            "Programmer & Developer",
            "Network Engineer",
            "Tech Enthusiast"
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 150; // Typing speed

        function type() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                delay = 50; // Erase faster
            } else {
                typingElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                delay = 120; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                delay = 2000; // Pause at full title
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                delay = 500; // Pause before typing next
            }

            setTimeout(type, delay);
        }
        
        // Start typing
        setTimeout(type, 1000);
    }

    // ----------------------------------------------------
    // 2. Theme Customizer (Accent Colors)
    // ----------------------------------------------------
    const themeDots = document.querySelectorAll('.theme-dot');
    const root = document.documentElement;

    const accentThemes = {
        cyan: { color: '#00f2fe', glow: 'rgba(0, 242, 254, 0.4)', gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' },
        purple: { color: '#bd53f9', glow: 'rgba(189, 83, 249, 0.4)', gradient: 'linear-gradient(135deg, #bd53f9 0%, #6e0dd0 100%)' },
        emerald: { color: '#00ffaa', glow: 'rgba(0, 255, 170, 0.4)', gradient: 'linear-gradient(135deg, #00ffaa 0%, #00aa77 100%)' },
        amber: { color: '#f39c12', glow: 'rgba(243, 156, 18, 0.4)', gradient: 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)' }
    };

    // Load saved accent theme or default to cyan
    const activeAccent = localStorage.getItem('selected-accent') || 'cyan';
    setAccent(activeAccent);

    themeDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const theme = e.target.dataset.theme;
            setAccent(theme);
            localStorage.setItem('selected-accent', theme);
        });
    });

    function setAccent(themeName) {
        const theme = accentThemes[themeName] || accentThemes.cyan;
        root.style.setProperty('--accent-color', theme.color);
        root.style.setProperty('--accent-glow', theme.glow);
        root.style.setProperty('--accent-gradient', theme.gradient);

        // Update active class on dots
        themeDots.forEach(dot => {
            if (dot.dataset.theme === themeName) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ----------------------------------------------------
    // 3. Scroll Reveal (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, no need to track again
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ----------------------------------------------------
    // 4. Contact Form Handling & Toast
    // ----------------------------------------------------
    const contactForm = document.getElementById('portfolioContactForm');
    const toast = document.getElementById('toast');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessage').value;

            // Form dynamic validation
            if (!name || !email || !message) {
                showToast("Please fill in all fields.", "error");
                return;
            }

            // Create Mailto Link
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Hi Razhan,\n\n${message}\n\nFrom,\n${name}\nEmail: ${email}`);
            const mailtoUrl = `mailto:razhanbahmanahmad@gmail.com?subject=${subject}&body=${body}`;

            // Trigger success animation
            showToast("Preparing your message... Opening email client!", "success");
            
            // Open the mail application after a slight delay
            setTimeout(() => {
                window.location.href = mailtoUrl;
                contactForm.reset();
            }, 1500);
        });
    }

    function showToast(message, type = "success") {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 4000);
    }
});
