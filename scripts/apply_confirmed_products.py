"""Apply the user's 2026-10-25 menu; source photographs override earlier concepts."""
from pathlib import Path
import json,re

root=Path(__file__).resolve().parent.parent
path=root/'collection-data.js'
old=json.loads(path.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
original=[p for p in old if p['category']=='original' and p['id'] not in {'mango-yogurt','mugwort-strawberry'}]
confirmed=json.loads((root/'confirmed-products.json').read_text(encoding='utf-8'))
path.write_text('export const products = '+json.dumps(original+confirmed,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')

path=root/'index.html';html=path.read_text(encoding='utf-8')
html=html.replace('assets/cross-section.webp','assets/vietnam-four-hero-v2.webp')
html=html.replace('alt="Five fruit-filled Korean rice cakes, cut to reveal their colorful centers"','alt="Four confirmed Vietnam rice cakes: mangosteen, mango yogurt, honey red dragon fruit and durian"')
html=re.sub(r'<p data-t="(?:giftIntro|shopsIntro)">.*?</p>','',html)
html=html.replace('assets/collection/mango-pair-v1.webp','assets/collection/mangosteen-yogurt-pair-v2.webp')
html=re.sub(r'(<span class="collection-tab-label" data-t="vietnam">).*?(</span>)',r'\1Bộ sưu tập Việt Nam\2',html)
html=re.sub(r'(<span class="collection-tab-label" data-t="original">).*?(</span>)',r'\1Bộ sưu tập Hàn Quốc\2',html)
path.write_text(html,encoding='utf-8')
print('Applied four Vietnam products and six Korean originals; removed redundant section introductions.')
