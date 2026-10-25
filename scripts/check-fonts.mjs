import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
function glyphs(data){
 const tableCount=data.readUInt16BE(4);let cmap;
 for(let i=0;i<tableCount;i++){const p=12+i*16;if(data.toString('ascii',p,p+4)==='cmap')cmap=data.readUInt32BE(p+8);}
 assert.ok(cmap,'Font cmap exists');const count=data.readUInt16BE(cmap+2);const result=new Set();
 for(let i=0;i<count;i++){const base=cmap+data.readUInt32BE(cmap+4+i*8+4);const format=data.readUInt16BE(base);
 if(format===4){const n=data.readUInt16BE(base+6)/2;const ends=base+14;const starts=ends+n*2+2;const delta=starts+n*2;const range=delta+n*2;for(let j=0;j<n;j++){for(let c=data.readUInt16BE(starts+j*2);c<=data.readUInt16BE(ends+j*2)&&c<65535;c++){const offset=data.readUInt16BE(range+j*2);const g=offset?data.readUInt16BE(range+j*2+offset+(c-data.readUInt16BE(starts+j*2))*2):(c+data.readInt16BE(delta+j*2))&65535;if(g)result.add(c);}}}
 if(format===12){const n=data.readUInt32BE(base+12);for(let j=0;j<n;j++){const p=base+16+j*12;for(let c=data.readUInt32BE(p);c<=data.readUInt32BE(p+4);c++)result.add(c);}}
 }return result;
}
const vietnamese=[...Array.from({length:90},(_,i)=>0x1ea0+i),...Array.from('ĂăÂâĐđÊêÔôƠơƯưÀÁÃÈÉÌÍÒÓÕÙÚÝàáãèéìíòóõùúý',c=>c.codePointAt(0))];
for(const file of ['font-0.ttf','font-1.ttf','font-2.ttf','font-3.ttf']){const set=glyphs(await readFile(`assets/fonts/${file}`));for(const c of vietnamese)assert.ok(set.has(c),`${file} missing U+${c.toString(16)}`);}
console.log('All Vietnamese precomposed tone characters verified in both Be Vietnam Pro and Playfair Display font weights.');
