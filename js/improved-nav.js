// Improved Navigation Bar JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const menuToggle = document.getElementById('sidebar-active');
  const overlay = document.getElementById('overlay');
  
  // Add scroll event to change header appearance
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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