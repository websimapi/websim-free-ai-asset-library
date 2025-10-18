const STORAGE_KEY = 'audioFilterUsage';

export function getRecentTags() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
        return [];
    }
}

export function saveRecentTags(tags) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
    } catch (e) {
        console.error('Failed to save tags:', e);
    }
}

export function addRecentTag(tag) {
    const recentTags = getRecentTags().filter(t => t !== tag);
    recentTags.unshift(tag);
    saveRecentTags(recentTags);
}

