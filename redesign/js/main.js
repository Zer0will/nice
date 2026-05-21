/**
 * Plate of Africa — Redesign
 * Main JavaScript: Navigation, Scroll Reveals, Menu Filtering, Interactions
 */

(function () {
  'use strict';

  // --- Navigation ---
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');
  let lastScrollY = 0;
  let ticking = false;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;

    // Add scrolled state
    if (currentScrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Hide/show on scroll direction
    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY) {
        nav.classList.add('nav--hidden');
      } else {
        nav.classList.remove('nav--hidden');
      }
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('nav__toggle--active');
      navMobile.classList.toggle('nav__mobile--active');
      document.body.style.overflow = navMobile.classList.contains('nav__mobile--active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    if (navMobile) {
      navMobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navToggle.classList.remove('nav__toggle--active');
          navMobile.classList.remove('nav__mobile--active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // --- Intersection Observer for Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .stagger');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stagger')) {
            entry.target.classList.add('stagger--visible');
          } else {
            entry.target.classList.add('reveal--visible');
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Hero Entry Animation ---
  function animateHero() {
    const heroLabel = document.querySelector('.hero__label');
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroScroll = document.querySelector('.hero__scroll');

    if (!heroTitle) return;

    setTimeout(function () {
      if (heroLabel) {
        heroLabel.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
        heroLabel.style.opacity = '1';
        heroLabel.style.transform = 'translateY(0)';
      }
    }, 300);

    setTimeout(function () {
      heroTitle.style.transition = 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 500);

    setTimeout(function () {
      if (heroSubtitle) {
        heroSubtitle.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }
    }, 800);

    setTimeout(function () {
      if (heroScroll) {
        heroScroll.style.transition = 'opacity 600ms ease';
        heroScroll.style.opacity = '1';
      }
    }, 1400);
  }

  // --- Menu Filtering ---
  const filterButtons = document.querySelectorAll('.menu-filter');
  const menuItems = document.querySelectorAll('.menu-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = this.dataset.category;

      // Update active state
      filterButtons.forEach(function (b) {
        b.classList.remove('menu-filter--active');
      });
      this.classList.add('menu-filter--active');

      // Filter items
      menuItems.forEach(function (item) {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(function () {
            item.style.transition = 'opacity 400ms ease, transform 400ms ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(function () {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // --- Testimonials Horizontal Scroll ---
  const testimonialTrack = document.querySelector('.testimonials__track');
  if (testimonialTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialTrack.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - testimonialTrack.offsetLeft;
      scrollLeft = testimonialTrack.scrollLeft;
      testimonialTrack.style.cursor = 'grabbing';
    });

    testimonialTrack.addEventListener('mouseleave', function () {
      isDown = false;
      testimonialTrack.style.cursor = 'grab';
    });

    testimonialTrack.addEventListener('mouseup', function () {
      isDown = false;
      testimonialTrack.style.cursor = 'grab';
    });

    testimonialTrack.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - testimonialTrack.offsetLeft;
      var walk = (x - startX) * 1.5;
      testimonialTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // --- Food Card Parallax on Hover ---
  const foodCards = document.querySelectorAll('.food-card');
  foodCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.querySelector('.food-card__overlay').style.opacity = '1';
    });
    card.addEventListener('mouseleave', function () {
      this.querySelector('.food-card__overlay').style.opacity = '';
    });
  });

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function () {
    animateHero();

    // Set initial active filter
    const firstFilter = document.querySelector('.menu-filter--active');
    if (firstFilter) {
      const category = firstFilter.dataset.category;
      menuItems.forEach(function (item) {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });
})();
