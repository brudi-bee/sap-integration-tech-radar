# Ready Checklist (Operational Use)

Ziel: Sicherstellen, dass der Radar nicht nur "vorhanden", sondern wirklich produktiv nutzbar ist.

## 1) Content & Struktur

- [x] Einheitliches JSON-Schema (`i18n.de` / `i18n.en`) in `details-data.json`
- [x] Schema dokumentiert (`CONTENT_SCHEMA.md`)
- [x] Legacy-Sprachkeys (`*_de` / `*_en`) entfernt
- [x] Keine offensichtlichen Dummy-Einträge mehr
- [ ] EN-Texte final sprachlich geglättet (Native QA)

## 2) Qualitätssicherung

- [x] Automatischer Schema-Validator vorhanden (`scripts/validate_radar_content.py`)
- [x] Validator in Deploy-Workflow integriert (blockend bei Schemafehlern)
- [x] Content-Warnungen verfügbar (`--warn-content`)
- [ ] Optional: `--strict-content` aktivieren, sobald Team mit Warn-Noise fein ist

## 3) Governance & Prozess

- [x] Contribution-Guide vorhanden
- [x] PR-Template vorhanden
- [ ] Reviewer-Kreis verbindlich festlegen (Architektur + Betrieb + Security)
- [ ] Ring-Entscheidungen mit festem Cadence-Termin (z. B. monatlich/quarterly)

## 4) Release & Transparenz

- [x] Changelog gepflegt
- [x] Baseline auf v0.1.1 aktualisiert
- [ ] Git Tag / offizieller Snapshot je Quartal
- [ ] Optional: "last updated" je Blip im UI anzeigen

## 5) Quellenqualität

- [x] Referenzen-Feld pro Blip vorhanden
- [ ] Zielzustand: pro Blip mind. 1–2 belastbare Primärquellen
- [ ] Quellen regelmäßig auf Dead Links prüfen

---

## Quick Commands

```bash
# schema check (blocking)
python3 scripts/validate_radar_content.py

# schema + content quality warnings
python3 scripts/validate_radar_content.py --warn-content

# fail on warnings (for stricter CI later)
python3 scripts/validate_radar_content.py --strict-content
```
