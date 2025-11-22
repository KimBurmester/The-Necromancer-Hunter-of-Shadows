let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen;
let touchController;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    fullscreen = new Fullscreen(canvas);
    window.fullscreen = fullscreen;
    touchController = new TouchController(keyboard);
    checkLandscapeFullscreen();
}

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
        case 'KeyF':
            fullscreen.toggleFullscreen();
            break;
    }
});

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

window.addEventListener('resize', checkLandscapeFullscreen);
window.addEventListener('orientationchange', () => {
    setTimeout(checkLandscapeFullscreen, 300);
});