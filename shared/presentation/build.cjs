/* Inline local CSS, scripts and asset references into a portable HTML deck. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const input=path.resolve(process.argv[2]||'workshops/ai-watermarking/slides/index.html');
const output=path.resolve(process.argv[3]||'workshops/ai-watermarking/exports/mark-my-words.html');
const base=path.dirname(input);
const embedAssets=text=>text.replace(/\.\.\/assets\/[a-zA-Z0-9_.-]+\.(?:png|jpg|jpeg|webp|gif|svg)/gi,relative=>{
 const ext=path.extname(relative).slice(1).toLowerCase().replace('jpg','jpeg');
 const mime=ext==='svg'?'image/svg+xml':`image/${ext}`;
 return `data:${mime};base64,${fs.readFileSync(path.resolve(base,relative)).toString('base64')}`;
});
let html=fs.readFileSync(input,'utf8');
html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,src)=>`<style>${embedAssets(fs.readFileSync(path.resolve(base,src),'utf8'))}</style>`);
html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,src)=>`<script>${embedAssets(fs.readFileSync(path.resolve(base,src),'utf8')).replace(/<\/script/gi,'<\\/script')}</script>`);
fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,html);
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(base,'slides.js'),'utf8'),context);
const deck=context.window.WORKSHOP;
const clean=s=>s.replace(/<br\s*\/?\s*>/g,' ').replace(/<[^>]+>/g,'');
const notes=['# Facilitator guide',`\n${deck.title}\n`,deck.guideIntro||'', '## Slide notes\n'];
deck.slides.forEach((s,i)=>{notes.push(`### ${i+1}. ${clean(s.title)}\n\n${s.notes}\n`);if(s.sources?.length)notes.push(s.sources.map(x=>`- [${x.label}](${x.url})`).join('\n')+'\n');});
notes.push('## Full source index\n',...Object.values(deck.sources).map(s=>`- [${s.label}](${s.url})`));
fs.writeFileSync(path.join(base,'facilitator-guide.md'),notes.join('\n')+'\n');
console.log(`Built ${deck.slides.length} slides into ${output}`);
