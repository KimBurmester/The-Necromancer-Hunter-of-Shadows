/**
 * @file Main game initialization and input handling
 */

/** @type {HTMLCanvasElement} Main game canvas */
let canvas;
/** @type {World} Game world instance */
let world;
/** @type {Keyboard} Keyboard input state */
let keyboard = new Keyboard();
/** @type {Fullscreen} Fullscreen controller */
let fullscreen;
/** @type {TouchController} Touch controls manager */
let touchController;

/**
 * Initializes game components and controllers
 * @function
 */
function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    fullscreen = new Fullscreen(canvas);
    window.fullscreen = fullscreen;
    touchController = new TouchController(keyboard, world);
    setupSoundButton();
    checkLandscapeFullscreen();
    disableContextMenuInLandscape();
}

/**
 * Sets up the sound toggle button
 */
function setupSoundButton() {
    const soundBtn = document.getElementById('toggleSound');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            // Audio functionality removed
        });
    }
}

/**
 * Checks if fullscreen hint should be shown on mobile landscape
 * @function
 */
function checkLandscapeFullscreen() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    const isSmallScreen = window.innerWidth <= 900 && window.innerHeight <= 500;
    
    if (isMobile && isLandscape && isSmallScreen) {
        const fullscreenBtn = document.querySelector('.btn-fullscreen');
        if (fullscreenBtn && !fullscreen.isFullscreen) {
            fullscreenBtn.style.animation = 'pulse 2s infinite';
        }
    }
}

/**
 * Handles keyboard key press events
 * @listens window#keydown
 */
window.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'ArrowLeft':
            keyboard.LEFT = true;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = true;
            break;
        case 'ArrowUp':
            keyboard.UP = true;
            break;
        case 'ArrowDown':
            keyboard.DOWN = true;
            break;
        case 'Space':
            keyboard.SPACE = true;
            break;
        case 'KeyD':
            keyboard.D = true;
            break;
        case 'KeyM':
            // Audio functionality removed
            break;
        case 'KeyF':
            fullscreen.toggleFullscreen();
            break;
    }
});

/**
 * Handles keyboard key release events
 * @listens window#keyup
 */
window.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'ArrowLeft':
            keyboard.LEFT = false;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = false;
            break;
        case 'ArrowUp':
            keyboard.UP = false;
            break;
        case 'ArrowDown':
            keyboard.DOWN = false;
            break;
        case 'Space':
            keyboard.SPACE = false;
            break;
        case 'KeyD':
            keyboard.D = false;
            break;
    }
});

/**
 * Disables context menu in landscape mode
 * @function
 */
function disableContextMenuInLandscape() {
    document.addEventListener('contextmenu', (e) => {
        if (shouldDisableContextMenu()) {
            e.preventDefault();
            return false;
        }
    }, false);
    document.addEventListener('touchstart', preventLongPress, { passive: false });
    document.addEventListener('touchend', preventLongPress, { passive: false });
    window.addEventListener('orientationchange', updateContextMenuState);
    window.addEventListener('resize', updateContextMenuState);
}

/**
 * Checks if context menu should be disabled
 * @function
 * @returns {boolean} True if context menu should be blocked
 */
function shouldDisableContextMenu() {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    const isNarrowScreen = window.innerWidth <= 1260;
    return isLandscape && isNarrowScreen;
}

/**
 * Checks if device is in landscape orientation
 * @function
 * @returns {boolean} True if landscape mode
 */
function isLandscapeMode() {
    return window.matchMedia('(orientation: landscape)').matches;
}

/**
 * Prevents long press context menu on touch devices
 * @function
 * @param {TouchEvent} e - Touch event
 */
function preventLongPress(e) {
    if (shouldDisableContextMenu()) {
        e.preventDefault();
    }
}

/**
 * Updates context menu state on orientation/resize change
 * @function
 */
function updateContextMenuState() {
    const body = document.body;
    if (shouldDisableContextMenu()) {
        body.style.webkitTouchCallout = 'none';
        body.style.webkitUserSelect = 'none';
        body.style.userSelect = 'none';
    } else {
        body.style.webkitTouchCallout = '';
        body.style.webkitUserSelect = '';
        body.style.userSelect = '';
    }
}
window.addEventListener('resize', checkLandscapeFullscreen);
window.addEventListener('orientationchange', () => {
    setTimeout(checkLandscapeFullscreen, 300);
});