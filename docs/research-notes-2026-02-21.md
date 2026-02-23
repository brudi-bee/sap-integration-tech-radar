# Research Notes (2026-02-21)

Kurzer Research-Snapshot zur Einordnung von Radar-Inhalten.

## Quellen

1. SAP Community – Process Orchestration (Way Forward + Migration-Hinweise)
   - https://pages.community.sap.com/topics/process-orchestration
2. OpenAPI Specification (v3.2.0)
   - https://spec.openapis.org/oas/latest.html
3. OpenTelemetry Docs
   - https://opentelemetry.io/docs/
4. AsyncAPI Docs
   - https://www.asyncapi.com/docs

> Hinweis: SAP Help Portal Seiten sind teilweise JS-lastig und über textbasiertes Fetch nur eingeschränkt auslesbar. Für Detailvalidierung einzelner Capability-Claims ggf. manuell im Browser prüfen.

## Abgeleitete Entscheidungen für Radar

- **PI/PO bleibt HOLD**: Community- und Migrationskommunikation betont den Umstieg Richtung Integration Suite.
- **OpenAPI 3.x auf ADOPT**: Industriestandard für API-Verträge.
- **AsyncAPI und CloudEvents auf TRIAL**: sinnvoll für eventgetriebene Integrationslandschaften, aber häufig noch nicht durchgängig etabliert.
- **OpenTelemetry auf ASSESS**: klarer Standardtrend, aber im SAP-Integrationsbetrieb oft noch heterogen umgesetzt.
- **Contract Testing auf TRIAL**: hoher Nutzen für robuste Schnittstellen, organisatorisch/technisch nicht überall sofort reif.

## Ergänzung aus externer Research-Runde (konsolidiert)

Übernommen/ergänzt ins Radar (mit konservativer Einordnung):

- Platforms: **Edge Integration Cell (TRIAL)**, **Kyma Runtime für Integrations-Microservices (TRIAL)**, **SAP Build Process Automation (TRIAL)**
- Tooling & Ops: **Terraform for SAP BTP (ADOPT)**, **Cloud Integration Automation Tool (ASSESS)**, **Third-party CPI DevOps suites (ASSESS)**
- Patterns: **Side-by-side extensibility (ADOPT)**, **Circuit breaker (ADOPT)**, **CQRS selective (ASSESS)**
- Protocols/APIs: **GraphQL (ASSESS, nur BFF/Aggregation)**, **gRPC (ASSESS, intern)**, **RFC/BAPI remote (HOLD)**

Bewusst nicht 1:1 übernommen wurden zu aggressive Ring-Entscheidungen (z. B. pauschal ADOPT für alle Plattform-/Tooling-Themen), um Team- und Landschaftsabhängigkeiten abzubilden.

## Ergänzung aus zweiter Research-Runde (2025-Orientierung)

Zusätzlich übernommen:
- **CPI content transport management (ADOPT)**
- **Postman/Bruno API test collections (ADOPT)**
- **Choreography over central orchestration (TRIAL, selektiv)**
- **AMQP 1.0 / MQTT (AEM/IoT) auf ASSESS**

Ring-Korrektur:
- **Terraform for SAP BTP** auf **TRIAL** angepasst (statt ADOPT), da Reife und Betriebsmodell stark teamabhängig sind.

Nicht in den Kernradar übernommen (vorerst):
- breite iPaaS-Vendorvergleiche (z. B. MuleSoft/Azure) als Standardblips im SAP-zentrierten Baseline-Radar.
  Diese bleiben eher Kontext-/Architekturentscheidungen je Unternehmenslandschaft.

## Ergänzung aus dritter Research-Runde (2025 Fokus)

Übernommen/angepasst:
- **SAP Advanced Event Mesh (AEM)** von ASSESS auf **TRIAL** angehoben
- **OpenTelemetry** von ASSESS auf **TRIAL** angehoben (E2E-Observability-Priorität)
- **File-drop integrations (shared folder/manual polling)** als **HOLD** ergänzt
- **New SOAP/WSDL interfaces** als **HOLD** explizit ergänzt (neue SOAP-Strecken vermeiden)

Bestätigt (bereits im Radar vorhanden):
- Event Mesh als TRIAL
- Edge Integration Cell und Kyma Runtime als ASSESS
- API Management + Cloud Integration als ADOPT

## Ergänzung aus vierter Research-Runde (Tooling/Ops Vertiefung)

Übernommen/angepasst:
- **SAP Build Process Automation** auf **ASSESS** (statt TRIAL), da Nutzen stark Governance-abhängig
- **SAP Cloud ALM integration & exception monitoring** auf **ADOPT**
- **Cloud Integration central monitoring & alerting** auf **ADOPT**
- **SAP Cloud Transport Management (CTMS) + Content Agent** auf **ADOPT**
- **CTS+ content transport (transition)** auf **ASSESS**
- **Integration Assessment (ISA-M)** auf **ADOPT**
- **SAP Cloud Connector** als Tooling/Ops-Standard auf **ADOPT** eingeordnet
- **API-led connectivity** als Pattern auf **ADOPT** ergänzt

## Ergänzung aus fünfter Research-Runde (Patterns/Protocols Vertiefung)

Übernommen/angepasst:
- **Strangler pattern** von TRIAL auf **ADOPT** angehoben
- **Event-driven architecture with CloudEvents envelope** auf **TRIAL** ergänzt
- **Retry/backoff + dead-letter handling** auf **ADOPT** ergänzt
- **Contract-first with OpenAPI** auf **ADOPT** ergänzt (Pattern-Ebene)
- **Contract-first with AsyncAPI** auf **TRIAL** ergänzt (Pattern-Ebene)
- **AMQP 1.0** auf **ADOPT** angehoben und von MQTT getrennt
- **MQTT (IoT/OT scenarios)** auf **ASSESS** separat ergänzt
- **SFTP (managed file transfer transition)** auf **ASSESS** ergänzt

Bestätigt:
- OData v4 und OAuth2/OIDC als ADOPT
- SOAP/WSDL und RFC/BAPI (neu vermeiden/legacy) im HOLD-Kontext
