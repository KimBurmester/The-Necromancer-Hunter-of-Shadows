/**
 * Fullscreen mode manager with device detection
 * @class
 */
class Fullscreen {
    /** @type {HTMLCanvasElement} Canvas element for fullscreen */
    canvas;
    /** @type {boolean} Current fullscreen state */
    isFullscreen = false;
    /** @type {HTMLElement} Fullscreen toggle button */
    fullscreenButton;

    /**
     * Initializes fullscreen controller
     * @method
     * @param {HTMLCanvasElement} canvas - Canvas element to make fullscreen
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.fullscreenButton = document.getElementById('fullscreen');
        this.init();
    }

    /**
     * Sets up event listeners for fullscreen controls
     * @method
     */
    init() {
        this.fullscreenButton.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        document.addEventListener('fullscreenchange', () => {
            this.handleFullscreenChange();
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.handleFullscreenChange();
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.handleFullscreenChange();
        });
        document.addEventListener('MSFullscreenChange', () => {
            this.handleFullscreenChange();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFullscreen) {
                this.exitFullscreen();
            }
        });

        this.checkMobileDevice();
        window.addEventListener('resize', () => this.checkMobileDevice());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.checkMobileDevice(), 300);
        });
    }

    /**
     * Toggles fullscreen mode on/off
     * @method
     */
    toggleFullscreen() {
        if (!this.isFullscreen) {
            setTimeout(() => {
                this.enterFullscreen();
            }, 10);
        } else {
            this.exitFullscreen();
        }
    }

    /**
     * Requests fullscreen mode with browser compatibility
     * @method
     */
    enterFullscreen() {
        const elem = this.canvas;

        try {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => {
                    this.showFullscreenHint();
                });
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else {
                this.showFullscreenHint();
            }
        } catch (error) {
            this.showFullscreenHint();
        }
    }

    /**
     * Exits fullscreen mode with browser compatibility
     * @method
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Handles fullscreen state changes and updates UI
     * @method
     */
    handleFullscreenChange() {
        this.isFullscreen = !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
        if (this.isFullscreen) {
            this.fullscreenButton.textContent = 'Vollbild beenden';
            this.canvas.classList.add('fullscreen');
        } else {
            this.fullscreenButton.textContent = 'Vollbild';
            this.canvas.classList.remove('fullscreen');
        }
    }

    /**
     * Detects mobile device and shows landscape hint if needed
     * @method
     */
    checkMobileDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = height > width;
        const isSmallMobileScreen = width <= 450 && height <= 950;
        
        if (isMobile && isPortrait && isSmallMobileScreen) {
            if (!sessionStorage.getItem('landscape-hint-shown')) {
                this.showLandscapeHint();
                sessionStorage.setItem('landscape-hint-shown', 'true');
            }
        }
        
        if (isMobile && !isPortrait && !this.isFullscreen && isSmallMobileScreen) {}
    }

    /**
     * Displays hint to rotate device to landscape mode
     * @method
     */
    showLandscapeHint() {
        const hint = this.createLandscapeHintElement();
        document.body.appendChild(hint);
        this.setupHintRemovalTimer(hint);
        this.addLandscapeHintStyles();
    }

    /**
     * Creates landscape hint DOM element
     * @method
     * @returns {HTMLElement} Hint element
     */
    createLandscapeHintElement() {
        const hint = document.createElement('div');
        hint.style.cssText = this.getLandscapeHintStyles();
        hint.innerHTML = '🔄 Drehe dein Gerät für besseres Spielerlebnis';
        return hint;
    }

    /**
     * Returns CSS styles for landscape hint
     * @method
     * @returns {string} CSS text
     */
    getLandscapeHintStyles() {
        return `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(10, 142, 142, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.5s ease;
            font-family: 'cinzel', Arial, sans-serif;
        `;
    }

    /**
     * Sets up timer to remove hint after 5 seconds
     * @method
     * @param {HTMLElement} hint - Hint element
     */
    setupHintRemovalTimer(hint) {
        setTimeout(() => {
            hint.style.animation = 'slideDown 0.5s ease';
            setTimeout(() => hint.remove(), 500);
        }, 5000);
    }

    /**
     * Adds keyframe animation styles for hint
     * @method
     */
    addLandscapeHintStyles() {
        if (document.getElementById('landscape-hint-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'landscape-hint-styles';
        style.textContent = this.getKeyframeStyles();
        document.head.appendChild(style);
    }

    /**
     * Returns keyframe animation CSS
     * @method
     * @returns {string} Keyframe CSS
     */
    getKeyframeStyles() {
        return `
            @keyframes slideUp {
                from { bottom: -100px; opacity: 0; }
                to { bottom: 20px; opacity: 1; }
            }
            @keyframes slideDown {
                from { bottom: 20px; opacity: 1; }
                to { bottom: -100px; opacity: 0; }
            }
        `;
    }

    /**
     * Shows error hint when fullscreen is blocked by browser
     * @method
     */
    showFullscreenHint() {
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(244, 67, 54, 0.95);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            font-size: 14px;
            z-index: 10001;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
            text-align: center;
            font-family: 'cinzel', Arial, sans-serif;
        `;
        hint.innerHTML = `
            ⚠️ Vollbild nicht verfügbar<br>
            <small style="font-size: 12px; opacity: 0.8;">Dein Browser blockiert Vollbild-Modus</small>
        `;
        
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.style.opacity = '0';
            hint.style.transition = 'opacity 0.3s ease';
            setTimeout(() => hint.remove(), 300);
        }, 3000);
    }
}