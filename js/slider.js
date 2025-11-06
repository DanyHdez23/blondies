/**
 * Blondies Coffee Website - Hero Slider
 * Advanced jQuery slider with touch support, keyboard navigation, and smooth transitions
 */

$(document).ready(function() {
    // Slider Configuration
    const sliderConfig = {
        currentSlide: 0,
        totalSlides: $('.slide').length,
        autoPlayInterval: 5000, // 5 seconds
        transitionDuration: 500, // 0.5 seconds
        autoPlay: true,
        pauseOnHover: true,
        enableKeyboard: true,
        enableTouch: true
    };

    let autoPlayTimer;
    let isTransitioning = false;

    // Initialize Slider
    function initSlider() {
        // Set up initial state
        $('.slide').removeClass('active');
        $('.slide').eq(sliderConfig.currentSlide).addClass('active');
        
        $('.indicator').removeClass('active');
        $('.indicator').eq(sliderConfig.currentSlide).addClass('active');

        // Start autoplay if enabled
        if (sliderConfig.autoPlay) {
            startAutoPlay();
        }

        // Bind events
        bindSliderEvents();
        
        // Setup touch events for mobile
        if (sliderConfig.enableTouch) {
            setupTouchEvents();
        }

        // Setup keyboard events
        if (sliderConfig.enableKeyboard) {
            setupKeyboardEvents();
        }

        console.log('Blondies Coffee Slider initialized');
    }

    // Bind slider control events
    function bindSliderEvents() {
        // Next button
        $('.next-btn').on('click', function(e) {
            e.preventDefault();
            nextSlide();
        });

        // Previous button
        $('.prev-btn').on('click', function(e) {
            e.preventDefault();
            prevSlide();
        });

        // Indicator dots
        $('.indicator').on('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt($(this).data('slide'));
            goToSlide(slideIndex);
        });

        // Pause autoplay on hover
        if (sliderConfig.pauseOnHover) {
            $('.hero-section').on('mouseenter', function() {
                pauseAutoPlay();
            }).on('mouseleave', function() {
                if (sliderConfig.autoPlay) {
                    startAutoPlay();
                }
            });
        }

        // Accessibility - focus management
        $('.slider-btn, .indicator').on('focus', function() {
            pauseAutoPlay();
        }).on('blur', function() {
            if (sliderConfig.autoPlay) {
                startAutoPlay();
            }
        });
    }

    // Touch Events for Mobile
    function setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        const minSwipeDistance = 50;

        $('.slider-container').on('touchstart', function(e) {
            const touch = e.originalEvent.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            pauseAutoPlay();
        });

        $('.slider-container').on('touchmove', function(e) {
            // Prevent scrolling while swiping horizontally
            const touch = e.originalEvent.touches[0];
            const currentX = touch.clientX;
            const currentY = touch.clientY;
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            if (diffX > diffY) {
                e.preventDefault();
            }
        });

        $('.slider-container').on('touchend', function(e) {
            const touch = e.originalEvent.changedTouches[0];
            endX = touch.clientX;
            endY = touch.clientY;

            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);

            // Only trigger if horizontal swipe is greater than vertical
            if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > diffY) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }

            // Resume autoplay after touch ends
            if (sliderConfig.autoPlay) {
                setTimeout(startAutoPlay, 1000);
            }
        });
    }

    // Keyboard Navigation
    function setupKeyboardEvents() {
        $(document).on('keydown', function(e) {
            // Only handle keyboard events when slider area has focus or no other input is focused
            if ($('input, textarea').is(':focus')) {
                return;
            }

            switch(e.keyCode) {
                case 37: // Left arrow
                    e.preventDefault();
                    prevSlide();
                    break;
                case 39: // Right arrow
                    e.preventDefault();
                    nextSlide();
                    break;
                case 32: // Spacebar - pause/resume
                    e.preventDefault();
                    toggleAutoPlay();
                    break;
                case 27: // Escape - pause
                    e.preventDefault();
                    pauseAutoPlay();
                    break;
            }
        });
    }

    // Navigation Functions
    function nextSlide() {
        if (isTransitioning) return;
        
        const nextIndex = (sliderConfig.currentSlide + 1) % sliderConfig.totalSlides;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        if (isTransitioning) return;
        
        const prevIndex = (sliderConfig.currentSlide - 1 + sliderConfig.totalSlides) % sliderConfig.totalSlides;
        goToSlide(prevIndex);
    }

    function goToSlide(slideIndex) {
        if (isTransitioning || slideIndex === sliderConfig.currentSlide) return;

        isTransitioning = true;

        // Update current slide index
        const previousSlide = sliderConfig.currentSlide;
        sliderConfig.currentSlide = slideIndex;

        // Fade out current slide
        $('.slide').eq(previousSlide).removeClass('active');
        
        // Fade in new slide
        setTimeout(function() {
            $('.slide').eq(sliderConfig.currentSlide).addClass('active');
        }, 50);

        // Update indicators
        $('.indicator').removeClass('active');
        $('.indicator').eq(sliderConfig.currentSlide).addClass('active');

        // Reset transition flag
        setTimeout(function() {
            isTransitioning = false;
        }, sliderConfig.transitionDuration);

        // Restart autoplay
        if (sliderConfig.autoPlay) {
            startAutoPlay();
        }

        // Announce slide change for screen readers
        announceSlideChange();
    }

    // AutoPlay Functions
    function startAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(function() {
            nextSlide();
        }, sliderConfig.autoPlayInterval);
    }

    function pauseAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function toggleAutoPlay() {
        if (sliderConfig.autoPlay) {
            sliderConfig.autoPlay = false;
            pauseAutoPlay();
            showMessage('Slideshow paused');
        } else {
            sliderConfig.autoPlay = true;
            startAutoPlay();
            showMessage('Slideshow resumed');
        }
    }

    // Accessibility Functions
    function announceSlideChange() {
        const slideTitle = $('.slide').eq(sliderConfig.currentSlide).find('.hero-title').text();
        const announcement = `Slide ${sliderConfig.currentSlide + 1} of ${sliderConfig.totalSlides}: ${slideTitle}`;
        
        // Create or update live region for screen readers
        let liveRegion = $('#slider-live-region');
        if (liveRegion.length === 0) {
            liveRegion = $('<div id="slider-live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>');
            $('body').append(liveRegion);
        }
        liveRegion.text(announcement);
    }

    function showMessage(message) {
        // Create temporary message for user feedback
        const messageEl = $(`<div class="slider-message" style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px 20px; border-radius: 4px; z-index: 9999; font-size: 14px;">${message}</div>`);
        $('body').append(messageEl);
        
        setTimeout(function() {
            messageEl.fadeOut(function() {
                messageEl.remove();
            });
        }, 2000);
    }

    // Utility Functions
    function getSlideData(slideIndex) {
        const slide = $('.slide').eq(slideIndex);
        return {
            title: slide.find('.hero-title').text(),
            subtitle: slide.find('.hero-subtitle').text(),
            badge: slide.find('.hero-badge').text()
        };
    }

    // Responsive behavior
    function handleResize() {
        // Recalculate dimensions if needed
        const windowWidth = $(window).width();
        
        // Adjust autoplay speed for mobile (slower for better UX)
        if (windowWidth < 768) {
            sliderConfig.autoPlayInterval = 6000; // 6 seconds on mobile
        } else {
            sliderConfig.autoPlayInterval = 5000; // 5 seconds on desktop
        }

        // Restart autoplay with new interval
        if (sliderConfig.autoPlay) {
            startAutoPlay();
        }
    }

    // Window resize handler
    $(window).on('resize', debounce(handleResize, 250));

    // Debounce function for resize events
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

    // Page Visibility API - pause when tab is not visible
    function handleVisibilityChange() {
        if (document.hidden) {
            pauseAutoPlay();
        } else if (sliderConfig.autoPlay) {
            startAutoPlay();
        }
    }

    if (typeof document.hidden !== "undefined") {
        document.addEventListener("visibilitychange", handleVisibilityChange, false);
    }

    // Intersection Observer - pause when slider is not in view
    if ('IntersectionObserver' in window) {
        const sliderObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    if (sliderConfig.autoPlay) {
                        startAutoPlay();
                    }
                } else {
                    pauseAutoPlay();
                }
            });
        }, {
            threshold: 0.5
        });

        sliderObserver.observe(document.querySelector('.hero-section'));
    }

    // Preload images for smooth transitions
    function preloadImages() {
        $('.slide').each(function() {
            const bgImage = $(this).find('.slide-background').css('background-image');
            if (bgImage && bgImage !== 'none') {
                const imageUrl = bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                const img = new Image();
                img.src = imageUrl;
            }
        });
    }

    // Initialize everything when DOM is ready
    preloadImages();
    initSlider();

    // Add CSS for screen reader only class
    $('<style>.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }</style>').appendTo('head');

    // Expose public API for external control
    window.BlondiesSlider = {
        next: nextSlide,
        prev: prevSlide,
        goto: goToSlide,
        play: startAutoPlay,
        pause: pauseAutoPlay,
        toggle: toggleAutoPlay,
        getCurrentSlide: () => sliderConfig.currentSlide,
        getTotalSlides: () => sliderConfig.totalSlides
    };
});

