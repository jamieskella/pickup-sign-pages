/* PickUp Sign — site interactions */
(function () {
  'use strict';

  /* ---- Dark mode default (forced dark) ---- */
  const html = document.documentElement;
  if (!html.getAttribute('data-theme')) {
    html.setAttribute('data-theme', 'dark');
  }

  /* ---- Mobile menu ---- */
  const menuBtn = document.querySelector('.header__menu-btn');
  const mobileNav = document.getElementById('mobileNav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;

      // Toggle icon
      menuBtn.innerHTML = expanded
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>';
    });

    // Close on link tap
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- Header scroll behavior ---- */
  let lastY = 0;
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 60) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastY = y;
    }, { passive: true });
  }

  /* ---- Language switcher ---- */
  const langBtn = document.querySelector('.lang-switch__btn');
  const langDropdown = document.querySelector('.lang-switch__dropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !langDropdown.hidden;
      langDropdown.hidden = open;
      langBtn.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', () => {
      langDropdown.hidden = true;
      langBtn.setAttribute('aria-expanded', 'false');
    });
    langDropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  /* ---- Language auto-suggest ---- */
  (function() {
    var supported = ['en','es','fr','pt','zh','ja','hi','ar','ko','de','it','ru'];
    var path = window.location.pathname;
    var currentLang = 'en';
    for (var i = 0; i < supported.length; i++) {
      if (path.indexOf('/' + supported[i] + '/') !== -1) {
        currentLang = supported[i];
        break;
      }
    }
    var browserLang = (navigator.language || '').split('-')[0].toLowerCase();
    if (browserLang && browserLang !== currentLang && supported.indexOf(browserLang) !== -1) {
      var dismissed = sessionStorage.getItem('lang_dismissed');
      if (!dismissed) {
        var names = {en:'English',es:'Español',fr:'Français',pt:'Português',zh:'中文',ja:'日本語',hi:'हिन्दी',ar:'العربية',ko:'한국어',de:'Deutsch',it:'Italiano',ru:'Русский'};
        var url = browserLang === 'en' ? '/' : '/' + browserLang + '/';
        if (currentLang !== 'en') url = '../' + (browserLang === 'en' ? '' : browserLang + '/');
        var bar = document.createElement('div');
        bar.className = 'lang-suggest';
        bar.innerHTML = '<a href="' + url + '">' + names[browserLang] + '</a><button aria-label="Dismiss">&times;</button>';
        bar.querySelector('button').onclick = function() { bar.remove(); sessionStorage.setItem('lang_dismissed','1'); };
        document.body.prepend(bar);
      }
    }
  })();

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
