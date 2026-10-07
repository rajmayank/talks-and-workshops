/* Independent, active-slide YouTube clips for any workshop deck. */
(function(root){
 'use strict';
 const PLAYER_ORIGIN='https://www.youtube-nocookie.com';
 function mount(stage,motion){
  const clips=[];
  stage.querySelectorAll('.video-case').forEach((videoCase,index)=>{
   const screen=videoCase.querySelector('.video-screen');
   const playButton=videoCase.querySelector('.video-toggle');
   const soundButton=videoCase.querySelector('.video-sound');
   const videoId=videoCase.dataset.videoId;
   if(!screen||!/^[A-Za-z0-9_-]{11}$/.test(videoId||''))return;
   let clipStart=Math.max(0,Number(videoCase.dataset.videoStart)||0);
   let clipEnd=Number(videoCase.dataset.videoEnd);
   if(!Number.isFinite(clipEnd)||clipEnd<=clipStart)clipEnd=clipStart+59;
   let iframe=null,unmuted=false,resumeAt=clipStart,lastTime=null,finished=false;
   const playerId=`workshop-video-${index}`;
   function command(func){
    iframe?.contentWindow.postMessage(JSON.stringify({event:'command',func,args:[]}),PLAYER_ORIGIN);
   }
   function makePlayer(){
    if(finished){finished=false;resumeAt=clipStart;lastTime=null;}
    const player=document.createElement('iframe');
    player.title=videoCase.dataset.videoTitle||screen.getAttribute('aria-label')||'Workshop video clip';
    player.allow='autoplay; encrypted-media; picture-in-picture';
    player.allowFullscreen=true;player.referrerPolicy='strict-origin-when-cross-origin';
    const params=new URLSearchParams({start:String(Math.floor(resumeAt)),end:String(clipEnd),autoplay:'1',mute:unmuted?'0':'1',enablejsapi:'1',playsinline:'1',rel:'0'});
    if(videoCase.dataset.videoControls==='hidden'){
     params.set('controls','0');params.set('disablekb','1');player.tabIndex=-1;
    }
    if(root.location.protocol.startsWith('http'))params.set('origin',root.location.origin);
    player.src=`${PLAYER_ORIGIN}/embed/${videoId}?${params}`;
    player.addEventListener('load',()=>{
     if(iframe===player)player.contentWindow.postMessage(JSON.stringify({event:'listening',id:playerId}),PLAYER_ORIGIN);
    });
    iframe=player;screen.appendChild(player);if(playButton)playButton.textContent='Pause clip';
   }
   const playback=motion.register(screen,{
    start:makePlayer,
    stop(){
     if(iframe){
      resumeAt=Math.min(clipEnd-1,Math.max(clipStart,lastTime??resumeAt));
      iframe.remove();iframe=null;
     }
     if(playButton)playButton.textContent=finished?'Replay clip':'Play clip';
    }
   });
   root.addEventListener('message',event=>{
    if(!iframe||event.source!==iframe.contentWindow||event.origin!==PLAYER_ORIGIN)return;
    let message;try{message=typeof event.data==='string'?JSON.parse(event.data):event.data;}catch{return;}
    if(!message||typeof message!=='object')return;
    if(message.event==='onReady'||message.event==='initialDelivery')command(unmuted?'unMute':'mute');
    if(message.event==='infoDelivery'&&message.info){
     if(Number.isFinite(message.info.currentTime))lastTime=message.info.currentTime;
     if(message.info.playerState===0){finished=true;playback.pause();resumeAt=clipStart;lastTime=null;}
     else if(message.info.playerState===2)playback.pause();
    }
   });
   function toggleSound(){
    unmuted=!unmuted;
    if(soundButton)soundButton.textContent=unmuted?'Mute':'Enable sound';
    command(unmuted?'unMute':'mute');
   }
   function restart(){
    playback.pause();resumeAt=clipStart;lastTime=null;finished=false;playback.play();
   }
   clips.push({videoCase,playback,toggleSound,restart});
   if(playButton)playButton.onclick=()=>playback.toggle();
   if(soundButton)soundButton.onclick=toggleSound;
   videoCase.querySelectorAll('[data-video-start][data-video-end]').forEach(button=>button.onclick=()=>{
    const start=Number(button.dataset.videoStart),end=Number(button.dataset.videoEnd);
    if(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<=start)return;
    playback.pause();clipStart=start;clipEnd=end;resumeAt=start;lastTime=null;finished=false;
    if(button.dataset.videoDecode!==undefined){
     const decode=button.dataset.videoDecode==='true';
     const guide=videoCase.querySelector('.morse-guide'),prompt=videoCase.querySelector('.denton-prompt');
     if(guide)guide.hidden=!decode;
     if(prompt)prompt.hidden=decode;
    }
    playback.play();
   });
  });
  document.addEventListener('keydown',event=>{
   if(event.repeat||event.metaKey||event.ctrlKey||event.altKey||event.target.closest('input,textarea,select,[contenteditable]')||document.querySelector('dialog[open]'))return;
   const key=event.key.toLowerCase();
   if(!['p','m','r'].includes(key))return;
   const active=clips.filter(({videoCase})=>videoCase.closest('.slide')?.classList.contains('active'));
   if(!active.length)return;
   event.preventDefault();
   active.forEach(clip=>{
    if(key==='p')clip.playback.toggle();
    if(key==='m')clip.toggleSound();
    if(key==='r')clip.restart();
   });
  });
 }
 root.DeckVideo={mount};
})(window);
