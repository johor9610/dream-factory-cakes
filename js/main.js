/* ============================================================
   DREAM FACTORY CAKES — main.js
   Nav · Parallax · ScrollAnimations · Gallery · Lightbox · WhatsApp
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* Detección de preferencia de movimiento reducido */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ── 1. STICKY HEADER ────────────────────────────────────── */
  const header = $('.site-header');

  function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ── 2. MOBILE NAV ───────────────────────────────────────── */
  const burger   = $('.nav-burger');
  const navLinks = $('.nav-links');
  const overlay  = $('.nav-overlay');

  function openNav() {
    navLinks.classList.add('open');
    overlay.style.display = 'block';
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const spans = $$('span', burger);
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  function closeNav() {
    navLinks.classList.remove('open');
    overlay.style.display = 'none';
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const spans = $$('span', burger);
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  burger?.addEventListener('click', () =>
    navLinks.classList.contains('open') ? closeNav() : openNav()
  );

  overlay?.addEventListener('click', closeNav);
  $$('.nav-links a').forEach(a => a.addEventListener('click', closeNav));

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

  /* ── 4. HERO PARALLAX (rAF, desktop only) ────────────────── */
  /*
   * Mueve .hero-visual más lento que el scroll.
   * Factor 0.32 → a 200px de scroll, la imagen sube 64px.
   * Solo en desktop (> 1024px) y sin prefers-reduced-motion.
   * Usa requestAnimationFrame — nunca top/left, solo transform.
   */
  const heroVisual  = $('.hero-visual');
  const heroSection = $('.hero');
  let   rafPending  = false;

  function applyParallax() {
    if (!heroVisual || !heroSection) return;

    const isDesktop = window.innerWidth > 1024;
    if (!isDesktop) {
      heroVisual.style.transform = '';
      return;
    }

    const scrollY     = window.scrollY;
    const heroBottom  = heroSection.offsetTop + heroSection.offsetHeight;

    /* Solo mientras el hero sea visible */
    if (scrollY < heroBottom + 100) {
      heroVisual.style.transform = `translateY(${scrollY * 0.32}px)`;
    }
    rafPending = false;
  }

  function scheduleParallax() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(applyParallax);
  }

  if (heroVisual && !prefersReducedMotion) {
    window.addEventListener('scroll', scheduleParallax, { passive: true });
    window.addEventListener('resize', applyParallax,   { passive: true });
  }

  /* ── 5. SCROLL ANIMATIONS — Intersection Observer ───────── */
  /*
   * threshold 0.15 — el elemento debe estar 15% visible para disparar.
   * Observa: .fade-up, .fade-in, .divider, section-header h2 / cta-final h2
   * Los elementos en viewport al cargar se disparan en el primer frame.
   */

  const ioOptions = {
    root:       null,
    rootMargin: '0px 0px -60px 0px',
    threshold:  0.15,
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      if (el.classList.contains('fade-up') || el.classList.contains('fade-in')) {
        el.classList.add('visible');
      }

      /* Divider: draw animation */
      if (el.classList.contains('divider')) {
        el.classList.add('visible');
      }

      /* Títulos de sección: tracking animation */
      if (el.dataset.trackAnim) {
        /* Limpiar inline styles antes de activar la animación */
        el.style.opacity   = '';
        el.style.transform = '';
        el.classList.add('track-animate');
      }

      scrollObserver.unobserve(el); /* fire once */
    });
  }, ioOptions);

  /* Elementos animados por scroll */
  $$('.fade-up, .fade-in').forEach(el => scrollObserver.observe(el));
  $$('.divider').forEach(el => scrollObserver.observe(el));

  /* Títulos h2 dentro de section-header y cta-final */
  $$('.section-header h2, .cta-final h2').forEach(el => {
    el.dataset.trackAnim = '1';
    /* Estado inicial oculto para la animación de tracking */
    if (!prefersReducedMotion) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(18px)';
    }
    scrollObserver.observe(el);
  });

  /* Stagger explícito para pasos del proceso */
  $$('#proceso .process-step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.2}s`;
  });

  /* Stagger explícito para cards de testimonios */
  $$('#testimonios .testi-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });

  /* ── 6. GALERÍA — LIGHTBOX ───────────────────────────────── */
  const lightbox = $('.lightbox');
  const lbImg    = $('.lightbox-img');
  const lbTitle  = $('.lightbox-title');
  const lbDesc   = $('.lightbox-desc');
  const lbClose  = $('.lightbox-close');
  const lbPrev   = $('.lightbox-prev');
  const lbNext   = $('.lightbox-next');

  let slides  = [];
  let current = 0;

  function buildSlides() {
    slides = $$('.gallery-item').map(item => ({
      src:   $('img', item).src,
      alt:   $('img', item).alt,
      title: item.dataset.title || '',
      desc:  item.dataset.desc  || '',
    }));
  }

  function showSlide(index) {
    const slide = slides[index];
    lbImg.src = slide.src;
    lbImg.alt = slide.alt;
    if (lbTitle) lbTitle.textContent = slide.title;
    if (lbDesc)  lbDesc.textContent  = slide.desc;
  }

  function openLightbox(index) {
    current = index;
    /* Reiniciar animación de la imagen al cambiar slides */
    lbImg.style.animation = 'none';
    lbImg.offsetHeight;    /* reflow para reiniciar */
    lbImg.style.animation = '';

    showSlide(current);
    lightbox.classList.remove('closing');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('active')) return;

    if (prefersReducedMotion) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      return;
    }

    /* Animación de cierre: clase .closing */
    lightbox.classList.add('closing');
    lightbox.addEventListener('animationend', function onEnd() {
      lightbox.classList.remove('active', 'closing');
      document.body.style.overflow = '';
      lightbox.removeEventListener('animationend', onEnd);
    }, { once: true });
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    openLightbox(current);
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    openLightbox(current);
  }

  function initGallery() {
    buildSlides();
    $$('.gallery-item').forEach((item, i) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute(
        'aria-label',
        `Ver ${item.dataset.title || 'imagen'} en tamaño completo`
      );
      item.addEventListener('click', () => openLightbox(i));
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
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  initGallery();

  /* ── 7. WHATSAPP FLOTANTE — BOUNCE-IN ───────────────────── */
  /*
   * El botón empieza oculto (CSS).
   * Aparece a los 2s con un bounce-in desde la derecha.
   * Luego el CSS mantiene el "respirar" cada 4s.
   */
  const waBtn = $('.wa-float');

  if (waBtn) {
    if (prefersReducedMotion) {
      /* En reduced-motion: aparece inmediatamente sin animación */
      waBtn.classList.add('wa-visible');
    } else {
      setTimeout(() => {
        waBtn.classList.add('wa-visible');
      }, 2000);
    }
  }

  /* ── 8. ACTIVE NAV LINK ON SCROLL ───────────────────────── */
  const sections   = $$('section[id]');
  const navAnchors = $$('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let activeSec = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) activeSec = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${activeSec}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── 9. LAZY LOADING (fallback para browsers viejos) ─────── */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        lazyObserver.unobserve(img);
      });
    });
    $$('img[loading="lazy"]').forEach(img => lazyObserver.observe(img));
  }

})();
