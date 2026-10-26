import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const f of ['index.html','styles.css','refinement.css','motion-layout.css','gallery-polish.css','gallery-crops.css','experience-polish.css','brand-contact.css','section-rework.css','content-scale.css','collection.css','collection-data.js','site-content.js','contact.js','smooth-scroll.js','overlay-scrollbar.js','app.js','journal.html','journal.js','journal.css','journal-data.js']) await copyFile(f,`dist/${f}`);
await cp('assets','dist/assets',{recursive:true});
console.log('Built static site in dist/');
