// Wheel input settles into place. Touch, keyboard, nested scrolling and zoom remain native.
export const settleScroll=(current,target,elapsed,duration=190)=>target+(current-target)*Math.exp(-Math.min(elapsed,64)/duration);
export function installSmoothScroll(){
 const root=document.documentElement;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const coarse=window.matchMedia('(pointer: coarse)');
 let target=window.scrollY,current=target,running=false,frame=0,lastTime=0;
 const maximum=()=>Math.max(0,root.scrollHeight-window.innerHeight);
 function stop(){if(frame)cancelAnimationFrame(frame);frame=0;running=false;lastTime=0;root.removeAttribute('data-wheel-settling');}
 function nestedCanScroll(element,delta){
  for(let node=element;node&&node!==document.body&&node!==root;node=node.parentElement){
   if(!(node instanceof Element))continue;
   const style=getComputedStyle(node);
   if(/auto|scroll/.test(style.overflowY)&&node.scrollHeight>node.clientHeight+1){
    if((delta>0&&node.scrollTop+node.clientHeight<node.scrollHeight-1)||(delta<0&&node.scrollTop>0))return true;
   }
  }
  return false;
 }
 function tick(now){
  const elapsed=lastTime?now-lastTime:16.67;lastTime=now;
  target=Math.max(0,Math.min(maximum(),target));
  current=settleScroll(current,target,elapsed);
  if(Math.abs(current-target)<.15)current=target;
  window.scrollTo({top:current,left:window.scrollX,behavior:'instant'});
  if(current===target){stop();return;}
  frame=requestAnimationFrame(tick);
 }
 function wheel(event){
  if(event.defaultPrevented||!event.cancelable||reduced.matches||coarse.matches||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?window.innerHeight:1);
  if(!delta||nestedCanScroll(event.target,delta))return;
  if(!running){current=window.scrollY;target=current;}
  const next=Math.max(0,Math.min(maximum(),target+delta));
  if(next===target&&!running)return;
  event.preventDefault();target=next;
  if(!running){running=true;root.setAttribute('data-wheel-settling','');frame=requestAnimationFrame(tick);}
 }
 window.addEventListener('wheel',wheel,{passive:false});
 window.addEventListener('pointerdown',stop,{passive:true});
 window.addEventListener('touchstart',stop,{passive:true});
 window.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' ','Escape','Tab'].includes(event.key))stop();});
 document.addEventListener('click',event=>{if(event.target.closest?.('a[href]'))stop();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 reduced.addEventListener('change',stop);coarse.addEventListener('change',stop);
 return {stop};
}
