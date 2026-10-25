"""Reframe the gallery without cropping and use landmass outlines for the world."""
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import json,requests

root=Path(__file__).resolve().parent.parent
selection=[19,18,44,27,28,21,43,20,26,24,23,29]
audit=[]
for index,source in enumerate(selection,1):
    image=Image.open(root/'reference'/'design-v2'/f'{source}.png').convert('RGB')
    image.thumbnail((1400,980))
    image.save(root/'assets'/'gallery'/f'{index:02}.webp',quality=91)
    audit.append({'image':f'assets/gallery/{index:02}.webp','source':f'{source}.png','width':image.width,'height':image.height,'ratio':image.width/image.height,'fit':'contain'})
(root/'assets'/'gallery-layout.json').write_text(json.dumps(audit,indent=2),encoding='utf-8')
sheet=Image.new('RGB',(1200,4*190),'#f6f5ed');draw=ImageDraw.Draw(sheet)
for i,entry in enumerate(audit):
    image=ImageOps.contain(Image.open(root/entry['image']),(285,150))
    x=(i%4)*300;y=(i//4)*190
    sheet.paste(image,(x,y));draw.text((x+5,y+155),f"{i+1:02} / {entry['source']} / {entry['width']}x{entry['height']}",fill='#38291f')
sheet.save(root/'reference'/'gallery-framing-audit.jpg')

url='https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson'
response=requests.get(url,timeout=60);response.raise_for_status();data=response.json()
paths=[];kept=[];minimum_latitude=90
for feature in data['features']:
    polygons=feature['geometry']['coordinates']
    if feature['geometry']['type']=='Polygon':polygons=[polygons]
    for polygon in polygons:
        ring=polygon[0]
        # All Antarctic mainland/islands are south of this cutoff in this dataset.
        if max(point[1] for point in ring)<-60:continue
        minimum_latitude=min(minimum_latitude,min(point[1] for point in ring))
        paths.append('M'+' L'.join(f'{(lon+180)*2.5:.2f},{(90-lat)*2.5:.2f}' for lon,lat,*_ in ring)+'Z')
        kept.append(polygon)
maps_path=root/'assets'/'maps.json';maps=json.loads(maps_path.read_text(encoding='utf-8'))
maps.update(world=' '.join(paths),worldSource=url,worldGeometry='landmass-outlines',worldInternalBorders=False,worldAntarctica=False,worldMinimumLatitude=minimum_latitude)
maps_path.write_text(json.dumps(maps),encoding='utf-8')
(root/'assets'/'world-land.geojson').write_text(json.dumps({'type':'MultiPolygon','coordinates':kept}),encoding='utf-8')
print('Reviewed 12 complete gallery photos; replaced 03, 08, 09. World uses land outlines, without national borders or Antarctica.')
