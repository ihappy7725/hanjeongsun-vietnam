const fieldKeys={type:'fieldType',name:'fieldName',phone:'fieldPhone',email:'fieldEmail',quantity:'fieldQuantity',product:'fieldProduct',cooling:'fieldCooling',pickup:'fieldPickup',store:'fieldStore',payment:'fieldPayment',date:'fieldDate',time:'fieldTime',message:'fieldMessage'};
export function inquiryMailto(subject,body){return 'mailto:admin2@hanjungsun.co.kr?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);}
export function installContact({copy,getLang}){
 const text=key=>copy[key][getLang()];
 const tabs=[...document.querySelectorAll('[data-contact]')];
 tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(b=>{const selected=b===tab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;document.querySelector('#contact-panel-'+b.dataset.contact).hidden=!selected;});
 }));
 document.querySelectorAll('[data-inquiry]').forEach(form=>{
  form.addEventListener('submit',event=>{
   event.preventDefault();if(!form.reportValidity())return;
   const subject='HANJUNGSUN · '+text(form.dataset.inquiry==='bulk'?'bulkTab':'partnerTab');
   const lines=[subject,''];
   for(const [name,key] of Object.entries(fieldKeys)){
    const field=form.elements.namedItem(name);if(!field)continue;
    const value=field.tagName==='SELECT'?field.options[field.selectedIndex].textContent:field.value.trim();
    lines.push(text(key)+': '+value);
   }
   const body=lines.join('\n'),draft=form.querySelector('.inquiry-draft');
   draft.querySelector('.draft-text').value=body;draft.querySelector('.draft-mail').href=inquiryMailto(subject,body);draft.hidden=false;
   draft.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  });
  // Existing drafts become stale after an edit, rather than sending outdated details.
  form.addEventListener('input',event=>{if(event.target.closest('.inquiry-draft'))return;form.querySelector('.inquiry-draft').hidden=true;form.querySelector('.copy-status').textContent='';});
  form.querySelector('.copy-inquiry').addEventListener('click',async()=>{
   const input=form.querySelector('.draft-text');
   try{await navigator.clipboard.writeText(input.value);form.querySelector('.copy-status').textContent=text('contactCopied');}
   catch{input.focus();input.select();}
  });
 });
}
