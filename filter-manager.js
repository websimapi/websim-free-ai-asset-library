export class FilterManager {
    constructor(audioLibrary) {
        this.audioLibrary = audioLibrary;
        this.activeTags = new Set();
        this.showingFavorites = false;
        this.showingTTSOnly = false;
        this.showingImageOnly = false;
        this.showingTopOnly = false;
        this.combinedAudioLibrary = [...audioLibrary];
    }

    updateCombinedLibrary(userAssets) {
        const standardAudio = this.audioLibrary.map(a => ({...a, asset_type: 'audio'}));
        this.combinedAudioLibrary = [...standardAudio, ...userAssets];
    }

    filter(searchTerm, userFavorites, favoriteCounts) {
        let filtered = this.combinedAudioLibrary;

        if (this.showingFavorites) {
            filtered = filtered.filter(asset => userFavorites[asset.id]);
        } else if (this.showingTTSOnly) {
            filtered = filtered.filter(asset => asset.asset_type === 'audio' && asset.tags.includes('tts'));
        } else if (this.showingImageOnly) {
            filtered = filtered.filter(asset => asset.asset_type === 'image');
        }

        filtered = filtered.filter(asset => {
            const nameMatch = asset.name.toLowerCase().includes(searchTerm);
            const tagMatch = asset.tags.some(t => t.toLowerCase().includes(searchTerm));
            const ttsTextMatch = asset.asset_type === 'audio' && asset.text ? asset.text.toLowerCase().includes(searchTerm) : false;
            const imagePromptMatch = asset.asset_type === 'image' && asset.prompt ? asset.prompt.toLowerCase().includes(searchTerm) : false;
            const searchMatch = searchTerm === '' || nameMatch || tagMatch || ttsTextMatch || imagePromptMatch;

            let tagFilterMatch = true;
            if (!this.showingFavorites && !this.showingTTSOnly && !this.showingImageOnly && !this.showingTopOnly) {
                tagFilterMatch = !this.activeTags.size || [...this.activeTags].every(t => asset.tags.includes(t));
            }

            return searchMatch && tagFilterMatch;
        });
        
        // Sorting by favorites if in Top mode
        if (this.showingTopOnly && favoriteCounts) {
            filtered.sort((a, b) => {
                const countA = favoriteCounts[a.id] || 0;
                const countB = favoriteCounts[b.id] || 0;
                return countB - countA; // Descending order
            });
        }


        return filtered;
    }

    setTagActive(tag) {
        this.showingFavorites = false;
        this.showingTTSOnly = false;
        this.showingImageOnly = false;
        this.showingTopOnly = false;
        this.activeTags.clear();
        this.activeTags.add(tag);
    }

    clearFilters() {
        this.showingFavorites = false;
        this.showingTTSOnly = false;
        this.showingImageOnly = false;
        this.showingTopOnly = false;
        this.activeTags.clear();
    }

    setFavoritesMode() {
        this.activeTags.clear();
        this.showingFavorites = true;
        this.showingTTSOnly = false;
        this.showingImageOnly = false;
        this.showingTopOnly = false;
    }
    
    setTopMode() {
        this.activeTags.clear();
        this.showingFavorites = false;
        this.showingTTSOnly = false;
        this.showingImageOnly = false;
        this.showingTopOnly = true;
    }

    setTTSMode() {
        this.activeTags.clear();
        this.showingFavorites = false;
        this.showingTTSOnly = true;
        this.showingImageOnly = false;
        this.showingTopOnly = false;
    }

    setImageMode() {
        this.activeTags.clear();
        this.showingFavorites = false;
        this.showingTTSOnly = false;
        this.showingImageOnly = true;
        this.showingTopOnly = false;
    }
}