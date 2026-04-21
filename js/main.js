/**
 * TakeawAI Website - Main JavaScript
 * Handles navigation, animations, forms, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initMobileNavigation();
  initNavbarScrollEffect();
  initScrollAnimations();
  initFAQAccordion();
  initSmoothScroll();
  initFormHandling();
  initActiveNavLink();
});

/**
 * 1. MOBILE NAVIGATION
 * Toggle mobile nav overlay on nav-toggle click
 * Close on mobile-nav-close button or link click
 * Prevent body scroll when open
 */
function initMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  if (!navToggle || !mobileNav) return;

  function openMobileNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Toggle mobile nav
  navToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (mobileNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Close mobile nav with close button
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileNav();
    }
  });
}

/**
 * 2. NAVBAR SCROLL EFFECT
 * Add "scrolled" class to navbar when page scrolls past 50px
 */
function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * 3. SCROLL ANIMATIONS
 * IntersectionObserver adds "visible" class to elements with "fade-in"
 * when they enter viewport (threshold 0.1)
 * Elements animate once and stay visible
 */
function initScrollAnimations() {
  const fadeInElements = document.querySelectorAll('.fade-in');

  if (fadeInElements.length === 0) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing this element so animation only triggers once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 4. FAQ ACCORDION
 * Click on .faq-question toggles "open" class on parent .faq-item
 * Only one FAQ open at a time
 */
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  if (faqQuestions.length === 0) return;

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const isOpen = faqItem.classList.contains('open');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== faqItem) {
          openItem.classList.remove('open');
        }
      });

      // Toggle current FAQ item
      faqItem.classList.toggle('open');
    });
  });
}

/**
 * 5. SMOOTH SCROLL
 * For anchor links (href starting with #), smooth scroll to target
 * Applies 80px offset for fixed navbar
 */
function initSmoothScroll() {
  const navbarHeight = 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const offsetTop = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 6. FORM HANDLING
 * Contact forms and email signup forms show success message
 * Email inputs validated before showing success
 * Form/button replaced with "Thanks!" message
 */
function initFormHandling() {
  const contactForms = document.querySelectorAll('form.contact-form, form.email-signup, .cta-form');

  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get all email inputs in this form
      const emailInputs = form.querySelectorAll('input[type="email"]');
      let isValid = true;

      // Validate email inputs if they exist
      emailInputs.forEach(emailInput => {
        if (emailInput.value.trim()) {
          if (!isValidEmail(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
          } else {
            emailInput.classList.remove('error');
          }
        }
      });

      if (!isValid) {
        return;
      }

      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = '<p>Thanks! We\'ll be in touch.</p>';

      // Replace form with success message
      form.replaceWith(successMessage);
    });
  });
}

/**
 * Helper: Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 7. ACTIVE NAV LINK
 * On page load, add "active" class to matching nav link
 * Matches current page URL
 */
function initActiveNavLink() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('a[href]');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Check if link matches current page
    if (href && (href === currentPage || currentPage.includes(href))) {
      // Avoid matching "/" with all pages
      if (href === '/' && currentPage !== '/') return;

      link.classList.add('active');
    }
  });
}
