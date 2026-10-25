from pathlib import Path
from PIL import Image
import json,shutil
root=Path(__file__).resolve().parent.parent
for entry in json.loads((root/'image-selected-20261026.json').read_text(encoding='utf-8')):
    name=entry['id'];hero=name.startswith('vietnam-four-hero')
    source=root/'assets'/'collection'/'source'/f'{name}.png'
    if Path(entry['generatedPath']).exists():shutil.copy2(entry['generatedPath'],source)
    with Image.open(source) as im:
        im=im.convert('RGB')
        assert abs(im.width/im.height-(4/3 if hero else 3/2))<.01
        destination=root/'assets' if hero else root/'assets'/'collection'
        im.save(destination/f'{name}.webp','WEBP',quality=93,method=6)
        if not hero:
            im.thumbnail((360,240),Image.Resampling.LANCZOS)
            im.save(destination/f"{entry['productId']}-thumb-v3.webp",'WEBP',quality=88,method=6)
    print(name)
path=root/'collection-data.js'
products=json.loads(path.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
for product in products:
    if product['category']=='original':
        product['image']=f"collection/{product['id']}-pair-v3"
        product['thumbnail']=f"collection/{product['id']}-thumb-v3"
path.write_text('export const products = '+json.dumps(products,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
