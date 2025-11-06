/**
 * Blondies Coffee Website - Main JavaScript
 * Handles navigation, smooth scrolling, form interactions, and other UI elements
 */

$(document).ready(function() {
    
    // ===========================
    // NAVIGATION
    // ===========================
    
    // Helper function to get menu elements dynamically
    function getMenuElements() {
        return {
            mobileMenu: $('#mobile-menu'),
            navMenu: $('#nav-menu')
        };
    }
    
    function setMenuAria(isOpen) {
        const elements = getMenuElements();
        if (elements.mobileMenu.length && elements.navMenu.length) {
            elements.mobileMenu.attr('aria-expanded', isOpen);
            elements.navMenu.attr('aria-hidden', !isOpen);
        }
    }
    
    // Mobile menu toggle - Use event delegation for dynamically loaded elements
    function initMobileMenu() {
        const elements = getMenuElements();
        const mobileMenu = elements.mobileMenu;
        const navMenu = elements.navMenu;
        
        if (mobileMenu.length && navMenu.length) {
            // Remove any existing handlers to prevent duplicates
            mobileMenu.off('click.mobileToggle');
            
            // Add click handler
            mobileMenu.on('click.mobileToggle', function() {
                const willOpen = !navMenu.hasClass('menu-active');
                // Remove any old 'active' class first
                mobileMenu.removeClass('active');
                navMenu.removeClass('active');
                $('.nav-menu').removeClass('active');
                $('.nav-toggle').removeClass('active');
                // Then toggle menu-active
                mobileMenu.toggleClass('menu-active');
                navMenu.toggleClass('menu-active');
                $('body').toggleClass('menu-open');
                setMenuAria(willOpen);
            });
        }
    }
    
    // Initialize mobile menu immediately if elements exist
    initMobileMenu();
    
    // Also initialize after a short delay to catch dynamically loaded elements
    setTimeout(initMobileMenu, 100);
    
    // Re-initialize when header is loaded (for dynamically loaded headers)
    $(document).on('headerLoaded', function() {
        setTimeout(initMobileMenu, 50);
        // Also update dropdown arrow when header loads
        setTimeout(setDropdownArrow, 100);
    });
    
    // Close button inside full-screen menu
    $(document).off('click', '.mobile-close').on('click', '.mobile-close', function(e) {
        // Prevent click from bubbling to .nav-menu
        e.stopPropagation();
        const elements = getMenuElements();
        // Remove menu-active classes
        elements.mobileMenu.removeClass('menu-active'); // hamburger icon
        elements.navMenu.removeClass('menu-active');   // current overlay, via #nav-menu
        $('.nav-menu').removeClass('menu-active'); // guarantee ALL overlays close
        $('.nav-toggle').removeClass('menu-active'); // REMOVE hamburger toggled look
        // Also remove any old 'active' class if it exists
        elements.mobileMenu.removeClass('active');
        elements.navMenu.removeClass('active');
        $('.nav-menu').removeClass('active');
        $('.nav-toggle').removeClass('active');
        $('body').removeClass('menu-open');
        setMenuAria(false);
        $('.nav-item-dropdown').removeClass('sub-active'); // Close all dropdowns
        $('.dropdown-menu').removeClass('sub-open');
    });
    
    // Dropdown menu toggle for mobile and desktop
    function handleDropdownToggle(e) {
        const isMobile = $(window).width() <= 768;
        const dropdown = $(this).closest('.nav-item-dropdown');
        const menu = dropdown.find('.dropdown-menu');
        
        if (isMobile) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); // Stop ALL handlers from firing
            
            // Check if dropdown is currently open
            const isOpen = dropdown.hasClass('sub-active') && menu.hasClass('sub-open');
            
            // Close all dropdowns first
            $('.nav-item-dropdown').removeClass('sub-active');
            $('.dropdown-menu').removeClass('sub-open');
            
            // Toggle current dropdown if it wasn't open
            if (!isOpen) {
                dropdown.addClass('sub-active');
                menu.addClass('sub-open');
            }
            
            // IMPORTANT: Don't close the mobile menu - only toggle dropdown
            return false;
        } else {
            // Desktop: toggle sub-active class for click handling
            e.preventDefault();
            e.stopPropagation();
            
            // Check if dropdown is currently open
            const isOpen = dropdown.hasClass('sub-active');
            
            // Close all dropdowns first
            $('.nav-item-dropdown').removeClass('sub-active');
            
            // Toggle current dropdown if it wasn't open
            if (!isOpen) {
                dropdown.addClass('sub-active');
            }
            
            // Close dropdown when clicking outside
            $(document).one('click', function(e) {
                if (!$(e.target).closest('.nav-item-dropdown').length) {
                    $('.nav-item-dropdown').removeClass('sub-active');
                }
            });
            
            return false;
        }
    }
    
    // Handle clicks on dropdown toggle (Pages link or arrow) - Use capture phase if needed
    $(document).off('click.dropdown', '.dropdown-toggle').on('click.dropdown', '.dropdown-toggle', handleDropdownToggle);
    
    // Handle clicks directly on the dropdown arrow image
    $(document).off('click.dropdown', '.dropdown-arrow').on('click.dropdown', '.dropdown-arrow', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const dropdown = $(this).closest('.nav-item-dropdown');
        const toggle = dropdown.find('.dropdown-toggle').first();
        
        if (toggle.length) {
            // Trigger the dropdown toggle handler
            handleDropdownToggle.call(toggle[0], e);
        }
        
        return false;
    });
    
    // Also handle clicks on nav-item-dropdown container (for both mobile and desktop)
    $(document).off('click.dropdown', '.nav-item-dropdown').on('click.dropdown', '.nav-item-dropdown', function(e) {
        // Only handle if clicking on the nav-item-dropdown itself, not inside dropdown menu
        // Don't handle if clicking on dropdown-link or dropdown-arrow (they have their own handlers)
        if (!$(e.target).closest('.dropdown-menu').length && 
            !$(e.target).hasClass('dropdown-link') &&
            !$(e.target).hasClass('dropdown-arrow') &&
            !$(e.target).closest('.dropdown-arrow').length) {
            
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const dropdown = $(this);
            const toggle = dropdown.find('.dropdown-toggle').first();
            
            if (toggle.length) {
                const isMobile = $(window).width() <= 768;
                const menu = dropdown.find('.dropdown-menu');
                
                if (isMobile) {
                    // Check if dropdown is currently open
                    const isOpen = dropdown.hasClass('sub-active') && menu.hasClass('sub-open');
                    
                    // Close all dropdowns first
                    $('.nav-item-dropdown').removeClass('sub-active');
                    $('.dropdown-menu').removeClass('sub-open');
                    
                    // Toggle current dropdown if it wasn't open
                    if (!isOpen) {
                        dropdown.addClass('sub-active');
                        menu.addClass('sub-open');
                    }
                    
                    // IMPORTANT: Keep nav-toggle menu-active - don't remove menu-active class
                    // Only mobile-close button should remove nav-toggle menu-active class
                    const menuElements = getMenuElements();
                    // Remove any old 'active' class first
                    menuElements.mobileMenu.removeClass('active');
                    menuElements.navMenu.removeClass('active');
                    $('.nav-menu').removeClass('active');
                    $('.nav-toggle').removeClass('active');
                    // Then ensure menu-active is set
                    menuElements.mobileMenu.addClass('menu-active'); // Ensure it stays menu-active
                    $('.nav-toggle').addClass('menu-active'); // Also ensure nav-toggle class stays
                    menuElements.navMenu.addClass('menu-active'); // Ensure menu stays open
                    
                    // Extra safeguard: use setTimeout to ensure menu-active class stays after any other handlers
                    setTimeout(function() {
                        const menuEls = getMenuElements();
                        if (menuEls.navMenu.hasClass('menu-active')) {
                            // Remove any old 'active' class
                            menuEls.mobileMenu.removeClass('active');
                            menuEls.navMenu.removeClass('active');
                            $('.nav-menu').removeClass('active');
                            $('.nav-toggle').removeClass('active');
                            // Ensure menu-active is set
                            menuEls.mobileMenu.addClass('menu-active');
                            $('.nav-toggle').addClass('menu-active');
                        }
                    }, 0);
                } else {
                    // Desktop: toggle sub-active class
                    const isOpen = dropdown.hasClass('sub-active');
                    
                    // Close all dropdowns first
                    $('.nav-item-dropdown').removeClass('sub-active');
                    
                    // Toggle current dropdown if it wasn't open
                    if (!isOpen) {
                        dropdown.addClass('sub-active');
                    }
                    
                    // Close dropdown when clicking outside
                    $(document).one('click', function(e) {
                        if (!$(e.target).closest('.nav-item-dropdown').length) {
                            $('.nav-item-dropdown').removeClass('sub-active');
                        }
                    });
                }
                
                return false;
            }
        }
    });
    
    // Close mobile menu and dropdown when clicking dropdown links
    $('.dropdown-link').on('click', function() {
        // Close dropdown on both mobile and desktop
        $('.nav-item-dropdown').removeClass('sub-active');
        $('.dropdown-menu').removeClass('sub-open');
        
        if ($(window).width() <= 768) {
            const elements = getMenuElements();
            elements.mobileMenu.removeClass('menu-active');
            elements.navMenu.removeClass('menu-active');
            $('.nav-menu').removeClass('menu-active');
            $('.nav-toggle').removeClass('menu-active');
            // Also remove any old 'active' class
            elements.mobileMenu.removeClass('active');
            elements.navMenu.removeClass('active');
            $('.nav-menu').removeClass('active');
            $('.nav-toggle').removeClass('active');
            $('body').removeClass('menu-open');
            setMenuAria(false);
        }
    });
    
    // Close mobile menu when clicking on nav links (but not dropdown toggles)
    // Use event delegation so it fires AFTER dropdown handlers
    $(document).off('click.navlink', '.nav-link').on('click.navlink', '.nav-link', function(e) {
        // EARLY CHECK: Don't handle if it's a dropdown toggle on mobile
        if ($(this).hasClass('dropdown-toggle') && $(window).width() <= 768) {
            // Let the dropdown handler manage this - don't interfere
            return;
        }
        
        // EARLY CHECK: Don't handle if clicking on nav-item-dropdown (but allow dropdown-link clicks)
        if ($(e.target).closest('.nav-item-dropdown').length && 
            $(window).width() <= 768 &&
            !$(e.target).hasClass('dropdown-link') && 
            !$(e.target).closest('.dropdown-link').length &&
            !$(e.target).hasClass('dropdown-arrow')) {
            // This is a click on the dropdown container or toggle, not a link
            // Let the dropdown handler manage this
            return;
        }
        
        // Don't close if clicking inside dropdown menu (unless it's a dropdown-link)
        if ($(e.target).closest('.dropdown-menu').length && 
            !$(e.target).hasClass('dropdown-link') && 
            !$(e.target).closest('.dropdown-link').length) {
            return;
        }
        
        // Close mobile menu for regular nav links OR dropdown links
        if ($(window).width() <= 768) {
            const elements = getMenuElements();
            elements.mobileMenu.removeClass('menu-active');
            $('.nav-toggle').removeClass('menu-active'); // Also remove nav-toggle class
            elements.navMenu.removeClass('menu-active');
            $('.nav-menu').removeClass('menu-active');
            // Also remove any old 'active' class
            elements.mobileMenu.removeClass('active');
            elements.navMenu.removeClass('active');
            $('.nav-menu').removeClass('active');
            $('.nav-toggle').removeClass('active');
            $('body').removeClass('menu-open');
            setMenuAria(false);
            $('.dropdown-menu').removeClass('sub-open');
        }
    });
    
    // Close dropdowns when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() <= 768) {
            // Don't handle if clicking on dropdown toggle or nav-item-dropdown (let dropdown handler manage it)
            if ($(e.target).closest('.dropdown-toggle').length || 
                ($(e.target).closest('.nav-item-dropdown').length && !$(e.target).closest('.dropdown-link').length)) {
                return;
            }
            
            if (!$(e.target).closest('.nav-item-dropdown').length) {
                $('.nav-item-dropdown').removeClass('sub-active');
                $('.dropdown-menu').removeClass('sub-open');
            }
        }
        
        // Close mobile menu when clicking outside navbar (but not on dropdown toggle)
        if (!$(e.target).closest('.navbar').length) {
            const elements = getMenuElements();
            elements.mobileMenu.removeClass('menu-active');
            elements.navMenu.removeClass('menu-active');
            $('.nav-menu').removeClass('menu-active');
            $('.nav-toggle').removeClass('menu-active');
            // Also remove any old 'active' class
            elements.mobileMenu.removeClass('active');
            elements.navMenu.removeClass('active');
            $('.nav-menu').removeClass('active');
            $('.nav-toggle').removeClass('active');
            $('body').removeClass('menu-open');
            setMenuAria(false);
            $('.dropdown-menu').removeClass('sub-open');
        }
    });
    
    // Sticky navigation on scroll
    const navbar = $('.navbar');
    const navbarHeight = navbar.outerHeight();
    
    function handleNavScroll() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 100) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    }
    
    $(window).on('scroll', throttle(handleNavScroll, 10));
    
    // ===========================
    // SMOOTH SCROLLING
    // ===========================
    
    // Smooth scroll for navigation links
    $('a[href*="#"]:not([href="#"])').on('click', function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                e.preventDefault();
                const offsetTop = target.offset().top - navbarHeight - 20;
                
                $('html, body').animate({
                    scrollTop: offsetTop
                }, 800, 'easeInOutCubic');
            }
        }
    });
    
    // Custom easing function
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    
    // ===========================
    // NEWSLETTER FORM
    // ===========================
    
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        const button = $(this).find('.newsletter-button');
        const originalText = button.text();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        button.text('SUBSCRIBING...').prop('disabled', true);
        
        setTimeout(function() {
            button.text('SUBSCRIBED!').removeClass('newsletter-button').addClass('newsletter-success');
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            
            setTimeout(function() {
                button.text(originalText).prop('disabled', false).removeClass('newsletter-success').addClass('newsletter-button');
                $('#newsletter-form')[0].reset();
            }, 3000);
        }, 1500);
    });
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    $('.benefit-card, .menu-item, .instagram-item, .section-title, .text-content, .image-grid').each(function() {
        observer.observe(this);
    });
    
    // ===========================
    // INSTAGRAM GALLERY
    // ===========================
    
    $('.instagram-item').on('click', function() {
        const imageUrl = $(this).find('img').attr('src');
        const imageAlt = $(this).find('img').attr('alt');
        openImageModal(imageUrl, imageAlt);
    });
    
    function openImageModal(imageUrl, imageAlt) {
        const modal = $(`
            <div class="image-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; opacity: 0;">
                <div class="modal-content" style="max-width: 90%; max-height: 90%; position: relative;">
                    <img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    <button class="modal-close" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer; padding: 5px;">&times;</button>
                </div>
            </div>
        `);
        
        $('body').append(modal);
        modal.animate({opacity: 1}, 300);
        
        modal.on('click', function(e) {
            if (e.target === this || $(e.target).hasClass('modal-close')) {
                modal.animate({opacity: 0}, 300, function() {
                    modal.remove();
                });
            }
        });
        
        $(document).on('keydown.modal', function(e) {
            if (e.keyCode === 27) { // Escape key
                modal.animate({opacity: 0}, 300, function() {
                    modal.remove();
                });
                $(document).off('keydown.modal');
            }
        });
    }
    
    // ===========================
    // LOADING ANIMATIONS
    // ===========================
    
    // Page loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
        
        // Animate elements in sequence
        setTimeout(function() {
            $('.hero-text').addClass('animate-in');
        }, 500);
        
        setTimeout(function() {
            $('.nav-container').addClass('animate-in');
        }, 800);
    });
    
    // ===========================
    // SCROLL TO TOP
    // ===========================
    
    // Add scroll to top button
    const scrollToTopBtn = $(`
        <button class="scroll-to-top" style="position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; border-radius: 50%; background: var(--primary-gold); border: none; color: white; font-size: 20px; cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 1000;">
            ↑
        </button>
    `);
    
    $('body').append(scrollToTopBtn);
    
    // Show/hide scroll to top button
    function handleScrollToTop() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 500) {
            scrollToTopBtn.css({opacity: 1, visibility: 'visible'});
        } else {
            scrollToTopBtn.css({opacity: 0, visibility: 'hidden'});
        }
    }
    
    $(window).on('scroll', throttle(handleScrollToTop, 100));
    
    scrollToTopBtn.on('click', function() {
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutCubic');
    });
    
    // ===========================
    // FORM ENHANCEMENTS
    // ===========================
    
    // Add floating labels effect to inputs
    $('input, textarea').on('focus blur', function(e) {
        const label = $(this).siblings('label');
        if (e.type === 'focus' || this.value) {
            label.addClass('active');
        } else {
            label.removeClass('active');
        }
    });
    
    // Input validation feedback
    $('input[type="email"]').on('blur', function() {
        const email = $(this).val();
        if (email && !isValidEmail(email)) {
            $(this).addClass('error');
            showNotification('Please enter a valid email address', 'error');
        } else {
            $(this).removeClass('error');
        }
    });
    
    // ===========================
    // PARALLAX EFFECTS
    // ===========================
    
    // Simple parallax for hero section
    // function handleParallax() {
    //     const scrolled = $(window).scrollTop();
    //     const parallaxElements = $('.slide-background');
        
    //     parallaxElements.each(function() {
    //         const speed = 0.5;
    //         const yPos = -(scrolled * speed);
    //         $(this).css('transform', `translateY(${yPos}px)`);
    //     });
    // }
    
    // Only enable parallax on desktop for performance
    // if ($(window).width() > 768) {
    //     $(window).on('scroll', throttle(handleParallax, 16));
    // }
    
    // ===========================
    // UTILITY FUNCTIONS
    // ===========================
    
    // Throttle function for performance
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
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification ${type}" style="position: fixed; top: 20px; right: 20px; padding: 15px 20px; border-radius: 5px; color: white; z-index: 10000; opacity: 0; transform: translateX(100%);">
                ${message}
            </div>
        `);
        
        // Set colors based on type
        const colors = {
            success: '#4CAF50',
            error: '#F44336',
            warning: '#FF9800',
            info: '#2196F3'
        };
        
        notification.css('background-color', colors[type] || colors.info);
        
        $('body').append(notification);
        
        // Animate in
        notification.animate({
            opacity: 1,
            transform: 'translateX(0)'
        }, 300);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            notification.animate({
                opacity: 0,
                transform: 'translateX(100%)'
            }, 300, function() {
                notification.remove();
            });
        }, 5000);
        
        // Click to dismiss
        notification.on('click', function() {
            $(this).animate({
                opacity: 0,
                transform: 'translateX(100%)'
            }, 300, function() {
                $(this).remove();
            });
        });
    }
    
    // Lazy loading for images
    function lazyLoadImages() {
        const images = $('img[data-src]');
        
        images.each(function() {
            const img = $(this);
            const src = img.data('src');
            
            if (isElementInViewport(this)) {
                img.attr('src', src).removeAttr('data-src').addClass('loaded');
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    $(window).on('scroll resize', throttle(lazyLoadImages, 100));
    lazyLoadImages(); // Initial check
    
    // ===========================
    // ACCESSIBILITY ENHANCEMENTS
    // ===========================
    
    // Skip link for keyboard navigation
    // const skipLink = $(`
    //     <a href="#main-content" class="skip-link" style="position: absolute; top: -40px; left: 6px; color: white; padding: 8px; z-index: 10000; text-decoration: none; transition: top 0.3s;">
    //         Skip to main content
    //     </a>
    // `);
    
    // $('body').prepend(skipLink);
    
    // skipLink.on('focus', function() {
    //     $(this).css('top', '6px');
    // }).on('blur', function() {
    //     $(this).css('top', '-40px');
    // });
    
    // Focus management for modals
    let focusedElementBeforeModal;
    
    $(document).on('modal:open', function() {
        focusedElementBeforeModal = document.activeElement;
    });
    
    $(document).on('modal:close', function() {
        if (focusedElementBeforeModal) {
            focusedElementBeforeModal.focus();
        }
    });
    
    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = $('#screen-reader-announcements');
        if (announcement.length === 0) {
            $('body').append('<div id="screen-reader-announcements" aria-live="polite" class="sr-only"></div>');
        }
        $('#screen-reader-announcements').text(message);
    }
    
    // ===========================
    // PERFORMANCE MONITORING
    // ===========================
    
    // Simple performance monitoring
    if (window.performance) {
        $(window).on('load', function() {
            setTimeout(function() {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Log slow loading times
                if (loadTime > 3000) {
                    console.warn('Page load time is over 3 seconds');
                }
            }, 0);
        });
    }
    
    // ===========================
    // ERROR HANDLING
    // ===========================
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send errors to a logging service here
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
    
    // ===========================
    // INITIALIZATION COMPLETE
    // ===========================
    
    console.log('Blondies Coffee website initialized successfully');
    
    // Expose public API
    window.BlondiesMain = {
        showNotification: showNotification,
        announceToScreenReader: announceToScreenReader,
        scrollToTop: function() {
            $('html, body').animate({scrollTop: 0}, 800, 'easeInOutCubic');
        }
    };
});

// Add animation CSS
$(`
<style>
/* Loading and Animation Styles */
// body:not(.loaded) .hero-text,
// body:not(.loaded) .nav-container {
//     opacity: 0;
//     transform: translateY(20px);
// }

.hero-text.animate-in,
.nav-container.animate-in {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease;
}

.benefit-card,
.menu-item,
.instagram-item,
.section-title,
.text-content,
.image-grid {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.benefit-card.animate-in,
.menu-item.animate-in,
.instagram-item.animate-in,
.section-title.animate-in,
.text-content.animate-in,
.image-grid.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Scroll to top button hover effect */
.scroll-to-top:hover {
    background: var(--primary-gold-dark);
    transform: translateY(-2px);
}

/* Menu open state */
body.menu-open {
    overflow: hidden;
}

/* Input error state */
input.error {
    border-color: #F44336;
    box-shadow: 0 0 5px rgba(244, 67, 54, 0.3);
}

/* Newsletter success state */
.newsletter-success {
    background: #4CAF50 !important;
}

/* Navbar scrolled state */
.navbar.scrolled {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
}

/* Image loading state */
// img:not(.loaded) {
//     opacity: 0;
//     transition: opacity 0.3s ease;
// }

img.loaded {
    opacity: 1;
}

/* Screen reader only class */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
}

/* Skip link */
.skip-link:focus {
    top: 6px !important;
}
</style>
`).appendTo('head');

// Dropdown arrow icon swap: desktop .scrolled OR mobile
function setDropdownArrow() {
  var isMobile = $(window).width() <= 768; // Mobile menu breakpoint
  var isMobileSize = $(window).width() <= 991; // General mobile size
  var isScrolled = $('.navbar').hasClass('scrolled');
  var $arrow = $('.dropdown-arrow');
  
  // Always use down-arrow.png in mobile menu (width <= 768)
  if (isMobile) {
    $arrow.attr('src', 'images/down-arrow.png');
  } 
  // Use down-arrow.png when scrolled or on mobile sizes (<= 991)
  else if (isScrolled || isMobileSize) {
    $arrow.attr('src', 'images/down-arrow.png');
  } 
  // Use Vector.png only on desktop when not scrolled
  else {
    $arrow.attr('src', 'images/Vector.png');
  }
}
$(window).on('resize scroll', setDropdownArrow);
$(document).ready(function() {
    setDropdownArrow();
    // Also call after header loads (for dynamically loaded headers)
    setTimeout(setDropdownArrow, 200);
});
