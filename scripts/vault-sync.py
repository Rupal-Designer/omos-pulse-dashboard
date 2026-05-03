#!/usr/bin/env python3
"""
vault-sync.py — Incremental Obsidian vault updater.

Called by a PostToolUse hook after Claude writes any file under src/.
Updates the matching vault note and appends to the sync log.

Usage:
    python3 scripts/vault-sync.py <file_path>

The file_path is the absolute or repo-relative path of the saved file.
Exits silently with code 0 on any error (hook must never block Claude).
"""

import sys
import re
import json
from pathlib import Path
from datetime import datetime, timezone

# ── repo root ───────────────────────────────────────────────────────────────
REPO = Path(__file__).parent.parent
VAULT = REPO / "obsidian-vault"
META = VAULT / "_meta"
SYNC_LOG = META / "sync-log.md"
INDEX = VAULT / "index.md"


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def safe_read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def safe_write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


# ── entity classification ────────────────────────────────────────────────────

def classify(file_path: Path):
    """Return (entity_type, vault_note_path, meta) or None if untracked."""
    rel = str(file_path)

    # Atoms — flat files: src/ui/atoms/Button.jsx  OR nested: src/ui/atoms/Button/index.jsx
    m = re.search(r"src/ui/atoms/([A-Za-z]+)(?:\.jsx|/)", rel)
    if m:
        name = m.group(1)
        return ("component", VAULT / "Components" / "atoms" / f"{name}.md",
                {"layer": "atom", "name": name, "source-file": rel})

    # Molecules — flat or nested
    m = re.search(r"src/ui/molecules/([A-Za-z]+)(?:\.jsx|/)", rel)
    if m:
        name = m.group(1)
        return ("component", VAULT / "Components" / "molecules" / f"{name}.md",
                {"layer": "molecule", "name": name, "source-file": rel})

    # Patterns — flat or nested
    m = re.search(r"src/ui/patterns/([A-Za-z]+)(?:\.jsx|/)", rel)
    if m:
        name = m.group(1)
        return ("component", VAULT / "Components" / "patterns" / f"{name}.md",
                {"layer": "pattern", "name": name, "source-file": rel})

    # Retailer pages
    m = re.search(r"src/components/([A-Za-z]+Page)\.jsx", rel)
    if m:
        name = m.group(1)
        return ("page", VAULT / "Pages" / f"{name}.md",
                {"name": name, "source-file": f"src/components/{name}.jsx"})

    # Advertiser components
    m = re.search(r"src/advertiser/components/([^/]+\.jsx)", rel)
    if m:
        name = Path(m.group(1)).stem
        return ("advertiser-component", VAULT / "Components" / "advertiser" / f"{name}.md",
                {"layer": "advertiser", "name": name,
                 "source-file": f"src/advertiser/components/{m.group(1)}"})

    return None


# ── import extraction ────────────────────────────────────────────────────────

def extract_ui_imports(source: str) -> list[str]:
    """Return list of named exports imported from ../ui or ./ui."""
    imports = []
    for m in re.finditer(r"import\s*\{([^}]+)\}\s*from\s*['\"]\.\.?/ui['\"]", source):
        names = [n.strip() for n in m.group(1).split(",")]
        imports.extend(n for n in names if n)
    return imports


def extract_prop_names(source: str) -> list[str]:
    """Best-effort extraction of prop names from destructured function params."""
    m = re.search(r"(?:function\s+\w+|(?:const|let)\s+\w+\s*=)\s*\(\s*\{([^}]+)\}", source)
    if m:
        return [p.strip().split("=")[0].strip() for p in m.group(1).split(",") if p.strip()]
    return []


# ── frontmatter helpers ──────────────────────────────────────────────────────

def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Split YAML frontmatter from body. Returns (fm_dict, body)."""
    if not content.startswith("---"):
        return {}, content
    end = content.find("\n---", 3)
    if end == -1:
        return {}, content
    fm_block = content[3:end].strip()
    body = content[end + 4:].lstrip("\n")
    fm = {}
    for line in fm_block.splitlines():
        if ":" in line:
            k, _, v = line.partition(":")
            fm[k.strip()] = v.strip()
    return fm, body


def build_frontmatter(fields: dict) -> str:
    lines = ["---"]
    for k, v in fields.items():
        lines.append(f"{k}: {v}")
    lines.append("---")
    return "\n".join(lines)


# ── section replacement ──────────────────────────────────────────────────────

def replace_section(body: str, heading: str, new_content: str) -> str:
    """Replace or append a ## section in the note body."""
    pattern = rf"(## {re.escape(heading)}\n).*?(?=\n## |\Z)"
    replacement = f"## {heading}\n{new_content}\n"
    if re.search(pattern, body, flags=re.DOTALL):
        return re.sub(pattern, replacement, body, flags=re.DOTALL)
    return body + f"\n## {heading}\n{new_content}\n"


# ── note updaters ────────────────────────────────────────────────────────────

def update_component_note(note_path: Path, meta: dict, source: str) -> None:
    existing = safe_read(note_path)
    fm, body = parse_frontmatter(existing) if existing else ({}, "")

    # Merge frontmatter
    fm.update({
        "type": "component",
        "layer": meta["layer"],
        "name": meta["name"],
        "source-file": meta["source-file"],
        "last-updated": now_iso(),
    })
    if "tags" not in fm:
        fm["tags"] = f"[{meta['layer']}, ui-component]"

    # Update Imports section from source
    ui_imports = extract_ui_imports(source)
    if ui_imports:
        imports_block = "\n".join(
            f"- [[Components/atoms/{n}]]" if n[0].isupper() else f"- `{n}`"
            for n in ui_imports
        )
        body = replace_section(body, "Imports", imports_block)

    # Ensure note has a title
    if not body.strip():
        body = f"# {meta['name']}\n\n<!-- Auto-generated stub — run obsidian-knowledge-graph skill for full rebuild -->\n"

    safe_write(note_path, build_frontmatter(fm) + "\n\n" + body)


def update_page_note(note_path: Path, meta: dict, source: str) -> None:
    existing = safe_read(note_path)
    fm, body = parse_frontmatter(existing) if existing else ({}, "")

    fm.update({
        "type": "page",
        "name": meta["name"],
        "source-file": meta["source-file"],
        "last-updated": now_iso(),
    })
    if "status" not in fm:
        fm["status"] = "wired"
    if "tags" not in fm:
        fm["tags"] = "[page, wired]"

    # Update Components Used section
    ui_imports = extract_ui_imports(source)
    if ui_imports:
        imports_block = "\n".join(
            f"- [[Components/atoms/{n}]]" if n[0].isupper() else f"- [[Components/molecules/{n}]]"
            for n in ui_imports
        )
        body = replace_section(body, "Components Used", imports_block)

    if not body.strip():
        body = f"# {meta['name']}\n\n<!-- Auto-generated stub — run obsidian-knowledge-graph skill for full rebuild -->\n"

    safe_write(note_path, build_frontmatter(fm) + "\n\n" + body)


# ── index "Recently Modified" update ────────────────────────────────────────

def update_index_recently_modified(note_path: Path, trigger_file: str) -> None:
    content = safe_read(INDEX)
    if not content:
        return
    ts = now_iso()
    new_row = f"| {ts} | {note_path.relative_to(VAULT)} | {trigger_file} |"
    # Find the Recently Modified table and prepend the new row
    table_start = content.find("| Time | Note | Trigger |")
    if table_start == -1:
        return
    header_end = content.find("\n", table_start + 1)
    separator_end = content.find("\n", header_end + 1)
    before = content[:separator_end + 1]
    after = content[separator_end + 1:]
    # Keep only last 10 rows
    rows = [r for r in after.splitlines() if r.startswith("|")][:9]
    rows_block = "\n".join([new_row] + rows)
    rest_after = "\n".join(l for l in after.splitlines() if not l.startswith("|"))
    safe_write(INDEX, before + rows_block + "\n" + rest_after)


# ── sync log ─────────────────────────────────────────────────────────────────

def append_sync_log(note_path: Path, trigger_file: str, action: str) -> None:
    META.mkdir(parents=True, exist_ok=True)
    ts = now_iso()
    line = f"| {ts} | {action} | {note_path.relative_to(VAULT)} | trigger: Write {trigger_file} |\n"
    existing = safe_read(SYNC_LOG)
    if not existing:
        header = "# Sync Log\n\n| Time | Action | Note | Trigger |\n|------|--------|------|----------|\n"
        safe_write(SYNC_LOG, header + line)
    else:
        safe_write(SYNC_LOG, existing + line)


# ── main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    if len(sys.argv) < 2:
        return

    raw_path = sys.argv[1]
    # Resolve to repo-relative if absolute
    try:
        file_path = Path(raw_path)
        if file_path.is_absolute():
            file_path = file_path.relative_to(REPO)
    except Exception:
        return

    result = classify(file_path)
    if result is None:
        return  # Not a tracked entity

    entity_type, note_path, meta = result

    # Read source file
    abs_src = REPO / file_path
    source = safe_read(abs_src)
    if not source:
        return

    action = "updated" if note_path.exists() else "created"

    if entity_type == "component":
        update_component_note(note_path, meta, source)
    elif entity_type == "page":
        update_page_note(note_path, meta, source)
    elif entity_type == "advertiser-component":
        update_component_note(note_path, meta, source)

    append_sync_log(note_path, str(file_path), action)
    update_index_recently_modified(note_path, str(file_path))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        # Never crash or print — hook must be silent on failure
        sys.exit(0)
