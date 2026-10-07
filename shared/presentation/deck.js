/* Reusable, dependency-free slide engine. Content and widgets live with each session. */
(() => {
  'use strict';
  const cfg=window.WORKSHOP;
  const stage=document.getElementById('stage');
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slides=cfg.slides;
  stage.innerHTML=slides.map((s,i)=>`<section class="slide ${s.theme||''} ${s.className||''}" id="slide-${i+1}" aria-label="${escape(s.title)}"><div class="eyebrow">${s.eyebrow||cfg.title}</div>${s.html||`<h2>${s.title}</h2>${s.subtitle?`<p class="subtitle">${s.subtitle}</p>`:''}<div class="body">${s.body||''}</div>`}<div class="footer"><span>${s.section||cfg.title}</span></div></section>`).join('');
  const nodes=[...stage.children];
  const commands=document.getElementById('commands');
  const dialogs=[...document.querySelectorAll('dialog')];
  let index=0;
  const presenter=new URLSearchParams(location.search).has('presenter');
  document.body.classList.toggle('presenter',presenter);
  document.getElementById('presenter-notes').hidden=!presenter;
  const channel=typeof BroadcastChannel!=='undefined'&&!new URLSearchParams(location.search).has('qa')?new BroadcastChannel(cfg.id):null;

  function fit(){
    const height=presenter?innerHeight*.65-24:innerHeight-24;
    document.documentElement.style.setProperty('--scale',Math.min((innerWidth-24)/1280,height/720));
  }
  function notesHTML(s){return `<h2>${s.title}</h2><p>${s.notes||''}</p>${s.sources?.length?`<h3>Sources</h3><ul>${s.sources.map(x=>`<li><a href="${escape(x.url)}" target="_blank" rel="noopener noreferrer">${escape(x.label)}</a></li>`).join('')}</ul>`:''}`;}
  function openDialog(dialog){
    dialogs.forEach(other=>{if(other!==dialog&&other.open)other.close();});
    if(!dialog.open)dialog.showModal();
  }
  function go(n,broadcast=true){
    index=Math.max(0,Math.min(slides.length-1,n));
    nodes.forEach((node,i)=>{node.classList.toggle('active',i===index);node.setAttribute('aria-hidden',i===index?'false':'true');});
    document.getElementById('previous').disabled=index===0;
    document.getElementById('next').disabled=index===slides.length-1;
    document.getElementById('command-slide-title').textContent=slides[index].title;
    history.replaceState(null,'',`${location.pathname}${location.search}#${index+1}`);
    document.title=`${slides[index].title} | ${cfg.title}`;
    document.getElementById('notes-content').innerHTML=notesHTML(slides[index]);
    document.getElementById('presenter-notes').innerHTML=notesHTML(slides[index]);
    document.querySelectorAll('#overview-content button').forEach((b,i)=>b.classList.toggle('selected',i===index));
    nodes.forEach((n,i)=>{if(i!==index)n.querySelectorAll('iframe').forEach(f=>f.remove());});
    stage.dispatchEvent(new CustomEvent('deck:slidechange',{detail:{index}}));
    if(broadcast)channel?.postMessage({index});
  }
  document.getElementById('overview-content').innerHTML=slides.map((s,i)=>`<button data-slide="${i}">${String(i+1).padStart(2,'0')} &nbsp; ${escape(s.title)}</button>`).join('');
  document.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>{go(Number(b.dataset.slide));document.getElementById('overview').close();});
  document.getElementById('next').onclick=()=>{commands.close();go(index+1);};
  document.getElementById('previous').onclick=()=>{commands.close();go(index-1);};
  document.getElementById('overview-button').onclick=()=>openDialog(document.getElementById('overview'));
  document.getElementById('notes-button').onclick=()=>openDialog(document.getElementById('notes'));
  document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
  dialogs.forEach(dialog=>{
    dialog.addEventListener('close',()=>{
      if(!dialogs.some(other=>other.open))stage.focus({preventScroll:true});
    });
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const box=dialog.getBoundingClientRect();
      if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();
    });
  });
  document.getElementById('presenter-button').onclick=()=>{
    commands.close();
    const url=new URL(location.href);
    url.searchParams.set('presenter','1');
    window.open(url.href,'workshop-presenter','width=1100,height=850');
  };
  document.getElementById('fullscreen-button').onclick=()=>{
    commands.close();
    if(document.fullscreenElement)document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };
  document.addEventListener('keydown',e=>{
    const key=e.key.toLowerCase();
    const editing=e.target.closest('input,textarea,select,[contenteditable]');
    const commandShortcut=(key==='p'&&(e.metaKey||e.ctrlKey)&&!e.altKey)||(!editing&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&(key==='?'||(e.code==='Slash'&&e.shiftKey)));
    if(commandShortcut){
      e.preventDefault();
      if(!e.repeat){if(commands.open)commands.close();else openDialog(commands);}
      return;
    }
    if(editing||e.metaKey||e.ctrlKey||e.altKey||document.querySelector('dialog[open]'))return;
    if(key===' '&&e.target.closest('button,a'))return;
    if(['arrowright','pagedown',' '].includes(key)){e.preventDefault();go(index+1);}
    if(['arrowleft','pageup'].includes(key)){e.preventDefault();go(index-1);}
    if(key==='home'){e.preventDefault();go(0);}
    if(key==='end'){e.preventDefault();go(slides.length-1);}
    if(key==='n')openDialog(document.getElementById('notes'));
    if(key==='o')openDialog(document.getElementById('overview'));
    if(key==='b'){
      document.getElementById('blackout').hidden=!document.getElementById('blackout').hidden;
      stage.dispatchEvent(new Event('deck:visibilitychange'));
    }
    if(key==='f')document.getElementById('fullscreen-button').click();
  });
  window.addEventListener('resize',fit);
  window.addEventListener('hashchange',()=>go((parseInt(location.hash.slice(1),10)||1)-1));
  channel?.addEventListener('message',e=>{if(Number.isInteger(e.data.index))go(e.data.index,false);});
  window.addEventListener('beforeprint',()=>nodes.forEach(n=>n.removeAttribute('aria-hidden')));
  window.addEventListener('afterprint',()=>go(index,false));
  window.WorkshopLab?.mount(stage);
  window.WorkshopCases?.mount(stage);
  window.PrinterCase?.mount(stage);
  fit();go((parseInt(location.hash.slice(1),10)||1)-1,false);
})();
