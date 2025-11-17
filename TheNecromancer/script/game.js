let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    
    console.log('Der Charakter ist geladen.', world.character);
    console.log('Der Feind ist geladen.', world.enemies);
    console.log('Keyboard ist geladen und aktiv:', keyboard);
    console.log('Drücke jetzt Tasten um die Keyboard-Eingaben zu testen!');
}

window.addEventListener('keydown', (event) => {
    console.log(event.code + ' Taste gedrückt');

    switch(event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keyboard.LEFT = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyboard.RIGHT = true;
            break;
        case 'ArrowUp':
        case 'KeyW':
            keyboard.UP = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyboard.DOWN = true;
            break;
        case 'Space':
            keyboard.SPACE = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event.code + ' Taste losgelassen');

    switch(event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keyboard.LEFT = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyboard.RIGHT = false;
            break;
        case 'ArrowUp':
        case 'KeyW':
            keyboard.UP = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyboard.DOWN = false;
            break;
        case 'Space':
            keyboard.SPACE = false;
            break;
    }
});