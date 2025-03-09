/**
 * header1.js
 * JavaScript functionality for the header component
 * Extracted from header1.html for better code organization
 * Controls header visibility, scroll effects, and navigation behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header variables
    let lastScrollTop = 0;
    let isMouseAtTop = false;
    const header = document.getElementById('header');
    
    // Check if mouse is at the top of the page
    document.addEventListener('mousemove', function(e) {
        isMouseAtTop = e.clientY < 100;
        updateHeaderVisibility();
    });
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100 && !isMouseAtTop) {
            // Scrolling down and not at top - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up or at top - show header
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Update header visibility based on mouse position
    function updateHeaderVisibility() {
        if (isMouseAtTop) {
            header.classList.remove('hidden');
        } else if (window.scrollY > 100) {
            header.classList.add('hidden');
        }
    }
}); 