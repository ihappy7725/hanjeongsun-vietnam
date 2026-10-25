import {readFile,writeFile} from 'node:fs/promises';
let html=await readFile('index.html','utf8');
const option=(value,key)=>`<option value="${value}" data-t="${key}"></option>`;
const select=(form,name,key,options)=>`<label class="contact-field"><span data-t="${key}"></span><select name="${name}" required>${option('','choose')}${options.map(([v,k])=>option(v,k)).join('')}</select></label>`;
const input=(name,key,type='text',extra='')=>`<label class="contact-field"><span data-t="${key}"></span><input name="${name}" type="${type}" required ${extra}></label>`;
const form=(kind)=>`<form id="${kind}-form" class="inquiry-form" data-inquiry="${kind}">
 <p class="required-note" data-t="contactRequired"></p><div class="form-grid">
 ${select(kind,'type','fieldType',kind==='bulk'?[['company','groupCompany'],['personal','groupPersonal']]:[['retail','partnerRetail'],['brand','partnerBrand'],['global','partnerGlobal'],['other','other']])}
 ${input('name','fieldName','text','autocomplete="name" maxlength="120"')}
 ${input('phone','fieldPhone','tel','autocomplete="tel" maxlength="60"')}
 ${input('email','fieldEmail','email','autocomplete="email" maxlength="160"')}
 ${kind==='bulk'?`${input('quantity','fieldQuantity','number','min="1" max="100000" inputmode="numeric"')}${select(kind,'product','fieldProduct',[['vietnam','productVietnam'],['korea','productKorea'],['gift','productGift']])}${select(kind,'cooling','fieldCooling',[['consult','coolingYes'],['no','coolingNo']])}${select(kind,'pickup','fieldPickup',[['self','pickupSelf'],['consult','pickupConsult']])}${input('store','fieldStore','text','maxlength="120"')}${select(kind,'payment','fieldPayment',[['consult','paymentConsult'],['card','paymentCard'],['transfer','paymentTransfer']])}${input('date','fieldDate','date')}${input('time','fieldTime','time')}`:''}
 <label class="contact-field full"><span data-t="fieldMessage"></span><textarea name="message" rows="4" required maxlength="3000"></textarea></label>
 </div><div class="consent-row"><input id="${kind}-consent" type="checkbox" name="consent" required><label for="${kind}-consent" data-t="contactConsent"></label></div>
 <div class="contact-actions"><button class="filled-link" type="submit" data-t="contactSend"></button><a href="https://hanjungsun.co.kr/${kind==='bulk'?'30':'50'}" target="_blank" rel="noopener" data-t="${kind==='bulk'?'contactOfficialBulk':'contactOfficialPartner'}"></a></div>
 <p class="mail-note" data-t="contactMailNote"></p><a class="privacy-link" href="https://hanjungsun.co.kr/?mode=privacy" target="_blank" rel="noopener" data-t="contactPrivacy"></a>
 <div class="inquiry-draft" hidden><p role="status" data-t="contactReady"></p><label><span data-t="contactDraftTitle"></span><textarea class="draft-text" readonly rows="7"></textarea></label><div class="contact-actions"><a class="filled-link draft-mail" data-t="contactOpen"></a><button class="copy-inquiry" type="button" data-t="contactCopy"></button></div><p class="copy-status" role="status"></p></div>
 </form>`;
const brand=`
<section id="brand" class="brand-story section-space" aria-labelledby="brand-heading">
 <div class="brand-editorial"><figure class="brand-photo reveal"><img src="assets/gallery/02.webp" alt="A wall of Korean ceramics within the HANJUNGSUN store" loading="lazy" width="1400" height="980"><figcaption><span>韓貞仙</span><small>HANJUNGSUN</small></figcaption></figure>
 <div class="brand-story-copy reveal"><h2 id="brand-heading" data-t="brandTitle"></h2><p data-t="brandIntro"></p><div class="brand-principles"><div><h3 data-t="brandFruitTitle"></h3><p data-t="brandFruitCopy"></p></div><div><h3 data-t="brandGiftTitle"></h3><p data-t="brandGiftCopy"></p></div><div><h3 data-t="brandSpaceTitle"></h3><p data-t="brandSpaceCopy"></p></div></div></div></div>
 <div class="brand-journey reveal"><ol class="brand-years"><li><span>2023</span><p data-t="year2023"></p></li><li><span>2024</span><p data-t="year2024"></p></li><li class="year-next"><span>2026</span><p data-t="year2026"></p></li></ol><div class="global-note"><p data-t="globalCopy"></p><a class="text-link" href="#shops"><span data-t="brandShopsLink"></span> ↗</a></div></div>
</section>`;
const faq=[['faqBulkQ','faqBulkA'],['faqDeliveryQ','faqDeliveryA'],['faqGiftQ','faqGiftA']].map(([q,a])=>`<details><summary data-t="${q}"></summary><p data-t="${a}"></p></details>`).join('');
const contact=`
<section id="contact" class="contact-section section-space" aria-labelledby="contact-heading"><div class="contact-heading reveal"><h2 id="contact-heading" data-t="contactSectionTitle"></h2><div><p data-t="contactIntro"></p><a class="contact-email" href="mailto:admin2@hanjungsun.co.kr">admin2@hanjungsun.co.kr ↗</a></div></div>
 <div class="contact-tabs" role="tablist" aria-label="Contact topics">${[['faq','faqTab'],['bulk','bulkTab'],['partner','partnerTab']].map(([id,key],i)=>`<button type="button" id="contact-tab-${id}" data-contact="${id}" role="tab" aria-controls="contact-panel-${id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-t="${key}"></button>`).join('')}</div>
 <div id="contact-panel-faq" class="contact-panel" role="tabpanel" aria-labelledby="contact-tab-faq"><figure><img src="assets/craft-dark.webp" alt="Hands presenting a freshly prepared Korean rice cake" loading="lazy"></figure><div class="faq-content">${faq}<a class="text-link" href="https://hanjungsun.co.kr/notice" target="_blank" rel="noopener" data-t="officialFaq"></a></div></div>
 <div id="contact-panel-bulk" class="contact-panel" role="tabpanel" aria-labelledby="contact-tab-bulk" hidden><figure><img src="assets/gallery/07.webp" alt="Korean fabric-wrapped gifts and hanji parcels" loading="lazy"></figure>${form('bulk')}</div>
 <div id="contact-panel-partner" class="contact-panel" role="tabpanel" aria-labelledby="contact-tab-partner" hidden><figure><img src="assets/gallery/03.webp" alt="HANJUNGSUN seasonal gifting with flowers and hanji parcels" loading="lazy"></figure>${form('partner')}</div>
</section>`;
if(!html.includes('brand-contact.css'))html=html.replace('<script type="module"','<link rel="stylesheet" href="brand-contact.css"><script type="module"');
html=html.replaceAll('assets/vietnam-four-hero-v2.webp','assets/vietnam-four-hero-v3.webp');
html=html.replace('<div class="sticky-brand"><span>韓貞仙</span><small>HANJUNGSUN</small></div>','<div class="sticky-brand"><div class="brand-seal"><span>韓貞仙</span><small>HANJUNGSUN</small></div></div>');
if(!html.includes('id="brand"'))html=html.replace('<section class="shops dark-section"',brand+'\n    <section class="shops dark-section"');
html=html.replace('<footer class="footer" id="contact">','<footer class="footer" id="footer">');
if(!html.includes('class="contact-section'))html=html.replace('  </main>',contact+'\n  </main>');
if(!html.includes('data-t="navBrand"'))html=html.replace('<nav aria-label="Main navigation">','<nav aria-label="Main navigation"><a href="#brand" data-t="navBrand"></a>').replace('<a href="#shops" data-t="navShops">Cửa hàng</a></nav>','<a href="#shops" data-t="navShops">Cửa hàng</a><a href="#contact" data-t="navContact"></a></nav>');
if(!html.match(/<nav id="mobile-menu"[\s\S]*?<\/nav>/)?.[0].includes('data-t="navBrand"'))html=html.replace('aria-label="Mobile navigation">','aria-label="Mobile navigation"><a href="#brand" data-t="navBrand"></a><a href="#contact" data-t="navContact"></a>');
await writeFile('index.html',html);
let article=await readFile('journal.html','utf8');if(!article.includes('brand-contact.css'))article=article.replace('</head>','<link rel="stylesheet" href="brand-contact.css"></head>');await writeFile('journal.html',article);
console.log('Applied concise brand journey, closing contact section, seal and navigation.');
