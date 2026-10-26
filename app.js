import {installSmoothScroll} from './smooth-scroll.js';
import {installOverlayScrollbar} from './overlay-scrollbar.js';
import {journals} from './journal-data.js';
import {products} from './collection-data.js';
import {siteCopy} from './site-content.js';
import {installContact} from './contact.js';
export {products} from './collection-data.js';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const tr = (vi,ko,en) => ({vi,ko,en});
export const copy = {
...siteCopy,
storeRiverside:tr('Bến Sông','벤송점','Riverside'),storeGarden:tr('Vườn Nhiệt Đới','트로피컬 가든점','Tropical Garden'),
giftSetCaption:tr('Hộp quà giấy hanji, mang phong cảnh Đà Nẵng.','다낭의 풍경을 담은 한지 선물 상자.','A hanji gift box, carrying a little of Da Nang.'),
giftBoxTitle:tr('Gói ánh nắng<br>vào một hộp quà.','여행의 빛을<br>한 상자에.','A little of the journey,<br>held in a box.'),
giftBoxCopy:tr('<span class="sentence">Cầu Rồng, dòng sông và sắc sen trên nền giấy ấm.</span><span class="sentence">Từng gói hanji nhỏ lưu lại sắc màu của một chuyến đi.</span>','<span class="sentence">용다리와 강, 연꽃의 빛을 종이 위에 담았습니다.</span><span class="sentence">작은 한지 포장마다 여행의 색이 차곡차곡 머뭅니다.</span>','<span class="sentence">The Dragon Bridge, the river and lotus colors meet on warm paper.</span><span class="sentence">Small hanji parcels hold the colors of a journey.</span>'),
giftMomentTitle:tr('Một nếp gói tinh tế,<br>một tấm lòng bền lâu.','한 겹의 정성,<br>오래 남는 마음.','Wrapped with care.<br>Remembered with warmth.'),
giftMomentCopy:tr('<span class="sentence">Lụa xanh ngọc và vàng nhạt gặp nhau trong nút thắt bojagi Hàn Quốc.</span><span class="sentence">Một tấm thiệp phong cảnh Đà Nẵng khẽ nhắc về nơi món quà bắt đầu.</span>','<span class="sentence">비취빛과 옅은 금빛 비단을 한국의 매듭으로 여밉니다.</span><span class="sentence">다낭의 풍경을 담은 작은 카드가 선물의 기억을 이어줍니다.</span>','<span class="sentence">Jade and pale-gold silk meet in a traditional Korean bojagi knot.</span><span class="sentence">A small Da Nang landscape card carries the memory onward.</span>'),
journalTitle:tr('Nhật ký','저널','Journal'),collectionTitle:tr('Hương vị của mùa','계절을 담은 한 입','A taste of the season'),shopsTitle:tr('Ghé thăm chúng tôi<br>tại Đà Nẵng','다낭에서 만나는<br>한정선','Meet us<br>in Da Nang'),nextChapter:tr('Chương tiếp theo','다음 여정','The next chapter'),contactTitle:tr('Liên hệ','연락처','Contact'),mediaTitle:tr('Tin tức','소식','Media'),partnershipTitle:tr('Hợp tác','파트너십','Partnership'),languageTitle:tr('Ngôn ngữ','언어','Language'),address:tr('Địa chỉ','주소','Address'),phone:tr('Điện thoại','전화','Phone'),hours:tr('Giờ mở cửa','운영시간','Opening hours'),access:tr('Hướng dẫn','방문 안내','Visit'),
skipContent:tr('Đi tới nội dung','본문으로 이동','Skip to content'),enter:tr('Khám phá ↓','들어가기 ↓','Enter the experience ↓'),
navStory:tr('Hanjungsun','한정선','Hanjungsun'),navCollection:tr('Bộ sưu tập','컬렉션','Collection'),navGifting:tr('Quà tặng','선물의 미학','Gifting'),navShops:tr('Cửa hàng','매장 안내','Our stores'),
heroTitle:tr('Tinh hoa Hàn,<br>hương vị Việt.','한국의 정성,<br>베트남의 계절.','Korean soul.<br>Vietnamese heart.'),
storyTitle:tr('Gói trọn mùa lành.<br>Trao gửi chân tâm.','계절을 빚고,<br>마음을 전하다.','Crafting the seasons.<br>Delivering the heart.'),storyIntro:tr('<span class="sentence">Trái cây theo mùa, trong lớp bánh gạo mềm dẻo.</span><span class="sentence">Một món quà nhỏ, gửi trao tấm lòng.</span>','<span class="sentence">제철 과일의 싱그러움과 부드러운 찹쌀의 결.</span><span class="sentence">작은 떡 하나에 계절과 정성을 담아 마음을 전합니다.</span>','<span class="sentence">Seasonal fruit, wrapped in a soft rice cake.</span><span class="sentence">A small, thoughtful way to share something heartfelt.</span>'),
philosophyTitle:tr('Một chiếc bánh nhỏ.<br>Một tấm lòng lớn.','작은 한 입에,<br>깊은 진심을.','A small confection.<br>A generous heart.'),philosophy:tr('Chúng tôi tin rằng món quà đẹp nhất bắt đầu từ sự chân thành. Gìn giữ nét tinh tế của Hàn Quốc, đón nhận sắc màu và hương vị của Việt Nam.','좋은 선물은 진심에서 시작됩니다. 한국의 섬세한 미감을 지키며 베트남의 다채로운 계절과 맛을 만납니다.','The most beautiful gifts begin with sincerity. Korean refinement meets the colors and flavors of Vietnam.'),discoverCollection:tr('Khám phá bộ sưu tập','컬렉션 살펴보기','Discover the collection'),
collectionIntro:tr('Vẻ đẹp của mùa, trong từng chiếc bánh.','한 입에 담은 계절의 아름다움.','The beauty of the season, in every bite.'),original:tr('Bộ sưu tập Hàn Quốc','한국 오리지널 컬렉션','The Korean collection'),vietnam:tr('Bộ sưu tập Việt Nam','베트남 컬렉션','The Vietnam collection'),details:tr('Khám phá hương vị','자세히 보기','Discover the flavor'),
giftTitle:tr('Gói một chút Đà Nẵng.<br>Gửi một tấm lòng.','다낭을 담아,<br>마음을 건네다.','A gift of Da Nang.<br>A gesture from the heart.'),
legendKorea:tr('● Hàn Quốc · Thương hiệu gốc','● 한국 · 브랜드 본국','● Korea · Brand origin'),legendVietnam:tr('● Việt Nam','● 베트남','● Vietnam'),legendFuture:tr('○ Tầm nhìn tương lai','○ 향후 확장 비전','○ Future vision'),
footerLine:tr('Tinh tế trong từng hương vị.<br>Chân thành trong mỗi món quà.','맛에 담은 섬세함.<br>선물에 담은 진심.','Refinement in every flavor.<br>Sincerity in every gift.'),backTop:tr('Về đầu trang','맨 위로','Back to top'),official:tr('Website chính thức Hàn Quốc ↗','한국 공식 홈페이지 ↗','Official Korean website ↗'),partnership:tr('Hợp tác thương hiệu ↗','브랜드 파트너십 안내 ↗','Brand partnerships ↗'),partnershipNote:tr('Thông tin từ thương hiệu tại Hàn Quốc','한국 본사 공식 안내 페이지','Official information from Korea'),
read:tr('Đọc câu chuyện','이야기 읽기','Read the story'),source:tr('Tìm hiểu tại website thương hiệu ↗','브랜드 공식 소개 보기 ↗','Explore the official brand story ↗'),
prevStory:tr('Câu chuyện trước','이전 이야기','Previous stories'),nextStory:tr('Câu chuyện tiếp theo','다음 이야기','Next stories'),prevProduct:tr('Hương vị trước','이전 제품','Previous product'),nextProduct:tr('Hương vị tiếp theo','다음 제품','Next product'),close:tr('Đóng','닫기','Close'),menu:tr('Mở menu','메뉴 열기','Open menu'),
heroAlt:tr('Bốn vị bánh gạo: măng cụt, xoài sữa chua, thanh long đỏ mật ong và sầu riêng','망고스틴, 망고 요거트, 꿀 레드용과, 두리안 찹쌀떡 네 가지 단면','Four rice cake cutaways: mangosteen, mango yogurt, honey red dragon fruit and durian'),worldAlt:tr('Bản đồ thế giới','세계 지도','World map')
};
export const stores=[
{image:'store-tourist',name:tr('HANJUNGSUN Bến Sông','한정선 벤송점','HANJUNGSUN Riverside'),type:tr('Cửa hàng du lịch','관광지형 매장','Tourist destination'),address:'18 Lối Sen, Bến Sông, Đà Nẵng',phone:'+84 (0)236 XXX 0101',hours:'09:00–21:00',access:tr('Không gian ven sông, dành cho khách ghé thăm và quà lưu niệm.','강변 산책 중 들르는 공간 · 여행 기념 선물','A riverside pause for visitors and keepsake gifts'),description:tr('Dừng chân giữa hành trình khám phá Đà Nẵng, thưởng thức bánh gạo Hàn Quốc và lưu giữ kỷ niệm trong một món quà mang dấu ấn địa phương.','다낭을 여행하다 만나는 한국 디저트. 지역의 풍경을 담은 기념 선물과 따뜻한 공간이 여행의 순간을 완성합니다.','A welcoming stop while exploring Da Nang. Korean desserts and locally inspired keepsake gifts become part of your journey.'),features:tr('Không gian du lịch / Quà lưu niệm / Trải nghiệm văn hóa','관광지형 / 다낭 기념 패키지 / 문화 경험','Tourist destination / Keepsake gifts / Cultural experience')},
{image:'store-boutique',name:tr('HANJUNGSUN Vườn Nhiệt Đới','한정선 브온니엣더이점','HANJUNGSUN Tropical Garden'),type:tr('Boutique bách hóa','백화점형 매장','Department store boutique'),address:'Tầng 1, Vườn Nhiệt Đới, 06 Lối Cọ, Đà Nẵng',phone:'+84 (0)236 XXX 0102',hours:'10:00–22:00',access:tr('Boutique tầng 1, với bộ sưu tập quà tặng và bao bì cao cấp.','백화점 1층 부티크 · 프리미엄 선물과 패키지','First-floor boutique for premium gifts and thoughtful packaging'),description:tr('Một boutique trong bách hóa, dành cho những món quà được lựa chọn bằng cả tấm lòng. Bộ sưu tập bánh gạo và bao bì cao cấp dành cho những cuộc gặp gỡ đáng nhớ.','백화점에서 만나는 프리미엄 디저트 부티크. 정성스럽게 고른 찹쌀떡 컬렉션과 선물 패키지가 소중한 만남을 빛냅니다.','A premium dessert boutique in a department store. Carefully chosen rice cakes and elegant gift packaging mark meaningful occasions.'),features:tr('Boutique bách hóa / Quà tặng cao cấp / Khách địa phương','백화점형 / 프리미엄 선물 / 현지 고객','Department store / Premium gifting / Local visitors')}
];
const regions={korea:tr('Hàn Quốc','한국','Korea'),vietnam:tr('Việt Nam · Đà Nẵng','베트남 · 다낭','Vietnam · Da Nang'),future:tr('Những cuộc gặp gỡ mới','새로운 만남','New encounters')};
let lang='vi', category='vietnam', productIndex=0, storeIndex=0, region='korea';
const t = value => value[lang];
const asset = name => `assets/${name}.webp`;
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const currentProducts=()=>products.filter(p=>p.category===category);
let productRequest=0, selectorKey='';
function renderProduct(animate=false){
 const list=currentProducts(),p=list[productIndex],img=$('#product-image'),request=++productRequest;
 const commit=()=>{
  if(request!==productRequest)return;
  $$('.outgoing-product').forEach(el=>el.remove());
  const changed=img.getAttribute('src')!==asset(p.image);
  if(animate&&changed&&!reduce.matches&&img.getAttribute('src')){
   const old=img.cloneNode(true);old.removeAttribute('id');old.classList.remove('fade-in');old.classList.add('outgoing-product');old.alt='';old.setAttribute('aria-hidden','true');$('.product-visual').append(old);old.addEventListener('animationend',()=>old.remove(),{once:true});
  }
  img.src=asset(p.image);img.alt=t(p.name);
  img.classList.remove('concept-image','original-image');
  if(animate&&changed){img.classList.remove('fade-in');void img.offsetWidth;img.classList.add('fade-in');}
 };
 // Decode before fading so slow image loads cannot leave an empty stage.
 const preload=document.createElement('img');
 if(animate&&typeof preload.decode==='function'){
  preload.src=asset(p.image);preload.decode().then(commit).catch(()=>{});
 }else commit();
 $('#product-title').textContent=t(p.name);
 const choices=$('.product-dots');
 choices.dataset.category=category;
 choices.setAttribute('aria-label',t(copy[category]));
 if(selectorKey!==`${category}:${lang}`){
  choices.innerHTML=list.map((p,i)=>`<button class="product-choice" data-product="${i}" aria-label="${escape(t(p.name))}" aria-pressed="${i===productIndex}"><img src="${asset(p.thumbnail)}" alt="" width="360" height="240" loading="lazy" decoding="async"><span>${escape(t(p.name))}</span></button>`).join('');
  selectorKey=`${category}:${lang}`;
 }
 $$('[data-product]',choices).forEach((b,i)=>b.setAttribute('aria-pressed',i===productIndex));
 if(animate&&innerWidth<=650)choices.querySelector(`[data-product="${productIndex}"]`)?.scrollIntoView?.({behavior:reduce.matches?'instant':'smooth',block:'nearest',inline:'nearest'});
 $('#product-panel').setAttribute('aria-labelledby',`tab-${category}`);
 $$('[data-category]').forEach(b=>{b.setAttribute('aria-selected',b.dataset.category===category);b.tabIndex=b.dataset.category===category?0:-1;});
}
function renderStore(){const s=stores[storeIndex];$('#store-image').src=asset(s.image);$('#store-image').alt=t(s.name);$('#store-title').textContent=t(s.name);$('#store-description').textContent=t(s.description);$$('[data-store]').forEach(b=>{b.setAttribute('aria-selected',Number(b.dataset.store)===storeIndex);b.tabIndex=Number(b.dataset.store)===storeIndex?0:-1;});$('#store-panel').setAttribute('aria-labelledby',`store-tab-${storeIndex}`);$('#store-info').innerHTML=[[copy.address,s.address],[copy.phone,s.phone],[copy.hours,s.hours],[copy.access,t(s.access)]].map(([label,value])=>`<div><dt>${escape(t(label))}</dt><dd>${escape(value)}</dd></div>`).join('');}
function renderNews(){
 $('#news-track').innerHTML=journals.map(j=>{const article=j[lang];return `<a class="news-card" href="journal.html?story=${j.slug}&amp;lang=${lang}" data-story="${j.slug}"><span class="news-image"><img src="${asset(j.image)}" alt="${escape(article.title)}" loading="lazy"></span><h3>${escape(article.title)}</h3><p>${escape(article.summary)}</p><span class="read">${t(copy.read)} <span aria-hidden="true">↗</span></span></a>`;}).join('');
}
function renderRegion(){ $$('[data-region]').forEach(b=>{b.classList.toggle('active',b.dataset.region===region);b.setAttribute('aria-pressed',b.dataset.region===region);b.setAttribute('aria-label',t(regions[b.dataset.region]));});}
function setLanguage(value){lang=value;document.documentElement.lang=lang;try{localStorage.setItem('hanjungsun-language',lang);}catch{}$$('[data-t]').forEach(el=>{el.innerHTML=t(copy[el.dataset.t]);});$$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));document.title={vi:'HANJUNGSUN Vietnam — Tinh hoa Hàn, hương vị Việt',ko:'한정선 베트남 — 계절을 빚고, 마음을 전하다',en:'HANJUNGSUN Vietnam — From Korea, with heart'}[lang];$('meta[name="description"]').content=t(copy.heroTitle).replaceAll('<br>',' ');const labels={'.prev':'prevProduct','.next':'nextProduct','[data-scroll="-1"]':'prevStory','[data-scroll="1"]':'nextStory','.menu-toggle':'menu'};for(const [selector,key]of Object.entries(labels))$(selector).setAttribute('aria-label',t(copy[key]));$('.hero-photo>img').alt=t(copy.heroAlt);renderNews();renderProduct();renderStore();renderRegion();}
function moveProduct(delta){const list=currentProducts();productIndex=(productIndex+delta+list.length)%list.length;renderProduct(true);}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.lang)setLanguage(b.dataset.lang);
 if(b.dataset.category){category=b.dataset.category;productIndex=0;renderProduct(true);}
 if(b.dataset.product!==undefined){productIndex=Number(b.dataset.product);renderProduct(true);}
 if(b.dataset.store!==undefined){storeIndex=Number(b.dataset.store);renderStore();$('#store-image').classList.remove('fade-in');void $('#store-image').offsetWidth;$('#store-image').classList.add('fade-in');}
 if(b.dataset.scroll)$('#news-track').scrollBy({left:Number(b.dataset.scroll)*($('#news-track').clientWidth*.7),behavior:'smooth'});
 if(b.dataset.region){region=b.dataset.region;renderRegion();}
});
$('.prev').addEventListener('click',()=>moveProduct(-1));$('.next').addEventListener('click',()=>moveProduct(1));
$('.product-dots').addEventListener('keydown',e=>{
 if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
 const buttons=$$('[data-product]',$('.product-dots')),active=buttons.indexOf(e.target);
 if(active<0)return;e.preventDefault();
 const index=e.key==='Home'?0:e.key==='End'?buttons.length-1:(active+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
 buttons[index].focus();buttons[index].click();
});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#mobile-menu').hidden;$('#mobile-menu').hidden=!open;$('.menu-toggle').setAttribute('aria-expanded',open);});
$$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{$('#mobile-menu').hidden=true;$('.menu-toggle').setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#mobile-menu').hidden=true;$('.menu-toggle').setAttribute('aria-expanded','false');}});
$$('[role=tablist]').forEach(list=>list.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=$$('[role=tab]',list);let i=tabs.indexOf(document.activeElement);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].focus();tabs[i].click();}));
let startX=null;$('.product-stage').addEventListener('touchstart',e=>startX=e.touches[0].clientX,{passive:true});$('.product-stage').addEventListener('touchend',e=>{if(startX!==null){const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>55)moveProduct(dx>0?-1:1);startX=null;}},{passive:true});
$$('[data-region]').forEach(b=>b.addEventListener('pointerenter',()=>{region=b.dataset.region;renderRegion();}));
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const header=$('.site-header');const heroSection=$('.hero');
function syncHeader(){if(!header||!heroSection)return;const heroHeight=heroSection.getBoundingClientRect?.().height??heroSection.offsetHeight??0;header.classList.toggle('lifted',(window.scrollY||0)>Math.max(0,heroHeight-(header.offsetHeight||0)*1.4));}
addEventListener('scroll',syncHeader,{passive:true});addEventListener('resize',syncHeader);syncHeader();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('visible',entry.isIntersecting);}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});$$('.reveal').forEach(el=>observer.observe(el));
const sceneObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('scene-visible');}),{threshold:.12});$$('[data-scene]').forEach(el=>sceneObserver.observe(el));
const galleryPhotos=$$('[data-gallery-photo]');
const clamp=value=>Math.max(0,Math.min(1,value));
const smootherstep=t=>t*t*t*(t*(t*6-15)+10);
export const galleryTimings=[
 {delay:20,offset:0,duration:165,travel:28},
 {delay:65,offset:.02,duration:190,travel:18},
 {delay:125,offset:.04,duration:215,travel:36},
 {delay:40,offset:.01,duration:180,travel:24},
 {delay:155,offset:.05,duration:225,travel:32},
 {delay:90,offset:.03,duration:200,travel:22},
 {delay:190,offset:.06,duration:235,travel:38},
 {delay:110,offset:.035,duration:205,travel:19},
 {delay:220,offset:.07,duration:245,travel:34},
 {delay:55,offset:.015,duration:185,travel:26},
 {delay:175,offset:.055,duration:230,travel:20},
 {delay:140,offset:.045,duration:220,travel:30}
];
export function diagonalMask(progress){
 const edge=200*clamp(progress);
 return edge<=100?`polygon(0% 0%,${edge}% 0%,${edge}% 0%,0% ${edge}%,0% ${edge}%)`:`polygon(0% 0%,100% 0%,100% ${edge-100}%,${edge-100}% 100%,0% 100%)`;
}
export function galleryFrame(top,height,viewportHeight,index=0){
 const lead=Math.min(120,viewportHeight*.16);
 const position=clamp((viewportHeight+lead-top)/(viewportHeight+height));
 const profile=galleryTimings[index%galleryTimings.length];
 const reveal=smootherstep(clamp((position-profile.offset)/.4));
 return {reveal,clarity:.03+.97*reveal,softness:(1-reveal)*1.3,entrance:1-reveal};
}
export const dampMotion=(current,target,elapsed,duration=230)=>target+(current-target)*Math.exp(-Math.min(elapsed,64)/duration);
const motionStates=new Map();let framePending=false,lastFrameTime=0;
function updateScroll(timestamp){
 framePending=false;
 const now=Number.isFinite(timestamp)?timestamp:performance.now();
 const elapsed=lastFrameTime?Math.min(64,now-lastFrameTime):16.67;lastFrameTime=now;
 let settling=false;
 const gallery=$('.story-gallery'),galleryRect=gallery.getBoundingClientRect();
 const galleryTop=galleryRect.top;
 const galleryScale=gallery.offsetWidth?galleryRect.width/gallery.offsetWidth:1;
 const seal=$('.brand-seal');
 if(seal){
  const target=reduce.matches?1:smootherstep(clamp((innerHeight*.92-galleryTop)/(innerHeight*.68)));
  const previous=motionStates.get(seal)?.value??0;
  const progress=reduce.matches||Math.abs(previous-target)<.0005?target:dampMotion(previous,target,elapsed,200);
  motionStates.set(seal,{value:progress});
  seal.style.setProperty('--seal-progress',progress.toFixed(4));
  if(Math.abs(progress-target)>.0005)settling=true;
 }
 for(const [i,photo] of galleryPhotos.entries()){
  if(reduce.matches){photo.removeAttribute('style');motionStates.delete(photo);continue;}
  const r=photo.getBoundingClientRect();
  const height=photo.offsetHeight?photo.offsetHeight*galleryScale:r.height;
  const top=Number.isFinite(photo.offsetTop)?galleryTop+photo.offsetTop*galleryScale:r.top;
  if(top+height< -180||top>innerHeight+180)continue;
  const profile=galleryTimings[i];
  const target=galleryFrame(top,height,innerHeight,i).reveal;
  const state=motionStates.get(photo)??{value:0,readyAt:0,armed:false};
  if(target>.012&&!state.armed){state.armed=true;state.readyAt=now+profile.delay;}
  if(target<.001){state.armed=false;state.readyAt=0;}
  let current=state.value;
  if(now>=state.readyAt)current=dampMotion(current,target,elapsed,profile.duration);
  if(Math.abs(current-target)<.0005)current=target;else settling=true;
  state.value=current;motionStates.set(photo,state);
  const distance=innerWidth<650?profile.travel*.5:profile.travel;
  photo.style.setProperty('--clarity',(.03+.97*current).toFixed(4));
  photo.style.setProperty('--softness',`${((1-current)*1.3).toFixed(3)}px`);
  photo.style.setProperty('--diagonal-mask',diagonalMask(current));
  photo.style.setProperty('--drift-x',`${(-distance*(1-current)).toFixed(3)}px`);
  photo.style.setProperty('--drift-y',`${(-distance*(1-current)).toFixed(3)}px`);
  photo.style.setProperty('--frame-scale',(.965+.035*current).toFixed(4));
  photo.style.setProperty('--tilt',`${(-1.1*(1-current)).toFixed(3)}deg`);
  photo.style.setProperty('--glint',`${(-50+100*current).toFixed(3)}%`);
  photo.style.setProperty('--glint-opacity',(Math.sin(Math.PI*current)*.22).toFixed(4));
 }
 if(settling&&!document.hidden)scheduleScroll();else lastFrameTime=0;
}
function scheduleScroll(){if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}}
addEventListener('scroll',scheduleScroll,{passive:true});addEventListener('resize',scheduleScroll);reduce.addEventListener('change',()=>{motionStates.clear();scheduleScroll();});
document.addEventListener('visibilitychange',()=>{lastFrameTime=0;if(!document.hidden)scheduleScroll();});
scheduleScroll();
const intro=$('#intro');let entered=false,introTimer=0;function enter(){if(entered)return;entered=true;clearTimeout(introTimer);intro.classList.add('dismissed');intro.setAttribute('aria-hidden','true');intro.inert=true;try{sessionStorage.setItem('hanjungsun-entered','yes');}catch{}}
intro.addEventListener('click',enter);document.addEventListener('keydown',e=>{if(!entered&&['Escape','Enter',' '].includes(e.key))enter();});
try{const requested=new URLSearchParams(location.search).get('lang');if(['vi','ko','en'].includes(requested))lang=requested;if(sessionStorage.getItem('hanjungsun-entered')||location.hash||reduce.matches)enter();const saved=localStorage.getItem('hanjungsun-language');if(!requested&&['vi','ko','en'].includes(saved))lang=saved;}catch{}
if(!entered&&!reduce.matches)for(let i=0;i<(innerWidth<650?54:84);i++){
 const particle=document.createElement('i');
 const grain=i%9===0?5+Math.random()*1.5:1.7+Math.random()*2.7;
 particle.style.cssText=`left:${Math.random()*100}%;--grain:${grain.toFixed(2)}px;--sway:${(-38+Math.random()*100).toFixed(1)}px;animation-duration:${11+Math.random()*12}s;animation-delay:${-Math.random()*23}s`;
 $('.powder').append(particle);
}
if(!entered)introTimer=setTimeout(enter,1800);
setLanguage(lang);
installContact({copy,getLang:()=>lang});
fetch('assets/maps.json').then(r=>{if(!r.ok)throw Error('Map asset unavailable');return r.json();}).then(m=>{$('#vietnam-outline')?.setAttribute('d',m.vietnam);$('#world-outline')?.setAttribute('d',m.world);}).catch(e=>console.error(e));

const pageScroll=installSmoothScroll();
installOverlayScrollbar(pageScroll.stop);
