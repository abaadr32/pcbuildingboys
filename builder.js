/* PC Building Boys — Component Builder */

// Real product images per category
const CATEGORY_IMAGES = {
  'Chassis':      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
  'CPU':          'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
  'Motherboard':  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  'Memory':       'https://images.unsplash.com/photo-1562976540-1502c2145a5a?w=400&q=80',
  'GPU':          'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&q=80',
  'Storage':      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
  'Power Supply': 'https://images.unsplash.com/photo-1616849949750-f2295ff78eed?w=400&q=80',
  'Cooling':      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
  'Monitor':      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
  'Keyboard':     'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&q=80';

// Bootstrap Icons per category
const CATEGORY_ICONS = {
  'Chassis':      'bi-pc-display',
  'CPU':          'bi-cpu',
  'Motherboard':  'bi-motherboard',
  'Memory':       'bi-memory',
  'GPU':          'bi-gpu-card',
  'Storage':      'bi-device-hdd',
  'Power Supply': 'bi-plug-fill',
  'Cooling':      'bi-wind',
  'Monitor':      'bi-display',
  'Keyboard':     'bi-keyboard',
};

const CATEGORY_DESCS = {
  'Chassis':      'The case that houses all your components',
  'CPU':          'The brain and processing core of your build',
  'Motherboard':  'Connects every component in your system',
  'Memory':       'RAM for fast, responsive performance',
  'GPU':          'Powers your visuals and frame rates',
  'Storage':      'NVMe SSD for fast boot and load times',
  'Power Supply': 'Delivers clean, stable power to every part',
  'Cooling':      'Keeps your system running at safe temperatures',
  'Monitor':      'Your window into the build',
  'Keyboard':     'Input device for your setup',
};

let pcData     = null;
let selections = {};
let modalPart  = null;

document.addEventListener('DOMContentLoaded', async () => {
  const dataEl = document.getElementById('pc-data-src');
  if (!dataEl) return;

  const jsonFile = dataEl.dataset.src;
  try {
    const res = await fetch(jsonFile);
    pcData = await res.json();
    renderBuilder();
  } catch(e) {
    document.getElementById('components-container').innerHTML = `
      <div style="text-align:center;padding:80px 0;color:var(--text-3)">
        <i class="bi bi-exclamation-circle" style="font-size:2rem;display:block;margin-bottom:12px;color:var(--danger)"></i>
        Failed to load components. Please refresh the page.
      </div>`;
  }

  // Modal events
  document.getElementById('modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-select-btn')?.addEventListener('click', () => {
    if (modalPart) selectPart(modalPart._category, modalPart);
    closeModal();
  });

  // Clear build
  document.getElementById('clear-build-btn')?.addEventListener('click', () => {
    selections = {};
    document.querySelectorAll('.part-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.part-btn').forEach(b => { b.textContent = 'Select'; });
    document.querySelectorAll('.comp-selected-badge').forEach(el => el.classList.remove('show'));
    updateBudget();
    window.showToast && window.showToast('Build cleared');
  });
});

function renderBuilder() {
  if (!pcData) return;
  const container = document.getElementById('components-container');
  if (!container) return;

  const budget = pcData.budget || 0;
  const totalEl = document.getElementById('budget-total');
  if (totalEl) totalEl.textContent = `$${budget.toLocaleString()}`;

  let html = '';
  Object.entries(pcData.parts).forEach(([category, items]) => {
    const iconClass = CATEGORY_ICONS[category] || 'bi-puzzle';
    const desc = CATEGORY_DESCS[category] || '';
    const slug = category.replace(/\s+/g, '-').toLowerCase();

    html += `
      <div class="comp-section" id="section-${slug}">
        <div class="comp-header">
          <div class="comp-icon-wrap"><i class="bi ${iconClass}"></i></div>
          <div class="comp-info">
            <h3>${category}</h3>
            <p>${desc}</p>
          </div>
          <div class="comp-selected-badge" id="sel-${slug}">
            <i class="bi bi-check-circle-fill"></i>
            <span id="sel-name-${slug}">Selected</span>
          </div>
        </div>
        <div class="parts-grid stagger visible" id="grid-${slug}">
          ${items.map((part, i) => renderPartCard(part, category, i)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Attach click events
  container.querySelectorAll('.part-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      const idx = parseInt(card.dataset.index, 10);
      const part = pcData.parts[cat][idx];
      openModal(part, cat);
    });
  });

  updateBudget();
}

function renderPartCard(part, category, index) {
  const img  = CATEGORY_IMAGES[category] || FALLBACK_IMG;
  const slug = category.replace(/\s+/g, '-').toLowerCase();
  return `
    <div class="part-card" data-category="${category}" data-index="${index}" id="card-${slug}-${index}">
      <div class="part-img-wrap">
        <img src="${img}" alt="${part.name}" loading="lazy" onerror="this.src='${FALLBACK_IMG}'">
        <span class="part-sel-tag"><i class="bi bi-check-lg"></i> Selected</span>
      </div>
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

window.selectPart = function(category, part) {
  const slug = category.replace(/\s+/g, '-').toLowerCase();

  // Deselect all in category
  document.querySelectorAll(`#grid-${slug} .part-card`).forEach(c => {
    c.classList.remove('selected');
    const btn = c.querySelector('.part-btn');
    if (btn) btn.textContent = 'Select';
  });

  // Select matching card
  const cards = document.querySelectorAll(`#grid-${slug} .part-card`);
  cards.forEach((card, i) => {
    if (pcData.parts[category][i]?.name === part.name) {
      card.classList.add('selected');
      const btn = card.querySelector('.part-btn');
      if (btn) btn.textContent = 'Selected';
    }
  });

  selections[category] = part;
  part._category = category;

  const selEl = document.getElementById(`sel-${slug}`);
  const selName = document.getElementById(`sel-name-${slug}`);
  if (selEl) selEl.classList.add('show');
  if (selName) selName.textContent = part.name;

  updateBudget();
  window.showToast && window.showToast(`${part.name} added to build`);
};

function updateBudget() {
  const budget = pcData?.budget || 0;
  const spent  = Object.values(selections).reduce((s, p) => s + (p.price || 0), 0);
  const remain = budget - spent;
  const pct    = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  const spentEl  = document.getElementById('budget-spent');
  const remainEl = document.getElementById('budget-remain');
  const fill     = document.getElementById('budget-bar-fill');
  const pctLabel = document.getElementById('budget-pct');

  if (spentEl)  spentEl.textContent = `$${spent.toLocaleString()}`;
  if (remainEl) {
    remainEl.textContent = remain >= 0 ? `$${remain.toLocaleString()}` : `-$${Math.abs(remain).toLocaleString()}`;
    remainEl.className   = 'bv ' + (remain >= 0 ? 'remain' : 'over');
  }
  if (fill) {
    fill.style.width = pct + '%';
    fill.className   = 'budget-fill' + (remain < 0 ? ' over' : '');
  }
  if (pctLabel) pctLabel.textContent = `${Math.round(pct)}% used`;
}

function openModal(part, category) {
  modalPart = { ...part, _category: category };
  const img = CATEGORY_IMAGES[category] || FALLBACK_IMG;

  document.getElementById('modal-img').src = img;
  document.getElementById('modal-brand').textContent  = part.brand;
  document.getElementById('modal-name').textContent   = part.name;
  document.getElementById('modal-price').textContent  = `$${part.price}`;

  const already = selections[category]?.name === part.name;
  const btn = document.getElementById('modal-select-btn');
  if (btn) {
    btn.innerHTML = already
      ? '<i class="bi bi-check-lg"></i> Already Selected'
      : '<i class="bi bi-plus-lg"></i> Add to Build';
    btn.disabled = already;
  }

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  modalPart = null;
}
