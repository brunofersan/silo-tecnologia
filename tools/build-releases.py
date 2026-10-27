# Gera releases.html a partir de release-notes.md.
# Uso: pip install markdown && python tools/build-releases.py
import re
from pathlib import Path

import markdown

root = Path(__file__).resolve().parent.parent
md = (root / "release-notes.md").read_text(encoding="utf-8")
md = re.sub(r"^# .*\n+", "", md, count=1)
body = markdown.markdown(md, extensions=["tables"])


def anchor(match):
    version = match.group(1)
    slug = "v" + re.sub(r"[^a-z0-9]+", "-", version.lower())
    return f'<h2 id="{slug}">{version}</h2>'


body = re.sub(r"<h2>([0-9][^<]*)</h2>", anchor, body)
template = (root / "tools" / "releases.template.html").read_text(encoding="utf-8")
(root / "releases.html").write_text(template.replace("{{NOTES}}", body), encoding="utf-8")
print("releases.html gerado")
