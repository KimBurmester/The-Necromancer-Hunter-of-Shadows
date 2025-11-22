class Fullscreen {
    canvas;
    isFullscreen = false;
    fullscreenButton;

    constructor(canvas) {
        this.canvas = canvas;
        this.fullscreenButton = document.getElementById('fullscreen');
        this.init();
    }

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

    toggleFullscreen() {
        if (!this.isFullscreen) {
            setTimeout(() => {
                this.enterFullscreen();
            }, 10);
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        const elem = this.canvas;

        try {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => {
                    console.warn('⚠️ Fullscreen nicht möglich:', err.message);
                    this.showFullscreenHint();
                });
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else {
                console.warn('⚠️ Fullscreen API nicht unterstützt');
                this.showFullscreenHint();
            }
        } catch (error) {
            console.warn('⚠️ Fullscreen Fehler:', error.message);
            this.showFullscreenHint();
        }
    }

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

    checkMobileDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = height > width;
        const isSmallMobileScreen = width <= 450 && height <= 950;
        
        if (isMobile && isPortrait && isSmallMobileScreen) {
            console.log('📱 Mobile Portrait erkannt - Landscape empfohlen!');
            
            if (!sessionStorage.getItem('landscape-hint-shown')) {
                this.showLandscapeHint();
                sessionStorage.setItem('landscape-hint-shown', 'true');
            }
        }
        
        if (isMobile && !isPortrait && !this.isFullscreen && isSmallMobileScreen) {
            console.log('🔄 Landscape-Modus erkannt - Vollbild verfügbar');
        }
    }

    showLandscapeHint() {
        const hint = document.createElement('div');
        hint.style.cssText = `
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
        hint.innerHTML = '🔄 Drehe dein Gerät für besseres Spielerlebnis';
        
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.style.animation = 'slideDown 0.5s ease';
            setTimeout(() => hint.remove(), 500);
        }, 5000);
        
        if (!document.getElementById('landscape-hint-styles')) {
            const style = document.createElement('style');
            style.id = 'landscape-hint-styles';
            style.textContent = `
                @keyframes slideUp {
                    from { bottom: -100px; opacity: 0; }
                    to { bottom: 20px; opacity: 1; }
                }
                @keyframes slideDown {
                    from { bottom: 20px; opacity: 1; }
                    to { bottom: -100px; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

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