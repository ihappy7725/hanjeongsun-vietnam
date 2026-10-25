import {readFile,writeFile,unlink} from 'node:fs/promises';
const source=await readFile(new URL('./check-collection-browser.mjs',import.meta.url),'utf8');
const start=source.indexOf(' for(const width of [1440,768,390]){'),end=source.indexOf('\n}finally{',start);
const body=String.raw`
 async function shot(name,selector,width){
  await evaluate("document.querySelector('"+selector+"').scrollIntoView({behavior:'instant',block:'start'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
  await delay(100);
  const box=await evaluate("(()=>{const r=document.querySelector('"+selector+"').getBoundingClientRect();return {x:0,y:scrollY+r.top,width:innerWidth,height:Math.ceil(r.height),scale:1}})()");
  const {data}=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:box});await writeFile(join(artifacts,name+'-'+width+'.png'),Buffer.from(data,'base64'));
 }
 for(const width of [1440,768,390,320]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});
  for(const lang of ['ko','vi','en']){
   await page.send('Page.navigate',{url:'http://127.0.0.1:4173/?lang='+lang});
   await until("document.documentElement?.lang==='"+lang+"'&&document.querySelectorAll('.product-choice').length===4");
   await evaluate('document.fonts.ready.then(()=>true)');
   await evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')");
   await until("[...document.querySelectorAll('#brand img,#contact img')].every(i=>i.complete&&i.naturalWidth>0)");
   const metrics=await evaluate("(()=>{const b=document.querySelector('.wordmark'),s=b.querySelector('span').getBoundingClientRect(),e=b.querySelector('small').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,ratio:e.width/s.width,scrollbar:getComputedStyle(document.querySelector('.news-track')).scrollbarWidth,body:parseFloat(getComputedStyle(document.querySelector('.gift-details>p')).fontSize),brand:parseFloat(getComputedStyle(document.querySelector('.brand-story-copy>p')).fontSize),seal:getComputedStyle(document.querySelector('.brand-seal')).backgroundImage,white:getComputedStyle(document.querySelector('.brand-seal>span')).color}})()");
   assert.equal(metrics.overflow,false);assert.ok(metrics.ratio>=.75&&metrics.ratio<=1.3,'English wordmark has comparable width');assert.equal(metrics.scrollbar,'none');assert.ok(metrics.body>=14&&metrics.brand>=14);assert.ok(metrics.seal.includes('linear-gradient'));assert.equal(metrics.white,'rgb(255, 253, 244)');checks+=6;
   await evaluate("document.querySelector('.faq-content summary').click()");assert.equal(await evaluate("document.querySelector('.faq-content details').open"),true);checks++;
   if(lang==='ko'&&width!==320){await shot('brand-story','#brand',width);await shot('contact-faq','#contact',width);}
   for(const kind of ['bulk','partner']){
    await evaluate("document.querySelector('[data-contact="+kind+"]').click()");
    assert.equal(await evaluate("document.querySelector('#contact-panel-"+kind+"').hidden"),false);checks++;
    assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);checks++;
    const font=await evaluate("parseFloat(getComputedStyle(document.querySelector('#"+kind+"-form input')).fontSize)");assert.ok(font>=16);checks++;
    await evaluate("document.querySelector('#"+kind+"-form').requestSubmit()");assert.equal(await evaluate("document.querySelector('#"+kind+"-form .inquiry-draft').hidden"),true);checks++;
    await evaluate("(()=>{const f=document.querySelector('#"+kind+"-form');for(const field of f.elements){if(!field.name||field.name==='consent')continue;if(field.tagName==='SELECT')field.selectedIndex=1;else if(field.type==='email')field.value='qa@example.com';else if(field.type==='number')field.value='50';else if(field.type==='date')field.value='2026-11-15';else if(field.type==='time')field.value='14:30';else field.value=field.name==='message'?'Vietnam & Korea <safe text>':'QA Test';}f.requestSubmit()})()");
    assert.equal(await evaluate("document.querySelector('#"+kind+"-form .inquiry-draft').hidden"),true,'Consent is required');checks++;
    await evaluate("(()=>{const f=document.querySelector('#"+kind+"-form');f.elements.consent.checked=true;f.requestSubmit()})()");
    const draft=await evaluate("(()=>{const d=document.querySelector('#"+kind+"-form .inquiry-draft');return {hidden:d.hidden,href:d.querySelector('.draft-mail').href,text:d.querySelector('.draft-text').value}})()");
    assert.equal(draft.hidden,false);assert.ok(draft.href.startsWith('mailto:admin2@hanjungsun.co.kr?subject='));assert.ok(decodeURIComponent(draft.href).includes('qa@example.com'));assert.ok(draft.text.includes('Vietnam & Korea <safe text>'));checks+=4;
    // No draft link is activated: QA never sends email or submits to an external server.
    await evaluate("document.querySelector('#"+kind+"-form .inquiry-draft').hidden=true");
    if(lang==='ko'&&width!==320)await shot('contact-'+kind,'#contact',width);
    await evaluate("(()=>{const f=document.querySelector('#"+kind+"-form');f.elements.message.value='Revised inquiry';f.elements.message.dispatchEvent(new Event('input',{bubbles:true}))})()");assert.equal(await evaluate("document.querySelector('#"+kind+"-form .inquiry-draft').hidden"),true);checks++;
   }
   await evaluate("(()=>{const b=document.querySelector('[data-contact=faq]');b.focus();b.dispatchEvent(new KeyboardEvent('keydown',{key:'End',bubbles:true}))})()");assert.equal(await evaluate("document.querySelector('[data-contact=partner]').getAttribute('aria-selected')"),'true');checks++;
  }
 }
 await page.send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await page.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await page.send('Page.navigate',{url:'http://127.0.0.1:4173/?lang=ko'});await until("document.querySelector('.brand-seal')&&document.querySelectorAll('.product-choice').length===4");
 await evaluate("document.querySelector('#intro').click();document.querySelectorAll('.collage-photo img').forEach(i=>i.loading='eager')");
 await evaluate("(()=>{const g=document.querySelector('.story-gallery');scrollTo({top:scrollY+g.getBoundingClientRect().top-innerHeight*.95,behavior:'instant'})})()");await delay(600);
 const faint=await evaluate("parseFloat(getComputedStyle(document.querySelector('.brand-seal')).opacity)");
 await evaluate("scrollBy({top:innerHeight*.9,behavior:'instant'})");await delay(900);
 const solid=await evaluate("parseFloat(getComputedStyle(document.querySelector('.brand-seal')).opacity)");assert.ok(faint<.2&&solid>.85,'Jade seal reveals gradually with scroll');checks++;
 const {data}=await page.send('Page.captureScreenshot',{format:'png'});await writeFile(join(artifacts,'jade-seal-scroll-1440.png'),Buffer.from(data,'base64'));
 console.log('Passed '+checks+' Chrome brand/contact checks across four widths and three languages. No email sent.');
`;
const temp=new URL('./.brand-contact-browser-run.mjs',import.meta.url);await writeFile(temp,source.slice(0,start)+body+source.slice(end));
try{await import(temp.href+'?v='+Date.now());}finally{await unlink(temp);}
