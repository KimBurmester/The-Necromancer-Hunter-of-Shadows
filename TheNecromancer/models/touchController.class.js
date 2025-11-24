/**
 * Touch control manager for mobile devices
 * @class
 */
class TouchController {
    /** @type {Keyboard} Keyboard state manager */
    keyboard;
    /** @type {World} World reference */
    world;
    /** @type {Object} Button elements collection */
    touchButtons = {};
    /** @type {boolean} Touch controls active state */
    isActive = false;

    /**
     * Initializes touch controller with keyboard reference
     * @method
     * @param {Keyboard} keyboard - Keyboard state manager instance
     * @param {World} world - World instance
     */
    constructor(keyboard, world) {
        this.keyboard = keyboard;
        this.world = world;
        this.init();
    }

    /**
     * Sets up touch and mouse event listeners for control buttons
     * @method
     */
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

    /**
     * Handles button press events and updates keyboard state
     * @method
     * @param {string} key - Key identifier (LEFT, RIGHT, UP, SPACE, D, M, F)
     * @param {HTMLElement} button - Button element to style
     */
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

    /**
     * Handles button release events and resets keyboard state
     * @method
     * @param {string} key - Key identifier to release
     * @param {HTMLElement} button - Button element to remove pressed style
     */
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
                this.keyboard.M = true;
                this.toggleSound(button);
                break;
            case 'F':
                break;
        }
        button.classList.add('pressed');
    }

    /**
     * Toggles sound on/off
     * @method
     * @param {HTMLElement} button - Sound button element
     */
    toggleSound(button) {
        // Audio functionality removed
    }

    /**
     * Updates sound button appearance
     * @method
     * @param {HTMLElement} button - Sound button element
     * @param {boolean} isMuted - Mute state
     */
    updateSoundButton(button, isMuted) {
        if (isMuted) {
            button.style.opacity = '0.5';
        } else {
            button.style.opacity = '1';
        }
    }

    /**
     * Handles special action buttons (help)
     * @method
     * @param {string} action - Action identifier
     */
    handleAction(action) {
        if (action === 'help') {
            this.showControlsHelp();
        }
        
        try {
            if (navigator.vibrate && typeof navigator.vibrate === 'function') {
                navigator.vibrate(100);
            }
        } catch (error) {}
    }

    /**
     * Detects touch device or narrow screen and shows/hides controls
     * @method
     */
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

    /**
     * Displays help overlay with control instructions
     * @method
     */
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