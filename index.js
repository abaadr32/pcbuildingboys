/* ============================================================
   PC BUILDING BOYS — SHARED JAVASCRIPT (index.js)
   Handles: nav toggle, mobile dropdown, scroll-hide header,
            scroll-reveal animations, cart count, toast util
   ============================================================ */

// ── Wait for DOM to be ready ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. ELEMENTS ─────────────────────────────────────────── */
  const header       = document.getElementById('header');
  const menuToggle   = document.getElementById('menu-toggle');
  const navMenu      = document.getElementById('nav-menu');
  const overlay      = document.getElementById('mobile-overlay');
  const dropdowns    = document.querySelectorAll('.dropdown');
  const cartCount    = document.getElementById('cart-count');

  /* ── 2. MOBILE MENU TOGGLE ───────────────────────────────── */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      overlay && overlay.classList.toggle('active', open);
      // Animate icon between bars ↔ X
      menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  /* ── 3. CLOSE MENU ON OVERLAY CLICK ─────────────────────── */
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  function closeMenu() {
    navMenu && navMenu.classList.remove('open');
    overlay && overlay.classList.remove('active');
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  /* ── 4. MOBILE DROPDOWN TOGGLE (tap chevron row) ─────────── */
  dropdowns.forEach(dd => {
    const toggle = dd.querySelector('a'); // the row that has the chevron
    if (!toggle) return;
    toggle.addEventListener('click', e => {
      // Only hijack click on mobile (when menu-toggle is visible)
      if (window.innerWidth > 768) return;
      e.preventDefault();
      dd.classList.toggle('active');
    });
  });

  /* ── 5. CLOSE MOBILE MENU ON NAV LINK CLICK ─────────────── */
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  /* ── 6. SCROLL-HIDE HEADER ───────────────────────────────── */
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      // Hide header only after scrolling down 80px
      header.classList.toggle('header-hidden', y > lastY && y > 80);
    }
    lastY = y;
  }, { passive: true });

  /* ── 7. SCROLL-REVEAL (IntersectionObserver) ─────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── 8. CART COUNT (reads from sessionStorage) ───────────── */
  function updateCartDisplay() {
    if (!cartCount) return;
    const count = Object.keys(getCart()).length;
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'flex';
  }

  // Expose cart helpers globally so component pages can call them
  window.getCart = function() {
    try { return JSON.parse(sessionStorage.getItem('pbb_cart') || '{}'); }
    catch(e) { return {}; }
  };
  window.setCart = function(cart) {
    sessionStorage.setItem('pbb_cart', JSON.stringify(cart));
    updateCartDisplay();
  };

  updateCartDisplay();

  /* ── 9. TOAST UTILITY ────────────────────────────────────── */
  // Usage: window.showToast('✓ Component selected!', 2500)
  const toast = document.getElementById('toast');
  let toastTimer;
  window.showToast = function(msg, duration = 2400) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
  };

});
