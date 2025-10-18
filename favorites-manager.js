export class FavoritesManager {
    constructor(room) {
        this.room = room;
        this.currentUser = null;
        this.userFavoritesRecord = null;
        this.favoriteCounts = {};
        this.onUpdateCallback = null;
    }

    async init() {
        this.currentUser = await window.websim.getCurrentUser();
        
        // Subscribe to favorites updates
        this.room.collection('user_data_v2').subscribe(records => {
            this.processFavoritesData(records);
            if (this.onUpdateCallback) {
                this.onUpdateCallback();
            }
        });

        // Wait for initial data load
        const initialRecords = await new Promise(resolve => {
            const unsubscribe = this.room.collection('user_data_v2').subscribe(records => {
                if (records) {
                    resolve(records);
                    unsubscribe();
                }
            });
        });

        this.processFavoritesData(initialRecords);
    }

    processFavoritesData(records) {
        if (this.currentUser) {
            this.userFavoritesRecord = records.find(r => r.username === this.currentUser.username) || null;
        }

        const counts = {};
        records.forEach(record => {
            Object.keys(record.favorites || {}).forEach(audioId => {
                counts[audioId] = (counts[audioId] || 0) + 1;
            });
        });
        this.favoriteCounts = counts;
    }

    onUpdate(callback) {
        this.onUpdateCallback = callback;
    }

    isFavorited(audioId) {
        return !!this.userFavoritesRecord?.favorites?.[audioId];
    }

    getFavoriteCount(audioId) {
        return this.favoriteCounts[audioId] || 0;
    }

    getUserFavorites() {
        return this.userFavoritesRecord?.favorites || {};
    }

    async toggleFavorite(audioId) {
        if (!this.currentUser) return;

        const currentFavs = this.userFavoritesRecord?.favorites || {};
        const newFavs = { ...currentFavs };

        if (newFavs[audioId]) {
            delete newFavs[audioId];
        } else {
            newFavs[audioId] = true;
        }

        try {
            if (this.userFavoritesRecord) {
                await this.room.collection('user_data_v2').update(
                    this.userFavoritesRecord.id,
                    { favorites: newFavs }
                );
            } else {
                const newRecord = await this.room.collection('user_data_v2').create({
                    favorites: newFavs,
                    tts_assets: {}
                });
                this.userFavoritesRecord = newRecord;
            }
        } catch (error) {
            console.error('Failed to update favorites:', error);
            throw error;
        }
    }
}