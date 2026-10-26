// Compare rendered sizes with the density stylesheet off/on, including the unchanged header.
import {readFile,writeFile,unlink} from 'node:fs/promises';
const source=await readFile(new URL('./check-collection-browser.mjs',import.meta.url),'utf8');
const start=source.indexOf(' for(const width of [1440,768,390]){'),end=source.indexOf('\n}finally{',start);
const body=String.raw`
 const measure="(()=>{const rect=s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {width:r.width,height:r.height,x:r.x,font:getComputedStyle(e).fontSize}};return {header:rect('.site-header'),logo:rect('.site-header .wordmark'),mainZoom:getComputedStyle(document.querySelector('main')).zoom,photo:rect('.hero-photo>img'),frame:rect('.hero-photo'),gallery:rect('.photo-1'),product:rect('#product-image'),gift:rect('.gift-stage'),brand:rect('.brand-content'),contact:rect('.contact-panel')}})()";
 for(const width of [1440,768,390,320]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const lang of ['ko','vi','en']){
   await page.send('Page.navigate',{url:'http://127.0.0.1:4173/?lang='+lang});
   await until("document.documentElement.lang==='"+lang+"'&&document.querySelectorAll('.product-choice').length===4");
   await evaluate("document.fonts.ready.then(()=>true)");
   await evaluate("document.querySelector('link[href=\"content-scale.css\"]').disabled=true;scrollTo({top:0,behavior:'instant'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
   const before=await evaluate(measure);
   await evaluate("document.querySelector('link[href=\"content-scale.css\"]').disabled=false;new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
   const after=await evaluate(measure);
   for(const key of ['width','height','x','font']){assert.equal(after.header[key],before.header[key],'Header unchanged '+key);assert.equal(after.logo[key],before.logo[key],'Header logo unchanged '+key);checks+=2;}
   assert.equal(after.mainZoom,'0.85');checks++;
   for(const name of ['gallery','product','gift','brand','contact']){const ratio=after[name].width/before[name].width;assert.ok(ratio>=.80&&ratio<=.86,name+' shrinks to 80–85% at '+width+' / '+lang+': '+ratio);checks++;}
   assert.ok(Math.abs(after.photo.width/before.photo.width-.85)<.01);assert.ok(Math.abs(after.photo.height/before.photo.height-.85)<.01);checks+=2;
   assert.ok(Math.abs(after.frame.height-before.frame.height)<2,'Hero background keeps its screen height');checks++;
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'No horizontal overflow');checks++;
   if(lang==='ko'&&width!==320){
    await evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')");
    await until("[...document.querySelectorAll('main img')].every(i=>i.complete&&i.naturalWidth>0)");
    for(const [name,selector] of [['home','#home'],['gifting','#gifting'],['brand','#brand'],['collection','#collection']]){
     await evaluate("document.querySelector('"+selector+"').scrollIntoView({behavior:'instant',block:'start'})");
     await delay(1500);
     const {data}=await page.send('Page.captureScreenshot',{format:'png'});
     await writeFile(join(artifacts,'scaled-'+name+'-'+width+'.png'),Buffer.from(data,'base64'));
    }
   }
  }
  await page.send('Page.navigate',{url:'http://127.0.0.1:4173/journal.html?lang=ko'});
  await until("document.documentElement.lang==='ko'&&document.querySelector('#journal-title').textContent.length>0");
  await evaluate('document.fonts.ready.then(()=>true)');
  const journalMeasure="(()=>Object.fromEntries(['.site-header','.article-hero','.article-body','.article-secondary'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return [s,{width:r.width,height:r.height}]})))()";
  await evaluate("document.querySelector('link[href=\"content-scale.css\"]').disabled=true;new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
  const journalBefore=await evaluate(journalMeasure);
  await evaluate("document.querySelector('link[href=\"content-scale.css\"]').disabled=false;new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
  await until("getComputedStyle(document.querySelector('main')).zoom==='0.85'");
  const journalAfter=await evaluate(journalMeasure);
  assert.deepEqual(journalAfter['.site-header'],journalBefore['.site-header']);checks++;
  for(const selector of ['.article-hero','.article-body','.article-secondary']){const ratio=journalAfter[selector].width/journalBefore[selector].width;assert.ok(ratio>=.80&&ratio<=.86,'Journal content scales consistently: '+selector+' '+width+' '+ratio);checks++;}
 }
 console.log('Passed '+checks+' content scale checks: 85% rendered content, unchanged header/logo, full hero background, three languages, four widths.');
`;
const temp=new URL('./.content-scale-browser-run.mjs',import.meta.url);
await writeFile(temp,source.slice(0,start)+body+source.slice(end));
try{await import(temp.href+'?v='+Date.now());}finally{await unlink(temp);}
