import { audioLibrary } from './audio-data.js';

export class UIRenderer {
    constructor(galleryElement, tagFiltersElement, audioPlayer, favoritesManager) {
        this.gallery = galleryElement;
        this.tagFilters = tagFiltersElement;
        this.audioPlayer = audioPlayer;
        this.favoritesManager = favoritesManager;
    }

    renderGallery(audioItems) {
        this.gallery.innerHTML = '';
        
        audioItems.forEach(audio => {
            const card = document.createElement('div');
            card.className = 'audio-card';
            
            // Download button
            const downloadButton = document.createElement('button');
            downloadButton.className = 'download-button';
            downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';

            downloadButton.onclick = async (e) => {
                e.preventDefault();
                if (downloadButton.disabled) return;
                downloadButton.disabled = true;
                downloadButton.style.opacity = '0.5';

                try {
                    const response = await fetch(audio.src);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = audio.name.replace(/ /g, '_') + '.mp3';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                } catch (err) {
                    console.error('Download failed:', err);
                    alert('Could not download the file.');
                } finally {
                    downloadButton.disabled = false;
                    downloadButton.style.opacity = '1';
                }
            };
            
            // Favorite section
            const favSection = document.createElement('div');
            favSection.className = 'favorite-section';
            
            const favButton = document.createElement('button');
            favButton.className = 'favorite-button';
            favButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
            
            favButton.onclick = async () => {
                if (favButton.disabled) return;
                favButton.disabled = true;
                favButton.style.opacity = '0.5';
                
                try {
                    await this.favoritesManager.toggleFavorite(audio.id);
                } finally {
                    favButton.disabled = false;
                    favButton.style.opacity = '1';
                }
            };

            if (this.favoritesManager.isFavorited(audio.id)) {
                favButton.classList.add('active');
            }

            const favCount = document.createElement('div');
            favCount.className = 'favorite-count';
            favCount.textContent = this.favoritesManager.getFavoriteCount(audio.id);
            
            favSection.append(favButton, favCount);

            // Play button
            const playButton = document.createElement('button');
            playButton.className = 'play-button';
            playButton.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z"></path></svg>';
            playButton.onclick = () => this.audioPlayer.handlePlayClick(audio.src, playButton);

            // Audio name
            const audioName = document.createElement('div');
            audioName.className = 'audio-name';
            audioName.textContent = audio.name;

            card.append(downloadButton, favSection, playButton, audioName);
            this.gallery.appendChild(card);
        });
    }

    renderTagFilters(activeTags, onTagClick, onAllClick, onFavoritesClick, onTTSClick, recentTags = [], showingFavorites, showingTTSOnly) {
        this.tagFilters.innerHTML = '';

        // All tags from audio library
        const allTags = [...new Set(audioLibrary.flatMap(x => x.tags))];
        
        // Sort tags: recent tags first, then alphabetically
        allTags.sort((a, b) => {
            const indexA = recentTags.indexOf(a);
            const indexB = recentTags.indexOf(b);
            
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });

        // All button
        const allBtn = document.createElement('button');
        allBtn.textContent = 'All';
        if (activeTags.size === 0 && !showingFavorites && !showingTTSOnly) {
            allBtn.classList.add('active');
        }
        allBtn.onclick = onAllClick;
        this.tagFilters.appendChild(allBtn);

        // Favorites button
        const favBtn = document.createElement('button');
        favBtn.textContent = 'Favorites';
        if (showingFavorites) {
            favBtn.classList.add('active');
        }
        favBtn.onclick = onFavoritesClick;
        this.tagFilters.appendChild(favBtn);
        
        // TTS button
        const ttsBtn = document.createElement('button');
        ttsBtn.textContent = 'TTS';
        ttsBtn.dataset.filter = 'tts';
        if (showingTTSOnly) {
            ttsBtn.classList.add('active');
        }
        ttsBtn.onclick = onTTSClick;
        this.tagFilters.appendChild(ttsBtn);

        // Tag buttons
        allTags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.dataset.tag = tag;
            
            if (activeTags.has(tag)) {
                button.classList.add('active');
            }
            
            button.onclick = () => onTagClick(tag, button);
            this.tagFilters.appendChild(button);
        });
    }
}