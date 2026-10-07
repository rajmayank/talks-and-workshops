/* Reusable controls for inspecting supplied evidence without changing its pixels. */
(function(root){
 'use strict';
 function mount(stage){
  const viewer=document.createElement('dialog');
  viewer.className='evidence-viewer';viewer.setAttribute('aria-label','Full evidence image');
  viewer.innerHTML='<button class="evidence-close">Close image</button><div class="evidence-full-image"></div>';
  document.body.appendChild(viewer);
  viewer.querySelector('button').onclick=()=>viewer.close();
  stage.querySelectorAll('[data-evidence]').forEach(host=>{
   host.querySelectorAll('[data-evidence-view]').forEach(button=>button.onclick=()=>{
    host.dataset.view=button.dataset.evidenceView;
    host.querySelectorAll('[data-evidence-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   });
   host.querySelector('[data-open-evidence]')?.addEventListener('click',()=>{
    const image=host.querySelector('img').cloneNode();
    viewer.querySelector('.evidence-full-image').replaceChildren(image);viewer.showModal();
   });
  });
 }
 root.WorkshopCases={mount};
})(window);
