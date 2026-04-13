document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    if(loader) {
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
        });
        
        setTimeout(() => loader.classList.add('hidden'), 3000); 
    }

    // Intersection Observer for scroll animations
    const fadeSections = document.querySelectorAll('.fade-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeSections.forEach(section => {
        observer.observe(section);
    });
    const hamburger = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('mainHeader');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close Mobile Menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            products.forEach(product => {
                if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                    product.classList.remove('hide');
                } else {
                    product.classList.add('hide');
                }
            });
        });
    });

    // Contact Form Validation
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const fields = form.querySelectorAll('input, select, textarea');
            fields.forEach(field => {
                const formGroup = field.closest('.form-group');
                
                if (!field.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        formGroup.classList.add('error');
                        isValid = false;
                    } else {
                        formGroup.classList.remove('error');
                    }
                } else {
                    formGroup.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Mock submission effect
                const btn = form.querySelector('button');
                const origText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
                btn.style.opacity = '0.8';
                
                setTimeout(() => {
                    btn.innerHTML = 'Message Sent!';
                    btn.style.backgroundColor = '#25d366'; // Success green
                    btn.style.color = '#fff';
                    btn.style.borderColor = '#25d366';
                    
                    setTimeout(() => {
                        form.reset();
                        btn.innerHTML = origText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        btn.style.borderColor = '';
                        btn.style.opacity = '1';
                    }, 3000);
                }, 1500);
            }
        });

        // Remove error dynamically
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.closest('.form-group').classList.remove('error');
            });
        });
    }

    // Modal Logic
    const modal = document.getElementById('checkoutModal');
    const buyBtns = document.querySelectorAll('.buy-now-btn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');

    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});
