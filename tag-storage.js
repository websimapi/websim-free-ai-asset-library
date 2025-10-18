const STORAGE_KEY = 'audioFilterUsage_v2';

export function getRecentTags() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(data)) return data;
        return [];
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