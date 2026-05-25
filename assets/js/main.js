/* WeCan AI — site scripts: nav, FAQ accordion, scroll reveal, contact form, cookie banner */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('primary-nav');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var ans = item.querySelector('.faq-a');
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        if (o !== item) {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
          o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (open) {
        item.classList.remove('open');
        ans.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = (parseInt(d, 10) * 0.09) + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- contact form -> mailto to yes@wecanai.me ---- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (n) { var f = form.querySelector('[name="' + n + '"]'); return f ? f.value.trim() : ''; };
      var name = get('name'), email = get('email'), company = get('company'),
          goal = get('goal'), message = get('message');
      var note = form.querySelector('[data-form-note]');
      if (!name || !email) {
        if (note) note.textContent = 'Please add your name and email so we can reply.';
        return;
      }
      var subject = 'AI adoption enquiry — ' + name + (company ? ' (' + company + ')' : '');
      var body = 'Name: ' + name + '\n' +
                 'Company: ' + company + '\n' +
                 'Email: ' + email + '\n' +
                 'Primary goal: ' + goal + '\n\n' +
                 'Message:\n' + message + '\n';
      window.location.href = 'mailto:yes@wecanai.me?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---- cookie consent banner ---- */
  var banner = document.getElementById('cookie-banner');
  if (banner) {
    var KEY = 'wecanai_cookie_ok';
    var stored;
    try { stored = window.localStorage.getItem(KEY); } catch (err) { stored = null; }
    if (stored !== 'yes') {
      setTimeout(function () { banner.classList.add('show'); }, 700);
    }
    var accept = banner.querySelector('[data-cookie-accept]');
    if (accept) {
      accept.addEventListener('click', function () {
        try { window.localStorage.setItem(KEY, 'yes'); } catch (err) {}
        banner.classList.remove('show');
      });
    }
  }
})();
