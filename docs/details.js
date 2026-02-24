(async function () {
  const params = new URLSearchParams(location.search);
  const item = params.get('item');
  const urlLang = params.get('lang');

  const ringNames = ['ADOPT', 'TRIAL', 'ASSESS', 'HOLD'];
  const ringColors = {
    ADOPT: { bg: 'rgba(34,211,238,.20)', border: 'rgba(34,211,238,.70)', text: '#bff8ff' },
    TRIAL: { bg: 'rgba(59,130,246,.20)', border: 'rgba(59,130,246,.70)', text: '#cfe3ff' },
    ASSESS: { bg: 'rgba(245,158,11,.20)', border: 'rgba(245,158,11,.70)', text: '#ffe1ad' },
    HOLD: { bg: 'rgba(239,68,68,.20)', border: 'rgba(239,68,68,.70)', text: '#ffc9c9' }
  };

  const i18n = {
    de: {
      langLabel: 'Sprache',
      back: '← zurück zum Radar',
      subtitle: 'SAP Integration Tech Radar – Detailansicht',
      hIntro: 'Worum geht es?',
      hWhy: 'Einordnung',
      hRisks: 'Relevante Risiken',
      hDo: 'Do',
      hDont: 'Don’t',
      hWhenNot: 'Wann nicht verwenden?',
      hRefs: 'Referenzen',
      hRaw: 'Raw Entry',
      noRefs: 'Keine spezifischen Referenzen hinterlegt.',
      confidence: 'Konfidenz'
    },
    en: {
      langLabel: 'Language',
      back: '← back to radar',
      subtitle: 'SAP Integration Tech Radar – detail view',
      hIntro: 'What is this about?',
      hWhy: 'Assessment',
      hRisks: 'Relevant risks',
      hDo: 'Do',
      hDont: 'Don’t',
      hWhenNot: 'When not to use',
      hRefs: 'References',
      hRaw: 'Raw entry',
      noRefs: 'No specific references available.',
      confidence: 'Confidence'
    }
  };

  const cfg = await (await fetch('./entries.json', { cache: 'no-store' })).json();
  const detailsData = await (await fetch('./details-data.json', { cache: 'no-store' })).json();
  const quadrants = (cfg.quadrants || []).map(q => q.name);
  const entries = cfg.entries || [];

  const entry = entries.find(e => e.label === item) || entries[0];
  if (!entry) return;

  const ring = ringNames[entry.ring] || `Ring ${entry.ring}`;
  const quadrant = quadrants[entry.quadrant] || `Quadrant ${entry.quadrant}`;
  const detailItem = (detailsData.items || []).find(i => i.label === entry.label);

  const ringEl = document.getElementById('ring');
  const confidenceEl = document.getElementById('confidence');
  ringEl.textContent = ring;
  document.getElementById('quadrant').textContent = quadrant;
  if (ringColors[ring]) {
    ringEl.style.background = ringColors[ring].bg;
    ringEl.style.borderColor = ringColors[ring].border;
    ringEl.style.color = ringColors[ring].text;
  }

  const langSwitch = document.getElementById('lang-switch');
  const savedLang = localStorage.getItem('radar.lang');
  langSwitch.value = (urlLang === 'en' || urlLang === 'de')
    ? urlLang
    : ((savedLang === 'en' || savedLang === 'de') ? savedLang : 'de');

  function byLang(deVal, enVal, lang, fallback = '') {
    if (lang === 'en') return enVal ?? deVal ?? fallback;
    return deVal ?? enVal ?? fallback;
  }

  function detailValue(field, lang, fallback = '') {
    const i18nField = detailItem?.i18n?.[lang]?.[field];
    const i18nFallback = detailItem?.i18n?.[lang === 'en' ? 'de' : 'en']?.[field];
    if (i18nField !== undefined && i18nField !== null) return i18nField;
    if (i18nFallback !== undefined && i18nFallback !== null) return i18nFallback;

    const legacyDe = detailItem?.[`${field}_de`];
    const legacyEn = detailItem?.[`${field}_en`];
    const legacyBase = detailItem?.[field];
    return byLang(legacyDe ?? legacyBase, legacyEn ?? legacyBase, lang, fallback);
  }

  function applyLanguage(lang) {
    const t = i18n[lang] || i18n.de;
    document.title = `${entry.label} · SAP Integration Radar`;
    document.getElementById('title').textContent = entry.label;
    document.getElementById('subtitle').textContent = t.subtitle;

    document.getElementById('lang-label').textContent = t.langLabel;
    document.getElementById('back-link').textContent = t.back;
    document.getElementById('back-link').href = `./?lang=${lang}`;
    document.getElementById('h-intro').textContent = t.hIntro;
    document.getElementById('h-why').textContent = t.hWhy;
    document.getElementById('h-risks').textContent = t.hRisks;
    document.getElementById('h-do').textContent = t.hDo;
    document.getElementById('h-dont').textContent = t.hDont;
    document.getElementById('h-when-not').textContent = t.hWhenNot;
    document.getElementById('h-refs').textContent = t.hRefs;
    document.getElementById('h-raw').textContent = t.hRaw;

    const confidence = (detailItem?.confidence || '').trim();
    if (confidence) {
      confidenceEl.textContent = `${t.confidence}: ${confidence}`;
      const c = confidence.toLowerCase();
      if (c === 'high') {
        confidenceEl.style.background = 'rgba(34,197,94,.20)';
        confidenceEl.style.borderColor = 'rgba(34,197,94,.70)';
        confidenceEl.style.color = '#bbf7d0';
      } else if (c === 'medium') {
        confidenceEl.style.background = 'rgba(245,158,11,.20)';
        confidenceEl.style.borderColor = 'rgba(245,158,11,.70)';
        confidenceEl.style.color = '#fde68a';
      } else {
        confidenceEl.style.background = 'rgba(239,68,68,.20)';
        confidenceEl.style.borderColor = 'rgba(239,68,68,.70)';
        confidenceEl.style.color = '#fecaca';
      }
      confidenceEl.style.display = 'inline-block';
    } else {
      confidenceEl.style.display = 'none';
    }

    document.getElementById('intro').textContent = detailValue(
      'intro',
      lang,
      lang === 'en' ? `This item is about ${entry.label} in an integration context.` : `Es geht um ${entry.label} als Integrationsbaustein.`
    );

    document.getElementById('why-ring').textContent = detailValue(
      'whyRing',
      lang,
      lang === 'en'
        ? 'This assessment reflects the expected value-risk ratio for new implementations.'
        : 'Die Einordnung folgt dem erwarteten Nutzen-Risiko-Verhältnis für neue Implementierungen.'
    );

    const risks = detailValue('risks', lang, []);
    document.getElementById('risks').innerHTML = (risks.length ? risks : [lang === 'en' ? 'Missing guardrails can lead to inconsistent integration patterns across teams.' : 'Ohne klare Leitplanken steigt das Risiko inkonsistenter Integrationsmuster über Teams hinweg.'])
      .map(r => `<li>${r}</li>`).join('');

    const dos = detailValue('do', lang, []);
    document.getElementById('do-list').innerHTML = (dos.length ? dos : [lang === 'en' ? 'Define success criteria and operating metrics before rollout.' : 'Klare Success-Kriterien und Betriebsmetriken vor dem Rollout festlegen.'])
      .map(d => `<li>${d}</li>`).join('');

    const donts = detailValue('dont', lang, []);
    document.getElementById('dont-list').innerHTML = (donts.length ? donts : [lang === 'en' ? 'Do not adopt without an agreed operating model and ownership setup.' : 'Keine Einführung ohne abgestimmtes Betriebs- und Ownership-Modell.'])
      .map(d => `<li>${d}</li>`).join('');

    const whenNot = detailValue('whenNotToUse', lang, []);
    document.getElementById('when-not-list').innerHTML = (whenNot.length ? whenNot : [lang === 'en' ? 'Do not use if value and operational maturity are not clearly evidenced.' : 'Nicht einsetzen, wenn Nutzen und Betriebsreife für den Kontext nicht klar belegt sind.'])
      .map(d => `<li>${d}</li>`).join('');

    const refs = detailItem?.references || [];
    document.getElementById('refs-list').innerHTML = refs.length
      ? refs.map(url => `<li><a href="${url}" target="_blank" rel="noreferrer">${url}</a></li>`).join('')
      : `<li>${t.noRefs}</li>`;

    document.getElementById('raw').textContent = JSON.stringify({ ...entry, details: detailItem || null }, null, 2);
  }

  applyLanguage(langSwitch.value);
  langSwitch.addEventListener('change', () => {
    localStorage.setItem('radar.lang', langSwitch.value);
    const u = new URL(window.location.href);
    u.searchParams.set('lang', langSwitch.value);
    window.history.replaceState({}, '', u.toString());
    applyLanguage(langSwitch.value);
  });
})();
