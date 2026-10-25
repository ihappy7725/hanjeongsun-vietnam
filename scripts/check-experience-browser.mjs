// Local visual QA; reuse the isolated Chrome setup and cleanup of collection QA.
import {readFile,writeFile} from 'node:fs/promises';
const source=await readFile(new URL('./check-collection-browser.mjs',import.meta.url),'utf8');
const start=source.indexOf(' for(const width of [1440,768,390]){');
const end=source.indexOf('\n}finally{',start);
const body=String.raw`
 for(const width of [1440,768,390,320]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const lang of ['ko','vi','en']){
   await page.send('Page.navigate',{url:'http://127.0.0.1:4173/?lang='+lang});
   await until("document.documentElement?.lang==='"+lang+"'&&document.querySelectorAll('.product-choice').length===4");
   await evaluate('document.fonts.ready.then(()=>true)');
   const tabs=await evaluate("[...document.querySelectorAll('.collection-tabs button')].map(b=>{const r=b.getBoundingClientRect(),l=b.querySelector('.collection-tab-label'),t=l.getBoundingClientRect();return {left:t.left-r.left,right:r.right-t.right,overflow:l.scrollWidth>l.clientWidth+1}})");
   for(const tab of tabs){assert.ok(tab.left>=8&&tab.right>=8&&!tab.overflow,'Tab label fits '+width+' / '+lang);checks++;}
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'No page overflow');checks++;
   if(lang!=='ko'||width===320)continue;
   await until("document.querySelector('.hero-photo>img').complete&&document.querySelector('.hero-photo>img').naturalWidth>0");
   const hero=await evaluate("(()=>{const i=document.querySelector('.hero-photo>img'),f=document.querySelector('.hero-photo').getBoundingClientRect();return {src:i.getAttribute('src'),full:f.height,screen:innerHeight,fit:getComputedStyle(i).objectFit,horizontalFraction:Math.min(1,f.width/(Math.max(f.width/i.naturalWidth,f.height/i.naturalHeight)*i.naturalWidth))}})()");
   assert.equal(hero.src,'assets/vietnam-four-hero-v3.webp');assert.ok(hero.horizontalFraction>.97,'All four hero cake columns stay in frame');checks+=2;
   assert.ok(hero.full>=hero.screen*.94,'Hero photograph fills the first screen');checks++;
   if(width<=1000)assert.equal(hero.fit,'contain');checks++;
   await evaluate("document.querySelector('#home').scrollIntoView({behavior:'instant',block:'start'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
   const homeBox=await evaluate("(()=>{const r=document.querySelector('#home').getBoundingClientRect();return {x:0,y:scrollY+r.top,width:innerWidth,height:Math.ceil(r.height),scale:1}})()");
   const homeShot=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:homeBox});await writeFile(join(artifacts,'confirmed-home-'+width+'.png'),Buffer.from(homeShot.data,'base64'));
   await evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')");
   await until("[...document.querySelectorAll('.collage-photo img,.gifting img')].every(i=>i.complete&&i.naturalWidth>0)");
   const frames=await evaluate("[...document.querySelectorAll('.collage-photo')].map(f=>{const r=f.getBoundingClientRect(),i=f.querySelector('img').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,imgWidth:i.width,clip:getComputedStyle(f).overflow,opacity:getComputedStyle(f).opacity}})");
   for(let i=0;i<frames.length;i++){
    const a=frames[i];assert.ok(a.x>=-1&&a.x+a.w<=width+1,'Gallery frame in viewport');assert.equal(a.opacity,'1');checks+=2;
    for(let j=i+1;j<frames.length;j++){const b=frames[j];assert.ok(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)<=0||Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)<=0,'Separate gallery frames '+(i+1)+' / '+(j+1));checks++;}
   }
   for(const i of [1,9,10]){assert.ok(frames[i].imgWidth>frames[i].w,'Source page edge is clipped');assert.equal(frames[i].clip,'hidden');checks+=2;}
   const gift=await evaluate("[...document.querySelectorAll('.gifting img')].map(i=>({width:i.naturalWidth,fit:getComputedStyle(i).objectFit,ratio:i.clientWidth/i.clientHeight}))");
   for(const i of gift){assert.equal(i.width,1536);assert.equal(i.fit,'contain');assert.ok(Math.abs(i.ratio-1.5)<.02);checks+=3;}
   const removed=await evaluate("({vision:!!document.querySelector('#vision'),world:!!document.querySelector('.world-map'),skip:!!document.querySelector('.intro-skip')})");
   assert.equal(removed.vision,false);assert.equal(removed.world,false);assert.equal(removed.skip,false);checks+=3;
   for(const [name,selector] of [['gallery','.story-gallery'],['gifting','#gifting'],['brand','#brand']]){
    await evaluate("document.querySelector('"+selector+"').scrollIntoView({behavior:'instant',block:'start'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
    const box=await evaluate("(()=>{const r=document.querySelector('"+selector+"').getBoundingClientRect();return {x:0,y:scrollY+r.top,width:innerWidth,height:Math.ceil(r.height),scale:1}})()");
    const {data}=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:box});
    await writeFile(join(artifacts,'experience-'+name+'-'+width+'.png'),Buffer.from(data,'base64'));
   }
   for(const [name,selector] of [['gallery-middle','.photo-5'],['gallery-bottom','.photo-10'],['gifting-second','.gift-second']]){
    await evaluate("document.querySelector('"+selector+"').scrollIntoView({behavior:'instant',block:'center'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
    await delay(100);
    const {data}=await page.send('Page.captureScreenshot',{format:'png'});
    await writeFile(join(artifacts,'experience-'+name+'-'+width+'.png'),Buffer.from(data,'base64'));
   }
  }
 }
 await page.send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await page.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await evaluate('sessionStorage.clear()');
 await page.send('Page.navigate',{url:'http://127.0.0.1:4173/?lang=ko'});
 await until("document.querySelectorAll('.powder i').length===84");
 await evaluate('document.fonts.ready.then(()=>true)');
 await delay(600);
 const powder=await evaluate("[...document.querySelectorAll('.powder i')].filter(i=>parseFloat(getComputedStyle(i).opacity)>.5).length");
 assert.ok(powder>=40,'Visible white flour particles');checks++;
 const {data}=await page.send('Page.captureScreenshot',{format:'png'});await writeFile(join(artifacts,'experience-intro-1440.png'),Buffer.from(data,'base64'));
 await evaluate("document.querySelector('#intro').click();document.querySelectorAll('.collage-photo img').forEach(i=>i.loading='eager')");
 await until("[...document.querySelectorAll('.collage-photo img')].every(i=>i.complete&&i.naturalWidth>0)");
 for(const index of [1,3,9]){
  await evaluate("(()=>{const p=document.querySelector('.photo-"+index+"');const top=scrollY+p.getBoundingClientRect().top;scrollTo({top:top-800,behavior:'instant'})})()");
  await delay(450);
  const clarity=await evaluate("parseFloat(getComputedStyle(document.querySelector('.photo-"+index+"')).opacity)");
  assert.ok(clarity>(index===1?.4:.15),'Photo '+index+' is visible promptly while still in the lower viewport');checks++;
 }
 const galleryShot=await page.send('Page.captureScreenshot',{format:'png'});await writeFile(join(artifacts,'confirmed-gallery-motion-1440.png'),Buffer.from(galleryShot.data,'base64'));
 console.log('Passed '+checks+' Chrome experience checks; gallery, gift, brand and intro screenshots saved in artifacts/.');
`;
// Store the generated script beside its reusable source, so relative imports and cwd are unchanged.
const temp=new URL('./.experience-browser-run.mjs',import.meta.url);
await writeFile(temp,source.slice(0,start)+body+source.slice(end));
try{await import(temp.href+'?v='+Date.now());}finally{const {unlink}=await import('node:fs/promises');await unlink(temp);}
