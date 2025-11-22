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
                    e.preventDefault();
                    this.handleButtonPress(key, btn);
                });

                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.handleButtonRelease(key, btn);
                });
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
            case 'D':
                this.keyboard.D = true;
                break;
            case 'M':
                this.keyboard.M = true;
                break;
            case 'F':
                this.keyboard.F = true;
                break;
        }
        button.classList.add('pressed');
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
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
            case 'D':
                this.keyboard.D = false;
                break;
            case 'M':
                this.keyboard.M = false;
                break;
            case 'F':
                this.keyboard.F = false;
                break;
        }
        button.classList.remove('pressed');
    }

    handleAction(action) {
        switch(action) {
            case 'home':
                if (confirm('Zurück zum Hauptmenü?')) {
                    location.reload();
                }
                break;
            case 'settings':
                alert('Einstellungen werden geöffnet...');
                break;
        }
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    }

    checkTouchDevice() {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = window.innerWidth <= 768;
        
        const touchControls = document.getElementById('touch-controls');
        const gameSidebars = document.querySelectorAll('.sidebar');
        
        if (isTouchDevice || isMobile) {
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
}