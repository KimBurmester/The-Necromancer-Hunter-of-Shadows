class World{
    character = new Character();
    enemies = [new Enemy(),new Enemy(),new Enemy()];
    background = [new Background()]
    moon = [new Moon()]
    hill = [new Hills()]
    grave = [new Grave()]
    fence = [new Fence()]
    street = [new Street()]
    clouds = [new Cloud()];
    canvas;
    ctx;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.moon);
        this.addObjectsToMap(this.hill);
        this.addObjectsToMap(this.fence);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.grave);
        this.addObjectsToMap(this.street);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        let self = this;
        requestAnimationFrame(() => self.draw());
    }
    addObjectsToMap(objects){
        objects.forEach(o => this.addToMap(o));
    }
    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.positionX, mo.positionY, mo.width, mo.height);
    }
}