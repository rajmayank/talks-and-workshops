const test=require('node:test');
const assert=require('node:assert/strict');
const lab=require('./lab.js');
test('memo copy IDs round trip and normalized or altered memos do not identify a copy',()=>{
 for(const id of Object.keys(lab.IDS).map(Number))assert.equal(lab.memoDecode(lab.memoEncode(id)).id,id);
 assert.equal(lab.memoDecode(lab.memoEncode(37).replace(/\s+/g,' ')).label,'No issued copy ID found');
 assert.equal(lab.memoDecode('unrelated memo').label,'Not the workshop memo');
});
test('toy watermark signal depends on key and survives a plain-text copy',()=>{
 const key=15485863,text=lab.generate(key,2);
 const marked=lab.score(text,key),plain=lab.score(String(text),key),wrong=lab.score(text,424242),edited=lab.score(lab.editText(text),key),unmarked=lab.score(lab.generate(key,0),key);
 assert.deepEqual(marked,plain);assert.ok(marked.z>4);assert.ok(wrong.z<marked.z);assert.ok(edited.z<marked.z);assert.ok(unmarked.z<marked.z);
 console.log(JSON.stringify({marked:marked.z,wrong:wrong.z,edited:edited.z,unmarked:unmarked.z}));
});
test('LSB payload survives PNG pixel data and rejects corruption and invalid IDs',()=>{
 const original=new Uint8ClampedArray(512*288*4).fill(128);assert.equal(lab.decodePixels(original),null);
 for(const id of [1,2048,65535]){const data=original.slice();lab.embedPixels(data,id);assert.equal(lab.decodePixels(data),id);data[70]^=1;assert.equal(lab.decodePixels(data),id);data[4*20]^=1;assert.equal(lab.decodePixels(data),null);}
 assert.throws(()=>lab.embedPixels(original,0));assert.throws(()=>lab.embedPixels(original,65536));
});

test('animated choices use the actual sampler probabilities and sequence',()=>{
 const trace=lab.generationTrace(15485863,2,2026,4);
 const text=trace.map(t=>t.chosen+(t.index%5===4?'.':'')).join(' ');
 assert.equal(text,lab.generate(15485863,2,2026,4));
 for(const t of trace){assert.equal(t.candidates.filter(c=>c.preferred).length,4);assert.ok(Math.abs(t.candidates.reduce((a,c)=>a+c.probability,0)-1)<1e-12);}
});
