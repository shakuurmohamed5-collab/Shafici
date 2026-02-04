document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
            
            // Toggle hamburger animation
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check on load
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // --- Sticky Navbar State ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.borderBottom = '1px solid rgba(0, 255, 65, 0.1)';
        } else {
            header.style.padding = '0';
            header.style.borderBottom = 'none';
        }
    });

    // --- Form Submission Handling (Visual Only) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Transmission Sent...';
            submitBtn.disabled = true;
            submitBtn.style.borderColor = '#00d4ff';
            submitBtn.style.color = '#00d4ff';

            setTimeout(() => {
                alert('Success! Your message has been encrypted and sent to Shakur.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
            }, 1500);
        });
    // --- Certificate Toggle ---
    const showMoreBtn = document.getElementById('show-more-certs');
    const hiddenCerts = document.querySelectorAll('.cert-hidden');
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const isHidden = hiddenCerts[0].style.display === 'none' || hiddenCerts[0].style.display === '';
            
            hiddenCerts.forEach(cert => {
                if (isHidden) {
                    cert.style.display = 'block';
                    cert.classList.add('active'); // Trigger reveal animation
                } else {
                    cert.style.display = 'none';
                }
            });
            
            if (isHidden) {
                showMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Certificates';
            } else {
                showMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Show More Certificates';
            }
        });
    }
});
