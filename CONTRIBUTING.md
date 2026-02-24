# Contributing

Danke fürs Mitbauen am SAP Integration Tech Radar.

## Prinzipien

- **Evidence over opinion**: Änderungen mit nachvollziehbaren Quellen/Erfahrungen begründen.
- **Small PRs**: Kleine, isolierte Änderungen sind leichter reviewbar.
- **Context matters**: Immer den Zielkontext nennen (z. B. S/4-only, BTP-hybrid, regulated).

## Change types

1. **Ring Change** (ADOPT/TRIAL/ASSESS/HOLD)
2. **New Entry** (neue Technologie)
3. **Cleanup** (Wording, konsistente Labels, Duplikate)

## Für Ring Changes bitte mitliefern

- aktueller Ring + Zielring
- Begründung entlang der Kriterien aus README
- Auswirkungen auf neue Projekte
- Migrations-/Ablösehinweis für bestehende Landschaften

Nutze dafür das Issue Template: `.github/ISSUE_TEMPLATE/ring-change.md`

## Naming conventions

- Einträge kurz und eindeutig (z. B. `SAP Cloud Integration (CI)`)
- Legacy explizit markieren, wenn nötig (z. B. `SOAP (legacy)`)
- Abkürzungen beim ersten Auftreten ausschreiben

## Review & Merge Process

- Änderungen kommen per **Issue + Pull Request**.
- Vorschläge werden zuerst fachlich gesichtet (Architektur + Betrieb + Governance).
- Merge erst nach Review/Freigabe (mindestens 1 Review, empfohlen: 2 für Ring-Changes).
- Keine direkten inhaltlichen Änderungen auf `main` ohne Review.
- Empfohlener Reviewer-Kreis:
  - Architektur (Tech Fit / Ring)
  - Betrieb/Platform (Operability)
  - optional Security bei AUTH/Secrets/Exposure-Themen
- Empfohlener Cadence-Termin für Ring-Entscheidungen: monatlich (operativ) + quartalsweise Snapshot.

## Release process (lightweight)

- Mergen in `main` nach erfolgreichem Review
- Quartalsweise Snapshot in `CHANGELOG.md`
- Bei kritischen EOL/Security-Themen: außerplanmäßiger Patch-Release

## Definition of done

- Eintrag ist fachlich korrekt
- Ring-Entscheidung ist begründet
- JSON bleibt konsistent (`quadrant`, `ring`, `moved`)
- README/CHANGELOG ggf. aktualisiert
