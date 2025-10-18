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
    {id:14,name:'UI Error',src:'ui_error.mp3',tags:['ui','negative','short']},
    {id:15,name:'Heal Gain',src:'heal_gain.mp3',tags:['game','positive','fx','health']},
    {id:16,name:'Chest Open',src:'chest_open.mp3',tags:['game','collect','interaction','fx']},
    {id:17,name:'Water Splash',src:'water_splash.mp3',tags:['game','movement','environment','short']},
    {id:18,name:'Fast Whoosh',src:'whoosh_fast.mp3',tags:['game','movement','fx','short']},
    {id:19,name:'Thunder Clap',src:'thunder_clap.mp3',tags:['game','environment','impact']},
    {id:20,name:'Bow Shot',src:'bow_shot.mp3',tags:['game','weapon','fx','short']},
    {id:21,name:'Rope Rustle',src:'rope_rustle.mp3',tags:['game','interaction','ambient']},
    {id:22,name:'Power Down',src:'power_down.mp3',tags:['game','negative','fx']},
    {id:23,name:'Teleport',src:'teleport.mp3',tags:['game','magic','fx','short']},
    {id:24,name:'Metal Clank',src:'metal_clank.mp3',tags:['game','weapon','impact','fx']},
    {id:25,name:'Sword Clash',src:'sword_clash.mp3',tags:['weapon','impact','fx','short']},
    {id:26,name:'Glass Break',src:'glass_break.mp3',tags:['environment','fx','impact','short']},
    {id:27,name:'Sci‑Fi Beam',src:'sci_fi_beam.mp3',tags:['sci-fi','weapon','fx','short']},
    {id:28,name:'Monster Roar',src:'monster_roar.mp3',tags:['creature','ambient','impact','game']},
    {id:29,name:'Ambient Cave',src:'ambient_cave.mp3',tags:['ambience','environment','loop']},
    {id:30,name:'Electric Zap',src:'electric_zap.mp3',tags:['fx','electronic','short','game']},
    {id:31,name:'Item Drop',src:'item_drop.mp3',tags:['game','interaction','fx','short']},
    {id:32,name:'Door Creak',src:'door_creak.mp3',tags:['environment','interaction','game']},
    {id:33,name:'Shield Block',src:'shield_block.mp3',tags:['game','weapon','defense','impact']},
    {id:34,name:'Level Up',src:'level_up.mp3',tags:['game','positive','ui','reward']},
    {id:35,name:'Gravel Footsteps',src:'gravel_footsteps.mp3',tags:['character','movement','environment','loop']},
    {id:36,name:'Winch Crank',src:'winch_crank.mp3',tags:['mechanism','interaction','fx']},
    {id:37,name:'Poison Debuff',src:'poison_debuff.mp3',tags:['magic','negative','fx','status']},
    {id:38,name:'Item Equip',src:'item_equip.mp3',tags:['ui','inventory','interaction']},
    {id:39,name:'Victory Fanfare',src:'victory_fanfare.mp3',tags:['game','positive','ui','reward']},
    {id:40,name:'Portal Open',src:'portal_open.mp3',tags:['magic','teleport','fx']},
    {id:41,name:'Critical Hit',src:'critical_hit.mp3',tags:['weapon','impact','game','short']},
    {id:42,name:'Quest Update',src:'quest_update.mp3',tags:['ui','notification','positive']},
    {id:43,name:'Heavy Panting',src:'heavy_panting.mp3',tags:['character','movement','loop','negative']},
    {id:44,name:'Gear Grind',src:'gear_grind.mp3',tags:['mechanism','interaction','fx']},
    {id:45,name:'Industrial Hatch Open',src:'industrial_hatch_open.mp3',tags:['environment','mechanism','sci-fi','interaction']},
    {id:46,name:'Fire Impact',src:'fire_impact.mp3',tags:['magic','damage','fx','impact','short']},
    {id:47,name:'Rapid Laser Fire',src:'rapid_laser_fire.mp3',tags:['sci-fi','weapon','fx']},
    {id:48,name:'Wind Chime Puzzle',src:'wind_chime_puzzle.mp3',tags:['ambience','puzzle','positive','fx']},
    {id:49,name:'Slime Squish',src:'slime_squish.mp3',tags:['creature','environment','movement','fx','short']},
    {id:50,name:'Ammo Pickup',src:'ammo_pickup.mp3',tags:['game','inventory','short','fx']},
    {id:51,name:'Generator Hum',src:'generator_hum.mp3',tags:['ambience','industrial','loop','environment']},
    {id:52,name:'Ice Freeze',src:'ice_freeze.mp3',tags:['magic','fx','short','environment']},
    {id:53,name:'Ghost Whisper',src:'ghost_whisper.mp3',tags:['creature','ambient','spooky']},
    {id:54,name:'Mech Door Close',src:'mechanical_door_close.mp3',tags:['environment','mechanism','interaction']},
    {id:55,name:'Invisibility Stealth',src:'invisibility_stealth.mp3',tags:['magic', 'utility', 'stealth', 'fx']},
    {id:56,name:'Haste Buff',src:'haste_buff.mp3',tags:['positive', 'status', 'movement', 'fx']},
    {id:57,name:'Snare Debuff',src:'snare_debuff.mp3',tags:['negative', 'status', 'movement', 'fx']},
    {id:58,name:'Shield Activate',src:'shield_activate.mp3',tags:['positive', 'status', 'defense', 'fx']},
    {id:59,name:'Aggressive Warp Out',src:'warp_out_aggressive.mp3',tags:['sci-fi', 'teleport', 'fx', 'impact']},
    {id:60,name:'Ethereal Arrival',src:'ethereal_arrival.mp3',tags:['magic', 'teleport', 'fx', 'short']},
    {id:61,name:'Teleport Glitch',src:'teleport_glitch.mp3',tags:['sci-fi', 'teleport', 'negative', 'fx']},
    {id:62,name:'Force Field Recharge',src:'force_field_recharge.mp3',tags:['sci-fi', 'defense', 'fx', 'status']},
    {id:63,name:'Magic Ward Deflect',src:'magic_ward_deflect.mp3',tags:['magic', 'defense', 'impact', 'fx']},
    {id:64,name:'Heavy Armor Hit',src:'heavy_armor_hit.mp3',tags:['defense', 'impact', 'armor', 'fx']},
    {id:65,name:'Chain Armor Jingle',src:'chain_armor_jingle.mp3',tags:['armor', 'movement', 'fx', 'loop']},
    {id:66,name:'Plate Armor Walk',src:'plate_armor_clank.mp3',tags:['armor', 'movement', 'heavy', 'fx']},
    {id:67,name:'Armor Shatter',src:'armor_shatter.mp3',tags:['armor', 'negative', 'impact', 'fx']},
    {id:68,name:'Dagger Stab',src:'dagger_stab.mp3',tags:['weapon', 'impact', 'damage', 'short', 'fx']},
    {id:69,name:'Acid Burn',src:'acid_burn.mp3',tags:['magic', 'damage', 'status', 'negative', 'fx']},
    {id:70,name:'Crushing Blow',src:'crushing_blow.mp3',tags:['weapon', 'impact', 'damage', 'heavy', 'fx']},
    {id:71,name:'System Boot',src:'system_boot.mp3',tags:['electronic', 'sci-fi', 'positive', 'fx']},
    {id:72,name:'Holographic UI Tap',src:'holographic_ui_tap.mp3',tags:['electronic', 'ui', 'sci-fi', 'short']},
    {id:73,name:'Data Transfer Loop',src:'data_transfer_loop.mp3',tags:['electronic', 'sci-fi', 'loop', 'ambience']},
    {id:74,name:'Electronic Lock',src:'electronic_lock.mp3',tags:['electronic', 'mechanism', 'sci-fi', 'fx']},
    {id:75,name:'Low Health Warning',src:'low_health_warning.mp3',tags:['health','negative','status','loop','ui']},
    {id:76,name:'Max Health Boost',src:'max_health_boost.mp3',tags:['health','positive','fx','reward']},
    {id:77,name:'Health Drain Sizzle',src:'health_drain_sizzle.mp3',tags:['health','negative','status','fx']},
    {id:78,name:'Steam Release',src:'steam_release.mp3',tags:['industrial','environment','fx','short']},
    {id:79,name:'Metal Press',src:'metal_press.mp3',tags:['industrial','mechanism','heavy','impact']},
    {id:80,name:'Hydraulic Pump Loop',src:'hydraulic_pump.mp3',tags:['industrial','mechanism','loop','ambience']},
    {id:81,name:'Wrench Drop',src:'wrench_drop.mp3',tags:['industrial','interaction','fx','short']},
    {id:82,name:'Flowing River Loop',src:'flowing_river_loop.mp3',tags:['nature','ambience','loop','environment']},
    {id:83,name:'Owl Hoot',src:'owl_hoot.mp3',tags:['nature','creature','short','ambient']},
    {id:84,name:'Strong Wind Howl',src:'strong_wind_howl.mp3',tags:['nature','environment','loop','weather']},
    {id:85,name:'Gentle Rain Patter',src:'gentle_rain_patter.mp3',tags:['nature','ambience','loop','weather']}
];

// --- Websim Setup ---
const room = new WebsimSocket();
const FAVORITES_COLLECTION = 'user_favorites_v1';
const favoriteCollection = room.collection(FAVORITES_COLLECTION);
let currentUserFavoritesRecord = null;
let allFavoritesRecords = [];
let assetFavoriteCounts = {};
let currentUserName = null; 
// ---------------------

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
ps=(b,btn)=>{if(!ac)return;cp?.source?.stop();cp?.button?.classList.remove('playing');const s=ac.createBufferSource();s.buffer=b;s.connect(ac.destination);s.start(0);btn.classList.add('playing');s.onended=()=>{btn.classList.remove('playing');cp?.source===s&&(cp=null)};cp={source:s,button:btn}};

// --- Favorites Logic ---
const getCurrentUser = async () => {
    if (currentUserName) return { username: currentUserName };
    const user = await window.websim.getCurrentUser();
    currentUserName = user.username;
    return user;
};

const calculateFavoriteCounts = (records) => {
    const counts = {};
    records.forEach(record => {
        if (record.favorites && record.username) {
            Object.keys(record.favorites).forEach(assetId => {
                if (record.favorites[assetId]) {
                    counts[assetId] = (counts[assetId] || 0) + 1;
                }
            });
        }
    });
    assetFavoriteCounts = counts;
};

const isFavoritedByCurrentUser = (assetId) => {
    if (!currentUserFavoritesRecord || !currentUserFavoritesRecord.favorites) return false;
    return !!currentUserFavoritesRecord.favorites[assetId];
};

const handleAllFavoritesUpdate = async (records) => {
    allFavoritesRecords = records;
    calculateFavoriteCounts(records);
    
    const user = await getCurrentUser();
    if (user && user.username) {
        currentUserFavoritesRecord = records.find(r => r.username === user.username) || null;
    }

    fr(); // Re-render the gallery to update counts, icons, and filter results
    rt(); // Re-render tags to ensure 'Favorites' filter state is correct
};

const toggleFavorite = async (assetId) => {
    const user = await getCurrentUser();
    if (!user || !user.username) {
        alert("Please log in to save favorites.");
        return;
    }

    // 1. Prepare new favorites data
    const favoritesData = currentUserFavoritesRecord ? { ...currentUserFavoritesRecord.favorites } : {};
    const currentState = !!favoritesData[assetId];

    if (currentState) {
        delete favoritesData[assetId];
    } else {
        favoritesData[assetId] = true;
    }
    
    const newPayload = { favorites: favoritesData };

    // 2. Optimistic update
    // Update local state temporarily for fast feedback
    const oldRecord = currentUserFavoritesRecord;
    if (currentUserFavoritesRecord) {
        currentUserFavoritesRecord = { 
            ...currentUserFavoritesRecord, 
            favorites: favoritesData 
        };
    } else {
        // Mock a temporary record ID if creating for the first time
        currentUserFavoritesRecord = { 
            id: 'temp_id', 
            username: user.username, 
            favorites: favoritesData 
        };
    }
    // Since global counts depend on allFavoritesRecords, we update counts manually for optimistic rendering
    // This is complex and relies on the update being fast. Let's skip local count modification and rely on the UI update triggered by `fr()` to show the state change.

    fr(); 

    // 3. Perform persistence update/create
    try {
        if (oldRecord) {
            await favoriteCollection.update(oldRecord.id, newPayload);
        } else {
            await favoriteCollection.create(newPayload);
        }
    } catch (e) {
        console.error("Failed to update favorites:", e);
        // If it fails, rely on the next subscription update to revert the optimistic change, or handle notification.
    }
};

const setupSubscriptions = () => {
    favoriteCollection.subscribe(handleAllFavoritesUpdate);
};
// ---------------------

rg=i=>{g.innerHTML='';nr.classList[i.length?'add':'remove']('hidden');i.forEach(x=>{
    const c=document.createElement('div');
    c.className='audio-card';
    
    const assetIdString = x.id.toString();
    const isFav = isFavoritedByCurrentUser(assetIdString);
    const favCount = assetFavoriteCounts[assetIdString] || 0;

    // Download Button
    const dl=document.createElement('a');
    dl.href=x.src;
    dl.download=x.name.replace(/ /g, '_')+'.mp3';
    dl.className='download-button';
    dl.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
    
    // Favorite Group (Top Right)
    const topRightGroup = document.createElement('div');
    topRightGroup.className = 'favorite-group';
    
    const fb = document.createElement('button');
    fb.className = 'favorite-button';
    // Heart icon SVG (fill="none" initially)
    fb.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></svg>';
    
    if (isFav) {
        fb.classList.add('favorited');
        // Fill the heart SVG path when favorited
        fb.querySelector('path').setAttribute('fill', 'currentColor');
    }
    
    fb.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(assetIdString);
    };

    // Favorite Count
    const countDisplay = document.createElement('span');
    countDisplay.className = 'favorite-count';
    countDisplay.textContent = favCount;
    
    topRightGroup.append(fb, countDisplay);

    // Play Button
    const b=document.createElement('button');
    b.className='play-button';
    b.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z"></path></svg>';
    b.onclick=async()=>{ia();const bf=await la(x.src);bf&&ps(bf,b)};
    
    // Name
    const n=document.createElement('div');n.className='audio-name';n.textContent=x.name;
    
    c.append(dl, topRightGroup, b, n);
    g.appendChild(c)})},
rt=()=>{const a=[...new Set(d.flatMap(x=>x.tags))],r=gr();a.sort((x,y)=>{const ix=r.indexOf(x),iy=r.indexOf(y);return ix!==-1&&iy!==-1?ix-iy:ix!==-1?-1:iy!==-1?1:x.localeCompare(y)});tf.innerHTML='';
    
    // 1. ALL button
    const ab=document.createElement('button');ab.textContent='All';ab.classList.add('active');
    ab.onclick=()=>{
        at.clear();
        document.querySelectorAll('.tag-filters button').forEach(b=>b.classList.remove('active'));
        ab.classList.add('active');
        fr();
    };
    tf.appendChild(ab);
    
    // 2. FAVORITES button
    const favTagKey = '_favorites_';
    const fb=document.createElement('button');
    fb.textContent='Favorites';
    fb.dataset.tag=favTagKey;
    
    const isFavoritesActive = at.has(favTagKey);
    if (isFavoritesActive) {
        fb.classList.add('active');
        ab.classList.remove('active');
    }

    fb.onclick=()=>{
        const wasActive = at.has(favTagKey);
        
        // Clear all filters first
        at.clear();
        document.querySelectorAll('.tag-filters button').forEach(b=>b.classList.remove('active'));
        
        if (!wasActive) {
            at.add(favTagKey);
            fb.classList.add('active');
        } else {
            ab.classList.add('active');
        }
        
        fr();
    };
    tf.appendChild(fb);
    
    // 3. Regular tags
    a.forEach(t=>{
        const b=document.createElement('button');
        b.textContent=t;b.dataset.tag=t;
        
        if (at.has(t) && !isFavoritesActive) {
            b.classList.add('active');
            ab.classList.remove('active');
        }
        
        b.onclick=()=>{
            // If favorites was active, clear it
            if (at.has(favTagKey)) {
                at.delete(favTagKey);
                document.querySelector(`button[data-tag='${favTagKey}']`).classList.remove('active');
            }
            
            document.querySelector('.tag-filters button').classList.remove('active'); // Deactivate 'All'
            b.classList.toggle('active');
            at.has(t)?at.delete(t):(at.add(t),ar(t));
            
            // Re-activate 'All' if no other filter is selected
            !at.size && ab.classList.add('active');
            
            fr();
        };
        tf.appendChild(b);
    });
    us()
},
fr=()=>{
    const s=si.value.toLowerCase().trim();
    const favTagKey = '_favorites_';
    const favoritesFilterActive = at.has(favTagKey);

    const f=d.filter(x=>{
        const assetIdString = x.id.toString();
        
        // 1. Filter by search input (Name OR Tag match)
        const matchesSearchInput = !s || (x.name.toLowerCase().includes(s) || x.tags.some(t => t.toLowerCase().includes(s)));
        
        if (!matchesSearchInput) return false;
        
        // 2. Filter by Favorites status
        if (favoritesFilterActive) {
            return isFavoritedByCurrentUser(assetIdString);
        }
        
        // 3. Filter by regular tags
        const activeTags = [...at].filter(t => t !== favTagKey);
        const matchesTags = activeTags.length === 0 || activeTags.every(t => x.tags.includes(t));
        
        return matchesTags;
    });
    rg(f)},
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

document.addEventListener('DOMContentLoaded', async ()=>{
    await getCurrentUser(); // Ensure username is loaded early
    setupSubscriptions(); // Start listening to database changes
    rt(); // Render tags initially (handleAllFavoritesUpdate will call fr/rt again when data arrives)
});