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

  const ringHint = {
    ADOPT: 'Bewährt in produktiven SAP-Integrationsszenarien, mit klaren Betriebs- und Governance-Mustern.',
    TRIAL: 'Vielversprechend mit ersten belastbaren Erfahrungen. Sinnvoll für gezielte, gut begleitete Einsätze.',
    ASSESS: 'Technisch interessant, aber noch mit offenen Fragen zu Betrieb, Reifegrad oder Team-Fit.',
    HOLD: 'Für neue Initiativen aktuell nicht empfohlen; eher für Legacy-Betrieb und kontrollierte Migration.'
  };

  const domainHints = {
    'SAP Cloud Integration (CI)': 'Zentraler Integrationsdienst auf BTP für API- und Event-nahe Flows; stark für standardisierte iFlows und Governance.',
    'SAP API Management': 'Wichtig für API-Produktisierung, Security-Policies, Rate Limits und Lifecycle-Management.',
    'SAP Event Mesh': 'Asynchrone Entkopplung, Event-getriebene Prozesse und robuste Lastverteilung.',
    'API-first': 'Verträge zuerst definieren; reduziert Integrationskosten und Überraschungen in nachgelagerten Teams.',
    'OpenTelemetry': 'Grundlage für End-to-End-Observability über Integrationsketten hinweg.',
    'OAuth2 / OIDC': 'Standard für moderne AuthN/AuthZ in API-basierten Integrationsszenarien.',
    'REST/JSON': 'De-facto-Standard für lose gekoppelte, evolvierbare Schnittstellen.',
    'OData v4': 'Stark im SAP-Umfeld bei Datenzugriff und serviceorientierter Exposition.',
    'RFC/BAPI (remote)': 'Für neue Integrationen möglichst vermeiden; als Übergangstechnik sauber kapseln.'
  };

  const cfg = await (await fetch('./entries.json', { cache: 'no-store' })).json();
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

  const desc = domainHints[entry.label] || ringHint[ring] || 'Technologie/Pattern im Integrationskontext bewerten anhand Nutzen, Risiko und operativer Reife.';
  document.getElementById('desc').textContent = desc;

  const actions = [
    'Scope klar ziehen: Wo bringt das Thema den größten Integrationsnutzen?',
    'Nicht-funktionale Anforderungen festhalten (Security, Monitoring, Betrieb).',
    'Ein kleines Referenz-Setup mit messbaren Erfolgsmetriken aufbauen.'
  ];
  document.getElementById('actions').innerHTML = actions.map(a => `<li>${a}</li>`).join('');

  document.getElementById('raw').textContent = JSON.stringify(entry, null, 2);
})();
