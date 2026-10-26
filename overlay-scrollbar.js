// A transparent overlay leaves the full photograph visible behind the scroll thumb.
export function installOverlayScrollbar(stopSettling=()=>{}){
 if(!window.ResizeObserver||document.querySelector('.page-scrollbar'))return;
 const root=document.documentElement,content=document.querySelector('main');
 if(!content)return;
 if(!content.id)content.id='page-content';
 const rail=document.createElement('div'),thumb=document.createElement('div');
 rail.className='page-scrollbar';thumb.className='page-scrollbar-thumb';
 thumb.tabIndex=0;thumb.setAttribute('role','scrollbar');
 thumb.setAttribute('aria-controls',content.id);thumb.setAttribute('aria-orientation','vertical');
 thumb.setAttribute('aria-valuemin','0');thumb.setAttribute('aria-valuemax','100');
 rail.append(thumb);document.body.append(rail);
 let frame=0,travel=0,maximum=0,drag=null;
 function update(){
  frame=0;
  maximum=Math.max(0,root.scrollHeight-window.innerHeight);
  rail.hidden=maximum<=1;
  const height=rail.clientHeight;
  const size=Math.min(height,Math.max(48,height*window.innerHeight/root.scrollHeight));
  travel=Math.max(0,height-size);
  const progress=maximum?Math.max(0,Math.min(1,window.scrollY/maximum)):0;
  thumb.style.height=`${size}px`;thumb.style.transform=`translateY(${travel*progress}px)`;
  thumb.setAttribute('aria-valuenow',String(Math.round(progress*100)));
  thumb.setAttribute('aria-label',root.lang==='ko'?'페이지 스크롤':root.lang==='vi'?'Cuộn trang':'Page scroll');
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 function move(top){stopSettling();window.scrollTo({top:Math.max(0,Math.min(maximum,top)),behavior:'instant'});schedule();}
 thumb.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  stopSettling();update();
  drag={id:event.pointerId,y:event.clientY,top:window.scrollY};
  thumb.setPointerCapture(event.pointerId);rail.classList.add('dragging');event.preventDefault();
 });
 thumb.addEventListener('pointermove',event=>{
  if(drag?.id===event.pointerId&&travel)move(drag.top+(event.clientY-drag.y)*maximum/travel);
 });
 const end=event=>{if(drag?.id===event.pointerId){drag=null;rail.classList.remove('dragging');}};
 thumb.addEventListener('pointerup',end);thumb.addEventListener('pointercancel',end);thumb.addEventListener('lostpointercapture',end);
 thumb.addEventListener('keydown',event=>{
  const steps={ArrowDown:48,ArrowUp:-48,PageDown:window.innerHeight*.85,PageUp:-window.innerHeight*.85,' ':window.innerHeight*(event.shiftKey?-.85:.85)};
  if(event.key==='Home')move(0);
  else if(event.key==='End')move(maximum);
  else if(event.key in steps)move(window.scrollY+steps[event.key]);
  else return;
  event.preventDefault();
 });
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 const resize=new window.ResizeObserver(schedule);resize.observe(document.body);resize.observe(root);
 const language=new window.MutationObserver(schedule);language.observe(root,{attributes:true,attributeFilter:['lang']});
 root.setAttribute('data-overlay-scrollbar','');update();
}
