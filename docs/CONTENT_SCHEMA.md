# Content Schema – SAP Integration Tech Radar

Dieses Dokument beschreibt die **redaktionelle JSON-Struktur** für die Radar-Detaildaten.

## Ziel

- Eine klare, wartbare Struktur ohne doppelte Sprachfelder wie `intro_de`/`intro_en`.
- Sprachinhalte liegen zentral unter `i18n`.
- Einfaches Editieren durch Content-Teams ohne Codeänderungen.

---

## 1) `details-data.json`

Top-Level:

```json
{
  "items": [
    {
      "label": "SAP Cloud Integration (CPI)",
      "quadrant": "Platforms",
      "ring": "ADOPT",
      "confidence": "high",
      "references": ["https://..."],
      "sources": ["https://..."],
      "i18n": {
        "de": {
          "intro": "...",
          "whyRing": "...",
          "risks": ["..."],
          "do": ["..."],
          "dont": ["..."],
          "whenNotToUse": ["..."]
        },
        "en": {
          "intro": "...",
          "whyRing": "...",
          "risks": ["..."],
          "do": ["..."],
          "dont": ["..."],
          "whenNotToUse": ["..."]
        }
      }
    }
  ]
}
```

### Pflichtfelder pro Item

- `label` (string)
- `quadrant` (string)
- `ring` (string, typischerweise: `ADOPT | TRIAL | ASSESS | HOLD`)
- `i18n.de` (object)
- `i18n.en` (object; kann anfangs Platzhalter enthalten, sollte mittelfristig gepflegt werden)

### Empfohlene optionale Felder

- `confidence` (`high | medium | low`)
- `references` (string[])
- `sources` (string[])
- `changeRationale`, `ringChangeSuggestion`, `ringChangeAppliedFrom` (für Governance/Review)

### Sprachfeld-Typen

- `intro`: string
- `whyRing`: string
- `risks`: string[]
- `do`: string[]
- `dont`: string[]
- `whenNotToUse`: string[]

---

## 2) `proposed-new-entries-review-round-1.json`

Top-Level:

```json
{
  "items": [
    {
      "label": "SAP BTP Private Link",
      "suggestedQuadrant": "Infrastructure",
      "suggestedRing": "ADOPT",
      "source": "review-round-1",
      "i18n": {
        "de": {
          "intro": "...",
          "whyMissing": "...",
          "riskIfIgnored": "...",
          "initialDo": ["..."],
          "initialDont": ["..."]
        },
        "en": {
          "intro": null,
          "whyMissing": null,
          "riskIfIgnored": null,
          "initialDo": [],
          "initialDont": []
        }
      }
    }
  ]
}
```

---

## 3) Redaktionsregeln

1. **Keine Legacy-Sprachkeys mehr** (`*_de`, `*_en`).
2. Neue Inhalte immer unter `i18n.de` und `i18n.en` pflegen.
3. Listenfelder (`risks`, `do`, `dont`, `whenNotToUse`) immer als Arrays – nie als Freitext.
4. Keine HTML-Tags im Content; reiner Text.
5. URLs nur in `references`/`sources`.

---

## 4) Kompatibilität

`details.js` ist aktuell backward-compatible und kann im Notfall noch Legacy-Keys lesen. Das ist nur als Übergang gedacht.

**Zielzustand:** ausschließlich `i18n`.

---

## 5) Quick Validation (CLI)

Im Repo-Root:

```bash
python3 - <<'PY'
import json
p='projects/sap-integration-tech-radar/docs/details-data.json'
d=json.load(open(p))
assert 'items' in d and isinstance(d['items'], list)
for i in d['items']:
    assert 'label' in i
    assert 'i18n' in i and 'de' in i['i18n'] and 'en' in i['i18n']
print('OK')
PY
```

---

Wenn wir später weitere Sprachen brauchen, einfach unter `i18n` ergänzen (`fr`, `es`, ...), ohne Schemaänderung in den Kernfeldern.
