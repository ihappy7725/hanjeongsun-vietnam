import {readFile,writeFile} from 'node:fs/promises';
export const gifting=`<section class="gifting section-space" id="gifting" aria-labelledby="gift-heading">
 <div class="gift-stage">
  <div class="gift-heading reveal"><h2 id="gift-heading" data-t="giftTitle"></h2></div>
  <div class="gift-editorial gift-pair">
   <article class="gift-card reveal"><figure><img src="assets/gifting/danang-gift-box-v1.webp" alt="Da Nang landscape gift box with six hanji-wrapped rice cakes" loading="lazy" decoding="async" width="1536" height="1024"></figure><div class="gift-details"><h3 data-t="giftBoxTitle"></h3><p data-t="giftBoxCopy"></p></div></article>
   <article class="gift-card gift-second reveal"><figure><img src="assets/gifting/danang-bojagi-v1.webp" alt="Jade and pale-gold Korean bojagi gift with lotus pendant and Da Nang landscape card" loading="lazy" decoding="async" width="1536" height="1024"></figure><div class="gift-note"><h3 data-t="giftMomentTitle"></h3><p data-t="giftMomentCopy"></p></div></article>
  </div>
 </div>
</section>`;
export const brand=`<div class="green-chapter" data-scene>
 <img class="brand-backdrop" src="assets/brand-chapter-tall.webp" alt="" aria-hidden="true" loading="lazy" width="1024" height="1536">
 <div class="brand-shade" aria-hidden="true"></div>
<section id="brand" class="brand-story brand-immersive" aria-labelledby="brand-heading">
 <div class="brand-content">
  <div class="brand-story-copy reveal"><h2 id="brand-heading" data-t="brandTitle"></h2><p data-t="brandIntro"></p></div>
  <div class="brand-principles reveal"><div><h3 data-t="brandFruitTitle"></h3><p data-t="brandFruitCopy"></p></div><div><h3 data-t="brandGiftTitle"></h3><p data-t="brandGiftCopy"></p></div><div><h3 data-t="brandSpaceTitle"></h3><p data-t="brandSpaceCopy"></p></div></div>
  <ol class="brand-years reveal"><li><span>2023</span><p data-t="year2023"></p></li><li><span>2024</span><p data-t="year2024"></p></li><li class="year-next"><span>2026</span><p data-t="year2026"></p></li></ol>
 </div>
</section>`;
export function applyEditorialRework(html){
 html=html.replace(/<div class="hero-label">[\s\S]*?<\/div>/,'').replace(/<div class="hero-caption">[\s\S]*?<\/div>/,'');
 html=html.replace(/<a class="text-link" href="#collection">[\s\S]*?<\/a>/,'');
 html=html.replace(/<p data-t="collectionIntro">[\s\S]*?<\/p>/,'');
 html=html.replace(/<section class="gifting section-space"[\s\S]*?<\/section>/,gifting);
 html=html.replace(/<section id="brand"[\s\S]*?<\/section>/,brand);
 html=html.replace(/<div><p data-t="contactIntro"><\/p><a class="contact-email"[\s\S]*?<\/div>/,'');
 if(!html.includes('section-rework.css'))html=html.replace('<script type="module" src="app.js">','<link rel="stylesheet" href="section-rework.css"><script type="module" src="app.js">');
 return html;
}
if(process.argv[1]?.endsWith('rework_editorial_sections.mjs')){
 await writeFile('index.html',applyEditorialRework(await readFile('index.html','utf8')));
 console.log('Removed captured text; rebuilt single-view gifting and immersive brand sections.');
}
