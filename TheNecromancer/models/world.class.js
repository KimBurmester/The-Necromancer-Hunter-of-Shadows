class World{
    character = new Character();
    enemies = level1.enemies;
    background = level1.background;
    /* moon = level1.moon; */
    hill = level1.hill;
    grave = level1.grave;
    fence = level1.fence;
    street = level1.street;
    clouds = level1.clouds;
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
            let fence = new Fence();
            let grave = new Grave();
            let street = new Street();
            bg.positionX = i * bg.width;
            hills.positionX = i * hills.width;
            fence.positionX = i * fence.width;
            grave.positionX = i * grave.width;
            street.positionX = i * street.width;
            this.background.push(bg);
            this.hill.push(hills);
            this.fence.push(fence);
            this.grave.push(grave);
            this.street.push(street);
        }
    }

    draw(){
        this.ctx.clearRect(0, 0, 720, 480);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.background);
        /* this.addObjectsToMap(this.moon); */
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
        this.clouds.forEach((cloud, i) => {
            cloud.positionX = i * (cloud.width - 10);
        });
    }
}
