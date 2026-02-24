#!/usr/bin/env python3
"""Validate SAP Integration Tech Radar content JSON files.

Usage:
  python3 scripts/validate_radar_content.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

DETAILS_FILE = DOCS / "details-data.json"
PROPOSED_FILE = DOCS / "proposed-new-entries-review-round-1.json"

LEGACY_SUFFIXES = ("_de", "_en")


class ValidationError(Exception):
    pass


def load_json(path: Path) -> Any:
    try:
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError as e:
        raise ValidationError(f"Missing file: {path}") from e
    except json.JSONDecodeError as e:
        raise ValidationError(f"Invalid JSON in {path}: {e}") from e


def require(cond: bool, msg: str) -> None:
    if not cond:
        raise ValidationError(msg)


def require_str(value: Any, path: str) -> None:
    require(isinstance(value, str) and value.strip() != "", f"{path} must be a non-empty string")


def require_list_of_str(value: Any, path: str) -> None:
    require(isinstance(value, list), f"{path} must be a list")
    for idx, v in enumerate(value):
        require(isinstance(v, str), f"{path}[{idx}] must be a string")


def fail_on_legacy_language_keys(obj: dict[str, Any], path: str) -> None:
    for key in obj.keys():
        if key.endswith(LEGACY_SUFFIXES):
            raise ValidationError(f"{path}: legacy language key not allowed: '{key}'")


def validate_i18n_block(i18n: Any, path: str, fields: dict[str, str]) -> None:
    require(isinstance(i18n, dict), f"{path}.i18n must be an object")
    for lang in ("de", "en"):
        require(lang in i18n, f"{path}.i18n.{lang} is required")
        require(isinstance(i18n[lang], dict), f"{path}.i18n.{lang} must be an object")

    for lang in ("de", "en"):
        block = i18n[lang]
        for field, kind in fields.items():
            require(field in block, f"{path}.i18n.{lang}.{field} is required")
            v = block[field]
            if kind == "string_or_null":
                require(v is None or isinstance(v, str), f"{path}.i18n.{lang}.{field} must be string|null")
            elif kind == "string":
                require(isinstance(v, str), f"{path}.i18n.{lang}.{field} must be a string")
            elif kind == "string_list":
                require_list_of_str(v, f"{path}.i18n.{lang}.{field}")
            else:
                raise RuntimeError(f"Unknown field kind: {kind}")


def validate_details() -> None:
    data = load_json(DETAILS_FILE)
    require(isinstance(data, dict), "details-data.json root must be an object")
    require(isinstance(data.get("items"), list), "details-data.json.items must be a list")

    allowed_conf = {"high", "medium", "low"}

    for idx, item in enumerate(data["items"]):
        p = f"details-data.json.items[{idx}]"
        require(isinstance(item, dict), f"{p} must be an object")

        fail_on_legacy_language_keys(item, p)

        for f in ("label", "quadrant", "ring"):
            require(f in item, f"{p}.{f} is required")
            require_str(item[f], f"{p}.{f}")

        if "confidence" in item:
            require(isinstance(item["confidence"], str), f"{p}.confidence must be a string")
            require(item["confidence"].lower() in allowed_conf, f"{p}.confidence must be one of {sorted(allowed_conf)}")

        if "references" in item:
            require_list_of_str(item["references"], f"{p}.references")
        if "sources" in item:
            require_list_of_str(item["sources"], f"{p}.sources")

        validate_i18n_block(
            item.get("i18n"),
            p,
            {
                "intro": "string",
                "whyRing": "string",
                "risks": "string_list",
                "do": "string_list",
                "dont": "string_list",
                "whenNotToUse": "string_list",
            },
        )


def validate_proposed() -> None:
    data = load_json(PROPOSED_FILE)
    require(isinstance(data, dict), "proposed-new-entries-review-round-1.json root must be an object")
    require(isinstance(data.get("items"), list), "proposed-new-entries-review-round-1.json.items must be a list")

    for idx, item in enumerate(data["items"]):
        p = f"proposed-new-entries-review-round-1.json.items[{idx}]"
        require(isinstance(item, dict), f"{p} must be an object")

        fail_on_legacy_language_keys(item, p)

        for f in ("label", "suggestedQuadrant", "suggestedRing", "source"):
            require(f in item, f"{p}.{f} is required")
            require_str(item[f], f"{p}.{f}")

        validate_i18n_block(
            item.get("i18n"),
            p,
            {
                "intro": "string_or_null",
                "whyMissing": "string_or_null",
                "riskIfIgnored": "string_or_null",
                "initialDo": "string_list",
                "initialDont": "string_list",
            },
        )


def main() -> int:
    try:
        validate_details()
        validate_proposed()
    except ValidationError as e:
        print(f"❌ Validation failed: {e}")
        return 1

    print("✅ Radar content validation passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
