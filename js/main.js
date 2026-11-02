(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  }

  function initMobileNav() {
    const toggle = $('.nav-toggle');
    const nav = $('#primary-nav');
    const header = $('.site-header');
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
      header?.classList.toggle('menu-open', open);
      document.body.classList.toggle('no-scroll', open);
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  function initHeaderState() {
    const header = $('.site-header');
    const backTop = $('.back-to-top');
    if (!header && !backTop) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header?.classList.toggle('is-scrolled', y > 8);
      backTop?.classList.toggle('is-visible', y > window.innerHeight * 0.8);
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  function initActiveNav() {
    const links = $$('.nav-link');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
    const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
    const setActive = (id) => links.forEach((l) => {
      const active = l === map.get(id);
      l.classList.toggle('is-active', active);
      if (active) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => observer.observe(s));
  }

  function initReveal() {
    const items = $$('.reveal');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!items.length) return;
    if (reduce || !('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => observer.observe(el));
  }

  function initCopyEmail() {
    const btn = $('.copy-btn');
    if (!btn) return;
    const label = $('.copy-label', btn);
    const status = $('.copy-status');
    const original = label ? label.textContent : '';
    if (!navigator.clipboard) { btn.hidden = true; return; }
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.classList.add('is-copied');
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to clipboard.';
      } catch {
        if (label) label.textContent = 'Copy failed';
      }
      setTimeout(() => { btn.classList.remove('is-copied'); if (label) label.textContent = original; }, 2000);
    });
  }

  function initYear() {
    const el = $('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initMobileNav();
    initHeaderState();
    initActiveNav();
    initReveal();
    initCopyEmail();
    initYear();
  });
})();
