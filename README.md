# SAP Integration Tech Radar

Ein pragmatischer Technology Radar für **SAP Integration**.
Ziel ist nicht "die eine Wahrheit", sondern ein transparenter, wiederholbarer Entscheidungsrahmen für Architektur- und Delivery-Teams.

## Purpose

Der Radar hilft Teams dabei:
- neue Integrationsentscheidungen konsistent zu treffen,
- Legacy-Risiken sichtbar zu machen,
- und Tech-Diskussionen von "Meinung" auf explizite Kriterien zu heben.

> Der Radar ist eine **Guideline**, kein Dogma. Kontext (Regulatorik, Landschaft, Skills, Budget) bleibt entscheidend.

## Scope

Fokus: SAP-zentrierte Integrationstechnologien und angrenzende Standards in 4 Quadranten:
- **Platforms**
- **Tooling & Ops**
- **Patterns & Architecture**
- **Protocols & APIs**

## Rings (aktuelles Modell)

Dieses Projekt nutzt das etablierte Zalando-Schema:
- **ADOPT** – bewährt, aktiv empfohlen
- **TRIAL** – gute Kandidaten für zielgerichtete Piloten
- **ASSESS** – beobachten/bewerten, Reifegrad oder Fit noch nicht stabil
- **HOLD** – nur mit starkem Grund für neue Vorhaben

## Bewertungskriterien (Best Practices)

Einträge werden anhand dieser Kriterien eingestuft:
1. **Product viability** – Support-Status, EOL, Roadmap
2. **Operational fitness** – Observability, Security, Betriebskomplexität
3. **Ecosystem fit** – Passung zu SAP/BTP-Zielarchitektur
4. **Adoption evidence** – reale Nutzung, Skills, Community/Referenzen
5. **Delivery impact** – Geschwindigkeit, Wartbarkeit, Änderbarkeit

## Version

- Current baseline: **v0.1.0** (see `CHANGELOG.md`)
- Draft update package: `docs/release-notes-v0.1.1-draft.md`
- Core focus set: `docs/core-blips-v0.1.1.md`
- Contribution guide: `CONTRIBUTING.md`
- PR checklist: `.github/pull_request_template.md`

## Current highlights (v0.1.1 draft)

- **SAP Cloud Integration (CI)** → ADOPT
  - Default-Wahl für iFlow-basierte Integrationen im SAP/BTP-Kontext.
- **SAP Event Mesh** → TRIAL
  - guter Einstieg in event-getriebene Architektur, aber mit plan-/featureabhängigen Einschränkungen (z. B. Quoten/Constraints je Service-Plan).
- **SAP Advanced Event Mesh (AEM)** → TRIAL
  - sinnvoll bei größerer Event-Domänenzahl und höherem Governance-/Monitoring-Bedarf; nicht in jedem Team sofort nötig.
- **Monitoring-Hinweis für Eventing**
  - reines Broker-Monitoring reicht nicht: zusätzlich End-to-End-Korrelation, DLQ/Reprocessing und zentrale Alerts (z. B. Cloud ALM + CI Monitoring) etablieren.
- **Direct point-to-point connections** → HOLD
  - kurzfristig verführerisch, langfristig hohe Kopplung und Wartungsrisiko.

## Repository layout

- `docs/index.html` – Radar-UI
- `docs/radar-config.js` – Visualisierungs-Config
- `docs/entries.json` – Blips, Quadranten, Ringe

## Contributing

Vorschlag für Ring-Änderungen via Issue/PR mit:
- aktuellem Ring + vorgeschlagenem Zielring
- Begründung entlang der 5 Kriterien
- betroffenen Systemkontexten (z. B. S/4-only, BTP-hybrid)
- Rollout-/Migrationshinweis (falls relevant)

Kleine, nachvollziehbare Änderungen > große "Big Bang"-PRs.

## Release cadence

- **Minor updates** laufend via PR
- **Offizieller Snapshot**: quartalsweise
- Bei kritischen Vendor-Änderungen (EOL/Security) außerplanmäßiges Update

## Run locally

Einfach `docs/index.html` öffnen oder lokal statisch serven.

Beispiel:
```bash
python3 -m http.server 8080
# dann http://localhost:8080/docs/
```

## License

Apache-2.0 (empfohlen für offene Wiederverwendung in Unternehmenskontexten).
