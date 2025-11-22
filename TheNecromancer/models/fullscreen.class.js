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
        // Event Listener für Fullscreen-Button
        this.fullscreenButton.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Event Listener für Fullscreen-Änderungen
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

        // ESC-Taste zum Beenden
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFullscreen) {
                this.exitFullscreen();
            }
        });
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        const elem = this.canvas;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
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
}