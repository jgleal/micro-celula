const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map(),context=new Proxy({},{get:(_t,key)=>key==='createRadialGradient'||key==='createLinearGradient'?()=>({addColorStop(){}}):()=>{},set:()=>true});
function element(id){if(!elements.has(id))elements.set(id,{textContent:'',innerHTML:'',style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},getContext(){return context},getBoundingClientRect(){return {width:900,height:600}},focus(){},matches(){return false},showModal(){},close(){},showPopover(){},hidePopover(){},onclick:null});return elements.get(id)}
const audioEvents=[];const param=()=>({setValueAtTime(v,t){audioEvents.push(['value',v,t])},setTargetAtTime(v,t){audioEvents.push(['target',v,t])},exponentialRampToValueAtTime(){}});
class AudioContext{constructor(){this.currentTime=0;this.destination={}}resume(){return Promise.resolve()}createGain(){return {gain:param(),connect(){},disconnect(){}}}createOscillator(){return {frequency:param(),connect(){},disconnect(){},start(t){audioEvents.push(['start',t])},stop(){}}}}
const storage=new Map();
const sandbox={document:{getElementById:element,addEventListener(){}},window:{AudioContext,addEventListener(){}},requestAnimationFrame(){},devicePixelRatio:1,localStorage:{getItem(k){return storage.get(k)??null},setItem(k,v){storage.set(k,String(v))}},setTimeout(){},clearTimeout(){},Math,Number,Array,Set,assert,audioEvents};
vm.runInNewContext(fs.readFileSync('main.js','utf8')+`
function send(cargo,dest){s.cargo=cargo.slice();deliver(dest)}
function revealHint(dest){hint(dest);uiHelpOpen=false}
// Fixture advances through all three independent cells to reuse resource/renderer coverage.
function advanceFixture(){if(s.level===2){nextLevel();return}s.level++;s.actions=0;s.health=3;s.energy=0;s.waiting=false;initFlight();render()}

switchCourse('bach');
start();draw();assert.equal(s.energy,0);assert.equal(s.health,3);
assert.equal(s.items.filter(i=>['p','l'].includes(i.type)).length,0);
// All synthesis routes can be supplied before energy is ready.
send(['r'],'lyso');assert.equal(s.progressBy.lyso,1);
send(['a'],'ribo');send(['a'],'rer');send(['f'],'rel');assert.equal(s.progressBy.rer,0);assert.equal(s.deposit.rer.a,1);assert.equal(s.health,3);
send(['g'],'mito');assert.equal(s.deposit.mito.g,1);send(['o'],'mito');assert.equal(s.energy,8);assert.equal(s.progressBy.ribo,1);assert.equal(s.progressBy.rer,1);assert.equal(s.progressBy.rel,1);
assert.equal(s.items.filter(i=>i.type==='p').length,1);assert.equal(s.items.filter(i=>i.type==='l').length,1);assert.equal(s.progressBy.golgi,0);
// Actually collect the products rather than inventing Golgi inputs.
function fetchProduct(type){const index=s.items.findIndex(i=>i.type===type);assert.ok(index>=0);s.items.splice(index,1);s.cargo.push(type)}
fetchProduct('p');deliver('golgi');assert.equal(s.deposit.golgi.p,1);assert.equal(s.progressBy.golgi,0);fetchProduct('l');deliver('golgi');assert.equal(s.energy,6);assert.equal(s.completed,1);assert.equal(s.shipments.length,1);const saved=s.score;deliver('golgi');assert.equal(s.score,saved);
advanceFixture();draw();assert.equal(s.level,1);assert.equal(s.items.filter(i=>['g','o','p','l'].includes(i.type)).length,0);
send(['w','w'],'vacuole');assert.equal(s.progressBy.vacuole,1);assert.deepEqual(s.cargo,['w']);send(['a'],'ribo');send(['a'],'rer');send(['f'],'rel');send(['c','w'],'chloro');assert.equal(s.items.filter(i=>i.type==='g').length,1);
s.cargo=[];fetchProduct('g');fetchProduct('o');deliver('mito');assert.equal(s.progressBy.rer,1);assert.equal(s.progressBy.rel,1);fetchProduct('l');fetchProduct('p');deliver('golgi');assert.equal(s.completed,2);
advanceFixture();draw();assert.equal(s.level,2);assert.ok(!level().stations.includes('rer'));assert.ok(!level().stations.includes('golgi'));
// The whole capsule membrane is reachable, including rounded ends.
const b=bacteriaShape;const borders=[{x:500,y:125},{x:500,y:515},{x:92,y:320},{x:908,y:320}];for(const point of borders){s.player={...s.player,...point};assert.equal(nearStation(),'membrane')}
for(let i=0;i<16;i++){const angle=i*Math.PI/8,cx=Math.cos(angle)<0?b.left:b.right;s.player={...s.player,x:cx+Math.cos(angle)*195,y:b.cy+Math.sin(angle)*195};assert.equal(nearStation(),'membrane');update(.016);assert.ok(membraneDistance(s.player)>=15.9)}
s.player={...s.player,x:500,y:320};assert.equal(nearStation(),'nucleoid');s.player={...s.player,x:structures.ribo.x,y:structures.ribo.y};assert.equal(nearStation(),'ribo');
send(['info'],'nucleoid');s.player={...s.player,x:350,y:440};assert.equal(nearStation(),null);send(['a','a'],'ribo');s.player={...s.player,x:500,y:125};s.cargo=['g'];transfer();assert.equal(s.deposit.membrane.g,1);s.player={...s.player,x:908,y:320};s.cargo=['o'];transfer();assert.equal(s.progressBy.ribo,2);s.player={...s.player,x:500,y:515};s.cargo=['g','o'];transfer();assert.equal(s.completed,3);assert.equal(s.correct,18);advanceFixture();assert.equal(running,false);
// A complete run must be possible using only the molecules actually spawned.
start();
for(let cell=0;cell<3;cell++){
 let guard=0;
 while(!s.waiting&&guard++<30){
   let moved=false;
   for(const task of level().steps){
     if(s.progressBy[task.station]>=task.target)continue;
     s.cargo=[];
     for(const type of task.recipe){
       if((s.deposit[task.station]?.[type]||0)>0)continue;
       const idx=s.items.findIndex(item=>item.type===type);
       if(idx>=0){s.cargo.push(type);s.items.splice(idx,1)}
     }
     if(s.cargo.length){deliver(task.station);moved=true}
     if(s.waiting)break;
   }
   assert.ok(moved||s.waiting,'No resource deadlock');
 }
 assert.equal(s.waiting,true);advanceFixture();
}
assert.equal(s.completed,3);assert.equal(s.correct,18);assert.equal(running,false);
// Scoped hints and no farming completed goals.
start();revealHint('rel');revealHint('rel');assert.equal(s.hints,1);send(['g','o'],'mito');assert.equal(s.score,100);send(['f'],'rel');assert.equal(s.score,140);assert.equal(s.streak,0);send(['g'],'rer');assert.equal(s.health,2);assert.deepEqual(s.cargo,['g']);deliver('rer');deliver('rer');assert.equal(running,false);
start();send(['r','r'],'lyso');assert.deepEqual(s.cargo,['r']);const capped=s.score;deliver('lyso');assert.equal(s.score,capped);assert.equal(s.health,3);
// Magnetic boost collects beyond normal range, obeys capacity and drop lockout.
start();s.items=[{x:565,y:470,type:'g',phase:0,lock:0}];update(.016);assert.equal(s.cargo.length,0);s.player.angle=0;dash();for(let i=0;i<20;i++)update(.016);assert.deepEqual(s.cargo,['g']);assert.ok(s.magnet>0);assert.ok(s.dash>0);
s.cargo=['g','o','a'];s.items=[{x:s.player.x+35,y:s.player.y,type:'r',phase:0,lock:0}];update(.016);assert.equal(s.items.length,1);assert.equal(s.cargo.length,3);drop();update(.016);assert.ok(s.items.some(i=>i.type==='a'&&i.lock>0));
start();const x=s.player.x;keys.add('d');for(let i=0;i<15;i++)update(.016);assert.ok(s.player.x>x+20);for(let i=0;i<400;i++)update(.016);assert.ok(Math.hypot((s.player.x-500)/411,(s.player.y-320)/258)<=1.001);keys.clear();
start();togglePause();const px=s.player.x;keys.add('d');update(.04);assert.equal(s.player.x,px);assert.equal(paused,true);togglePause();keys.clear();for(let i=0;i<3000;i++)update(.04);assert.equal(running,true);assert.equal(s.health,3);
// Opening a help/audio surface freezes gameplay without changing explicit pause.
start();uiAudioOpen=true;const frozenX=s.player.x;keys.add('d');update(.04);assert.equal(s.player.x,frozenX);assert.equal(active(),false);uiAudioOpen=false;uiHelpOpen=true;update(.04);assert.equal(s.player.x,frozenX);uiHelpOpen=false;keys.clear();assert.equal(active(),true);
// Music scheduling uses one clock and does not start new notes while paused/muted.
musicTick();assert.ok(audioEvents.some(e=>e[0]==='start'));let events=audioEvents.filter(e=>e[0]==='start').length;togglePause();musicTick();assert.equal(audioEvents.filter(e=>e[0]==='start').length,events);togglePause();sound=false;fx('dash');musicTick();assert.equal(audioEvents.filter(e=>e[0]==='start').length,events);sound=true;fx('dash');assert.ok(audioEvents.filter(e=>e[0]==='start').length>events);
// ESO: independent functions, including Golgi before either reticulum, using actual tokens.
const bachRecord=best;
switchCourse('eso');assert.equal(best,0);assert.equal(running,false);start();
assert.equal($('energy-label').textContent,'FUNCIONES RESUELTAS');
for(let cell=0;cell<3;cell++){
 draw();assert.equal(s.level,cell);
 assert.ok(level().steps.every(t=>energyCost(t)===0&&!t.output&&t.kind==='function'));
 assert.ok(!/ATP|aminoácidos|precursores/i.test(JSON.stringify(level())));
 const jobs=[...level().steps].sort((a,b)=>(a.station==='golgi'?-1:b.station==='golgi'?1:0));
 const initial=s.items.length;assert.equal(initial,jobs.length);
 for(const job of jobs){
   const i=s.items.findIndex(item=>item.type===job.recipe[0]);assert.ok(i>=0);
   s.cargo=[s.items.splice(i,1)[0].type];deliver(job.station);
   assert.equal(s.progressBy[job.station],1);assert.equal(s.energy,0);
 }
 assert.equal(s.items.length,0);assert.equal(s.health,3);assert.equal(s.waiting,true);advanceFixture();
}
assert.equal(s.correct,16);assert.equal(s.completed,3);assert.equal(running,false);
const esoRecord=best;assert.ok(esoRecord>0);
switchCourse('bach');assert.equal(best,bachRecord);assert.equal(s.correct,0);assert.equal(s.level,0);
switchCourse('eso');assert.equal(best,esoRecord);assert.equal(localStorage.getItem('micro-course'),'eso');
// No hints about absent reticula in bacteria; all plant edges are real delivery targets.
start();s.level=2;initFlight();revealHint('ribo');assert.ok(!/RER/.test(s.feedback));
s.level=1;initFlight();
for(const point of [{x:500,y:70},{x:500,y:570},{x:90,y:321},{x:910,y:321},{x:102,y:83},{x:898,y:559}]){
 s.player={...s.player,...point,vx:0,vy:0};update(.016);assert.ok(membraneDistance(s.player)>=15.9);
}
// Direct selection creates a standalone round and separate best scores.
selectCell(2);assert.equal(s.level,2);assert.equal(running,false);assert.equal(s.correct,0);assert.equal(best,0);
start();assert.equal(s.level,2);assert.ok(!level().pool.includes('react'));
for(const point of [{x:500,y:125},{x:908,y:320},{x:480,y:285},{x:760,y:190}]){s.player={...s.player,...point};s.cargo=['info'];renderFlightStatus();assert.ok($('flight-status').innerHTML.includes(structures[nearStation()].name));assert.ok($('flight-status').innerHTML.includes('Entregar tu carga aquí'))}
const beforeHints=s.hints,beforeScore=s.score;
showMissionHelp({dataset:{help:'ribo'},getBoundingClientRect(){return {right:100,bottom:100}}});
assert.equal(s.hints,beforeHints);assert.equal(s.score,beforeScore);assert.equal(active(),true);
hint('ribo');assert.equal(s.hints,1);assert.equal(uiHelpOpen,true);assert.equal(active(),false);
uiHelpOpen=false;hint('ribo');assert.equal(s.hints,1);uiHelpOpen=false;
for(const t of level().steps)send(t.recipe,t.station);
assert.equal(s.waiting,true);nextLevel();assert.equal(running,false);assert.equal(s.level,2);assert.equal(s.completed,1);
assert.ok(Number(localStorage.getItem('micro-round-eso-2-v3-best'))>0);
selectCell(0);assert.equal(best,esoRecord);start();assert.equal(s.level,0);

`,sandbox);console.log('OK: ambos cursos completos, recursos finitos, funciones independientes ESO, rutas Bach, récords separados, membranas, controles y audio.');
