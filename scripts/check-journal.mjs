import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {journals} from '../journal-data.js';
const html=await readFile('journal.html','utf8');
let count=0;
for(const entry of journals){
 const {window}=parseHTML(html);const {document}=window;
 window.matchMedia=()=>({matches:false,addEventListener(){}});
 const url=new URL(`http://localhost/journal.html?story=${entry.slug}&lang=ko`);
 Object.assign(globalThis,{window,document,location:url,localStorage:{getItem(){return null;},setItem(){}},history:{replaceState(){}}});
 await import(`../journal.js?test=${entry.slug}`);
 assert.equal(document.querySelector('#journal-title').textContent,entry.ko.title);count++;
 for(const lang of ['vi','en','ko']){
  document.querySelector(`[data-lang="${lang}"]`).click();
  assert.equal(document.documentElement.lang,lang);count++;
  assert.equal(document.querySelector('#journal-title').textContent,entry[lang].title);count++;
  assert.equal(document.querySelectorAll('#journal-body p').length,entry[lang].paragraphs.length);count++;
  assert.equal(document.querySelector('#journal-body p').textContent,entry[lang].paragraphs[0]);count++;
  assert.ok(document.querySelector('#journal-next').getAttribute('href').includes(`lang=${lang}`));count++;
  assert.ok(document.querySelector('#journal-back').getAttribute('href').includes(`lang=${lang}`));count++;
 }
 for(const img of document.querySelectorAll('img'))await access(img.getAttribute('src'));
 assert.ok(!document.querySelector('#journal-disclosure'));count++;
 for(const lang of ['vi','ko','en']){assert.ok(!/프로젝트|가상 설정|시연|dự án|Vietnam project|project imagines/i.test(entry[lang].paragraphs.join(' ')));count++;}
}
console.log(`Passed ${count} full-page journal rendering and language checks.`);
