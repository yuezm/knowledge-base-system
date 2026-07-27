#!/usr/bin/env bash
# scripts/related.sh
# 扫 src/content/docs/**/*.md 里的 [[wikilink]] + frontmatter `related:` 字段,
# 生成反向链接索引。
#
# 用法:
#   bash scripts/related.sh                  # 生成总索引 + 高优先独立页
#   bash scripts/related.sh AI/原理/概览     # 单篇查看(打印到 stdout)
#
# 输出:
#   _backlinks/index.md                     ← 总索引(所有笔记的反向链接数 + 无链接列表)
#   _backlinks/<note>.md                    ← 关键笔记的详细反向链接(只给 MOC + AI/ + 10-项目/ 20-资源/)
#
# 不修改 git 状态(输出到 _backlinks/,用户可 gitignore)。

set -euo pipefail

# 重要: heredoc 必须用 <<'PYEOF' (带单引号) 防止 bash 展开 $DOCS 等变量
DOCS="${1:-src/content/docs}"
BACKLINKS_DIR="_backlinks"

if [[ ! -d "$DOCS" ]]; then
    echo "Error: docs 目录不存在: $DOCS" >&2
    echo "Usage: bash scripts/related.sh [docs-dir] [optional-note-path]" >&2
    exit 1
fi

# 清空旧的生成产物(它是生成产物,不是源数据)
rm -rf "$BACKLINKS_DIR"
mkdir -p "$BACKLINKS_DIR"

# 单篇查看模式
if [[ -n "${2:-}" ]]; then
    NOTE="$2"
    python3 -c "
import re
from pathlib import Path
DOCS = Path('$DOCS')
md = DOCS / '$NOTE.md'
if not md.exists():
    md = DOCS / ('$NOTE'.replace('.md','') + '.md')
content = md.read_text(encoding='utf-8')
links = re.findall(r'\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]', content)
print(f'[[wikilink]] 引用: {len(links)} 个')
for l in sorted(set(links)):
    print(f'  - [[{l}]]')
"
    exit 0
fi

# 全量模式
# 用 <<'PYEOF' 带单引号,防止 bash 展开 Python 里的 f-string 变量
python3 <<'PYEOF'
import os, re, sys, yaml, time
from pathlib import Path
from collections import defaultdict

t0 = time.time()
DOCS_ROOT = Path(os.environ.get("DOCS_DIR", "src/content/docs"))
OUT_ROOT = Path("_backlinks")
OUT_ROOT.mkdir(exist_ok=True)

PRIORITY = ("00-MOC/", "AI/", "10-项目/", "20-资源/", "30-归档/")

all_notes = {}
wikilink_pattern = re.compile(r'\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]')

for md in sorted(DOCS_ROOT.rglob("*.md")):
    rel = md.relative_to(DOCS_ROOT).with_suffix("")
    content = md.read_text(encoding="utf-8")

    wikilinks = set(wikilink_pattern.findall(content))
    related = set()
    if content.startswith("---"):
        try:
            end = content.index("\n---", 3)
            fm = yaml.safe_load(content[3:end]) or {}
            rels = fm.get("related", [])
            if isinstance(rels, str):
                rels = [rels]
            related = set(rels)
        except (ValueError, yaml.YAMLError):
            pass

    all_notes[str(rel)] = {"wikilinks": wikilinks, "related": related}

backlinks = defaultdict(set)
for src, data in all_notes.items():
    targets = data["wikilinks"] | data["related"]
    for tgt in targets:
        tgt_clean = tgt.replace(".md", "").strip()
        if tgt_clean in all_notes:
            backlinks[tgt_clean].add(src)

# ---- 1. 总索引 _backlinks/index.md ----
total = len(all_notes)
no_bl = sorted([n for n in all_notes if not backlinks.get(n)])
has_bl = sorted([n for n in all_notes if backlinks.get(n)], key=lambda n: (-len(backlinks[n]), n))

index_md = f"""---
title: 反向链接总索引
description: 所有笔记的反向链接统计 + 无引用笔记列表
sidebar:
  hidden: true
tags: [backlinks, index]
---

# 反向链接总索引

> 自动生成,运行 `bash scripts/related.sh` 重新生成。

## 统计

- **总笔记**: {total}
- **有反向链接**: {total - len(no_bl)} ({100*(total-len(no_bl))//total}%)
- **无反向链接(候选归档)**: {len(no_bl)} ({100*len(no_bl)//total}%)

## 反向链接 Top 20(被引用最多)

| 笔记 | 反向链接数 |
| --- | --- |
"""
for n in has_bl[:20]:
    index_md += f"| [[{n}]] | {len(backlinks[n])} |\n"

index_md += f"\n## 无反向链接笔记({len(no_bl)} 篇,候选归档)\n\n"
for n in no_bl:
    index_md += f"- [[{n}]]\n"

(OUT_ROOT / "index.md").write_text(index_md, encoding="utf-8")

# ---- 2. 关键笔记独立页(MOC + AI/ + 10-项目/ + 20-资源/) ----
PRIORITY = ("00-MOC/", "AI/", "10-项目/", "20-资源/", "30-归档/")
for note in sorted(all_notes.keys()):
    if not any(note.startswith(p) for p in PRIORITY):
        continue
    bls = sorted(backlinks.get(note, set()))
    data = all_notes[note]
    content = f"""---
title: 反向链接 — {note}
description: {note} 的反向链接(基于 [[wikilink]] + frontmatter `related`)
sidebar:
  hidden: true
tags: [backlinks]
---

# 反向链接: {note}

> 自动生成。

## 被以下笔记引用({len(bls)} 篇)
"""
    if bls:
        for bl in bls:
            content += f"- [[{bl}]]\n"
    else:
        content += "_(无)_\n"

    content += f"\n## 当前笔记的 outgoing 链接\n\n"
    content += f"**wikilinks** ({len(data['wikilinks'])}):\n"
    for w in sorted(data["wikilinks"]):
        content += f"- [[{w}]]\n"
    if not data["wikilinks"]:
        content += "_(无)_\n"

    content += f"\n**related** ({len(data['related'])}):\n"
    for r in sorted(data["related"]):
        content += f"- [[{r}]]\n"
    if not data["related"]:
        content += "_(无)_\n"

    out_path = OUT_ROOT / f"{note}.md"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(content, encoding="utf-8")

print(f"✅ 生成完成,耗时 {time.time()-t0:.2f}s")
print(f"   - 总笔记: {total}")
print(f"   - 有反向链接: {total - len(no_bl)}, 无: {len(no_bl)}")
print(f"   - 关键笔记独立页: 00-MOC/ + AI/ + 10-项目/ + 20-资源/ + 30-归档/ 子树")
print(f"📁 输出: {OUT_ROOT}/")
print(f"💡 把 {OUT_ROOT}/ 加入 .gitignore(它是生成产物)")
PYEOF
