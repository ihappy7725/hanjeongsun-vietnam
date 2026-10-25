from pathlib import Path
from PIL import Image
import shutil
root=Path(__file__).resolve().parent.parent
out=root/'assets/gifting'
(out/'source').mkdir(parents=True,exist_ok=True)
for entry in [{"id":"danang-gift-box-v1","path":"C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-8eef3543-f1ba-4890-9ce0-e934ef965d25.png"},{"id":"danang-bojagi-v1","path":"C:\\Users\\user\\.codex\\generated_images\\01a167e2-fc75-72e1-8044-14ac7c0ea1f0\\exec-3c2d797d-d4f9-4924-a9eb-e2b2cf2c99dd.png"}]:
    original=out/'source'/(entry['id']+'.png')
    source=Path(entry['path'])
    if source.exists():shutil.copy2(source,original)
    with Image.open(original) as image:
        assert image.size==(1536,1024)
        image.convert('RGB').save(out/(entry['id']+'.webp'),'WEBP',quality=90,method=6)
    print(entry['id'])

