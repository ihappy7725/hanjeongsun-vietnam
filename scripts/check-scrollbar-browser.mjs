// Exercise the actual overlay with keyboard and pointer input, on home and journal.
import {readFile,writeFile,unlink} from 'node:fs/promises';
const source=await readFile(new URL('./check-collection-browser.mjs',import.meta.url),'utf8');
const start=source.indexOf(' for(const width of [1440,768,390]){');
const end=source.indexOf('\n}finally{',start);
const body=String.raw`
 for(const width of [1440,390]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const route of ['?lang=ko','journal.html?lang=ko']){
   await page.send('Page.navigate',{url:'http://127.0.0.1:4173/'+route});
   await until("document.querySelector('.page-scrollbar-thumb')&&document.documentElement.lang==='ko'");
   await evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager');document.fonts.ready.then(()=>true)");
   await delay(300);
   const design=await evaluate("(()=>{const r=document.querySelector('.page-scrollbar'),t=r.firstElementChild,s=getComputedStyle(r),p=getComputedStyle(t,'::before');return {native:getComputedStyle(document.documentElement).scrollbarWidth,background:s.backgroundColor,parts:r.children.length,thumb:t.getAttribute('role'),color:p.backgroundImage,width:innerWidth-document.documentElement.clientWidth,overflow:document.documentElement.scrollWidth>innerWidth}})()");
   assert.equal(design.native,'none');assert.equal(design.background,'rgba(0, 0, 0, 0)');assert.equal(design.parts,1);assert.equal(design.thumb,'scrollbar');assert.ok(design.color.includes('linear-gradient'));assert.equal(design.width,0);assert.equal(design.overflow,false);checks+=7;
   await evaluate("document.querySelector('.page-scrollbar-thumb').focus({preventScroll:true})");
   await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'End',code:'End'});
   await page.send('Input.dispatchKeyEvent',{type:'keyUp',key:'End',code:'End'});
   await until("document.querySelector('.page-scrollbar-thumb').getAttribute('aria-valuenow')==='100'");
   assert.ok(await evaluate('Math.abs(scrollY-(document.documentElement.scrollHeight-innerHeight))<2'));checks++;
   await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home'});
   await page.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Home',code:'Home'});
   await until('scrollY===0');checks++;
   const thumb=await evaluate("(()=>{const r=document.querySelector('.page-scrollbar-thumb').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
   await page.send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...thumb});
   await page.send('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,x:thumb.x,y:thumb.y+150});
   await page.send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,x:thumb.x,y:thumb.y+150});
   assert.ok(await evaluate('scrollY>100'),'Dragging the thumb scrolls the document');checks++;
   assert.equal(await evaluate("document.querySelector('.page-scrollbar').classList.contains('dragging')"),false);checks++;
   await evaluate("document.activeElement?.blur();new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
   const {data}=await page.send('Page.captureScreenshot',{format:'png'});
   await writeFile(join(artifacts,'scrollbar-'+(route.startsWith('?')?'home':'journal')+'-'+width+'.png'),Buffer.from(data,'base64'));
  }
 }
 console.log('Passed '+checks+' overlay scrollbar checks: transparent track, no gutter, keyboard, drag, home/journal and desktop/mobile.');
`;
const temp=new URL('./.scrollbar-browser-run.mjs',import.meta.url);
await writeFile(temp,source.slice(0,start)+body+source.slice(end));
try{await import(temp.href+'?v='+Date.now());}finally{await unlink(temp);}
