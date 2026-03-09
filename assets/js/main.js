/* ═══════════════════════════════════════════════════════
   SAI BOUTIQUE — MAIN JAVASCRIPT
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL BEHAVIOUR ─────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── MOBILE MENU ─────────────────────────────────────
  const hamburger  = document.querySelector('.navbar__hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    const toggle = (open) => {
      hamburger.classList.toggle('is-open', open);
      mobileNav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => toggle(!mobileNav.classList.contains('is-open')));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

    // Close on backdrop click
    mobileNav.addEventListener('click', (e) => { if (e.target === mobileNav) toggle(false); });
  }

  // ── ACTIVE NAV LINK ──────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .mobile-nav__link').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('is-active');
  });

  // ── SCROLL REVEAL ────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ── GALLERY FILTER ───────────────────────────────────
  const filterBtns  = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ── CONTACT FORM ─────────────────────────────────────
  const submitBtn = document.getElementById('js-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = document.getElementById('f-name')?.value.trim();
      const phone = document.getElementById('f-phone')?.value.trim();
      if (!name || !phone) {
        [document.getElementById('f-name'), document.getElementById('f-phone')]
          .forEach(el => { if (el && !el.value.trim()) el.style.borderColor = 'var(--mauve)'; });
        return;
      }
      document.getElementById('js-form').style.display = 'none';
      document.getElementById('js-success').classList.add('is-visible');
    });

    // Reset error state on input
    ['f-name','f-phone'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', (e) => {
        e.target.style.borderColor = '';
      });
    });
  }

  // ── HERO PARALLAX (subtle) ───────────────────────────
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroSection.style.backgroundPositionY = `${y * 0.3}px`;
    }, { passive: true });
  }

});
