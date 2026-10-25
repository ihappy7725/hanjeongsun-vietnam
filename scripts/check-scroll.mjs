import assert from 'node:assert/strict';
import {installSmoothScroll} from '../smooth-scroll.js';
const handlers=new Map(),frames=new Map();let sequence=0,now=0,checks=0;
class NodeElement{
 constructor(){this.attributes=new Map();this.parentElement=null;this.style={overflowY:'visible'};this.scrollHeight=0;this.clientHeight=0;this.scrollTop=0;}
 setAttribute(k,v){this.attributes.set(k,v);}removeAttribute(k){this.attributes.delete(k);}closest(){return null;}
}
const root=new NodeElement(),body=new NodeElement();root.scrollHeight=5000;
const reduced={matches:false,addEventListener(){}},coarse={matches:false,addEventListener(){}};
const add=(kind,handler)=>handlers.set(kind,[...(handlers.get(kind)||[]),handler]);
const win={scrollY:0,scrollX:0,innerHeight:900,addEventListener:add,matchMedia:q=>q.includes('reduced')?reduced:coarse,scrollTo({top}){this.scrollY=top;}};
Object.assign(globalThis,{window:win,document:{documentElement:root,body,hidden:false,addEventListener:add},Element:NodeElement,getComputedStyle:el=>el.style,requestAnimationFrame:fn=>{frames.set(++sequence,fn);return sequence;},cancelAnimationFrame:id=>frames.delete(id)});
const emit=(kind,event)=>{for(const fn of handlers.get(kind)||[])fn(event);};
const wheel=(delta,options={})=>{const e={target:body,deltaY:delta,deltaX:0,deltaMode:0,cancelable:true,preventDefault(){this.defaultPrevented=true;},...options};emit('wheel',e);return e;};
const step=()=>{now+=1000/60;const batch=[...frames.values()];frames.clear();for(const fn of batch)fn(now);};
const verify=(value,label)=>{assert.ok(value,label);checks++;};
installSmoothScroll();
verify(wheel(600).defaultPrevented,'Root wheel uses smooth settling');
for(let i=0;i<5;i++)step();verify(win.scrollY>0&&win.scrollY<600&&frames.size>0,'Scroll continues toward the stop after input ends');
for(let i=0;i<160&&frames.size;i++)step();verify(win.scrollY===600&&frames.size===0,'Scroll lands exactly and stops requesting frames');
verify(!root.attributes.has('data-wheel-settling'),'Native anchor scrolling restored after settling');
wheel(300);step();emit('pointerdown',{});verify(frames.size===0,'Pointer interaction cancels pending scroll');
verify(!wheel(100,{ctrlKey:true}).defaultPrevented,'Ctrl-wheel zoom stays native');
verify(!wheel(100,{deltaX:200}).defaultPrevented,'Horizontal gestures stay native');
const nested=new NodeElement();nested.parentElement=body;nested.style.overflowY='auto';nested.scrollHeight=1200;nested.clientHeight=200;
verify(!wheel(100,{target:nested}).defaultPrevented,'Nested scroll panels keep native wheel behavior');
reduced.matches=true;verify(!wheel(100).defaultPrevented,'Reduced motion disables wheel smoothing');reduced.matches=false;
coarse.matches=true;verify(!wheel(100).defaultPrevented,'Touch-oriented devices keep native scrolling');coarse.matches=false;
wheel(500);step();emit('keydown',{key:'PageDown'});verify(frames.size===0,'Keyboard scrolling interrupts wheel animation');
win.scrollY=0;verify(!wheel(-100).defaultPrevented,'Top boundary is left to the browser');
console.log(`Passed ${checks} scroll-settling, nested scrolling, input and accessibility checks.`);
