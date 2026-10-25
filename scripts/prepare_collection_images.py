"""Copy selected generated originals and create full-frame web assets (Pillow)."""
from pathlib import Path
from PIL import Image
import json, shutil

root = Path(__file__).resolve().parent.parent
out = root / 'assets' / 'collection'
(out / 'source').mkdir(parents=True, exist_ok=True)
entries = json.loads((root / 'collection-image-plan.json').read_text(encoding='utf-8'))
for entry in entries:
    name = entry['id']
    original = out / 'source' / f'{name}-pair-v1.png'
    generated = Path(entry['generatedPath'])
    if generated.exists():
        shutil.copy2(generated, original)
    if not original.exists():
        raise FileNotFoundError(f'Missing selected source for {name}')
    with Image.open(original) as image:
        image = image.convert('RGB')
        assert image.width * 2 == image.height * 3, f'{name}: expected 3:2'
        image.save(out / f'{name}-pair-v1.webp', 'WEBP', quality=90, method=6)
        image.thumbnail((360, 240), Image.Resampling.LANCZOS)
        image.save(out / f'{name}-thumb-v1.webp', 'WEBP', quality=86, method=6)
    print(name)
