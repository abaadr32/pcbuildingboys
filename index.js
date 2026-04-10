/* PC Building Boys — Main JS */

// ── Nav scroll + hide ──────────────────────────────────────────
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  if (cur > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  if (cur > lastScroll + 60 && cur > 300) {
    header.classList.add('hidden');
  } else if (cur < lastScroll - 10) {
    header.classList.remove('hidden');
  }
  lastScroll = cur;
}, { passive: true });

// ── Mobile menu ────────────────────────────────────────────────
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileOvly  = document.getElementById('mobile-overlay');

function toggleMobileMenu(open) {
  const isOpen = open ?? !mobileMenu.classList.contains('open');
  mobileMenu?.classList.toggle('open', isOpen);
  mobileOvly?.classList.toggle('open', isOpen);
  if (menuToggle) {
    menuToggle.querySelector('i').className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
  }
}

menuToggle?.addEventListener('click', () => toggleMobileMenu());
mobileOvly?.addEventListener('click', () => toggleMobileMenu(false));
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => toggleMobileMenu(false))
);

// ── Dropdown keyboard/touch on mobile ─────────────────────────
document.querySelectorAll('.dropdown > a').forEach(a => {
  a.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      a.closest('.dropdown').classList.toggle('open');
    }
  });
});

// ── Scroll reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .stagger');

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => io.observe(el));

// ── Toast ──────────────────────────────────────────────────────
let toastTimer;
window.showToast = function(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
};

// ── Cart count (from localStorage) ────────────────────────────
function updateCartUI() {
  try {
    const count = parseInt(localStorage.getItem('pcbb_cart_count') || '0', 10);
    document.querySelectorAll('#cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count === 0 ? 'none' : '';
    });
  } catch(e) {}
}
updateCartUI();
