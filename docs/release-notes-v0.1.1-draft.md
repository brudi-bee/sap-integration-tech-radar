# SAP Integration Tech Radar — v0.1.1 (Draft)

## Summary
Diese Version konsolidiert mehrere externe Research-Runden und schärft den Radar für reale SAP-Enterprise-Landschaften.

## Highlights
- Eventing und Observability klarer eingeordnet:
  - SAP Advanced Event Mesh (AEM) auf **TRIAL**
  - OpenTelemetry auf **TRIAL**
- Tooling/Ops deutlich gestärkt:
  - SAP Cloud ALM integration monitoring auf **ADOPT**
  - Cloud Integration central monitoring & alerting auf **ADOPT**
  - CTMS + Content Agent auf **ADOPT**
  - ISA-M auf **ADOPT**
- Pattern-Schärfung:
  - Strangler pattern auf **ADOPT**
  - Contract-first mit OpenAPI (**ADOPT**) und AsyncAPI (**TRIAL**)
  - Retry/Backoff + DLQ als **ADOPT**
- Protokoll-Schärfung:
  - AMQP 1.0 auf **ADOPT**
  - MQTT als IoT/OT-Spezialfall auf **ASSESS**
  - SFTP als Übergangsweg auf **ASSESS**
- Legacy-Grenzen klarer:
  - New SOAP/WSDL interfaces auf **HOLD**
  - File-drop integrations auf **HOLD**

## Cleanup
- Doppelung bei Content-Transport reduziert (CTMS/Content Agent als primärer Blip).

## Recommended next step
- Team-Review mit 60–90 Minuten Ring-Challenge:
  - 5 Blips bestätigen
  - 3 Blips umhängen
  - 2 Blips entfernen
- Danach Snapshot als v0.1.1 final taggen.
