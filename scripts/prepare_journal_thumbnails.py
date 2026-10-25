from pathlib import Path
from PIL import Image
import json, shutil

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [
  {
    "name": "seasons-harvest-v1",
    "path": "C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-393735b6-2945-4f01-a102-c153ce736db8.png"
  },
  {
    "name": "danang-afternoon-v1",
    "path": "C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-2032f7df-3ef7-497e-8b17-b7d239c2ba04.png"
  },
  {
    "name": "tropical-fruits-v1",
    "path": "C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-7117a48c-a3cf-4fd8-99e3-cbc3822a9211.png"
  },
  {
    "name": "gift-ritual-v1",
    "path": "C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-69203f3c-3501-4d69-ae84-21838aba7731.png"
  },
  {
    "name": "new-encounters-v1",
    "path": "C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-f4cc2a4c-265e-48f9-a0bb-faf66cbc53c6.png"
  }
]
target = ROOT / "assets" / "journal"
(target / "source").mkdir(parents=True, exist_ok=True)
entries = json.loads((ROOT / "journal-translations.json").read_text(encoding="utf-8"))
assert len(entries) == len(SOURCES) == 5
for entry, source in zip(entries, SOURCES):
    name = source["name"]
    original = target / "source" / (name + ".png")
    if not original.exists():
        shutil.copy2(source["path"], original)
    with Image.open(original) as image:
        assert image.size == (1536, 1024)
        image.convert("RGB").save(target / (name + ".webp"), "WEBP", quality=88, method=6)
    entry["image"] = "journal/" + name
    print(name, (target / (name + ".webp")).stat().st_size)
(ROOT / "journal-translations.json").write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

