export class AudioPlayer {
    constructor() {
        this.audioContext = null;
        this.audioBuffers = new Map();
        this.currentPlayback = null;
    }

    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    async loadAudio(url) {
        if (this.audioBuffers.has(url)) {
            return this.audioBuffers.get(url);
        }
        
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.audioBuffers.set(url, audioBuffer);
            return audioBuffer;
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            return null;
        }
    }

    playSound(buffer, button) {
        if (!this.audioContext) return;

        // Stop current playback if any
        if (this.currentPlayback) {
            this.currentPlayback.source.stop();
            this.currentPlayback.button.classList.remove('playing');
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        
        button.classList.add('playing');
        
        source.onended = () => {
            button.classList.remove('playing');
            if (this.currentPlayback?.source === source) {
                this.currentPlayback = null;
            }
        };

        this.currentPlayback = { source, button };
    }

    async handlePlayClick(audioSrc, button) {
        this.initAudioContext();
        const buffer = await this.loadAudio(audioSrc);
        if (buffer) {
            this.playSound(buffer, button);
        }
    }
}