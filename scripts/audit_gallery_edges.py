"""Measure baked-in page margins and expose only the photograph through CSS.

Original photographs are retained unchanged. Photo subjects are never regenerated.
"""
from pathlib import Path
from PIL import Image
import json

root=Path(__file__).resolve().parent.parent
manifest=root/'assets/gallery-layout.json'
entries=json.loads(manifest.read_text(encoding='utf-8'))
rules=['/* Measured page margins only; preserve the photo and its visible ratio. */',
       '.collage-photo img{position:absolute;inset:auto;left:0;top:0;max-width:none;aspect-ratio:auto;object-fit:fill}']
for index,entry in enumerate(entries,1):
    im=Image.open(root/entry['image']).convert('RGB');w,h=im.size
    def blank(box):
        colors=list(im.crop(box).get_flattened_data())
        return sum(min(c)>247 and max(c)-min(c)<7 for c in colors)/len(colors)>.975
    l=r=t=b=0
    while l<int(w*.04) and blank((l,0,l+1,h)):l+=1
    while r<int(w*.04) and blank((w-r-1,0,w-r,h)):r+=1
    while t<int(h*.04) and blank((l,t,w-r,t+1)):t+=1
    while b<int(h*.04) and blank((l,h-b-1,w-r,h-b)):b+=1
    l+=2 if l else 0;r+=2 if r else 0;t+=2 if t else 0;b+=2 if b else 0
    cw,ch=w-l-r,h-t-b
    entry['visibleInset']={'left':l,'right':r,'top':t,'bottom':b}
    entry['displayRatio']=cw/ch
    if any((l,r,t,b)):
        rules.append(f'.photo-{index}'+'{'+f'aspect-ratio:{cw}/{ch}'+'}')
        rules.append(f'.photo-{index} img'+'{'+f'width:{w/cw*100:.6f}%;height:{h/ch*100:.6f}%;left:{-l/cw*100:.6f}%;top:{-t/ch*100:.6f}%'+'}')
    print(f'{index:02}: page margin inset {l}, {t}, {r}, {b}px')
manifest.write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(root/'gallery-crops.css').write_text('\n'.join(rules)+'\n',encoding='utf-8')
