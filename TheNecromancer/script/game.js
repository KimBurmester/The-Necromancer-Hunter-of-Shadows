let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen;
let touchController;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    fullscreen = new Fullscreen(canvas);
    window.fullscreen = fullscreen; // ✅ Global verfügbar machen
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
    if (window.innerWidth <= 650 && window.innerHeight <= 400 && window.matchMedia('(orientation: landscape)').matches) {
        if (fullscreen && !fullscreen.isFullscreen) {
            // User-Interaktion erforderlich für Fullscreen
            // Nicht automatisch aufrufen, da Browser dies blockieren
            console.log('Landscape-Modus erkannt. Drücke F für Vollbild.');
        }
    }
}

window.addEventListener('resize', checkLandscapeFullscreen);
window.addEventListener('orientationchange', () => {
    setTimeout(checkLandscapeFullscreen, 300);
});