let canvas;
let world;


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    ctx = canvas.getContext('2d');


    console.log('Der Charakter ist geladen.', world.character);
    console.log('Der Feind ist geladen.', world.enemies);
}
