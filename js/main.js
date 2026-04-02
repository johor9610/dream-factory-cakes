/* ============================================================
   DREAM FACTORY CAKES — main.js
   Nav · ScrollAnimations · Gallery · Lightbox · WhatsApp
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── 1. STICKY HEADER ────────────────────────────────────── */
  const header = $('.site-header');

  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── 2. MOBILE NAV ───────────────────────────────────────── */
  const burger   = $('.nav-burger');
  const navLinks = $('.nav-links');
  const overlay  = $('.nav-overlay');

  function openNav() {
    navLinks.classList.add('open');
    overlay.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () =>
    navLinks.classList.contains('open') ? closeNav() : openNav()
  );

  overlay?.addEventListener('click', closeNav);

  // Close on nav link click
  $$('.nav-links a').forEach(a => a.addEventListener('click', closeNav));

  // Burger animated icon (3 lines → X)
  burger?.addEventListener('click', () => {
    const spans = $$('span', burger);
    const open  = navLinks.classList.contains('open');
    spans[0].style.transform = open ? '' : 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = open ? ''  : '0';
    spans[2].style.transform = open ? '' : 'rotate(-45deg) translate(5px, -5px)';
  });

  /* ── 3. SMOOTH SCROLL ────────────────────────────────────── */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = $(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 4. SCROLL ANIMATIONS (Intersection Observer) ────────── */
  const animOpts = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, animOpts);

  // Observe all animated elements
  $$('.fade-up, .fade-in').forEach(el => observer.observe(el));

  /* ── 5. LIGHTBOX ─────────────────────────────────────────── */
  const lightbox     = $('.lightbox');
  const lbImg        = $('.lightbox-img');
  const lbTitle      = $('.lightbox-title');
  const lbDesc       = $('.lightbox-desc');
  const lbClose      = $('.lightbox-close');
  const lbPrev       = $('.lightbox-prev');
  const lbNext       = $('.lightbox-next');

  // Collect all gallery items as lightbox slides
  let slides   = [];
  let current  = 0;

  function buildSlides() {
    slides = $$('.gallery-item').map(item => ({
      src:   $('img', item).src,
      alt:   $('img', item).alt,
      title: item.dataset.title  || '',
      desc:  item.dataset.desc   || '',
    }));
  }

  function openLightbox(index) {
    current = index;
    showSlide(current);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showSlide(index) {
    const slide = slides[index];
    lbImg.src       = slide.src;
    lbImg.alt       = slide.alt;
    if (lbTitle) lbTitle.textContent = slide.title;
    if (lbDesc)  lbDesc.textContent  = slide.desc;
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  // Attach click handlers after DOM is ready
  function initGallery() {
    buildSlides();
    $$('.gallery-item').forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Ver ${item.dataset.title || 'imagen'} en tamaño completo`);
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });
    });
  }

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click',  prevSlide);
  lbNext?.addEventListener('click',  nextSlide);

  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  initGallery();

  /* ── 6. LAZY LOADING ─────────────────────────────────────── */
  // Browsers with native lazy loading handle this via the HTML attribute.
  // This is a fallback polyfill for older browsers.
  if ('loading' in HTMLImageElement.prototype) {
    // Native support — nothing to do
  } else {
    const lazyImgs = $$('img[loading="lazy"]');
    const lazyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          lazyObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => lazyObserver.observe(img));
  }

  /* ── 7. WHATSAPP PULSE (CSS handles it, just a safeguard) ── */
  const waBtn = $('.wa-float');
  if (waBtn) {
    waBtn.classList.add('wa-pulse');
  }

  /* ── 8. ACTIVE NAV LINK ON SCROLL ───────────────────────── */
  const sections    = $$('section[id]');
  const navAnchors  = $$('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });

    navAnchors.forEach(a => {
      a.classList.toggle(
        'active',
        a.getAttribute('href') === `#${current}`
      );
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
