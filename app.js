/* app.js — Easy-Ark Invest shared functionality */

(function() {
  'use strict';

  /* ============================
     THEME TOGGLE
     ============================ */
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', function() {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* ============================
     MOBILE NAV
     ============================ */
  var mobileToggle = document.querySelector('[data-mobile-toggle]');
  var nav = document.querySelector('[data-nav]');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      var isOpen = nav.classList.contains('header__nav--open');
      nav.classList.toggle('header__nav--open');
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileToggle.innerHTML = !isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });
  }

  /* ============================
     HEADER SCROLL STATE
     ============================ */
  var header = document.querySelector('.header');
  if (header) {
    var scrollHandler = function() {
      if (window.scrollY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();
  }

  /* ============================
     SCROLL REVEAL
     ============================ */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ============================
     ACTIVE NAV HIGHLIGHTING
     ============================ */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === './' + currentPage || href === currentPage ||
        (currentPage === '' && href === './index.html') ||
        (currentPage === 'index.html' && href === './index.html')) {
      link.classList.add('header__nav-link--active');
    }
  });

  /* ============================
     CONTACT FORM (static)
     ============================ */
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn--primary');
      var originalText = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.style.background = 'var(--color-success)';
      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    });
  }

})();
