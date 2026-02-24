# GitLab Migration Guide (from GitHub)

Wenn ihr das Radar auf internes GitLab umzieht, sind diese Punkte wichtig.

## 1) Repository-Migration

- Mirror/Import des bestehenden Repos inkl. History.
- Prüfen, dass `docs/` unverändert übernommen wird (Pages-Artefakt).
- Default-Branch konsistent setzen (`main` oder `master`) und CI darauf anpassen.

## 2) CI/CD ersetzen (GitHub Actions -> GitLab CI)

Aktuell läuft Deploy über `.github/workflows/pages.yml`.

Für GitLab braucht ihr stattdessen `.gitlab-ci.yml` mit mindestens:

1. **validate**
   - `python3 scripts/validate_radar_content.py`
2. **pages**
   - `public/` Artifact bereitstellen (typisch: `cp -r docs public`)
   - nur auf Default-Branch deployen

### Beispiel (minimal)

```yaml
stages:
  - validate
  - deploy

validate:radar:
  stage: validate
  image: python:3.12-slim
  script:
    - python3 scripts/validate_radar_content.py

pages:
  stage: deploy
  image: alpine:3.20
  script:
    - mkdir -p public
    - cp -r docs/* public/
  artifacts:
    paths:
      - public
  only:
    - main
```

## 3) Governance in GitLab nachziehen

- Branch Protection (`main/master` nur per Merge Request).
- Merge Request approvals aktivieren (mind. 1–2 Approvals).
- CODEOWNERS nutzen (GitLab unterstützt root `CODEOWNERS`).
- Optional: Required pipeline status für Merge.

## 4) Pages / Hosting

Optionen:

- **GitLab Pages** (öffentlich/intern je nach Instanz)
- **Internal static hosting** (Nginx/Ingress/S3-kompatibel)

Wichtig:
- Caching-Header prüfen (sonst alte JSONs im Browser)
- Basis-URL stabil halten, falls Links geteilt werden

## 5) Auth & Visibility

- Projekt-Sichtbarkeit (`private/internal/public`) bewusst setzen.
- Falls intern-only: Zugriff auf Referenz-Links prüfen.
- Secret-Variablen (falls später nötig) nur in geschützten Variablen speichern.

## 6) Nach dem Umzug: Smoke Tests

1. Radar lädt (`index.html`)
2. Detailseite lädt (`details.html?item=REST%2FJSON&lang=de`)
3. Raw Entry zeigt `i18n`-Struktur
4. CI failt bei absichtlich kaputtem Schema (Test-MR)

## 7) Typische Stolperfallen

- Default-Branch mismatch (`main` vs `master`)
- Pages erwartet `public/` statt `docs/`
- fehlende MR-Approvals / ungeschützte Branches
- Cache zeigt alte `details-data.json`
