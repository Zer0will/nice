// Improved Navigation Bar JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const menuToggle = document.getElementById('sidebar-active');
  const overlay = document.getElementById('overlay');
  let lastScrollTop = 0;
  let isMouseNearTop = false;
  
  // Function to check if mouse is near top of page
  function checkMousePosition(e) {
    isMouseNearTop = e.clientY < 100;
    
    // If mouse is near top, show header
    if (isMouseNearTop && header.classList.contains('hidden')) {
      header.classList.remove('hidden');
    }
    
    // If mouse is not near top and we've scrolled down, hide header
    if (!isMouseNearTop && window.scrollY > 100 && !header.classList.contains('hidden')) {
      header.classList.add('hidden');
    }
  }
  
  // Add scroll event to change header appearance
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Add scrolled class for shadow effect
    if (scrollTop > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down past 100px
    if (scrollTop > 100 && scrollTop > lastScrollTop && !isMouseNearTop) {
      header.classList.add('hidden');
    } 
    // Show header when scrolling up
    else if (scrollTop < lastScrollTop) {
      header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);
  
  // Add mousemove event listener to detect cursor position
  document.addEventListener('mousemove', checkMousePosition);
  
  // Mobile touch support
  document.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    if (touch.clientY < 100) {
      isMouseNearTop = true;
      header.classList.remove('hidden');
    } else {
      isMouseNearTop = false;
    }
  });
  
  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
    
    // Add data-index for animation delay in mobile view
    const listItem = link.parentElement;
    listItem.style.setProperty('--i', Array.from(listItem.parentElement.children).indexOf(listItem));
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menuToggle.checked = false;
      }
    });
  });
  
  // Close mobile menu when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      menuToggle.checked = false;
    });
  }
  
  // Close mobile menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuToggle.checked) {
      menuToggle.checked = false;
    }
  });
  
  // Prevent scrolling when mobile menu is open
  menuToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
}); 