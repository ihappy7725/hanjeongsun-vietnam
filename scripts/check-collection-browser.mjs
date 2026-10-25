// Headless Chrome QA against the local preview, with a disposable isolated profile.
import {spawn} from 'node:child_process';
import {mkdir,mkdtemp,writeFile,rm} from 'node:fs/promises';
import {resolve,join,sep} from 'node:path';
import {createServer} from 'node:net';
import assert from 'node:assert/strict';
const root=resolve('.'),artifacts=join(root,'artifacts');
await mkdir(artifacts,{recursive:true});
const profile=await mkdtemp(join(artifacts,'collection-chrome-'));
assert.ok(profile.startsWith(root+sep));
const reserve=createServer();await new Promise(r=>reserve.listen(0,'127.0.0.1',r));const port=reserve.address().port;await new Promise(r=>reserve.close(r));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let browser,page,checks=0;
async function cdp(url){
 const socket=new WebSocket(url),pending=new Map();let id=0;
 await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
 socket.onmessage=e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}};
 return {send(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});socket.send(JSON.stringify({id:key,method,params}));});},close(){socket.close();}};
}
async function evaluate(expression){const r=await page.send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function until(expression){for(let i=0;i<100;i++){if(await evaluate(expression))return;await delay(80);}throw Error('Timed out: '+expression);}
try{
 let version;for(let i=0;i<100;i++){try{version=await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break;}catch{await delay(80);}}
 assert.ok(version,'Headless browser started');browser=await cdp(version.webSocketDebuggerUrl);
 const {targetId}=await browser.send('Target.createTarget',{url:'about:blank'});
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();page=await cdp(targets.find(t=>t.id===targetId).webSocketDebuggerUrl);
 await page.send('Page.enable');await page.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 for(const width of [1440,768,390]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});
  for(const lang of ['vi','ko','en']){
   await page.send('Page.navigate',{url:`http://127.0.0.1:4173/?lang=${lang}`});
   await until(`document.documentElement?.lang==='${lang}'&&document.querySelectorAll('.product-choice').length===4`);
   await evaluate('document.fonts.ready.then(()=>true)');
   for(const category of ['vietnam','original']){
    await evaluate(`document.querySelector('[data-category="${category}"]').click()`);
    await until(`document.querySelector('#product-image').complete&&document.querySelector('#product-image').naturalWidth>0&&document.querySelector('#product-image').src.includes('${category==='vietnam'?'mangosteen-yogurt-pair-v2':'strawberry-pair-v3'}')`);
    await evaluate(`document.querySelector('#collection').scrollIntoView({behavior:'instant',block:'start'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
    const metrics=await evaluate(`(()=>{const c=document.querySelector('#collection'),p=document.querySelector('#product-image'),s=document.querySelector('.product-dots'),r=p.getBoundingClientRect();return {count:s.children.length,width:innerWidth,pageWidth:document.documentElement.scrollWidth,left:r.left,right:r.right,imageRatio:r.width/r.height,fit:getComputedStyle(p).objectFit,columns:getComputedStyle(s).gridTemplateColumns,display:getComputedStyle(s).display,overflow:s.scrollWidth>s.clientWidth,rows:new Set([...s.children].map(b=>Math.round(b.getBoundingClientRect().top))).size,sectionHeight:c.getBoundingClientRect().height,sectionY:scrollY+c.getBoundingClientRect().top}})()`);
    assert.equal(metrics.count,category==='vietnam'?4:6);checks++;
    assert.ok(metrics.left>=-1&&metrics.right<=width+1,`Product frame fits ${width}px`);checks++;
    assert.ok(Math.abs(metrics.imageRatio-1.5)<.01,'Full 3:2 product frame');checks++;
    assert.equal(metrics.fit,'contain');checks++;
    assert.ok(metrics.pageWidth<=width,'No horizontal page overflow');checks++;
    if(width===390){assert.equal(metrics.display,'flex');assert.equal(metrics.overflow,true);}else{assert.equal(metrics.display,'grid');assert.equal(metrics.columns.split(' ').length,category==='vietnam'?4:6);}checks+=2;
    assert.equal(metrics.rows,1,'All product choices occupy one horizontal row');checks++;
    if(lang==='ko'){
     const {data}=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:metrics.sectionY,width,height:Math.ceil(metrics.sectionHeight),scale:1}});
     await writeFile(join(artifacts,`collection-${category}-${width}.png`),Buffer.from(data,'base64'));
    }
   }
  }
 }
 console.log(`Passed ${checks} Chrome collection layout checks across 1440 / 768 / 390px, three languages and both collections. Six section screenshots saved in artifacts/.`);
}finally{
 page?.close();if(browser){await browser.send('Browser.close').catch(()=>{});browser.close();}else chrome.kill();
 await delay(1000);
 // The directory was created above within this workspace; never remove a user profile.
 if(profile.startsWith(artifacts+sep))await rm(profile,{recursive:true,force:true,maxRetries:30,retryDelay:400});
}
