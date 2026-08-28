// ── Project detail overlay ────────────────────────────────────

function openProject(data) {
  const overlay = document.getElementById('overlay');

  document.getElementById('d-title').textContent    = data.title    || 'Project';
  document.getElementById('d-timeline').textContent = data.timeline || '—';
  document.getElementById('d-desc').textContent     = data.description || '';

  document.getElementById('d-tech').innerHTML = (data.techStack || [])
    .map(t => `<span class="tag">${t}</span>`).join('');

  document.getElementById('d-skills').innerHTML = (data.skills || [])
    .map(s => `<span class="tag">${s}</span>`).join('');

  const screens = document.getElementById('d-screens');
  screens.innerHTML = (data.images && data.images.length)
    ? data.images.map(src =>
        `<div class="screen-box"><img src="${src}" alt="screenshot"></div>`
      ).join('')
    : `<div class="screen-box"><span>Screenshots</span></div>
       <div class="screen-box"><span>Screenshots</span></div>
       <div class="screen-box"><span>Screenshots</span></div>`;

  const link = document.getElementById('d-link');
  link.href = data.github || '#';

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProject();
});

// ── Bottom nav active state ───────────────────────────────────

const pills    = document.querySelectorAll('.nav-pill[data-section]');
const sections = document.querySelectorAll('.content-section[id]');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      pills.forEach(p => p.classList.toggle('active', p.dataset.section === id));
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => io.observe(s));

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});
