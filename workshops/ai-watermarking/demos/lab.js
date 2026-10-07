/* Transparent teaching experiments. None is a universal AI detector. */
(function(root){
 'use strict';
 const MEMO='Project Lantern launches on Friday. The prototype uses biodegradable packaging. Please keep this fictional announcement within the workshop until the public rehearsal.';
 const IDS={37:'Copy A',82:'Copy B',149:'Copy C',202:'Copy D'};
 function memoEncode(id){const words=MEMO.split(' ');return words.map((w,i)=>w+(i===words.length-1?'':i<8&&((id>>(7-i))&1)?'  ':' ')).join('');}
 function memoDecode(text){if(text.trim().replace(/\s+/g,' ')!==MEMO)return {label:'Not the workshop memo',bits:[]};const gaps=[...text.trim().matchAll(/ +/g)].slice(0,8).map(m=>m[0].length);if(gaps.some(n=>n>2)||gaps.length!==8)return {label:'No valid spacing code',bits:[]};const bits=gaps.map(n=>n-1);const id=bits.reduce((a,b)=>a*2+b,0);return {id,bits,label:IDS[id]?`${IDS[id]} recovered`:'No issued copy ID found'};}
 function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}h^=h>>>16;h=Math.imul(h,0x85ebca6b);h^=h>>>13;h=Math.imul(h,0xc2b2ae35);return(h^(h>>>16))>>>0;}
 function rng(seed){return()=>{seed=(seed+0x6d2b79f5)|0;let t=Math.imul(seed^(seed>>>15),1|seed);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
 const GROUPS=[['We','They','Researchers','Teams','Engineers','Students','Developers','Scientists'],['carefully','quietly','often','sometimes','routinely','patiently','regularly','closely'],['examine','study','compare','test','inspect','measure','explore','question'],['hidden','subtle','useful','unusual','fragile','visible','complex','familiar'],['signals','patterns','systems','methods','results','examples','records','messages']];
 const LOOKUP=new Map(GROUPS.flatMap((g,j)=>g.map(t=>[t.toLowerCase(),j])));
 function green(prev,token,key){const group=LOOKUP.get(token.toLowerCase());if(group===undefined)return false;const ranked=GROUPS[group].map(t=>({t:t.toLowerCase(),h:hash(`${key}:${prev.toLowerCase()}:${t.toLowerCase()}`)})).sort((a,b)=>a.h-b.h);return ranked.slice(0,4).some(x=>x.t===token.toLowerCase());}
 function tokenize(text){return text.match(/[A-Za-z]+/g)||[];}
 function generationTrace(key,bias=2,seed=2026,sentences=36){let previous='<start>';const random=rng(seed),trace=[];for(let index=0;index<sentences*5;index++){const candidates=GROUPS[index%5].map(token=>({token,preferred:green(previous,token,key)}));const weights=candidates.map(c=>c.preferred?Math.exp(bias):1),total=weights.reduce((a,b)=>a+b,0);let draw=random()*total,chosen=candidates[candidates.length-1].token;for(let j=0;j<candidates.length;j++){draw-=weights[j];if(draw<=0){chosen=candidates[j].token;break;}}candidates.forEach((c,j)=>c.probability=weights[j]/total);trace.push({index,previous,chosen,candidates});previous=chosen;}return trace;}
 function generate(key,bias=2,seed=2026,sentences=36){let prev='<start>',out=[];const random=rng(seed);for(let i=0;i<sentences*5;i++){const candidates=GROUPS[i%5];const weights=candidates.map(t=>green(prev,t,key)?Math.exp(bias):1);const total=weights.reduce((a,b)=>a+b,0);let r=random()*total;let chosen=candidates[candidates.length-1];for(let j=0;j<candidates.length;j++){r-=weights[j];if(r<=0){chosen=candidates[j];break;}}out.push(chosen+((i%5===4)?'.':''));prev=chosen;}return out.join(' ');}
 function score(text,key){const tokens=tokenize(text),seen=new Set();let G=0,T=0,prev='<start>',highlight=[];for(const token of tokens){const known=LOOKUP.has(token.toLowerCase());const isGreen=known&&green(prev,token,key);const pair=`${prev.toLowerCase()}:${token.toLowerCase()}`;if(known&&!seen.has(pair)){T++;G+=Number(isGreen);seen.add(pair);}highlight.push({token,green:isGreen});prev=token;}return {G,T,z:T?(G-.5*T)/Math.sqrt(.25*T):0,fraction:T?G/T:0,highlight,tokens:tokens.length};}
 function editText(text){let i=0;return text.replace(/[A-Za-z]+/g,t=>{const group=LOOKUP.get(t.toLowerCase());const change=i++%2===0;if(group===undefined||!change)return t;const idx=GROUPS[group].findIndex(x=>x.toLowerCase()===t.toLowerCase());return GROUPS[group][(idx+3)%8];});}
 function checksum(id){return ((Math.imul(id,257)^0xa73c)&65535);}
 function embedPixels(data,id){if(!Number.isInteger(id)||id<1||id>65535)throw new Error('Use an ID from 1 to 65535.');if(data.length<48*4)throw new Error('Image is too small.');const vals=[0x574d,id,checksum(id)];let p=0;for(const v of vals)for(let b=15;b>=0;b--){data[p*4]=(data[p*4]&254)|((v>>>b)&1);p++;}return data;}
 function decodePixels(data){if(data.length<48*4)return null;const vals=[0,0,0];for(let p=0;p<48;p++)vals[Math.floor(p/16)]=(vals[Math.floor(p/16)]<<1)|(data[p*4]&1);return vals[0]===0x574d&&vals[1]>0&&vals[2]===checksum(vals[1])?vals[1]:null;}
 function download(data,name,type){const a=document.createElement('a');a.href=typeof data==='string'&&data.startsWith('data:')?data:URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click();if(a.href.startsWith('blob:'))setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
 function mount(stage){
  const $=id=>document.getElementById(id);
  const motion=root.DeckMotion.create(stage);
  if($('memo-lab')){const text=$('memo-text');text.value=memoEncode(37);$('print-memo-text').textContent=memoEncode(37);const clear=()=>{$('memo-result').textContent='Which copy came back?';$('memo-bits').innerHTML='';};$('memo-copy').onchange=e=>{text.value=memoEncode(Number(e.target.value));clear();};text.oninput=clear;$('memo-download').onclick=()=>download(memoEncode(Number($('memo-copy').value)),`memo-${IDS[$('memo-copy').value].replace(' ','-')}.txt`,'text/plain');$('memo-reveal').onclick=()=>{const result=memoDecode(text.value);$('memo-result').textContent=result.label;$('memo-bits').innerHTML=result.bits.map((b,i)=>`<span style="--i:${i}">${b}</span>`).join('');};$('memo-normalize').onclick=()=>{text.value=text.value.replace(/\s+/g,' ');$('memo-reveal').click();};}
  if($('token-lab')){$('print-token-text').textContent=generate(15485863,2).split(' ').slice(0,45).join(' ');let plain=false;const render=()=>{const result=score($('token-text').value,Number($('token-key').value));$('token-z').textContent=result.z.toFixed(2);$('token-chart').innerHTML=`<div class="bar-label"><span>Preferred tokens</span><span>${Math.round(result.fraction*100)}% / baseline 50%</span></div><div class="bar-track"><div class="bar-fill" style="width:${result.fraction*100}%"></div><div class="bar-midpoint"></div></div>`;$('token-stats').textContent=`${result.G} preferred / ${result.T} unique scored bigrams. ${result.tokens} words. Descriptive score, not calibrated.`;const target=$('token-highlights');target.replaceChildren();result.highlight.slice(0,28).forEach(x=>{const s=document.createElement('span');s.textContent=x.token;if(x.green)s.classList.add('green');target.appendChild(s);});target.classList.toggle('is-plain',plain);};const regenerate=()=>{plain=false;$('token-text').value=generate(Number($('token-key').value),Number($('token-bias').value));render();};$('token-bias').oninput=e=>{$('bias-value').textContent=Number(e.target.value).toFixed(1);};$('token-key').oninput=render;$('token-text').oninput=render;$('token-generate').onclick=regenerate;$('token-plain').onclick=()=>{plain=!plain;render();};$('token-edit').onclick=()=>{$('token-text').value=editText($('token-text').value);render();};$('token-wrong').onclick=()=>{$('token-key').value=Number($('token-key').value)===15485863?424242:15485863;render();};regenerate();}
  if($('image-lab')){const original=$('image-original'),current=$('image-marked');const oc=original.getContext('2d',{willReadFrequently:true}),cc=current.getContext('2d',{willReadFrequently:true});let ready=false;const inspect=(detail='')=>{const id=decodePixels(cc.getImageData(0,0,512,288).data);$('image-result').textContent=id?`Copy ID ${id} recovered`:'No valid workshop ID found';$('image-detail').textContent=detail||'Header + checksum. Not cryptographic authentication.';};const reset=()=>{cc.drawImage(original,0,0);inspect('A deliberately fragile baseline.');};const draw=img=>{oc.fillStyle='#e7e5db';oc.fillRect(0,0,512,288);const scale=Math.min(512/img.width,288/img.height),w=img.width*scale,h=img.height*scale;oc.drawImage(img,(512-w)/2,(288-h)/2,w,h);ready=true;reset();const po=$('print-image-original').getContext('2d'),pm=$('print-image-marked').getContext('2d');po.drawImage(original,0,0);const pixels=oc.getImageData(0,0,512,288);embedPixels(pixels.data,2048);pm.putImageData(pixels,0,0);};const sample=new Image();sample.onload=()=>draw(sample);sample.onerror=()=>{$('image-result').textContent='Load an image to begin';};sample.src='../assets/stamp-original.png';$('image-mark').onclick=()=>{if(!ready)return;try{const pixels=cc.getImageData(0,0,512,288);embedPixels(pixels.data,Number($('image-id').value));cc.putImageData(pixels,0,0);inspect('48 red-channel low bits carry header, ID and checksum.');}catch(e){$('image-result').textContent=e.message;}};$('image-reset').onclick=reset;$('image-save').onclick=()=>{if(ready)download(current.toDataURL('image/png'),'watermarked-copy.png','image/png');};$('image-jpeg').onclick=()=>{if(!ready)return;const img=new Image();img.onload=()=>{cc.drawImage(img,0,0);inspect('Actual JPEG encode and decode at browser quality 0.65.');};img.src=current.toDataURL('image/jpeg',.65);};$('image-upload').onchange=e=>{const file=e.target.files[0];if(!file)return;const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{draw(img);URL.revokeObjectURL(url);inspect('Loaded image is fitted to the 512 × 288 teaching canvas.');};img.onerror=()=>{$('image-result').textContent='Could not read this image';URL.revokeObjectURL(url);};img.src=url;};}
  if($('sampler-animation')){
   const trace=generationTrace(15485863,2,2026,4);let cursor=0,phase=0,playing=null;
   const paint=()=>{
    const frame=trace[Math.min(cursor,trace.length-1)];
    $('sampler-context').textContent=frame.previous;
    $('sampler-bars').innerHTML=frame.candidates.map(c=>`<div class="candidate-row ${c.preferred?'preferred':''} ${phase===2&&c.token===frame.chosen?'chosen':''}"><span>${c.token}</span><div class="candidate-track"><i class="candidate-before"></i><i class="candidate-after" style="width:${(phase?c.probability:.125)*400}%"></i></div><small>${((phase?c.probability:.125)*100).toFixed(1)}%</small></div>`).join('');
    $('sampler-status').textContent=phase===0?'The key and previous token select four preferred candidates.':phase===1?'The bias raises their sampling probability. Every candidate is still possible.':`The random draw selected “${frame.chosen}”. It becomes the context for the next choice.`;
    const count=cursor+(phase===2?1:0);
    $('sampler-output').innerHTML=trace.slice(Math.max(0,count-8),count).map(t=>`<span class="${t.candidates.find(c=>c.token===t.chosen).preferred?'preferred':''}">${t.chosen}${t.index%5===4?'.':''}</span>`).join('');
   };
   const advance=()=>{if(phase<2)phase++;else{cursor=(cursor+1)%trace.length;phase=0;}paint();};
   const playback=motion.register($('sampler-animation'),{
    start(){playing=setInterval(advance,1100);$('sampler-play').textContent='Pause';},
    stop(){clearInterval(playing);playing=null;$('sampler-play').textContent='Play choices';}
   });
   $('sampler-step').onclick=()=>{playback.pause();advance();};
   $('sampler-play').onclick=()=>playback.toggle();
   $('sampler-reset').onclick=()=>{playback.pause();cursor=0;phase=0;paint();};
   paint();
  }
  if($('distortion-image')){
   const image=$('distortion-image'),play=$('distortion-play');const kinds=['angle','light','crop'];let kindIndex=0,frame=0,interval=null;
   const render=()=>{const kind=kinds[kindIndex],amount=(1-Math.cos(frame*Math.PI*2/120))/2;image.style.transform=kind==='angle'?`perspective(650px) rotateY(${amount*40}deg) rotateZ(${amount*6}deg)`:'none';image.style.filter=kind==='light'?`brightness(${1-amount*.7})`:'none';image.style.clipPath=kind==='crop'?`inset(${amount*25}% ${amount*20}% ${amount*12}% ${amount*10}%)`:'none';$('distortion-label').textContent={angle:'Simulated camera angle',light:'Simulated lighting change',crop:'Simulated crop'}[kind];stage.querySelectorAll('[data-distortion]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.distortion===kind)));};
   const playback=motion.register(image,{
    start(){play.textContent='Pause changes';interval=setInterval(()=>{frame++;if(frame>=120){frame=0;kindIndex=(kindIndex+1)%kinds.length;}render();},50);},
    stop(){clearInterval(interval);interval=null;play.textContent='Animate changes';}
   });
   stage.querySelectorAll('[data-distortion]').forEach(b=>b.onclick=()=>{kindIndex=kinds.indexOf(b.dataset.distortion);frame=0;render();});
   play.onclick=()=>playback.toggle();render();
  }
  const ambientAnimations=[];
  stage.querySelectorAll('.animated-figure').forEach(figure=>{
   const img=figure.querySelector('img'),button=figure.querySelector('.animation-toggle');
   const playback=motion.register(figure,{
    start(){img.src=figure.dataset.animation;if(button)button.textContent='Pause animation';},
    stop(){if(img.complete&&img.naturalWidth){const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;try{canvas.getContext('2d').drawImage(img,0,0);img.src=canvas.toDataURL();}catch{img.src=figure.dataset.poster;}}else img.src=figure.dataset.poster;if(button)button.textContent='Play animation';}
   });
   if(button)button.onclick=()=>playback.toggle();
   else ambientAnimations.push({figure,playback});
   figure.querySelector('.animation-replay')?.addEventListener('click',()=>{playback.pause();playback.play();});
  });
  document.addEventListener('keydown',event=>{
   if(event.key.toLowerCase()!=='p'||event.repeat||event.metaKey||event.ctrlKey||event.altKey||event.target.closest('input,textarea,select,[contenteditable]')||document.querySelector('dialog[open]'))return;
   ambientAnimations.filter(({figure})=>figure.closest('.slide')?.classList.contains('active')).forEach(({playback})=>playback.toggle());
  });
  stage.querySelectorAll('.timer').forEach(el=>{const initial=Number(el.dataset.minutes)*60;let remaining=initial,until=0,interval=null;const face=el.querySelector('.timer-face'),toggle=el.querySelector('.timer-toggle');const render=()=>{face.textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;};const stop=()=>{clearInterval(interval);interval=null;toggle.textContent='Start timer';};toggle.onclick=()=>{if(interval){stop();return;}until=Date.now()+remaining*1000;toggle.textContent='Pause timer';interval=setInterval(()=>{remaining=Math.max(0,Math.ceil((until-Date.now())/1000));render();if(!remaining)stop();},250);};el.querySelector('.timer-reset').onclick=()=>{stop();remaining=initial;render();};});
  root.DeckVideo?.mount(stage,motion);

 }
 const api={MEMO,IDS,memoEncode,memoDecode,generate,generationTrace,score,editText,embedPixels,decodePixels,mount};root.WorkshopLab=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
