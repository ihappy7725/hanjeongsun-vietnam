"""Prepare the photo-only gallery and supplied Vietnam edition illustrations."""
from pathlib import Path
from PIL import Image, ImageOps
import json, requests

root=Path(__file__).resolve().parent.parent
gallery=root/'assets'/'gallery'
gallery.mkdir(exist_ok=True)
selected=[19,18,20,27,28,21,43,44,45,24,23,29]
for i,number in enumerate(selected,1):
    image=Image.open(root/'reference'/'design-v2'/f'{number}.png').convert('RGB')
    image.thumbnail((1400,1200))
    image.save(gallery/f'{i:02}.webp',quality=89)

fruit_files={
 'lychee-cut':'b5d920df-c029-4808-acd3-d7bd904ca24b.jpg',
 'dragonfruit-cut':'f5373f75-05c5-4dd6-b500-4c0218d7ebd3.jpg',
 'durian-cut':'Gemini_Generated_Image_br7r3cbr7r3cbr7r.png',
 'mango-cut':'Gemini_Generated_Image_uwxfb2uwxfb2uwxf.png',
 'starfruit-cut':'Gemini_Generated_Image_xkn1nvxkn1nvxkn1.png',
}
for name,file in fruit_files.items():
    image=Image.open(root/'reference'/'vietnam-v2'/file).convert('RGB')
    # Preserve the supplied drawing and its entire silhouette without a circular crop.
    image=ImageOps.contain(image,(700,700))
    canvas=Image.new('RGB',(800,800),'white')
    canvas.paste(image,((800-image.width)//2,(800-image.height)//2))
    canvas.save(root/'assets'/f'{name}.webp',quality=93)

print('Prepared 12 photo-only gallery assets and 5 Vietnam product illustrations.')

if __name__=='__main__':
    url='https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson'
    response=requests.get(url,timeout=90)
    response.raise_for_status()
    data=response.json()
    country=next(f for f in data['features'] if f['properties']['ADMIN']=='Vietnam')
    polygons=country['geometry']['coordinates']
    if country['geometry']['type']=='Polygon':polygons=[polygons]
    paths=[]
    # Preserve latitude/longitude proportions at Vietnam's central latitude.
    for polygon in polygons:
        for ring in polygon:
            paths.append('M'+' L'.join(f'{(lon-101)*30.7:.2f},{(24-lat)*32:.2f}' for lon,lat,*_ in ring)+'Z')
    maps_path=root/'assets'/'maps.json'
    maps=json.loads(maps_path.read_text(encoding='utf-8'))
    maps.update(vietnam=' '.join(paths),vietnamSource=url,vietnamScale='1:10m',vietnamViewBox='0 0 380 520')
    maps_path.write_text(json.dumps(maps),encoding='utf-8')
    # Keep the original boundary feature so future styling never reduces its fidelity.
    (root/'assets'/'vietnam-boundary.geojson').write_text(json.dumps(country),encoding='utf-8')
    print('Replaced Vietnam with detailed Natural Earth 1:10m geographic boundaries.')
