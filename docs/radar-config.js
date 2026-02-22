(async function(){
  const res = await fetch('./entries.json', { cache: 'no-store' });
  const cfg = await res.json();

  // Future-blue palette / NTT-like dark vibe
  const ringColors = {
    ADOPT: '#63e6ff',
    TRIAL: '#4d8dff',
    ASSESS: '#7a7dff',
    HOLD: '#8f5fff'
  };

  const rings = (cfg.rings || []).map(r => ({
    ...r,
    color: ringColors[r.name] || r.color
  }));

  const isMobile = window.innerWidth <= 720;

  const entries = (cfg.entries || []).map(e => ({
    ...e,
    active: e.active !== false
  }));

  radar_visualization({
    repo_url: 'https://github.com/brudi-bee/sap-integration-tech-radar',
    svg_id: 'radar',
    width: isMobile ? 980 : 1450,
    height: isMobile ? 1180 : 1060,
    scale: isMobile ? 0.88 : 1,
    colors: {
      background: '#0a1542',
      grid: '#3d64ff',
      inactive: '#1d2a66'
    },
    font_family: 'Inter, Arial, Helvetica',
    title: cfg.title || 'SAP Integration Tech Radar',
    quadrants: cfg.quadrants,
    rings,
    // Keep interactive layout so legend/labels are rendered correctly.
    print_layout: false,
    links_in_new_tabs: true,
    entries
  });

  // Improve readability on dark background after render
  const style = document.createElement('style');
  style.textContent = `
    #radar text { fill: #e6eeff; }
    #radar a text { fill: #dce7ff; }
  `;
  document.head.appendChild(style);
})();
