/**
 * Blondies Coffee Website - Component Loader
 * Dynamically loads header and footer components
 */

$(document).ready(function() {
    // Load header
    $('#header-placeholder').load('includes/header.html?t=' + new Date().getTime(), function(response, status, xhr) {
        if (status == "error") {
            console.log("Error loading header: " + xhr.status + " " + xhr.statusText);
        } else {
            console.log("Header loaded successfully");
            initializeHeader();
            // Trigger custom event for other scripts to listen to
            $(document).trigger('headerLoaded');
        }
    });
    
    // Load footer
    $('#footer-placeholder').load('includes/footer.html?t=' + new Date().getTime(), function(response, status, xhr) {
        if (status == "error") {
            console.log("Error loading footer: " + xhr.status + " " + xhr.statusText);
        } else {
            console.log("Footer loaded successfully");
            initializeFooter();
        }
    });
});

// Initialize header functionality after loading
function initializeHeader() {
    // Mobile menu toggle is handled by main.js - don't duplicate here
    // This prevents conflicts with the menu-active class management
    
    // Sticky header on scroll
    let isScrolling = false;
    function handleNavScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        isScrolling = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(handleNavScroll);
            isScrolling = true;
        }
    });
    
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    console.log('Header functionality initialized for page:', currentPage);
}

// Initialize footer functionality after loading
function initializeFooter() {
    // Newsletter form handling
    const newsletterForm = document.querySelector('#newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('.newsletter-button');
            const email = emailInput.value;
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const originalText = submitButton.textContent;
            submitButton.textContent = 'SUBSCRIBING...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'SUBSCRIBED!';
                submitButton.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }
    
    // Social media links (placeholder functionality)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            console.log(`Social link clicked: ${platform}`);
            // Here you would typically redirect to actual social media pages
        });
    });
    
    console.log('Footer functionality initialized');
}

// Utility function for email validation
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Smooth scroll for anchor links (if needed)
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const offsetTop = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll after components are loaded
window.addEventListener('load', function() {
    setTimeout(initSmoothScroll, 100);
});
