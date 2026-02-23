# Changelog

Alle relevanten Änderungen am SAP Integration Tech Radar.

## [Unreleased]

### Added
- PR Template ergänzt: `.github/pull_request_template.md`
- Research Snapshot angelegt: `docs/research-notes-2026-02-21.md`
- Radar-Entries erweitert (u. a. Integration Advisor, TPM, OpenAPI 3.x, CloudEvents, Outbox, Idempotent Consumer, Contract Testing)
- Externe Research-Runde konsolidiert und in Radar überführt (u. a. Edge Integration Cell, Kyma Runtime, Side-by-side extensibility, Circuit breaker, GraphQL/gRPC, RFC/BAPI HOLD)
- Zweite Research-Runde verarbeitet (u. a. CPI Transport Management, Postman/Bruno, Choreography-Pattern, AMQP/MQTT) und Ring-Korrektur für Terraform auf TRIAL
- Dritte Research-Runde verarbeitet: AEM und OpenTelemetry auf TRIAL angehoben, HOLD-Entries für File-drop-Integrationen und neue SOAP/WSDL-Interfaces ergänzt
- Vierte Research-Runde verarbeitet: Build Process Automation auf ASSESS, Monitoring/Alerting + CTMS/Content Agent + ISA-M auf ADOPT, CTS+ als Übergang auf ASSESS, API-led connectivity ergänzt
- Fünfte Research-Runde verarbeitet: Strangler auf ADOPT, CloudEvents-Envelope + Contract-first-Patterns ergänzt, AMQP auf ADOPT angehoben, MQTT + SFTP als ASSESS separat geführt
- Core-Blip-Set für schnellen Team-Fokus erstellt: `docs/core-blips-v0.1.1.md`
- Draft-Release-Notes erstellt: `docs/release-notes-v0.1.1-draft.md`

### Removed
- Doppelte Transport-Formulierung bereinigt (einheitlich auf CTMS + Content Agent fokussiert)

### Changed
- README mit klarer Versionsreferenz und Governance-Links ergänzt

## [0.1.0] - 2026-02-16

### Added
- Initialer Radar für SAP Integration mit 4 Quadranten:
  - Platforms
  - Tooling & Ops
  - Patterns & Architecture
  - Protocols & APIs
- Erste Blip-Liste in `docs/entries.json`
- Moderne Radar-Visualisierung via Zalando Tech Radar (`radar-0.12.js`) in `docs/`
- Governance-Basis:
  - `README.md` (Purpose, Scope, Kriterien, Cadence)
  - `CONTRIBUTING.md`
  - Ring-Change Issue Template (`.github/ISSUE_TEMPLATE/ring-change.md`)

### Changed
- Fokus auf praktikable Empfehlungen statt reiner Tool-Aufzählung
- AIF in v0.1 als **Tooling & Ops / ASSESS** eingeordnet

### Notes
- Dieses Release ist ein Startpunkt und bewusst iterativ angelegt.
- Nächster Schritt: Ring-Entscheidungen mit Team-Feedback validieren.
