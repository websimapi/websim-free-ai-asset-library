import { audioLibrary } from './audio-data.js';
import { AudioPlayer } from './audio-player.js';
import { FavoritesManager } from './favorites-manager.js';
import { UIRenderer } from './ui-renderer.js';
import { getRecentTags, addRecentTag } from './tag-storage.js';
import { TTSGenerator } from './tts-generator.js';
import { ImageGenerator } from './image-generator.js';
import { FilterManager } from './filter-manager.js';

const room = new WebsimSocket();

// DOM elements
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const tagFiltersContainer = document.getElementById('tag-filters');
const noResultsEl = document.getElementById('no-results');
const scrollLeftBtn = document.getElementById('scroll-left-btn');
const scrollRightBtn = document.getElementById('scroll-right-btn');
const requestAudioBtn = document.getElementById('request-audio-btn');

// State for tag scrolling
let isDragging = false;
let startX, scrollLeft;

// Module instances
const audioPlayer = new AudioPlayer();
const favoritesManager = new FavoritesManager(room);
const uiRenderer = new UIRenderer(gallery, tagFiltersContainer, audioPlayer, favoritesManager);
const ttsGenerator = new TTSGenerator(room);
const imageGenerator = new ImageGenerator(room);
const filterManager = new FilterManager(audioLibrary);

// Filter and render
function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const userFavs = favoritesManager.getUserFavorites();
    const favoriteCounts = favoritesManager.getFavoriteCounts();
    const filtered = filterManager.filter(searchTerm, userFavs, favoriteCounts);
    
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
        const wasActive = button.classList.contains('active');
        
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        
        if (!wasActive) {
            button.classList.add('active');
            filterManager.setTagActive(tag);
            addRecentTag(tag);
        } else {
            document.querySelector('.tag-filters button').classList.add('active');
            filterManager.clearFilters();
        }
        
        filterAndRender();
    };

    const handleAllClick = () => {
        filterManager.clearFilters();
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button').classList.add('active');
        filterAndRender();
    };

    const handleFavoritesClick = () => {
        filterManager.setFavoritesMode();
        document.querySelectorAll('.tag-filters button').forEach(btn => 
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button[data-filter="favorites"]').classList.add('active'); 
        filterAndRender();
    };
    
    const handleTopClick = () => {
        filterManager.setTopMode();
        document.querySelectorAll('.tag-filters button').forEach(btn =>
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button[data-filter="top"]').classList.add('active');
        filterAndRender();
    };
    
    const handleTTSClick = () => {
        filterManager.setTTSMode();
        document.querySelectorAll('.tag-filters button').forEach(btn =>
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button[data-filter="tts"]').classList.add('active');
        filterAndRender();
    };
    
    const handleImageClick = () => {
        filterManager.setImageMode();
        document.querySelectorAll('.tag-filters button').forEach(btn =>
            btn.classList.remove('active')
        );
        document.querySelector('.tag-filters button[data-filter="image"]').classList.add('active');
        filterAndRender();
    };

    uiRenderer.renderTagFilters(
        filterManager.activeTags,
        handleTagClick,
        handleAllClick,
        handleFavoritesClick,
        handleTopClick,
        handleTTSClick,
        handleImageClick,
        getRecentTags(),
        filterManager.showingFavorites,
        filterManager.showingTopOnly,
        filterManager.showingTTSOnly,
        filterManager.showingImageOnly
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

// UI Toggle handlers
document.getElementById('generate-tts-btn').onclick = () => {
    imageGenerator.close();
    ttsGenerator.toggle();
};

document.getElementById('generate-image-btn').onclick = () => {
    ttsGenerator.close();
    imageGenerator.toggle();
};

// Submit handlers
document.getElementById('generate-tts-submit').onclick = () => ttsGenerator.submit();
document.getElementById('generate-image-submit').onclick = () => imageGenerator.submit();

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

    room.collection('user_data_v2').subscribe(userRecords => {
        const allTtsAssets = [];
        const allImageAssets = [];
        
        userRecords.forEach(record => {
            if (record.tts_assets) {
                Object.entries(record.tts_assets).forEach(([id, ttsData]) => {
                    allTtsAssets.push({
                        ...ttsData,
                        id: id,
                        asset_type: 'audio'
                    });
                });
            }
            if (record.image_assets) {
                Object.entries(record.image_assets).forEach(([id, imageData]) => {
                    allImageAssets.push({
                        ...imageData,
                        id: id,
                        asset_type: 'image'
                    });
                });
            }
        });
        
        allTtsAssets.sort((a, b) => b.id.localeCompare(a.id));
        allImageAssets.sort((a, b) => b.id.localeCompare(a.id));

        filterManager.updateCombinedLibrary([...allTtsAssets, ...allImageAssets]);
        
        if (gallery.children.length > 0 || allTtsAssets.length > 0 || allImageAssets.length > 0) {
            filterAndRender();
        }
        renderTags();
    });
    
    favoritesManager.onUpdate(() => {
        if (gallery.children.length > 0) {
            filterAndRender();
        }
    });

    renderTags();
    filterAndRender();
}

document.addEventListener('DOMContentLoaded', initApp);