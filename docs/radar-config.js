(async function(){
  const res = await fetch('./entries.json');
  const cfg = await res.json();

  // Zalando radar expects a single config object; entries are auto-positioned.
  radar_visualization({
    repo_url: 'https://github.com/brudi-bee/sap-integration-tech-radar',
    svg_id: 'radar',
    width: 1450,
    height: 1000,
    scale: 1.0,
    colors: {
      background: '#ffffff',
      grid: '#bbbbbb',
      inactive: '#dddddd'
    },
    font_family: 'Inter, Arial, Helvetica',
    title: cfg.title || 'SAP Integration Tech Radar',
    quadrants: cfg.quadrants,
    rings: cfg.rings,
    print_layout: true,
    links_in_new_tabs: true,
    entries: cfg.entries
  });
})();
