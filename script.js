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

let audioContext;
const audioBuffers = new Map();
let activeTags = new Set();
let currentlyPlaying = null;

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
    const allTags = new Set(audioData.flatMap(item => item.tags));
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
            }
            if(activeTags.size === 0) {
                 allButton.classList.add('active');
            }
            filterAndRender();
        });
        tagFiltersContainer.appendChild(button);
    });
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

// Event Listeners
searchInput.addEventListener('input', filterAndRender);
requestAudioBtn.addEventListener('click', () => {
    // This will open the comments UI with pre-filled text for a suggestion.
    window.websim?.postComment?.({
        content: '\n'
    });
});


// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderTags();
    renderGallery(audioData);
});