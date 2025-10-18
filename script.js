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

// --- Globals ---
const room = new WebsimSocket();
const FAVORITES_COLLECTION = 'user_favorites_v1';
const favoriteCollection = room.collection(FAVORITES_COLLECTION);

const galleryEl = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const tagFiltersEl = document.getElementById('tag-filters');
const requestAudioBtn = document.getElementById('request-audio-btn');
const noResultsEl = document.getElementById('no-results');
const scrollLeftBtn = document.getElementById('scroll-left-btn');
const scrollRightBtn = document.getElementById('scroll-right-btn');

let audioContext;
let audioBufferCache = new Map();
let activeTags = new Set();
let currentPlayback = null;
let recentlyUsedTagsKey = 'audioFilterUsage';

let currentUserFavoritesRecord = null;
let allFavoritesRecords = [];
let assetFavoriteCounts = {};
let currentUserName = null;

let isDragging = false, startX, scrollLeft;

// --- Core Functions ---

const getRecentTags = () => { try { return JSON.parse(localStorage.getItem(recentlyUsedTagsKey) || '[]') } catch (e) { return [] } };
const saveRecentTags = tags => { try { localStorage.setItem(recentlyUsedTagsKey, JSON.stringify(tags)) } catch (e) { console.error("Could not save tags", e) } };
const addRecentTag = tag => { let tags = getRecentTags().filter(x => x !== tag); tags.unshift(tag); saveRecentTags(tags) };
const initAudioContext = () => { if (!audioContext) { audioContext = new (window.AudioContext || window.webkitAudioContext)() } };
const loadAudio = async (url) => {
    if (audioBufferCache.has(url)) return audioBufferCache.get(url);
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBufferCache.set(url, audioBuffer);
        return audioBuffer;
    } catch (e) { console.error(`Error loading ${url}:`, e) }
};
const playSound = (buffer, button) => {
    if (!audioContext) return;
    currentPlayback?.source?.stop();
    currentPlayback?.button?.classList.remove('playing');
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    button.classList.add('playing');
    source.onended = () => {
        button.classList.remove('playing');
        if (currentPlayback?.source === source) {
            currentPlayback = null;
        }
    };
    currentPlayback = { source, button };
};

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
    filterAndRenderGallery();
    renderTags();
};

const toggleFavorite = async (assetId) => {
    const user = await getCurrentUser();
    if (!user || !user.username) {
        alert("Please log in to save favorites.");
        return;
    }

    const favoritesData = currentUserFavoritesRecord ? { ...currentUserFavoritesRecord.favorites } : {};
    if (favoritesData[assetId]) {
        delete favoritesData[assetId];
    } else {
        favoritesData[assetId] = true;
    }
    const newPayload = { favorites: favoritesData };

    if (currentUserFavoritesRecord) {
        await favoriteCollection.update(currentUserFavoritesRecord.id, newPayload);
    } else {
        await favoriteCollection.create(newPayload);
    }
};

const setupSubscriptions = () => {
    favoriteCollection.subscribe(handleAllFavoritesUpdate);
};

// --- Rendering & Filtering ---

const updateScrollButtons = () => {
    if (!scrollLeftBtn || !scrollRightBtn || !tagFiltersEl) return;
    const { scrollWidth, clientWidth, scrollLeft } = tagFiltersEl;
    const isScrollable = scrollWidth > clientWidth;
    if (!isScrollable) {
        scrollLeftBtn.classList.remove('visible');
        scrollRightBtn.classList.remove('visible');
        return;
    }
    scrollLeftBtn.classList.toggle('visible', scrollLeft > 0);
    scrollRightBtn.classList.toggle('visible', scrollLeft < scrollWidth - clientWidth - 1);
};

const renderGallery = (items) => {
    galleryEl.innerHTML = '';
    noResultsEl.classList.toggle('hidden', items.length > 0);
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'audio-card';
        const assetIdString = item.id.toString();
        const isFav = isFavoritedByCurrentUser(assetIdString);
        const favCount = assetFavoriteCounts[assetIdString] || 0;

        card.innerHTML = `
            <a href="${item.src}" download="${item.name.replace(/ /g, '_')}.mp3" class="download-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </a>
            <div class="favorite-group">
                <button class="favorite-button ${isFav ? 'favorited' : ''}" data-asset-id="${assetIdString}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="${isFav ? 'currentColor' : 'none'}"></path>
                    </svg>
                </button>
                <span class="favorite-count">${favCount}</span>
            </div>
            <button class="play-button" data-src="${item.src}">
                <svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z"></path></svg>
            </button>
            <div class="audio-name">${item.name}</div>
        `;

        galleryEl.appendChild(card);
    });

    // Add event listeners after rendering
    galleryEl.querySelectorAll('.play-button').forEach(button => {
        button.onclick = async (e) => {
            initAudioContext();
            const src = e.currentTarget.dataset.src;
            const buffer = await loadAudio(src);
            if (buffer) playSound(buffer, e.currentTarget);
        };
    });

    galleryEl.querySelectorAll('.favorite-button').forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(e.currentTarget.dataset.assetId);
        };
    });
};

const renderTags = () => {
    const allTags = [...new Set(d.flatMap(x => x.tags))];
    const recentTags = getRecentTags();
    allTags.sort((a, b) => {
        const ixA = recentTags.indexOf(a), ixB = recentTags.indexOf(b);
        return (ixA !== -1 && ixB !== -1) ? ixA - ixB : ixA !== -1 ? -1 : ixB !== -1 ? 1 : a.localeCompare(b);
    });
    
    tagFiltersEl.innerHTML = '';
    const favTagKey = '_favorites_';

    const createButton = (text, tag, isActive, onClick) => {
        const button = document.createElement('button');
        button.textContent = text;
        if (tag) button.dataset.tag = tag;
        if (isActive) button.classList.add('active');
        button.onclick = onClick;
        return button;
    };

    const allButton = createButton('All', null, activeTags.size === 0, () => {
        activeTags.clear();
        renderTags();
        filterAndRenderGallery();
    });
    tagFiltersEl.appendChild(allButton);

    const favButton = createButton('Favorites', favTagKey, activeTags.has(favTagKey), () => {
        const wasActive = activeTags.has(favTagKey);
        activeTags.clear();
        if (!wasActive) activeTags.add(favTagKey);
        renderTags();
        filterAndRenderGallery();
    });
    tagFiltersEl.appendChild(favButton);

    allTags.forEach(tag => {
        const button = createButton(tag, tag, activeTags.has(tag) && !activeTags.has(favTagKey), () => {
            if (activeTags.has(favTagKey)) activeTags.delete(favTagKey);
            activeTags.has(tag) ? activeTags.delete(tag) : activeTags.add(tag);
            if (activeTags.has(tag)) addRecentTag(tag);
            renderTags();
            filterAndRenderGallery();
        });
        tagFiltersEl.appendChild(button);
    });

    updateScrollButtons();
};

const filterAndRenderGallery = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const favTagKey = '_favorites_';
    const favoritesFilterActive = activeTags.has(favTagKey);

    const filteredData = d.filter(item => {
        const assetIdString = item.id.toString();
        
        const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm) || item.tags.some(t => t.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;

        if (favoritesFilterActive) return isFavoritedByCurrentUser(assetIdString);
        
        const regularActiveTags = [...activeTags].filter(t => t !== favTagKey);
        return regularActiveTags.length === 0 || regularActiveTags.every(t => item.tags.includes(t));
    });

    renderGallery(filteredData);
};


// --- Event Handlers ---
const handleMouseDown = e => { if(e.button !== 0) return; isDragging = true; tagFiltersEl.classList.add('grabbing'); startX = e.pageX - tagFiltersEl.offsetLeft; scrollLeft = tagFiltersEl.scrollLeft; };
const handleMouseLeave = () => { isDragging = false; tagFiltersEl.classList.remove('grabbing'); };
const handleMouseUp = () => { isDragging = false; tagFiltersEl.classList.remove('grabbing'); };
const handleMouseMove = e => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - tagFiltersEl.offsetLeft; tagFiltersEl.scrollLeft = scrollLeft - (x - startX) * 1.5; };
const handleRequestAudio = () => window.websim?.postComment?.({ content: '\n' });
const handleScrollLeft = () => tagFiltersEl.scrollBy({ left: -tagFiltersEl.clientWidth * 0.8, behavior: 'smooth' });
const handleScrollRight = () => tagFiltersEl.scrollBy({ left: tagFiltersEl.clientWidth * 0.8, behavior: 'smooth' });

// --- Initialization ---
const init = async () => {
    // Add event listeners
    searchInput.addEventListener('input', filterAndRenderGallery);
    requestAudioBtn.onclick = handleRequestAudio;
    scrollLeftBtn.onclick = handleScrollLeft;
    scrollRightBtn.onclick = handleScrollRight;
    tagFiltersEl.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    tagFiltersEl.addEventListener('mousedown', handleMouseDown);
    tagFiltersEl.addEventListener('mouseleave', handleMouseLeave);
    tagFiltersEl.addEventListener('mouseup', handleMouseUp);
    tagFiltersEl.addEventListener('mousemove', handleMouseMove);

    // Initial load
    await getCurrentUser();
    setupSubscriptions(); // Subscribes and triggers first data load via handleAllFavoritesUpdate
    renderTags(); // Render tags, gallery will be rendered by the subscription callback
};

document.addEventListener('DOMContentLoaded', init);

.play-button{width:44px;height:44px}.play-button svg{width:20px;height:20px}.audio-name{font-size:.8rem}

@media(max-width:640px){#app-container{padding:.75rem}header{flex-direction:column;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}header h1{font-size:1.5rem}header p{font-size:.875rem;max-width:100%}#request-audio-btn{width:100%;padding:.85rem}.controls{margin-bottom:1.5rem}#search-input{font-size:.95rem}.tag-filters{gap:.4rem}.tag-filters button{padding:.4rem .8rem;font-size:.85rem}.gallery{grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:.75rem}.audio-card{padding:.75rem;gap:.5rem;position:relative}
.download-button{top:8px;left:8px;width:26px;height:26px}