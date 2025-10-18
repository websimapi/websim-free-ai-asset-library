const audioData = [
    { id: 1, name: 'Laser Shot', src: 'laser_shot.mp3', tags: ['sci-fi', 'weapon', 'short', 'fx'] },
    { id: 2, name: 'Coin Pickup', src: 'coin_pickup.mp3', tags: ['game', 'positive', 'ui', 'collect'] },
    { id: 3, name: 'Jump', src: 'jump.mp3', tags: ['game', 'character', 'movement', 'short'] },
    { id: 4, name: 'Explosion', src: 'explosion.mp3', tags: ['game', 'weapon', 'fx', 'impact'] },
    { id: 5, name: 'Power Up', src: 'power_up.mp3', tags: ['game', 'positive', 'fx', 'collect'] },
    { id: 6, name: 'Hit Damage', src: 'hit_damage.mp3', tags: ['game', 'negative', 'fx', 'impact'] },
    { id: 7, name: 'Menu Select', src: 'menu_select.mp3', tags: ['ui', 'short', 'game'] },
    { id: 8, name: 'Footsteps', src: 'footsteps_grass.mp3', tags: ['character', 'movement', 'loop'] },
    { id: 9, name: 'Sword Swing', src: 'sword_swing.mp3', tags: ['weapon', 'character', 'short', 'fx'] },
    { id: 10, name: 'Magic Spell', src: 'magic_spell.mp3', tags: ['magic', 'fx', 'positive', 'game'] },
    { id: 11, name: 'Alert Notification', src: 'alert_notification.mp3', tags: ['ui', 'notification', 'short'] },
    { id: 12, name: 'Ambient Forest', src: 'ambient_forest.mp3', tags: ['ambience', 'nature', 'loop'] },
    { id: 13, name: 'UI Confirm', src: 'ui_confirm.mp3', tags: ['ui', 'positive', 'short'] },
    { id: 14, name: 'UI Error', src: 'ui_error.mp3', tags: ['ui', 'negative', 'short'] }
];

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const tagFiltersContainer = document.getElementById('tag-filters');
const requestAudioBtn = document.getElementById('request-audio-btn');
const noResultsEl = document.getElementById('no-results');
const scrollLeftBtn = document.getElementById('scroll-left-btn');
const scrollRightBtn = document.getElementById('scroll-right-btn');

let audioContext;
const audioBuffers = new Map();
let activeTags = new Set();
let currentlyPlaying = null;
const RECENT_TAGS_STORAGE_KEY = 'audioFilterUsage';

// --- Local Storage Functions ---
function getRecentTags() {
    try {
        const tags = localStorage.getItem(RECENT_TAGS_STORAGE_KEY);
        return tags ? JSON.parse(tags) : [];
    } catch (e) {
        console.error("Failed to parse recent tags from localStorage", e);
        return [];
    }
}

function saveRecentTags(tags) {
    try {
        localStorage.setItem(RECENT_TAGS_STORAGE_KEY, JSON.stringify(tags));
    } catch (e) {
        console.error("Failed to save recent tags to localStorage", e);
    }
}

function addTagToRecent(tag) {
    let recentTags = getRecentTags();
    // Remove tag if it already exists to move it to the front
    recentTags = recentTags.filter(t => t !== tag);
    // Add the new tag to the beginning of the array
    recentTags.unshift(tag);
    // Optional: Limit the number of recent tags stored
    // recentTags = recentTags.slice(0, 20); 
    saveRecentTags(recentTags);
}

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

async function loadAudio(url) {
    if (audioBuffers.has(url)) {
        return audioBuffers.get(url);
    }
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.set(url, audioBuffer);
        return audioBuffer;
    } catch (error) {
        console.error(`Error loading audio ${url}:`, error);
    }
}

function playSound(buffer, button) {
     if (!audioContext) return;

    if (currentlyPlaying && currentlyPlaying.source) {
        currentlyPlaying.source.stop();
        if (currentlyPlaying.button) {
            currentlyPlaying.button.classList.remove('playing');
        }
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);

    button.classList.add('playing');
    source.onended = () => {
        button.classList.remove('playing');
        if(currentlyPlaying && currentlyPlaying.source === source) {
            currentlyPlaying = null;
        }
    };
    
    currentlyPlaying = { source, button };
}

function renderGallery(items) {
    gallery.innerHTML = '';
    if (items.length === 0) {
        noResultsEl.classList.remove('hidden');
    } else {
        noResultsEl.classList.add('hidden');
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'audio-card';

        const button = document.createElement('button');
        button.className = 'play-button';
        button.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M8 5v14l11-7z"></path>
            </svg>
        `;
        button.addEventListener('click', async () => {
            initAudio();
            const buffer = await loadAudio(item.src);
            if (buffer) {
                playSound(buffer, button);
            }
        });

        const name = document.createElement('div');
        name.className = 'audio-name';
        name.textContent = item.name;

        card.appendChild(button);
        card.appendChild(name);
        gallery.appendChild(card);
    });
}

function renderTags() {
    const allTags = [...new Set(audioData.flatMap(item => item.tags))];
    const recentTags = getRecentTags();
    
    // Sort tags: recent ones first, then alphabetical for the rest
    allTags.sort((a, b) => {
        const indexA = recentTags.indexOf(a);
        const indexB = recentTags.indexOf(b);

        if (indexA !== -1 && indexB !== -1) { // Both are recent
            return indexA - indexB; // Lower index (more recent) comes first
        }
        if (indexA !== -1) return -1; // A is recent, B is not
        if (indexB !== -1) return 1;  // B is recent, A is not
        return a.localeCompare(b);    // Neither is recent, sort alphabetically
    });

    tagFiltersContainer.innerHTML = '';
    
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.classList.add('active');
    allButton.addEventListener('click', () => {
        activeTags.clear();
        document.querySelectorAll('.tag-filters button').forEach(b => b.classList.remove('active'));
        allButton.classList.add('active');
        filterAndRender();
    });
    tagFiltersContainer.appendChild(allButton);

    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.dataset.tag = tag;
        button.addEventListener('click', () => {
            document.querySelector('.tag-filters button').classList.remove('active'); // Deactivate 'All' button
            button.classList.toggle('active');

            if (activeTags.has(tag)) {
                activeTags.delete(tag);
            } else {
                activeTags.add(tag);
                addTagToRecent(tag); // Add to recent when tag is activated
            }
            if(activeTags.size === 0) {
                 allButton.classList.add('active');
            }
            filterAndRender();
        });
        tagFiltersContainer.appendChild(button);
    });

    // After rendering, check if scroll buttons are needed
    updateScrollButtons();
}


function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredData = audioData.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const searchMatch = nameMatch || tagMatch;

        const activeTagMatch = activeTags.size === 0 || [...activeTags].every(tag => item.tags.includes(tag));

        return searchMatch && activeTagMatch;
    });

    renderGallery(filteredData);
}

// --- Scroll Button Logic for Tag Filters ---
function updateScrollButtons() {
    if (!scrollLeftBtn || !scrollRightBtn || !tagFiltersContainer) return;

    const { scrollWidth, clientWidth, scrollLeft } = tagFiltersContainer;
    const isScrollable = scrollWidth > clientWidth;
    
    if (!isScrollable) {
        scrollLeftBtn.classList.remove('visible');
        scrollRightBtn.classList.remove('visible');
        return;
    }

    // Check left button
    if (scrollLeft > 0) {
        scrollLeftBtn.classList.add('visible');
    } else {
        scrollLeftBtn.classList.remove('visible');
    }

    // Check right button
    if (scrollLeft < scrollWidth - clientWidth - 1) { // -1 for subpixel rendering issues
        scrollRightBtn.classList.add('visible');
    } else {
        scrollRightBtn.classList.remove('visible');
    }
}

// --- Draggable Tag Filters for Desktop ---
let isDown = false;
let startX;
let scrollLeft;

tagFiltersContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // only for left mouse button
    isDown = true;
    tagFiltersContainer.classList.add('grabbing');
    startX = e.pageX - tagFiltersContainer.offsetLeft;
    scrollLeft = tagFiltersContainer.scrollLeft;
});

tagFiltersContainer.addEventListener('mouseleave', () => {
    isDown = false;
    tagFiltersContainer.classList.remove('grabbing');
});

tagFiltersContainer.addEventListener('mouseup', () => {
    isDown = false;
    tagFiltersContainer.classList.remove('grabbing');
});

tagFiltersContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tagFiltersContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplier for faster scroll
    tagFiltersContainer.scrollLeft = scrollLeft - walk;
});


// Event Listeners
searchInput.addEventListener('input', filterAndRender);
requestAudioBtn.addEventListener('click', () => {
    // This will open the comments UI with pre-filled text for a suggestion.
    window.websim?.postComment?.({
        content: '\n'
    });
});

scrollLeftBtn.addEventListener('click', () => {
    const scrollAmount = tagFiltersContainer.clientWidth * 0.8;
    tagFiltersContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
    const scrollAmount = tagFiltersContainer.clientWidth * 0.8;
    tagFiltersContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Update scroll buttons on scroll
tagFiltersContainer.addEventListener('scroll', updateScrollButtons, { passive: true });

// Update on resize
window.addEventListener('resize', updateScrollButtons);


// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderTags();
    renderGallery(audioData);
});