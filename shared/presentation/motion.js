/* Active-slide playback, shared by animations and embedded media. */
(function(root){
 'use strict';
 function create(stage){
  const reduced=root.matchMedia('(prefers-reduced-motion: reduce)');
  const presenter=new URLSearchParams(root.location.search).has('presenter');
  const controls=[];
  function register(element,handlers){
   let running=false,userPaused=false,manualPlay=false;
   const control={
    sync(){
     const active=element.closest('.slide')?.classList.contains('active');
     const visible=!document.hidden&&document.getElementById('blackout')?.hidden!==false;
     const allowed=active&&visible&&!userPaused&&(manualPlay||(!presenter&&!reduced.matches));
     if(allowed===running)return;
     running=allowed;
     if(running)handlers.start();else handlers.stop();
    },
    play(){userPaused=false;manualPlay=true;control.sync();},
    pause(){userPaused=true;manualPlay=false;control.sync();},
    toggle(){if(running)control.pause();else control.play();},
    get running(){return running;}
   };
   controls.push(control);return control;
  }
  const sync=()=>controls.forEach(control=>control.sync());
  stage.addEventListener('deck:slidechange',sync);
  stage.addEventListener('deck:visibilitychange',sync);
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  return {register,sync};
 }
 root.DeckMotion={create};
})(window);
