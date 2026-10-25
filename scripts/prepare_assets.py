from pathlib import Path
from PIL import Image, ImageOps
import json, requests, re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets'
OUT.mkdir(exist_ok=True)
downloads = Path.home() / 'Downloads'
images = {'cross-section':'단면.png','starfruit':'스타.png','dragonfruit':'용과.png','durian':'두리안.png','lychee':'리치.png','mango':'망고.png','gifting':'패키지.png','store-tourist':'매장1.png','store-boutique':'매장2.png','gift-table':'패키지&찹쌀떡.png','four-flavors':'4가지맛.png'}
for name, source in images.items():
    im = Image.open(downloads / source).convert('RGB')
    im.thumbnail((2000,1600))
    im.save(OUT / f'{name}.webp', quality=88)
for name, number in {'craft':4,'craft-dark':5,'korean-store':14,'staff':16,'heritage':1,'original-gifts':46}.items():
    im=Image.open(ROOT / 'reference' / f'{number}.png').convert('RGB')
    im.thumbnail((1400,1400))
    im.save(OUT / f'{name}.webp',quality=87)
# Isolate the supplied catalogue product photographs on transparent backgrounds.
for name, page, box in [('strawberry',33,(155,850,410,1095)),('fig',36,(155,225,420,485)),('strawberry-yogurt',36,(585,225,830,480)),('mango-yogurt',36,(160,850,415,1095))]:
    im=Image.open(ROOT/'reference'/f'{page}.png').convert('RGBA').crop(box)
    pixels=im.load()
    for y in range(im.height):
        for x in range(im.width):
            r,g,b,a=pixels[x,y]
            if min(r,g,b)>246: pixels[x,y]=(r,g,b,0)
    canvas=Image.new('RGBA',(480,480))
    im=ImageOps.contain(im,(420,360))
    canvas.alpha_composite(im,((480-im.width)//2,(480-im.height)//2))
    canvas.save(OUT/f'{name}.webp')
# Actual geographic boundaries; decorative maps do not imply store coordinates.
url='https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
response=requests.get(url,timeout=40); response.raise_for_status()
data=response.json()
world=[]; vietnam=[]
for feature in data['features']:
    polygons=feature['geometry']['coordinates']
    if feature['geometry']['type']=='Polygon': polygons=[polygons]
    paths=[]
    for polygon in polygons:
        ring=polygon[0]
        paths.append('M'+' L'.join(f'{(lon+180)*2.5:.2f},{(90-lat)*2.5:.2f}' for lon,lat,*_ in ring)+'Z')
    world.extend(paths)
    if feature['properties'].get('ADMIN')=='Vietnam':
        for polygon in polygons:
            vietnam.append('M'+' L'.join(f'{(lon-101)*32:.2f},{(24-lat)*25:.2f}' for lon,lat,*_ in polygon[0])+'Z')
(OUT/'maps.json').write_text(json.dumps({'world':' '.join(world),'vietnam':' '.join(vietnam)}),encoding='utf-8')
fonts=OUT/'fonts'; fonts.mkdir(exist_ok=True)
urls={'chosun.woff':'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Chosunilbo_myungjo.woff','pretendard.woff2':'https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2'}
for name,url in urls.items():
    r=requests.get(url,timeout=40);r.raise_for_status();(fonts/name).write_bytes(r.content)
# Google Fonts returns separate Vietnamese subsets. Retain all declared ranges.
css=requests.get('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500&family=Playfair+Display:wght@400;500&display=swap',headers={'User-Agent':'Mozilla/5.0'},timeout=40)
css.raise_for_status(); text=css.text
for i,url in enumerate(dict.fromkeys(re.findall(r'https://[^)\s]+',text))):
    r=requests.get(url,timeout=40);r.raise_for_status()
    name=f'font-{i}'+('.woff2' if r.content[:4]==b'wOF2' else '.ttf')
    (fonts/name).write_bytes(r.content);text=text.replace(url,f'./fonts/{name}')
(OUT/'fonts.css').write_text("@font-face{font-family:ChosunIlboMyungjo;src:url('./fonts/chosun.woff') format('woff');font-display:swap} @font-face{font-family:Pretendard;src:url('./fonts/pretendard.woff2') format('woff2');font-weight:400;font-display:swap}\n"+text,encoding='utf-8')
print('Prepared optimized images, product cutouts, local fonts and geographic maps.')
