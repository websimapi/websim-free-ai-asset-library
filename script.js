const d=[
    {id:1,name:'Laser Shot',src:'laser_shot.mp3',tags:['sci-fi','weapon','short','fx']},
    {id:2,name:'Coin Pickup',src:'coin_pickup.mp3',tags:['game','positive','ui','collect']},
    {id:3,name:'Jump',src:'jump.mp3',tags:['game','character','movement','short']},
    {id:4,name:'Explosion',src:'explosion.mp3',tags:['game','weapon','fx','impact']},
    {id:5,name:'Power Up',src:'power_up.mp3',tags:['game','positive','fx','collect']},
    {id:6,name:'Hit Damage',src:'hit_damage.mp3',tags:['game','negative','fx','impact']},
    {id:7,name:'Menu Select',src:'menu_select.mp3',tags:['ui','short','game']},
    {id:8,name:'Footsteps',src:'footsteps_grass.mp3',tags:['character','movement','loop']},
    {id:9,name:'Sword Swing',src:'sword_swing.mp3',tags:['weapon','character','short','fx']},
    {id:10,name:'Magic Spell',src:'magic_spell.mp3',tags:['magic','fx','positive','game']},
    {id:11,name:'Alert Notification',src:'alert_notification.mp3',tags:['ui','notification','short']},
    {id:12,name:'Ambient Forest',src:'ambient_forest.mp3',tags:['ambience','nature','loop']},
    {id:13,name:'UI Confirm',src:'ui_confirm.mp3',tags:['ui','positive','short']},
    {id:14,name:'UI Error',src:'ui_error.mp3',tags:['ui','negative','short']}
];

const g=document.getElementById('gallery'),
si=document.getElementById('search-input'),
tf=document.getElementById('tag-filters'),
rb=document.getElementById('request-audio-btn'),
nr=document.getElementById('no-results'),
lb=document.getElementById('scroll-left-btn'),
rb2=document.getElementById('scroll-right-btn');

let ac,ab=new Map(),at=new Set(),cp=null,k='audioFilterUsage',iD=!1,sX,sL;

const gr=()=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}},
sr=t=>{try{localStorage.setItem(k,JSON.stringify(t))}catch(e){}},
ar=t=>{let r=gr().filter(x=>x!==t);r.unshift(t);sr(r)},
ia=()=>{ac||(ac=new(window.AudioContext||window.webkitAudioContext)())},
la=async u=>{if(ab.has(u))return ab.get(u);try{const r=await fetch(u),a=await r.arrayBuffer(),b=await ac.decodeAudioData(a);ab.set(u,b);return b}catch(e){console.error(`Error loading ${u}:`,e)}},
ps=(b,btn)=>{if(!ac)return;cp?.source?.stop();cp?.button?.classList.remove('playing');const s=ac.createBufferSource();s.buffer=b;s.connect(ac.destination);s.start(0);btn.classList.add('playing');s.onended=()=>{btn.classList.remove('playing');cp?.source===s&&(cp=null)};cp={source:s,button:btn}},
rg=i=>{g.innerHTML='';nr.classList[i.length?'add':'remove']('hidden');i.forEach(x=>{const c=document.createElement('div');c.className='audio-card';const b=document.createElement('button');b.className='play-button';b.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z"></path></svg>';b.onclick=async()=>{ia();const bf=await la(x.src);bf&&ps(bf,b)};const n=document.createElement('div');n.className='audio-name';n.textContent=x.name;c.append(b,n);g.appendChild(c)})},
rt=()=>{const a=[...new Set(d.flatMap(x=>x.tags))],r=gr();a.sort((x,y)=>{const ix=r.indexOf(x),iy=r.indexOf(y);return ix!==-1&&iy!==-1?ix-iy:ix!==-1?-1:iy!==-1?1:x.localeCompare(y)});tf.innerHTML='';const ab=document.createElement('button');ab.textContent='All';ab.classList.add('active');ab.onclick=()=>{at.clear();document.querySelectorAll('.tag-filters button').forEach(b=>b.classList.remove('active'));ab.classList.add('active');fr()};tf.appendChild(ab);a.forEach(t=>{const b=document.createElement('button');b.textContent=t;b.dataset.tag=t;b.onclick=()=>{document.querySelector('.tag-filters button').classList.remove('active');b.classList.toggle('active');at.has(t)?at.delete(t):(at.add(t),ar(t));!at.size&&ab.classList.add('active');fr()};tf.appendChild(b)});us()},
fr=()=>{const s=si.value.toLowerCase().trim(),f=d.filter(x=>{const nm=x.name.toLowerCase().includes(s),tm=x.tags.some(t=>t.toLowerCase().includes(s)),sm=nm||tm,am=!at.size||[...at].every(t=>x.tags.includes(t));return sm&&am});rg(f)},
us=()=>{if(!lb||!rb2||!tf)return;const{scrollWidth:sw,clientWidth:cw,scrollLeft:sl}=tf,is=sw>cw;if(!is){lb.classList.remove('visible');rb2.classList.remove('visible');return}lb.classList[sl>0?'add':'remove']('visible');rb2.classList[sl<sw-cw-1?'add':'remove']('visible')};

tf.addEventListener('mousedown',e=>{if(e.button!==0)return;iD=!0;tf.classList.add('grabbing');sX=e.pageX-tf.offsetLeft;sL=tf.scrollLeft});
tf.addEventListener('mouseleave',()=>{iD=!1;tf.classList.remove('grabbing')});
tf.addEventListener('mouseup',()=>{iD=!1;tf.classList.remove('grabbing')});
tf.addEventListener('mousemove',e=>{if(!iD)return;e.preventDefault();const x=e.pageX-tf.offsetLeft;tf.scrollLeft=sL-(x-sX)*1.5});

si.addEventListener('input',fr);
rb.onclick=()=>window.websim?.postComment?.({content:'\n'});
lb.onclick=()=>tf.scrollBy({left:-tf.clientWidth*.8,behavior:'smooth'});
rb2.onclick=()=>tf.scrollBy({left:tf.clientWidth*.8,behavior:'smooth'});
tf.addEventListener('scroll',us,{passive:!0});
window.addEventListener('resize',us);

document.addEventListener('DOMContentLoaded',()=>{rt();rg(d)});