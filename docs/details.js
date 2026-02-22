(async function () {
  const params = new URLSearchParams(location.search);
  const item = params.get('item');

  const ringNames = ['ADOPT', 'TRIAL', 'ASSESS', 'HOLD'];
  const ringColors = {
    ADOPT: { bg: 'rgba(114,228,255,.2)', border: 'rgba(114,228,255,.7)', text: '#bff3ff' },
    TRIAL: { bg: 'rgba(63,181,255,.2)', border: 'rgba(63,181,255,.7)', text: '#b8e7ff' },
    ASSESS: { bg: 'rgba(107,141,255,.2)', border: 'rgba(107,141,255,.7)', text: '#c9d6ff' },
    HOLD: { bg: 'rgba(143,115,255,.2)', border: 'rgba(143,115,255,.7)', text: '#ddd2ff' }
  };

  const cfg = await (await fetch('./entries.json', { cache: 'no-store' })).json();
  const detailsData = await (await fetch('./details-data.json', { cache: 'no-store' })).json();
  const quadrants = (cfg.quadrants || []).map(q => q.name);
  const entries = cfg.entries || [];

  const entry = entries.find(e => e.label === item) || entries[0];
  if (!entry) return;

  const ring = ringNames[entry.ring] || `Ring ${entry.ring}`;
  const quadrant = quadrants[entry.quadrant] || `Quadrant ${entry.quadrant}`;

  document.title = `${entry.label} · SAP Integration Radar`;
  document.getElementById('title').textContent = entry.label;
  document.getElementById('subtitle').textContent = 'SAP Integration Tech Radar – Detailansicht';
  const ringEl = document.getElementById('ring');
  ringEl.textContent = ring;
  document.getElementById('quadrant').textContent = quadrant;

  if (ringColors[ring]) {
    ringEl.style.background = ringColors[ring].bg;
    ringEl.style.borderColor = ringColors[ring].border;
    ringEl.style.color = ringColors[ring].text;
  }

  const detailItem = (detailsData.items || []).find(i => i.label === entry.label);

  const desc = detailItem?.summary || 'Technologie/Pattern im Integrationskontext anhand Nutzen, Risiko und operativer Reife bewerten.';
  document.getElementById('desc').textContent = desc;

  const actions = detailItem?.actions?.length
    ? detailItem.actions
    : [
        'Scope klar ziehen: Wo bringt das Thema den größten Integrationsnutzen?',
        'Nicht-funktionale Anforderungen festhalten (Security, Monitoring, Betrieb).',
        'Ein kleines Referenz-Setup mit messbaren Erfolgsmetriken aufbauen.'
      ];
  document.getElementById('actions').innerHTML = actions.map(a => `<li>${a}</li>`).join('');

  document.getElementById('raw').textContent = JSON.stringify({
    ...entry,
    detailSummary: detailItem?.summary,
    detailSources: detailItem?.sources || []
  }, null, 2);
})();
