import {installSmoothScroll} from './smooth-scroll.js';
import {journals} from './journal-data.js';
const $=s=>document.querySelector(s);
const params=new URLSearchParams(location.search);
const selected=journals.findIndex(j=>j.slug===params.get('story'));
const index=selected<0?0:selected;
let lang=params.get('lang');
if(!['vi','ko','en'].includes(lang)){try{lang=localStorage.getItem('hanjungsun-language');}catch{}if(!['vi','ko','en'].includes(lang))lang='vi';}
const labels={
vi:{back:'← Nhật ký',category:'Nhật ký',skip:'Đi tới nội dung',list:'Tất cả bài viết',next:'Đọc tiếp',brand:'Bài viết biên tập về triết lý thương hiệu HANJUNGSUN.',image:'Hình ảnh minh họa cho bài viết'},
ko:{back:'← 저널로 돌아가기',category:'저널',skip:'본문으로 이동',list:'저널 전체 보기',next:'다음 이야기',brand:'한정선의 브랜드 철학을 다룬 에디토리얼입니다.',image:'이야기를 위한 이미지'},
en:{back:'← Back to journal',category:'Journal',skip:'Skip to content',list:'All stories',next:'Next story',brand:'An editorial about the brand philosophy of HANJUNGSUN.',image:'Image accompanying this story'}
};
export function renderJournal(){
 const entry=journals[index],article=entry[lang],l=labels[lang];
 document.documentElement.lang=lang;document.title=`${article.title} — HANJUNGSUN`;
 $('meta[name="description"]').content=article.summary;$('meta[property="og:title"]').content=document.title;$('meta[property="og:description"]').content=article.summary;
 $('#skip-content').textContent=l.skip;$('#journal-back').textContent=l.back;$('#journal-back').href=`index.html?lang=${lang}#news`;
 $('#journal-category').textContent=l.category;$('#journal-title').textContent=article.title;$('#journal-summary').textContent=article.summary;
 $('#journal-hero').src=`assets/${entry.image}.webp`;$('#journal-hero').alt=article.title;
 $('#journal-secondary').src=`assets/${entry.secondary}.webp`;$('#journal-secondary').alt=`${article.title} — ${l.image}`;
 $('#journal-body').replaceChildren(...article.paragraphs.map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));

 $('#journal-list').textContent=l.list;$('#journal-list').href=`index.html?lang=${lang}#news`;
 const next=journals[(index+1)%journals.length];$('#journal-next').textContent=`${l.next}: ${next[lang].title} →`;$('#journal-next').href=`journal.html?story=${next.slug}&lang=${lang}`;
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-lang]');if(!b)return;lang=b.dataset.lang;try{localStorage.setItem('hanjungsun-language',lang);}catch{}const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);renderJournal();});
renderJournal();

installSmoothScroll();
