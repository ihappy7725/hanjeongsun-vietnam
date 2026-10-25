"""Copy chosen generated sources and encode full-frame images without AI edits."""
from pathlib import Path
from PIL import Image
import json,shutil
root=Path(__file__).resolve().parent.parent
paths=json.loads((root/'confirmed-generated-paths.json').read_text(encoding='utf-8'))
out=root/'assets'/'collection';(out/'source').mkdir(exist_ok=True)
for name,generated in paths.items():
    hero=name=='vietnam-four-hero-v2'
    journal=name=='tropical-fruits-v2'
    filename=name if hero or journal else name+'-pair-v2'
    destination=root/'assets'/'journal' if journal else out
    source=destination/'source'/f'{filename}.png'
    if Path(generated).exists():shutil.copy2(generated,source)
    with Image.open(source) as im:
        im=im.convert('RGB')
        if hero:
            assert abs(im.width/im.height-4/3)<.01
            im.save(root/'assets'/f'{filename}.webp','WEBP',quality=93,method=6)
        elif journal:
            assert im.width*2==im.height*3
            im.save(destination/f'{filename}.webp','WEBP',quality=90,method=6)
        else:
            assert im.width*2==im.height*3
            im.save(out/f'{filename}.webp','WEBP',quality=92,method=6)
            im.thumbnail((360,240),Image.Resampling.LANCZOS)
            im.save(out/f'{name}-thumb-v2.webp','WEBP',quality=88,method=6)
    print(filename)
