let canvas;
let world;
// Globale Keyboard-Instanz zum Testen
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    ctx = canvas.getContext('2d');
    
    // Keyboard-Instanz aus World verwenden
    /* keyboard = world.keyboard; */

    console.log('Der Charakter ist geladen.', world.character);
    console.log('Der Feind ist geladen.', world.enemies);
    console.log('Keyboard ist geladen und aktiv:', keyboard);
    
    // Test-Nachricht für Tastatureingaben
    console.log('Drücke jetzt Tasten um die Keyboard-Eingaben zu testen!');
}

window.addEventListener('keydown', (event) => {
    console.log(event.code + ' Taste gedrückt');

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
    }
});
