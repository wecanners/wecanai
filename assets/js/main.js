/* ============================================================
   WeCan AI — shared interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      nav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // close all (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var p = other.querySelector('.faq-a');
        var b = other.querySelector('.faq-q');
        if (p) p.style.maxHeight = null;
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Scroll reveal (staggered) ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay') || 0;
          setTimeout(function () { el.classList.add('in'); }, delay * 90);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Contact form (no backend; mailto fallback) ---- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lang = document.documentElement.lang || 'en';
      var subjBase = lang === 'ar'
        ? 'طلب استشارة تبني الذكاء الاصطناعي'
        : 'AI Adoption Consultation Request';
      var body = [
        (data.get('name') || ''),
        (data.get('company') || ''),
        (data.get('email') || ''),
        '',
        (data.get('message') || '')
      ].join('\n');
      window.location.href = 'mailto:yes@wecanai.me'
        + '?subject=' + encodeURIComponent(subjBase)
        + '&body=' + encodeURIComponent(body);
      var note = form.querySelector('[data-form-note]');
      if (note) {
        note.textContent = lang === 'ar'
          ? 'يفتح تطبيق البريد الإلكتروني لديك الآن. إذا لم يحدث ذلك، راسلنا على yes@wecanai.me'
          : 'Your email app is opening now. If nothing happens, write to yes@wecanai.me';
      }
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
