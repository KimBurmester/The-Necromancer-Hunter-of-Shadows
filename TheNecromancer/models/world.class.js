class World{
    character = new Character();
    enemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];
    background = [new Background()]
    moon = [new Moon()]
    hill = [new Hills()]
    grave = [new Grave()]
    fence = [new Fence()]
    street = [new Street()]
    clouds = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.createClouds();
        this.setWorld();
        this.createBackgrounds();
        this.character.startAnimation();
        this.draw();
    }

    createBackgrounds() {
        let numberOfBackgrounds = 10;
        for (let i = 0; i < numberOfBackgrounds; i++) {
            let bg = new Background();
            let hills = new Hills();
            let grave = new Grave();
            let street = new Street();
            bg.positionX = i * bg.width;
            hills.positionX = i * hills.width;
            grave.positionX = i * grave.width;
            street.positionX = i * street.width;
            this.background.push(bg);
            this.hill.push(hills);
            this.grave.push(grave);
            this.street.push(street);
        }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.moon);
        this.addObjectsToMap(this.hill);
        this.addObjectsToMap(this.fence);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.grave);
        this.addObjectsToMap(this.street);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => self.draw());
    }    

    setWorld(){
        this.character.world = this;
    }

    addObjectsToMap(objects){
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImageBack(mo);
        } else {
            this.ctx.drawImage(mo.img, mo.positionX, mo.positionY, mo.width, mo.height);
        }
    }

    flipImageBack(mo){
        this.ctx.save();
        this.ctx.translate(mo.positionX + mo.width / 2, mo.positionY + mo.height / 2);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
        this.ctx.restore();
    }

    createClouds() {
        let numberOfClouds = 5;
        for (let i = 0; i < numberOfClouds; i++) {
            let cloud = new Cloud();
            cloud.positionX = i * (cloud.width - 10);
            this.clouds.push(cloud);
        }
    }
}