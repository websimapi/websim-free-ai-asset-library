import { audioLibrary } from './audio-data.js';
import { AudioPlayer } from './audio-player.js';
import { FavoritesManager } from './favorites-manager.js';
import { UIRenderer } from './ui-renderer.js';
import { getRecentTags, addRecentTag } from './tag-storage.js';

const room = new WebsimSocket();

// DOM elements
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const tagFiltersContainer = document.getElementById('tag-filters');
const noResultsEl = document.getElementById('no-results');
const scrollLeftBtn = document.getElementById('scroll-left-btn');
const scrollRightBtn = document.getElementById('scroll-right-btn');
const requestAudioBtn = document.getElementById('request-audio-btn');

// TTS Modal elements
const generateTtsBtn = document.getElementById('generate-tts-btn');
const ttsModal = document.getElementById('tts-modal');
const ttsCloseBtn = document.getElementById('tts-close-btn');
const ttsTextInput = document.getElementById('tts-text');
const ttsVoiceSelect = document.getElementById('tts-voice');
const ttsGenerateBtn = document.getElementById('tts-generate-btn');
const ttsCharCount = document.getElementById('tts-char-count');

// State
let activeTags = new Set();
let showingFavorites = false;
let showingTTS = false;
let isDragging = false;
let startX, scrollLeft;
let ttsAudio = [];

// Module instances
const audioPlayer = new AudioPlayer();
const favoritesManager = new FavoritesManager(room);
const uiRenderer = new UIRenderer(gallery, tagFiltersContainer, audioPlayer, favoritesManager);

// Filter and render
function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let baseLibrary = [...audioLibrary, ...ttsAudio];
    let filtered = baseLibrary;

    // Filter by TTS
    if (showingTTS) {
        filtered = ttsAudio;
    }

    // Filter by favorites
    if (showingFavorites) {
        const userFavs = favoritesManager.getUserFavorites();
        filtered = filtered.filter(audio => userFavs[audio.id]);
    }

    // Filter by search and tags
    filtered = filtered.filter(audio => {
        const nameMatch = audio.name.toLowerCase().includes(searchTerm);
        const tagMatch = audio.tags.some(t => t.toLowerCase().includes(searchTerm));
        const searchMatch = searchTerm === '' || nameMatch || tagMatch;
        const tagFilterMatch = !activeTags.size || [...activeTags].every(t => audio.tags.includes(t));
        return searchMatch && tagFilterMatch;
    });

    uiRenderer.renderGallery(filtered);
    noResultsEl.classList[filtered.length ? 'add' : 'remove']('hidden');
}

// Update scroll buttons visibility
function updateScrollButtons() {
    if (!scrollLeftBtn || !scrollRightBtn || !tagFiltersContainer) return;
    
    const { scrollWidth, clientWidth, scrollLeft } = tagFiltersContainer;
    const isScrollable = scrollWidth > clientWidth;
    
    if (!isScrollable) {
        scrollLeftBtn.classList.remove('visible');
        scrollRightBtn.classList.remove('visible');
        return;
    }
    
    scrollLeftBtn.classList[scrollLeft > 0 ? 'add' : 'remove']('visible');
    scrollRightBtn.classList[scrollLeft < scrollWidth - clientWidth - 1 ? 'add' : 'remove']('visible');
}

// Render tag filters
function renderTags() {
    const handleTagClick = (tag, button) => {
        showingFavorites = false;
        showingTTS = false;
        const wasActive = button.classList.contains('active');
        
        // Clear all active states
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        activeTags.clear();
        
        if (!wasActive) {
            button.classList.add('active');
            activeTags.add(tag);
            addRecentTag(tag);
        } else {
            // If deactivating, show all
            document.querySelector('.tag-filters button').classList.add('active');
        }
        
        filterAndRender();
    };

    const handleAllClick = () => {
        showingFavorites = false;
        showingTTS = false;
        activeTags.clear();
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button').classList.add('active');
        filterAndRender();
    };

    const handleFavoritesClick = () => {
        activeTags.clear();
        showingFavorites = true;
        showingTTS = false;
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        document.querySelectorAll('.tag-filters button')[1].classList.add('active');
        filterAndRender();
    };

    const handleTTSClick = () => {
        activeTags.clear();
        showingFavorites = false;
        showingTTS = true;
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        const ttsButton = Array.from(document.querySelectorAll('.tag-filters button')).find(b => b.textContent === 'TTS');
        if (ttsButton) ttsButton.classList.add('active');
        filterAndRender();
    };
    
    uiRenderer.renderTagFilters(
        activeTags,
        handleTagClick,
        handleAllClick,
        handleFavoritesClick,
        handleTTSClick,
        getRecentTags()
    );
    
    updateScrollButtons();
}

// Tag scroll drag functionality
tagFiltersContainer.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDragging = true;
    tagFiltersContainer.classList.add('grabbing');
    startX = e.pageX - tagFiltersContainer.offsetLeft;
    scrollLeft = tagFiltersContainer.scrollLeft;
});

tagFiltersContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    tagFiltersContainer.classList.remove('grabbing');
});

tagFiltersContainer.addEventListener('mouseup', () => {
    isDragging = false;
    tagFiltersContainer.classList.remove('grabbing');
});

tagFiltersContainer.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tagFiltersContainer.offsetLeft;
    tagFiltersContainer.scrollLeft = scrollLeft - (x - startX) * 1.5;
});

// TTS Modal Logic
function openTtsModal() { ttsModal.classList.remove('hidden'); }
function closeTtsModal() { ttsModal.classList.add('hidden'); }

generateTtsBtn.onclick = openTtsModal;
ttsCloseBtn.onclick = closeTtsModal;
ttsModal.onclick = (e) => { if (e.target === ttsModal) closeTtsModal(); };

ttsTextInput.addEventListener('input', () => {
    const len = ttsTextInput.value.length;
    ttsCharCount.textContent = `${len} / 250`;
    ttsGenerateBtn.disabled = len === 0 || len > 250;
});

ttsGenerateBtn.onclick = async () => {
    const text = ttsTextInput.value.trim();
    const voice = ttsVoiceSelect.value;
    if (!text || text.length > 250) return;

    ttsGenerateBtn.disabled = true;
    ttsGenerateBtn.querySelector('span').textContent = 'Generating...';
    ttsGenerateBtn.querySelector('.spinner').classList.remove('hidden');

    try {
        await room.collection('tts_audio_v1').create({
            text,
            voice,
            // The audioUrl will be populated by a backend process after generation.
            // For now, we rely on a placeholder that resolves.
            audioUrl: `https://texttospeech.googleapis.com/v1/text:synthesize?alt=media&key=placeholder&voice[languageCode]=en-US&voice[name]=en-US-Wavenet-D&audioConfig[audioEncoding]=MP3&input[text]=${encodeURIComponent(text)}`
        });
        ttsTextInput.value = '';
        ttsCharCount.textContent = '0 / 250';
        closeTtsModal();
    } catch (e) {
        console.error("Failed to create TTS request:", e);
        alert("Sorry, something went wrong. Please try again.");
    } finally {
        ttsGenerateBtn.disabled = false;
        ttsGenerateBtn.querySelector('span').textContent = 'Generate Audio';
        ttsGenerateBtn.querySelector('.spinner').classList.add('hidden');
    }
};

// Event listeners
searchInput.addEventListener('input', filterAndRender);
requestAudioBtn.onclick = () => window.websim?.postComment?.({ content: '\n' });
scrollLeftBtn.onclick = () => tagFiltersContainer.scrollBy({ 
    left: -tagFiltersContainer.clientWidth * 0.8, 
    behavior: 'smooth' 
});
scrollRightBtn.onclick = () => tagFiltersContainer.scrollBy({ 
    left: tagFiltersContainer.clientWidth * 0.8, 
    behavior: 'smooth' 
});
tagFiltersContainer.addEventListener('scroll', updateScrollButtons, { passive: true });
window.addEventListener('resize', updateScrollButtons);

// Initialize app
async function initApp() {
    await favoritesManager.init();
    
    room.collection('tts_audio_v1').subscribe(records => {
        ttsAudio = records.map(r => ({
            id: `tts-${r.id}`,
            name: `TTS by ${r.username}`,
            src: r.audioUrl,
            tags: ['tts', 'generated', r.voice],
            text: r.text
        })).reverse();
        filterAndRender();
    });

    // Re-render when favorites update
    favoritesManager.onUpdate(() => {
        if (document.querySelector('.audio-card')) {
            filterAndRender();
        }
    });

    renderTags();
    filterAndRender();
}

document.addEventListener('DOMContentLoaded', initApp);