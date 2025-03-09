/**
 * navbar.js
 * JavaScript functionality for the navigation bar
 * Controls navbar visibility, scroll effects, and mobile menu behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar variables
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let lastScrollTop = 0;
    let isMouseAtTop = false;
    
    // Check if mouse is at the top of the page
    document.addEventListener('mousemove', function(e) {
        isMouseAtTop = e.clientY < 100;
        updateNavbarVisibility();
    });
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100 && !isMouseAtTop) {
            // Scrolling down and not at top - hide navbar
            navbar.classList.remove('visible');
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or at top - show navbar
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Update navbar visibility based on mouse position
    function updateNavbarVisibility() {
        if (isMouseAtTop) {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
        } else if (window.scrollY > 100) {
            navbar.classList.remove('visible');
            navbar.classList.add('hidden');
        }
    }
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Handle responsive navigation
    function handleResponsiveNav() {
        if (window.innerWidth <= 1200) {
            navLinks.classList.add('mobile-nav');
        } else {
            navLinks.classList.remove('mobile-nav', 'active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    }
    
    // Initialize responsive navigation
    handleResponsiveNav();
    window.addEventListener('resize', handleResponsiveNav);
}); 