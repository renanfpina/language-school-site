/* ============================================================
   LingoUp Academy — Main JavaScript
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   loadPartial
   Fetches an HTML partial and replaces the placeholder element.
   The partial must contain the full outer element(s).
   ---------------------------------------------------------- */
async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const temp = document.createElement('div');
    temp.innerHTML = await res.text();
    el.replaceWith(...temp.childNodes);
  } catch (err) {
    console.warn(`loadPartial: could not load "${url}"`, err);
  }
}

/* ----------------------------------------------------------
   setActiveNav
   Marks the current page's nav link with aria-current="page".
   ---------------------------------------------------------- */
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    const isActive =
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html');
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/* ----------------------------------------------------------
   initMobileNav
   Hamburger toggle with full keyboard support and Escape key.
   ---------------------------------------------------------- */
function initMobileNav() {
  const btn      = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  if (!btn || !navLinks) return;

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-open');
    btn.setAttribute('aria-label', btn.getAttribute('data-label-close') || 'Close menu');
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    btn.setAttribute('aria-label', btn.getAttribute('data-label-open') || 'Open menu');
  }

  btn.addEventListener('click', () => {
    btn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      btn.focus();
    }
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ----------------------------------------------------------
   setFooterYear
   Inserts the current year into #footer-year.
   ---------------------------------------------------------- */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------
   initContactForm
   Client-side validation with ARIA live regions.
   ---------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('enrollment-form');
  if (!form) return;

  const liveRegion = document.getElementById('form-live-region');

  const validators = {
    name: v => v.trim().length >= 2
      ? null
      : 'Please enter your full name (at least 2 characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? null
      : 'Please enter a valid email address.',
    phone: v => v.trim() === '' || /^[\d\s+\-()/]{7,}$/.test(v.trim())
      ? null
      : 'Please enter a valid phone number.',
    language: v => v !== ''
      ? null
      : 'Please select a language of interest.',
    message: v => v.trim().length >= 10
      ? null
      : 'Please write a message (at least 10 characters).',
  };

  function showError(field, message) {
    const errorEl = document.getElementById(`${field}-error`);
    const inputEl = form.querySelector(`[name="${field}"]`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.removeAttribute('hidden');
    }
    if (inputEl) {
      inputEl.classList.add('error');
      inputEl.setAttribute('aria-invalid', 'true');
      inputEl.setAttribute('aria-describedby', `${field}-error`);
    }
  }

  function clearError(field) {
    const errorEl = document.getElementById(`${field}-error`);
    const inputEl = form.querySelector(`[name="${field}"]`);
    if (errorEl) { errorEl.textContent = ''; errorEl.setAttribute('hidden', ''); }
    if (inputEl) {
      inputEl.classList.remove('error');
      inputEl.setAttribute('aria-invalid', 'false');
      inputEl.removeAttribute('aria-describedby');
    }
  }

  // Validate on blur; re-validate on input if already invalid
  Object.keys(validators).forEach(field => {
    const input = form.querySelector(`[name="${field}"]`);
    if (!input) return;
    input.addEventListener('blur', () => {
      const err = validators[field](input.value);
      err ? showError(field, err) : clearError(field);
    });
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        const err = validators[field](input.value);
        err ? showError(field, err) : clearError(field);
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let hasErrors = false;

    Object.keys(validators).forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input) return;
      const err = validators[field](input.value);
      if (err) { showError(field, err); hasErrors = true; }
      else      { clearError(field); }
    });

    if (hasErrors) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      if (liveRegion) liveRegion.textContent = 'Please correct the errors before submitting.';
      return;
    }

    // Success feedback
    const successMsgEl = document.getElementById('form-success-msg');
    const successBtnEl = document.getElementById('form-success-btn');
    if (liveRegion) {
      liveRegion.textContent = successMsgEl
        ? successMsgEl.textContent
        : 'Your message was sent! We\'ll be in touch within 24 hours.';
    }
    form.reset();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = successBtnEl ? successBtnEl.textContent : 'Request Sent ✓';
      submitBtn.disabled = true;
    }
  });
}

/* ----------------------------------------------------------
   initCounterAnimation
   Animates [data-counter-target] numbers when scrolled into view.
   Skipped entirely when prefers-reduced-motion is active.
   ---------------------------------------------------------- */
function initCounterAnimation() {
  const items = document.querySelectorAll('[data-counter-target]');
  if (!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    items.forEach(el => {
      el.textContent = Number(el.dataset.counterTarget).toLocaleString() +
        (el.dataset.counterSuffix || '');
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseInt(el.dataset.counterTarget, 10);
      const suffix   = el.dataset.counterSuffix || '';
      const duration = 1600;
      const start    = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  items.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------
   initFaq
   Accessible accordion: one item open at a time.
   ---------------------------------------------------------- */
function initFaq() {
  document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all open items
      document.querySelectorAll('.faq-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
      });

      // Open the clicked item if it was closed
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ----------------------------------------------------------
   Bootstrap — run after DOM is ready
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  // Inject partials (paths relative to each page at root)
  await Promise.all([
    loadPartial('header', 'assets/partials/header.html'),
    loadPartial('footer', 'assets/partials/footer.html'),
  ]);

  setActiveNav();
  initMobileNav();
  setFooterYear();
  initContactForm();
  initCounterAnimation();
  initFaq();

  // i18n initialises after partials are in the DOM
  if (typeof initI18n === 'function') initI18n();
});
