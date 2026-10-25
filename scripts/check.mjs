import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
const html=await readFile('index.html','utf8');
const {window}=parseHTML(html);
const {document}=window;
Object.assign(globalThis,{window,document,innerWidth:1440,innerHeight:900,location:{hash:''},localStorage:{setItem(){},getItem(){return null;}},sessionStorage:{setItem(){},getItem(){return null;}},IntersectionObserver:class {observe(){}},requestAnimationFrame:()=>0});
globalThis.addEventListener=()=>{};
window.matchMedia=()=>({matches:false,addEventListener(){}});
globalThis.fetch=async path=>({ok:true,json:async()=>JSON.parse(await readFile(path,'utf8'))});
document.querySelector('.story-gallery').getBoundingClientRect=()=>({top:0});
for(const photo of document.querySelectorAll('[data-gallery-photo]'))photo.getBoundingClientRect=()=>({top:1200,bottom:1500,height:300});
const {copy,products,stores,galleryFrame,diagonalMask,dampMotion,galleryTimings}=await import('../app.js');
const {journals}=await import('../journal-data.js');
const click=selector=>{const el=document.querySelector(selector);assert.ok(el,`Missing control: ${selector}`);el.click();};
const text=selector=>document.querySelector(selector).textContent;
let count=0;
const check=(condition,message)=>{assert.ok(condition,message);count++;};
check(document.documentElement.lang==='vi','Vietnamese is default');
check(document.querySelector('[data-category="vietnam"]').getAttribute('aria-selected')==='true','Vietnam collection opens first');
for(const lang of ['ko','en','vi']){
 click(`[data-lang="${lang}"]`);
 check(document.documentElement.lang===lang,`${lang} HTML lang`);
 for(const el of document.querySelectorAll('[data-t]'))check(el.innerHTML===copy[el.dataset.t][lang],`${el.dataset.t} in ${lang}`);
 for(const value of Object.values(copy))check(typeof value[lang]==='string'&&value[lang].length>0,`Complete ${lang} copy`);
 check(!document.body.textContent.includes('undefined'),`No undefined copy in ${lang}`);
 check(!/프로젝트|시나리오|모의|시연|콘셉트|demo|prototype|project scenario|dự án|giả định/i.test(document.body.textContent),`Removed presentation notes in ${lang}`);
}
check(document.querySelectorAll('.news-card').length===5,'Five readable stories');
check(new Set(journals.map(j=>j.image)).size===5,'Every journal has a distinct primary image');
for(const j of journals){
 check(j.image.startsWith('journal/'),'Journal thumbnails use dedicated editorial images');
 check(document.querySelector(`[data-story="${j.slug}"] img`).getAttribute('src')===`assets/${j.image}.webp`,'Journal card renders its dedicated thumbnail');
 check(!Array.from(document.querySelectorAll('img')).some(img=>!img.closest('.news-card')&&img.getAttribute('src')===`assets/${j.image}.webp`),'Journal thumbnail is not reused in other home sections');
}
check(document.querySelectorAll('[data-gallery-photo]').length===12,'Twelve photo-only collage layers');
for(const banned of ['PREMIUM KOREAN DESSERT','SEOUL, KOREA — DA NANG, VIETNAM','THE BEAUTY WITHIN','OUR PHILOSOPHY','01 — 08'])check(!document.body.textContent.includes(banned),`Removed decorative copy: ${banned}`);
check(!document.querySelector('.hero-bottom'),'Removed hero footer and its repeated copy');
const entering=galleryFrame(850,300,900),center=galleryFrame(200,300,900);
check(center.clarity>entering.clarity&&center.softness<entering.softness,'Collage sharpens as it enters');
check(center.reveal>entering.reveal,'Diagonal image mask opens with scroll');
check(galleryFrame(900,300,900).reveal>.05,'A photo is already revealing at viewport entry');
check(Math.max(...galleryTimings.map(p=>p.delay))<=220,'No photo waits more than 220ms');
check(!document.querySelector('[data-t=giftIntro]')&&!document.querySelector('[data-t=shopsIntro]'),'Redundant section introductions removed');
check(products.filter(p=>p.id==='mango-yogurt').length===1&&products.find(p=>p.id==='mango-yogurt').category==='vietnam','Mango yogurt appears only in Vietnam');
check(JSON.stringify(galleryFrame(850,300,900))===JSON.stringify(entering),'Scroll motion is reversible');
check(diagonalMask(0).includes('0% 0%')&&diagonalMask(1).includes('100% 100%'),'Diagonal wipe starts at top-left and covers the full image');
check(diagonalMask(.25).includes('50% 0%')&&diagonalMask(.25).includes('0% 50%'),'Wipe advances along the upper-left to lower-right diagonal');
let motion=0;for(let i=0;i<140;i++)motion=dampMotion(motion,1,1000/60);check(motion>.999,'Motion damping converges after scrolling stops');
check(dampMotion(0,1,16)>0&&dampMotion(0,1,16)<1,'Motion does not snap to the next scroll position');
check(new Set(galleryTimings.map(p=>p.delay)).size===12,'Every photo has its own entrance delay');
check(new Set(galleryTimings.map(p=>p.duration)).size===12,'Every photo has its own motion pace');
check(galleryFrame(550,300,900,0).reveal!==galleryFrame(550,300,900,2).reveal,'Equal-height photos have different reveal progress');
const galleryLayout=JSON.parse(await readFile('assets/gallery-layout.json','utf8'));
for(const entry of galleryLayout)check(entry.fit==='contain'&&Math.abs(entry.ratio-10/7)<.001,'Gallery frames preserve the full photo ratio');
for(const j of journals){const a=document.querySelector(`[data-story="${j.slug}"]`);check(a&&a.getAttribute('href').includes(`story=${j.slug}`),'Each journal has its own page link');for(const lang of ['vi','ko','en'])check(j[lang].paragraphs.length>=5&&j[lang].summary.length>30,'Each language has complete journal content');await access(`assets/${j.image}.webp`);await access(`assets/${j.secondary}.webp`);}
for(const removed of ['#product-description','#product-feature','#product-details','.product-seal','#store-features','#store-type','.product-index','.vision-heading','[data-t="mapNote"]','[data-t="demo"]'])check(!document.querySelector(removed),`${removed} removed from the page`);
const first=text('#product-title');click('.next');check(text('#product-title')!==first,'Next product updates');click('.prev');check(text('#product-title')===first,'Previous product updates');
click('[data-category="vietnam"]');check(document.querySelectorAll('.product-dots button').length===4,'Four confirmed Vietnam flavors');
for(let i=0;i<4;i++){click(`[data-product="${i}"]`);check(text('#product-title').length>1,'Product selector updates the visible name');}
click('[data-category="original"]');check(document.querySelectorAll('.product-dots button').length===6,'Six original products');
const originals=['strawberry','chocolate-strawberry','strawberry-yogurt','whole-mandarin','golden-pineapple','melon-yogurt'];
check(JSON.stringify(products.filter(p=>p.category==='original').map(p=>p.id))===JSON.stringify(originals),'Six Korean originals; mugwort strawberry excluded and mango yogurt belongs only to Vietnam');
check(JSON.stringify(products.filter(p=>p.category==='vietnam').map(p=>p.id))===JSON.stringify(['mangosteen-yogurt','mango-yogurt','honey-red-dragonfruit','durian']),'Confirmed four Vietnam products');
for(const lang of ['ko','en','vi']){
 click(`[data-lang="${lang}"]`);
 for(let i=0;i<6;i++){
  const button=document.querySelector(`[data-product="${i}"]`);button.click();
  const product=products.filter(p=>p.category==='original')[i];
  check(text('#product-title')===product.name[lang],'Selected Korean product name in each language');
  check(document.querySelector('#product-image').getAttribute('src')===`assets/${product.image}.webp`,'Selected original shows its own package and cutaway');
  check(button.getAttribute('aria-pressed')==='true'&&button.textContent===product.name[lang],'Selector keeps its node, focus target and translated name');
 }
 click('[data-category="vietnam"]');
 for(let i=0;i<4;i++){
  click(`[data-product="${i}"]`);const product=products.filter(p=>p.category==='vietnam')[i];
  check(text('#product-title')===product.name[lang],'Selected Vietnam product name in each language');
  check(product.composition==='confirmed-product-photo-20261025','Vietnam collection follows approved product photographs');
 }
 click('[data-category="original"]');
}
click('[data-product="5"]');click('.next');check(text('#product-title')===products[0].name.vi,'Original selector wraps from last product to first');
click('.prev');check(text('#product-title')===products[5].name.vi,'Original selector wraps backwards');
const selectKey=(index,key)=>{const event=new window.Event('keydown',{bubbles:true,cancelable:true});Object.defineProperty(event,'key',{value:key});document.querySelector(`[data-product="${index}"]`).dispatchEvent(event);};
selectKey(5,'Home');check(text('#product-title')===products[0].name.vi,'Home selects the first original');
selectKey(0,'End');check(text('#product-title')===products[5].name.vi,'End selects the last original');
selectKey(5,'ArrowRight');check(text('#product-title')===products[0].name.vi,'Keyboard selection wraps');
const imagePrototype=Object.getPrototypeOf(document.createElement('img')),oldDecode=Object.getOwnPropertyDescriptor(imagePrototype,'decode'),pendingImages=[];
Object.defineProperty(imagePrototype,'decode',{configurable:true,value(){return new Promise(resolve=>pendingImages.push(resolve));}});
const oldImage=document.querySelector('#product-image').getAttribute('src');
click('[data-category="vietnam"]');click('[data-product="1"]');click('[data-product="2"]');
check(document.querySelector('#product-image').getAttribute('src')===oldImage,'Previous visual remains while new images decode');
pendingImages[2]();await Promise.resolve();await Promise.resolve();
const lastImage=document.querySelector('#product-image').getAttribute('src');
check(lastImage.includes('honey-red-dragonfruit-pair-v2'),'Most recent decoded selection is shown');
pendingImages[0]();pendingImages[1]();await Promise.resolve();await Promise.resolve();
check(document.querySelector('#product-image').getAttribute('src')===lastImage,'Late decode cannot replace a newer selection');
if(oldDecode)Object.defineProperty(imagePrototype,'decode',oldDecode);else delete imagePrototype.decode;
const shop=text('#store-title');click('[data-store="1"]');check(text('#store-title')!==shop&&document.querySelector('#store-image').getAttribute('src').includes('boutique'),'Boutique has distinct image and content');click('[data-store="0"]');check(text('#store-title')===shop,'Tourist store restored');
for(let i=0;i<2;i++){click(`[data-store="${i}"]`);check(text('#store-info').includes(stores[i].phone)&&text('#store-info').includes(stores[i].address),'Store contact information changes with selection');check(stores[i].phone.includes('XXX'),'Fictional number cannot dial another business');}
check(document.querySelectorAll('.gift-editorial img').length===2,'Gift editorial contains two images');
check(!document.querySelector('#gifting img[src*="four-flavors"]'),'Third packaging image removed');
check(!document.querySelector('#vision')&&!document.querySelector('.world-map'),'World map section removed');
check(!document.querySelector('[data-t="footerLine"]'),'Repeated brand line removed from the footer');
check(!document.querySelector('.intro-skip'),'Opening plays on its own and needs no enter button');
check(document.querySelectorAll('#gifting .gift-character').length===0&&!document.querySelector('[data-t="giftSetCaption"]'),'Gifting shows two equal frames without seals or captions');
check(!document.querySelector('.brand-chapter')&&!document.querySelector('#brand .global-note'),'Brand chapter keeps only its title, principles and years');
check(document.querySelector('.brand-backdrop').getAttribute('src')==='assets/brand-chapter-tall.webp','Brand chapter and the stores share one tall photograph');
check(document.querySelectorAll('.green-chapter > .brand-backdrop, .green-chapter > .brand-shade').length===2&&document.querySelectorAll('.green-chapter > section').length===2,'One photograph carries both green sections');
check(!document.querySelector('#shops .section-background')&&!document.querySelector('#shops .dark-overlay'),'The stores no longer carry their own photograph');
check(document.querySelectorAll('.collection-tab-label').length===2,'Collection tabs have separate padded text labels');
check(document.querySelectorAll('.collection-tab-seal svg').length===2,'Collection tabs carry a Korean knot motif');
check(document.querySelectorAll('.powder i').length===84,'More visible rice-flour particles are present on first entry');
for(const image of document.querySelectorAll('.gift-editorial img'))check(image.getAttribute('src').startsWith('assets/gifting/'),'Gifting uses new Da Nang edition images');
click('.menu-toggle');check(!document.querySelector('#mobile-menu').hidden,'Menu opens');click('#mobile-menu a');check(document.querySelector('#mobile-menu').hidden,'Menu navigation closes');
check(document.querySelector('#intro')&&!document.querySelector('#intro .intro-skip'),'Opening screen present without a skip control');
for(const a of document.querySelectorAll('a[href^="#"]'))check(!!document.querySelector(a.getAttribute('href')),'Every anchor resolves');
for(const im of document.querySelectorAll('img')){await access(im.getAttribute('src'));check(im.hasAttribute('alt'),'Image alternative text present');}
for(const p of products){await access(`assets/${p.image}.webp`);await access(`assets/${p.thumbnail}.webp`);}
const maps=JSON.parse(await readFile('assets/maps.json','utf8'));check(maps.vietnam.length>100&&maps.world.length>10000,'Geographic map paths available');
check(maps.vietnamScale==='1:10m'&&maps.vietnam.length>10000,'Vietnam uses a detailed actual geographic boundary');
check(maps.worldGeometry==='landmass-outlines'&&maps.worldInternalBorders===false,'World map has coastline only, without national borders');
check(maps.worldAntarctica===false&&maps.worldMinimumLatitude> -60,'World map excludes Antarctica');
check(!/checkout|add.to.cart/i.test(html)&&!document.querySelector('form[action]'),'No checkout or server-side purchase submission; contact payment preference is an inquiry field');
check(document.querySelector('#brand').compareDocumentPosition(document.querySelector('#shops'))&4,'Brand introduction leads into the shops');
check(document.querySelector('main').lastElementChild.id==='contact','Contact is the final main section');
check(document.querySelectorAll('[data-contact]').length===3,'FAQ, group gifting and partnerships share a contact section');
check(document.querySelectorAll('[data-inquiry]').length===2,'Two explicit inquiry forms');
for(const form of document.querySelectorAll('[data-inquiry]'))check(form.querySelector('input[name=consent]').hasAttribute('required'),'Inquiry consent is required');
check(products.filter(p=>p.category==='original').every(p=>p.image.endsWith('-pair-v3')),'All six Korean images use the new tag and frontal composition');
console.log(`Passed ${count} content, asset and DOM interaction checks. Browser layout, rendering and motion remain manual QA.`);
await import('./check-fonts.mjs');
