/* ============================================================
   PC BUILDING BOYS — COMPONENT BUILDER (builder.js)
   Handles: loading JSON data, rendering part cards,
            budget tracking, modal detail view, cart
   ============================================================ */

/* Component images mapped by category name
   Using Unsplash for realistic PC part photos */
const CATEGORY_IMAGES = {
  'Chassis':       'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
  'CPU':           'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
  'Motherboard':   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  'Memory':        'https://images.unsplash.com/photo-1562976540-1502c2145a5a?w=400&q=80',
  'GPU':           'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&q=80',
  'Storage':       'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
  'Power Supply':  'https://images.unsplash.com/photo-1616849949750-f2295ff78eed?w=400&q=80',
  'Cooling':       'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
  'Monitor':       'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
  'Keyboard':      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
};

/* Fallback image if a specific brand image fails */
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&q=80';

/* Icons per category */
const CATEGORY_ICONS = {
  'Chassis':      '🖥️',
  'CPU':          '⚡',
  'Motherboard':  '🔌',
  'Memory':       '💾',
  'GPU':          '🎮',
  'Storage':      '💿',
  'Power Supply': '🔋',
  'Cooling':      '❄️',
  'Monitor':      '🖥️',
  'Keyboard':     '⌨️',
};

/* Descriptions per category */
const CATEGORY_DESCS = {
  'Chassis':      'The case that houses everything',
  'CPU':          'The brain of your PC',
  'Motherboard':  'Connects all your components',
  'Memory':       'RAM for fast data access',
  'GPU':          'Drives your visuals & frames',
  'Storage':      'Where your data lives',
  'Power Supply': 'Feeds power to every part',
  'Cooling':      'Keeps temps in check',
  'Monitor':      'Your window into the build',
  'Keyboard':     'How you command it',
};

// ── State ──────────────────────────────────────────────────────
let pcData     = null;    // loaded JSON
let selections = {};      // { categoryName: partObject }
let modalPart  = null;    // currently open modal part

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const dataEl = document.getElementById('pc-data-src');
  if (!dataEl) return;

  const jsonFile = dataEl.dataset.src;
  try {
    const res  = await fetch(jsonFile);
    pcData = await res.json();
    renderBuilder();
  } catch(e) {
    console.error('Failed to load PC data:', e);
  }

  // Modal close button
  document.getElementById('modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-select-btn')?.addEventListener('click', () => {
    if (modalPart) selectPart(modalPart._category, modalPart);
    closeModal();
  });

  // Clear build button
  document.getElementById('clear-build-btn')?.addEventListener('click', () => {
    selections = {};
    document.querySelectorAll('.part-card.selected').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.part-card.selected .part-btn').forEach(b => b.textContent = 'Select');
    updateBudget();
    document.querySelectorAll('.comp-selected').forEach(el => el.classList.remove('visible'));
    window.showToast && window.showToast('🗑️ Build cleared');
  });
});

// ── Render all component sections ─────────────────────────────
function renderBuilder() {
  if (!pcData) return;

  const container = document.getElementById('components-container');
  if (!container) return;

  const budget = pcData.budget || 0;
  document.getElementById('budget-total').textContent = `$${budget.toLocaleString()}`;

  const parts = pcData.parts;
  let html = '';

  // Iterate each category in the JSON
  Object.entries(parts).forEach(([category, items]) => {
    const icon = CATEGORY_ICONS[category] || '🔧';
    const desc = CATEGORY_DESCS[category] || '';
    const slug = category.replace(/\s+/g, '-').toLowerCase();

    html += `
      <div class="component-section" id="section-${slug}">
        <div class="comp-section-hd">
          <div class="comp-icon">${icon}</div>
          <div class="comp-label">
            <h3>${category}</h3>
            <p>${desc}</p>
          </div>
          <div class="comp-selected" id="sel-${slug}">
            <i class="fa-solid fa-circle-check"></i>
            <span id="sel-name-${slug}">Selected</span>
          </div>
        </div>
        <div class="parts-grid reveal-stagger" id="grid-${slug}">
          ${items.map((part, i) => renderPartCard(part, category, i)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Attach click handlers to all part cards
  container.querySelectorAll('.part-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat  = card.dataset.category;
      const idx  = parseInt(card.dataset.index, 10);
      const part = pcData.parts[cat][idx];
      openModal(part, cat);
    });
  });

  // Trigger scroll reveal manually for already-visible sections
  setTimeout(() => {
    document.querySelectorAll('.reveal-stagger').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

  updateBudget();
}

// ── Render a single part card ─────────────────────────────────
function renderPartCard(part, category, index) {
  const img = CATEGORY_IMAGES[category] || FALLBACK_IMG;
  const slug = category.replace(/\s+/g, '-').toLowerCase();
  return `
    <div class="part-card" data-category="${category}" data-index="${index}" id="card-${slug}-${index}">
      <img class="part-img"
           src="${img}"
           alt="${part.name}"
           onerror="this.src='${FALLBACK_IMG}'">
      <div class="part-body">
        <div class="part-brand">${part.brand}</div>
        <div class="part-name">${part.name}</div>
        <div class="part-footer">
          <span class="part-price">$${part.price}</span>
          <button class="part-btn" onclick="event.stopPropagation(); selectPart('${category}', ${JSON.stringify(part).replace(/'/g, "\\'")})">Select</button>
        </div>
      </div>
    </div>
  `;
}

// ── Select a part (called from button or modal) ────────────────
window.selectPart = function(category, part) {
  // Deselect previous selection in this category
  const slug = category.replace(/\s+/g, '-').toLowerCase();
  document.querySelectorAll(`#grid-${slug} .part-card`).forEach(c => {
    c.classList.remove('selected');
    c.querySelector('.part-btn').textContent = 'Select';
  });

  // Find and select the card matching this part
  const cards = document.querySelectorAll(`#grid-${slug} .part-card`);
  cards.forEach((card, i) => {
    if (pcData.parts[category][i]?.name === part.name) {
      card.classList.add('selected');
      card.querySelector('.part-btn').textContent = 'Selected ✓';
    }
  });

  // Update state
  selections[category] = part;
  part._category = category;

  // Show selected indicator
  const selEl = document.getElementById(`sel-${slug}`);
  const selName = document.getElementById(`sel-name-${slug}`);
  if (selEl && selName) {
    selEl.classList.add('visible');
    selName.textContent = part.name;
  }

  updateBudget();
  window.showToast && window.showToast(`✓ ${part.name} selected`);
};

// ── Budget tracker ─────────────────────────────────────────────
function updateBudget() {
  const budget  = pcData?.budget || 0;
  const spent   = Object.values(selections).reduce((sum, p) => sum + (p.price || 0), 0);
  const remain  = budget - spent;
  const pct     = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  const spentEl  = document.getElementById('budget-spent');
  const remainEl = document.getElementById('budget-remain');
  const bar      = document.getElementById('budget-bar-fill');

  if (spentEl)  spentEl.textContent  = `$${spent.toLocaleString()}`;
  if (remainEl) {
    remainEl.textContent = remain >= 0
      ? `$${remain.toLocaleString()}`
      : `-$${Math.abs(remain).toLocaleString()}`;
    remainEl.className = 'bv ' + (remain >= 0 ? 'remain' : 'over');
  }
  if (bar) {
    bar.style.width = pct + '%';
    bar.className = 'budget-prog-fill' + (remain < 0 ? ' over' : '');
  }
}

// ── Modal ──────────────────────────────────────────────────────
function openModal(part, category) {
  modalPart = { ...part, _category: category };
  const img = CATEGORY_IMAGES[category] || FALLBACK_IMG;

  document.getElementById('modal-img').src = img;
  document.getElementById('modal-brand').textContent = part.brand;
  document.getElementById('modal-name').textContent  = part.name;
  document.getElementById('modal-price').textContent = `$${part.price}`;

  // Update select button label if already selected
  const already = selections[category]?.name === part.name;
  const btn = document.getElementById('modal-select-btn');
  btn.textContent = already ? 'Selected ✓' : 'Add to Build';

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  modalPart = null;
}
