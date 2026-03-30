/* ============================================================
   ATRUMEDIA PRINT SHOP — main.js
   ============================================================ */

(function () {
  'use strict';

  /* --- Navbar scroll behaviour --- */
  const nav = document.getElementById('siteNav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Active nav link --- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Mobile menu --- */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const toggle = (open) => {
      hamburger.classList.toggle('open', open);
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      toggle(!isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggle(false));
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggle(false);
        hamburger.focus();
      }
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) toggle(false);
    });
  }

  /* --- Scroll reveal (IntersectionObserver) --- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* --- Contact form validation & UX --- */
  const form = document.getElementById('quoteForm');
  if (form) {
    const showError = (input, msg) => {
      const group = input.closest('.form-group');
      let err = group.querySelector('.form-error');
      if (!err) {
        err = document.createElement('span');
        err.className = 'form-error';
        err.style.cssText = 'display:block;font-size:0.7rem;color:#c87a5a;margin-top:6px;letter-spacing:0.08em;';
        group.appendChild(err);
      }
      err.textContent = msg;
      input.style.borderBottomColor = '#c87a5a';
    };

    const clearError = (input) => {
      const group = input.closest('.form-group');
      const err = group.querySelector('.form-error');
      if (err) err.remove();
      input.style.borderBottomColor = '';
    };

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => clearError(field));
    });

    form.addEventListener('submit', (e) => {
      let valid = true;

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      if (name && !name.value.trim()) {
        showError(name, 'Please enter your name');
        valid = false;
      }
      if (email && !email.value.trim()) {
        showError(email, 'Please enter your email address');
        valid = false;
      } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        valid = false;
      }
      if (message && !message.value.trim()) {
        showError(message, 'Please tell us about your project');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        form.querySelector('[style*="borderBottomColor: rgb(200"]') &&
          form.querySelector('[style*="borderBottomColor"]').focus();
      }
    });
  }

  /* --- Smooth anchor scroll for same-page links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
