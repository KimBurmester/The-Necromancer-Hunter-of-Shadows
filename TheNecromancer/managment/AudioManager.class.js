/**
 * Manages all game audio (music and sound effects)
 * @class AudioManager
 */
class AudioManager {
    /** @type {Object} Audio files collection */
    sounds = {};
    /** @type {HTMLAudioElement} Currently playing music */
    currentMusic = null;
    /** @type {boolean} Mute state */
    isMuted = false;
    /** @type {number} Music volume level */
    musicVolume = 0.5;
    /** @type {number} Sound effects volume level */
    sfxVolume = 0.7;
    /** @type {boolean} Audio context unlocked flag */
    isUnlocked = false;

    /**
     * Loads an audio file
     * @param {string} key - Identifier for the sound
     * @param {string} path - Path to audio file
     */
    loadSound(key, path) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds[key] = audio;
    }

    /**
     * Unlocks audio context after user interaction
     */
    unlockAudio() {
        if (this.isUnlocked) return;
        
        Object.values(this.sounds).forEach(audio => {
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
            }).catch(() => {});
        });
        
        this.isUnlocked = true;
    }

    /**
     * Plays background music (loops)
     * @param {string} key - Sound identifier
     */
    playMusic(key) {
        this.stopCurrentMusic();
        if (this.sounds[key]) {
            this.currentMusic = this.sounds[key];
            this.currentMusic.loop = true;
            this.currentMusic.volume = this.musicVolume;
            this.currentMusic.muted = this.isMuted;
            this.playAudio(this.currentMusic);
        }
    }

    /**
     * Plays a sound effect once
     * @param {string} key - Sound identifier
     */
    playSFX(key) {
        if (this.sounds[key] && !this.isMuted) {
            const sfx = this.sounds[key].cloneNode();
            sfx.volume = this.sfxVolume;
            sfx.play().catch(() => {});
        }
    }

    /**
     * Stops currently playing music
     */
    stopCurrentMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
    }

    /**
     * Plays audio with error handling
     * @param {HTMLAudioElement} audio - Audio element
     */
    playAudio(audio) {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {}).catch(() => {
                this.isUnlocked = false;
            });
        }
    }

    /**
     * Toggles mute state
     * @returns {boolean} New mute state
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.currentMusic) {
            this.currentMusic.muted = this.isMuted;
        }
        return this.isMuted;
    }

    /**
     * Sets music volume
     * @param {number} volume - Volume (0.0 to 1.0)
     */
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
    }

    /**
     * Sets sound effects volume
     * @param {number} volume - Volume (0.0 to 1.0)
     */
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
}
