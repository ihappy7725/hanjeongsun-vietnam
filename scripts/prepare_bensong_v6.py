"""Preserve the generated PNG and encode the existing web path at its required size."""
from pathlib import Path
from PIL import Image
import shutil

root=Path(__file__).resolve().parent.parent
generated=Path(r'C:\Users\user\.codex\generated_images\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\exec-7f5343b1-b834-473d-ad72-5c0373915f03.png')
source=root/'assets'/'source'/'store-tourist-v6.png'
if generated.exists():
    shutil.copy2(generated,source)
if not source.exists():
    raise FileNotFoundError(source)
with Image.open(source) as image:
    image=image.convert('RGB')
    image=image.resize((1376,768),Image.Resampling.LANCZOS)
    image.save(root/'assets'/'store-tourist.webp','WEBP',quality=90,method=6)
print('Applied store-tourist.webp at 1376x768, quality 90; original saved in assets/source/store-tourist-v6.png.')
