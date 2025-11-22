class TouchController {
    keyboard;
    touchButtons = {};
    isActive = false;

    constructor(keyboard) {
        this.keyboard = keyboard;
        this.init();
    }

    init() {
        this.checkTouchDevice();
        const touchButtons = document.querySelectorAll('.touch-btn');
        
        touchButtons.forEach(btn => {
            const key = btn.getAttribute('data-key');
            const action = btn.getAttribute('data-action');

            if (key) {
                btn.addEventListener('touchstart', (e) => {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    this.handleButtonPress(key, btn);
                }, { passive: false });

                btn.addEventListener('touchend', (e) => {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    this.handleButtonRelease(key, btn);
                }, { passive: false });
                
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    this.handleButtonPress(key, btn);
                });

                btn.addEventListener('mouseup', (e) => {
                    e.preventDefault();
                    this.handleButtonRelease(key, btn);
                });

                btn.addEventListener('mouseleave', (e) => {
                    this.handleButtonRelease(key, btn);
                });
            }
            if (action) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleAction(action);
                });
            }
        });
        window.addEventListener('resize', () => {
            this.checkTouchDevice();
        });
    }

    handleButtonPress(key, button) {
        switch(key) {
            case 'LEFT':
                this.keyboard.LEFT = true;
                break;
            case 'RIGHT':
                this.keyboard.RIGHT = true;
                break;
            case 'UP':
                this.keyboard.UP = true;
                break;
            case 'SPACE':
                this.keyboard.SPACE = true;
                break;
            case 'D':
                this.keyboard.D = true;
                break;
            case 'M':
                this.keyboard.M = true;
                break;
            case 'F':
                if (window.fullscreen) {
                    window.fullscreen.toggleFullscreen();
                }
                break;
        }
        button.classList.add('pressed');
        
        try {
            if (navigator.vibrate && typeof navigator.vibrate === 'function') {
                navigator.vibrate(50);
            }
        } catch (error) {}
    }

    handleButtonRelease(key, button) {
        switch(key) {
            case 'LEFT':
                this.keyboard.LEFT = false;
                break;
            case 'RIGHT':
                this.keyboard.RIGHT = false;
                break;
            case 'UP':
                this.keyboard.UP = false;
                break;
            case 'SPACE':
                this.keyboard.SPACE = false;
                break;
            case 'D':
                this.keyboard.D = false;
                break;
            case 'M':
                this.keyboard.M = false;
                break;
            case 'F':
                break;
        }
        button.classList.remove('pressed');
    }

    handleAction(action) {
        switch(action) {
            case 'help':
                this.showControlsHelp();
                break;
            case 'home':
                if (confirm('Zurück zum Hauptmenü?')) {
                    location.reload();
                }
                break;
            case 'settings':
                alert('Einstellungen werden geöffnet...');
                break;
        }
        
        try {
            if (navigator.vibrate && typeof navigator.vibrate === 'function') {
                navigator.vibrate(100);
            }
        } catch (error) {}
    }

    checkTouchDevice() {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isNarrowScreen = window.innerWidth < 1260;
        
        const touchControls = document.getElementById('touch-controls');
        const gameSidebars = document.querySelectorAll('.sidebar');
        
        if (isTouchDevice || isNarrowScreen) {
            touchControls.style.display = 'flex';
            gameSidebars.forEach(sidebar => {
                sidebar.style.display = 'none';
            });
            this.isActive = true;
        } else {
            touchControls.style.display = 'none';
            gameSidebars.forEach(sidebar => {
                sidebar.style.display = 'flex';
            });
            this.isActive = false;
        }
    }

    showControlsHelp() {
        const overlay = document.getElementById('help-overlay');
        const closeBtn = document.getElementById('close-help');
        
        overlay.classList.add('show');
        
        const closeOverlay = () => {
            overlay.classList.remove('show');
        };
        
        closeBtn.onclick = closeOverlay;
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        };
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeOverlay();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
}