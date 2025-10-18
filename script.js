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
const generateTtsBtn = document.getElementById('generate-tts-btn');
const ttsGenerator = document.getElementById('tts-generator');
const ttsTextInput = document.getElementById('tts-text');
const ttsVoiceSelect = document.getElementById('tts-voice');
const ttsSubmitBtn = document.getElementById('generate-tts-submit');

// State
let combinedAudioLibrary = [...audioLibrary];
let activeTags = new Set();
let showingFavorites = false;
let showingTTSOnly = false;
let isDragging = false;
let startX, scrollLeft;

// Module instances
const audioPlayer = new AudioPlayer();
const favoritesManager = new FavoritesManager(room);
const uiRenderer = new UIRenderer(gallery, tagFiltersContainer, audioPlayer, favoritesManager);

// Filter and render
function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let filtered = combinedAudioLibrary;

    // Filter by favorites or TTS
    if (showingFavorites) {
        const userFavs = favoritesManager.getUserFavorites();
        filtered = filtered.filter(audio => userFavs[audio.id]);
    } else if (showingTTSOnly) {
        filtered = filtered.filter(audio => audio.tags.includes('tts'));
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
        showingTTSOnly = false;
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
        showingTTSOnly = false;
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
        showingTTSOnly = false;
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        document.querySelectorAll('.tag-filters button')[1].classList.add('active');
        filterAndRender();
    };
    
    const handleTTSClick = () => {
        activeTags.clear();
        showingFavorites = false;
        showingTTSOnly = true;
        document.querySelectorAll('.tag-filters button').forEach(btn =>
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button[data-filter="tts"]').classList.add('active');
        filterAndRender();
    };

    uiRenderer.renderTagFilters(
        activeTags,
        handleTagClick,
        handleAllClick,
        handleFavoritesClick,
        handleTTSClick,
        getRecentTags(),
        showingFavorites,
        showingTTSOnly
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

// TTS Section Logic
const voices = [
    { value: "en-male", text: "English - Male" },
    { value: "en-female", text: "English - Female" },
    { value: "es-male", text: "Spanish - Male" },
    { value: "es-female", text: "Spanish - Female" },
    { value: "fr-male", text: "French - Male" },
    { value: "fr-female", text: "French - Female" },
    { value: "de-male", text: "German - Male" },
    { value: "de-female", text: "German - Female" },
    { value: "it-male", text: "Italian - Male" },
    { value: "it-female", text: "Italian - Female" },
    { value: "pt-male", text: "Portuguese - Male" },
    { value: "pt-female", text: "Portuguese - Female" },
    { value: "ru-male", text: "Russian - Male" },
    { value: "ru-female", text: "Russian - Female" },
];

function populateVoices() {
    ttsVoiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.value;
        option.textContent = voice.text;
        ttsVoiceSelect.appendChild(option);
    });
}

function setTtsButtonLoading(isLoading) {
    const btnText = ttsSubmitBtn.querySelector('.btn-text');
    const loader = ttsSubmitBtn.querySelector('.loader');
    ttsSubmitBtn.disabled = isLoading;
    if (isLoading) {
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

async function handleTtsSubmit() {
    const text = ttsTextInput.value.trim();
    if (!text) {
        alert("Please enter some text.");
        return;
    }
    setTtsButtonLoading(true);
    try {
        const result = await websim.textToSpeech({
            text,
            voice: ttsVoiceSelect.value,
        });

        const name = `TTS: ${text.substring(0, 20)}${text.length > 20 ? '...' : ''}`;

        await room.collection('tts_assets_v1').create({
            name,
            src: result.url,
            text,
            voice: ttsVoiceSelect.value,
            tags: ['tts', 'user-generated']
        });
        
        ttsTextInput.value = '';
        ttsGenerator.classList.add('hidden');
        generateTtsBtn.classList.remove('active');

    } catch (error) {
        console.error("Failed to generate TTS:", error);
        alert("Sorry, there was an error generating the audio.");
    } finally {
        setTtsButtonLoading(false);
    }
}

generateTtsBtn.onclick = () => {
    ttsGenerator.classList.toggle('hidden');
    generateTtsBtn.classList.toggle('active');
    if (!ttsGenerator.classList.contains('hidden')) {
        populateVoices();
    }
};
ttsSubmitBtn.onclick = handleTtsSubmit;

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

    room.collection('tts_assets_v1').subscribe(ttsRecords => {
        const mappedTtsRecords = ttsRecords.map(record => ({
            ...record,
            id: record.id // ensure id is consistent for favorites
        })).reverse(); // newest first
        
        combinedAudioLibrary = [...audioLibrary, ...mappedTtsRecords];
        
        // Re-render if something might have changed
        if (document.querySelector('.audio-card')) {
             filterAndRender();
        }
        renderTags();
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