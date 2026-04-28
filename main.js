// =========================================================
// HappyLand Hollyday Residential — front-end logic
// - Génère la grille des 14 logements
// - Filtre par site
// - Modal détail (avec tarifs + dispos depuis dispos.json)
// - Soumission du formulaire de réservation → mailto
// =========================================================

const CONTACT_EMAIL = 'byandepaul@gmail.com';

const LOGEMENTS = [
  // STAINS — Résidence Oasis
  { id: 'ST-01_Marry_Me',        code: 'ST-01', site: 'ST', siteLabel: 'Stains',           name: 'Marry Me',        type: 'Suite',       theme: 'Romantique · Couples',    surface: 18, capacite: 2, etage: 'RDC', bs: 55, hs: 75, sem: 350, mois: 1200, menage: 30, caution: 200, desc: 'Suite romantique et cosy à 30 min de Paris, parfaite pour couples. Lit queen size, kitchenette, accès cour extérieure.' },
  { id: 'ST-02_Moon_Ray',        code: 'ST-02', site: 'ST', siteLabel: 'Stains',           name: 'Moon Ray',        type: 'Chambre',     theme: 'Lune · Sérénité',          surface: 12, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre cosy thème "Lune" avec accès cour. Idéale solo ou couples.' },
  { id: 'ST-03_Pepsy_Blue',      code: 'ST-03', site: 'ST', siteLabel: 'Stains',           name: 'Pepsy Blue',      type: 'Chambre',     theme: 'Bleu · Fraîcheur',         surface: 15, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre lumineuse aux tons bleus, accès cour. Ambiance fraîche et apaisante.' },
  { id: 'ST-04_Hibiscus',        code: 'ST-04', site: 'ST', siteLabel: 'Stains',           name: 'Hibiscus',        type: 'Chambre',     theme: 'Floral · Tropical',        surface: 12, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre privative thème hibiscus, Résidence Oasis. Accès cour commune.' },
  { id: 'ST-05_Pinky_Elisabeth', code: 'ST-05', site: 'ST', siteLabel: 'Stains',           name: 'Pinky Elisabeth', type: 'Chambre',     theme: 'Rose · Élégance',          surface: 12, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre élégante aux tons rosés, douce et raffinée. Accès cour.' },
  { id: 'ST-06_Serenity',        code: 'ST-06', site: 'ST', siteLabel: 'Stains',           name: 'Serenity',        type: 'Chambre',     theme: 'Zen · Apaisement',         surface: 12, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre privative au cœur d\'une villa à Stains. Stade de France 20 min, Arc de Triomphe 25 min.' },
  { id: 'ST-07_Allamanda',       code: 'ST-07', site: 'ST', siteLabel: 'Stains',           name: 'Allamanda',       type: 'Appartement', theme: 'Tropical · Famille',       surface: 28, capacite: 4, etage: 'RDC', bs: 70, hs: 95, sem: 450, mois: 1500, menage: 40, caution: 250, desc: 'Appartement 2 chambres avec accès cour, idéal famille ou groupe d\'amis.' },
  { id: 'ST-08_Arum',            code: 'ST-08', site: 'ST', siteLabel: 'Stains',           name: 'Arum',            type: 'Studio',      theme: 'Floral blanc · Pureté',    surface: 25, capacite: 4, etage: 'R+1', bs: 55, hs: 75, sem: 360, mois: 1200, menage: 30, caution: 200, desc: 'Studio cosy indépendant, décoration soignée. 25 min de Paris.' },

  // ÉPINAY — Résidence Bosquera
  { id: 'EP-01_Pepsy',           code: 'EP-01', site: 'EP', siteLabel: 'Épinay-sur-Seine', name: 'Pepsy',           type: 'Chambre',     theme: 'Fraîcheur · Modernité',    surface: 13, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre moderne, Résidence Bosquera. Accès cour intérieure. Proche RER C.' },
  { id: 'EP-02_Zen',             code: 'EP-02', site: 'EP', siteLabel: 'Épinay-sur-Seine', name: 'Zen',             type: 'Chambre',     theme: 'Zen · Méditation',         surface: 13, capacite: 2, etage: 'R+1', bs: 35, hs: 50, sem: 230, mois: 850,  menage: 20, caution: 150, desc: 'Chambre à l\'ambiance zen et méditative. Parfaite pour un séjour apaisant.' },
  { id: 'EP-03_The_Executive',   code: 'EP-03', site: 'EP', siteLabel: 'Épinay-sur-Seine', name: 'The Executive',   type: 'Chambre',     theme: 'Business · Executive',     surface: 18, capacite: 2, etage: 'R+2', bs: 50, hs: 70, sem: 320, mois: 1100, menage: 30, caution: 200, desc: 'Chambre Executive haut de gamme. Bureau équipé, idéale business travellers.' },
  { id: 'EP-04_The_Queen',       code: 'EP-04', site: 'EP', siteLabel: 'Épinay-sur-Seine', name: 'The Queen',       type: 'Chambre',     theme: 'Royal · Premium',          surface: 13, capacite: 2, etage: 'R+2', bs: 40, hs: 55, sem: 260, mois: 900,  menage: 25, caution: 200, desc: 'Décoration royale et raffinée. Idéale couples exigeants à 30 min de Paris.' },

  // HOUILLES — Résidence Houilles
  { id: 'HO-01_Azur',            code: 'HO-01', site: 'HO', siteLabel: 'Houilles',         name: 'Azur',            type: 'Studio',      theme: 'Bleu azur · Méditerranée', surface: 27, capacite: 3, etage: 'R+1', bs: 55, hs: 75, sem: 360, mois: 1200, menage: 30, caution: 200, desc: 'Studio de charme aux tons bleu azur. Espace travail et détente. Proche RER A, 20 min La Défense.' },
  { id: 'HO-02_Kalyvia',         code: 'HO-02', site: 'HO', siteLabel: 'Houilles',         name: 'Kalyvia',         type: 'Studio',      theme: 'Grec · Intimité',          surface: 16, capacite: 2, etage: 'R+1', bs: 45, hs: 60, sem: 280, mois: 950,  menage: 25, caution: 200, desc: 'Studio intimiste cosy, inspiration grecque. Cocooning à 20 min de La Défense.' },
];

// =========================================================
// 1. Générer la grille des 14 logements
// =========================================================
function renderGrid() {
  const grid = document.getElementById('logementGrid');
  if (!grid) return;
  grid.innerHTML = LOGEMENTS.map(l => `
    <article class="logement-card" data-site="${l.site}" data-id="${l.id}">
      <div class="logement-thumb">
        <span class="logement-tag">${l.code}</span>
        <img src="/photos/${l.id}.jpg" alt="${l.name} — ${l.siteLabel}" loading="lazy" />
      </div>
      <div class="logement-body">
        <h3>${l.name}</h3>
        <p class="logement-theme">${l.theme}</p>
        <div class="logement-meta">
          <span>${l.type}</span>
          <span>${l.surface} m²</span>
          <span>${l.capacite} pers.</span>
          <span>${l.siteLabel}</span>
        </div>
        <div class="logement-price">
          <span class="logement-price-label">Dès</span>
          <span class="logement-price-value">${l.bs}€<small>/nuit</small></span>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.logement-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
}

// =========================================================
// 2. Filtres par site
// =========================================================
function setupFilters() {
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.logement-card').forEach(card => {
        const show = f === 'all' || card.dataset.site === f;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
}

// =========================================================
// 3. Modal détail logement
// =========================================================
let DISPOS = null;

async function loadDispos() {
  try {
    const res = await fetch('/dispos.json');
    DISPOS = await res.json();
  } catch (e) {
    console.warn('dispos.json non chargé', e);
    DISPOS = { logements: {} };
  }
}

function fmtDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function renderDispos(logementId) {
  const data = DISPOS?.logements?.[logementId];
  const periods = data?.indisponible || [];
  if (periods.length === 0) {
    return `<p class="modal-dispo-empty">✓ Logement actuellement disponible — contactez-nous pour confirmer vos dates.</p>`;
  }
  return `<ul class="modal-dispo-list">${
    periods.map(p => `<li>Indisponible du <strong>${fmtDate(p.start)}</strong> au <strong>${fmtDate(p.end)}</strong>${p.motif ? ` — ${p.motif}` : ''}</li>`).join('')
  }</ul>`;
}

function openModal(logementId) {
  const l = LOGEMENTS.find(x => x.id === logementId);
  if (!l) return;
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-hero">
      <img src="/photos/${l.id}.jpg" alt="${l.name}" />
    </div>
    <div class="modal-body">
      <p class="modal-tag">${l.code} · ${l.siteLabel}</p>
      <h3 class="modal-title">${l.name}</h3>
      <p class="modal-theme">${l.theme}</p>
      <p class="modal-desc">${l.desc}</p>

      <dl class="modal-grid">
        <div><dt>Type</dt><dd>${l.type}</dd></div>
        <div><dt>Surface</dt><dd>${l.surface} m²</dd></div>
        <div><dt>Capacité</dt><dd>${l.capacite} personnes</dd></div>
        <div><dt>Étage</dt><dd>${l.etage}</dd></div>
        <div><dt>Ménage</dt><dd>${l.menage} €</dd></div>
        <div><dt>Caution</dt><dd>${l.caution} €</dd></div>
      </dl>

      <div class="modal-prices">
        <div class="modal-price"><p class="modal-price-label">B. saison</p><p class="modal-price-value">${l.bs}€</p></div>
        <div class="modal-price"><p class="modal-price-label">H. saison</p><p class="modal-price-value">${l.hs}€</p></div>
        <div class="modal-price"><p class="modal-price-label">Semaine</p><p class="modal-price-value">${l.sem}€</p></div>
        <div class="modal-price"><p class="modal-price-label">Mois</p><p class="modal-price-value">${l.mois}€</p></div>
      </div>

      <div class="modal-dispo">
        <h4>Disponibilités</h4>
        ${renderDispos(l.id)}
      </div>

      <div class="modal-cta">
        <button type="button" class="btn btn-gold btn-lg" data-reserve="${l.name} (${l.siteLabel})">Réserver ce logement</button>
      </div>
    </div>
  `;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Bouton "Réserver ce logement" : pré-sélectionne le logement dans le formulaire
  const reserveBtn = content.querySelector('[data-reserve]');
  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      const select = document.getElementById('logement');
      const val = reserveBtn.dataset.reserve;
      if (select) {
        for (const opt of select.options) {
          if (opt.value === val) { select.value = val; break; }
        }
      }
      closeModal();
      document.getElementById('reserver')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setupModal() {
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// =========================================================
// 4. Formulaire de réservation → mailto
// =========================================================
function setupForm() {
  const form = document.getElementById('reserveForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validation basique
    const required = ['logement', 'arrivee', 'depart', 'personnes', 'nom', 'email', 'telephone'];
    for (const id of required) {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.focus();
        el.style.borderColor = '#c44';
        return;
      }
      el.style.borderColor = '';
    }

    const data = Object.fromEntries(new FormData(form).entries());

    // Vérifier ordre des dates
    if (data.depart <= data.arrivee) {
      alert('La date de départ doit être après la date d\'arrivée.');
      document.getElementById('depart').focus();
      return;
    }

    const subject = `Demande de réservation — ${data.logement} — du ${fmtDate(data.arrivee)} au ${fmtDate(data.depart)}`;
    const body = `Bonjour Carine et Paul,

Je souhaite réserver le logement suivant :

  • Logement   : ${data.logement}
  • Arrivée    : ${fmtDate(data.arrivee)}
  • Départ     : ${fmtDate(data.depart)}
  • Personnes  : ${data.personnes}
  • Profil     : ${data.profil || 'Non précisé'}

Mes coordonnées :

  • Nom        : ${data.nom}
  • Email      : ${data.email}
  • Téléphone  : ${data.telephone}
  • Pays       : ${data.pays || 'Non précisé'}

${data.message ? `Mon message :\n\n${data.message}\n\n` : ''}Merci de me confirmer la disponibilité, le tarif total et vos coordonnées bancaires pour le virement.

Cordialement,
${data.nom}`;

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

// =========================================================
// 5. Année dans le footer
// =========================================================
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// =========================================================
// Init
// =========================================================
async function init() {
  renderGrid();
  setupFilters();
  setupModal();
  setupForm();
  setYear();
  await loadDispos();
}

init();
