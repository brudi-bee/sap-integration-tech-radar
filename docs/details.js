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

  document.getElementById('intro').textContent = detailItem?.intro || `Es geht um ${entry.label} als Integrationsbaustein.`;
  document.getElementById('why-ring').textContent = detailItem?.whyRing || 'Die Einordnung folgt dem erwarteten Nutzen-Risiko-Verhältnis für neue Implementierungen.';

  const risks = detailItem?.risks?.length
    ? detailItem.risks
    : ['Ohne klare Leitplanken steigt das Risiko inkonsistenter Integrationsmuster über Teams hinweg.'];
  document.getElementById('risks').innerHTML = risks.map(r => `<li>${r}</li>`).join('');

  const dos = detailItem?.do?.length
    ? detailItem.do
    : [
        'Klare Success-Kriterien und Betriebsmetriken vor dem Rollout festlegen.',
        'Scope und Ownership früh zwischen Architektur, Produkt und Betrieb abstimmen.'
      ];
  document.getElementById('do-list').innerHTML = dos.map(a => `<li>${a}</li>`).join('');

  const donts = detailItem?.dont?.length
    ? detailItem.dont
    : ['Keine Einführung ohne abgestimmtes Betriebs- und Ownership-Modell.'];
  document.getElementById('dont-list').innerHTML = donts.map(a => `<li>${a}</li>`).join('');

  document.getElementById('raw').textContent = JSON.stringify({
    ...entry,
    details: detailItem || null
  }, null, 2);
})();
