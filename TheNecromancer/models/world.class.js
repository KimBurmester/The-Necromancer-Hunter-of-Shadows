class World{
    character = new Character();
    enemies = level1.enemies;
    endboss = level1.endboss
    background = level1.background;
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
        this.camera_x = -820;
        this.draw();
    }

    createBackgrounds() {
        let numberOfBackgrounds = 2;
        let startOffset = -2;
        for (let i = 0; i < numberOfBackgrounds; i++) {
            let bg = new Background();
            let hills = new Hills();
            let fence = new Fence();
            let grave = new Grave();
            let street = new Street();
            bg.positionX = (i + startOffset) * bg.width;
            hills.positionX = (i + startOffset) * hills.width;
            fence.positionX = (i + startOffset) * fence.width;
            grave.positionX = (i + startOffset) * grave.width;
            street.positionX = (i + startOffset) * street.width;
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
        this.addObjectsToMap(this.hill);
        this.addObjectsToMap(this.fence);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.grave);
        this.addObjectsToMap(this.street);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.endboss);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => self.draw());
    }    

    setWorld(){
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
        if (this.endboss) {
            this.endboss.world = this;
            console.log('✅ Endboss hat World-Referenz erhalten');
        }
    }

    addObjectsToMap(objects){
        objects.forEach(o => this.addToMap(o));
    }

    isCharacter(mo) {
        return mo instanceof Character;
    }

    isEnemy(mo) {
        return mo instanceof Enemy;
    }

    isEndboss(mo) {
        return mo instanceof Endboss;
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImageBack(mo);
        } else {
            this.drawFrameModel(mo);
        }
    }

    flipImageBack(mo){
        this.ctx.save();
        this.ctx.translate(mo.positionX + mo.width / 2, mo.positionY + mo.height / 2);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
        
        this.ctx.scale(-1, 1);
        
        if(this.isCharacter(mo)){
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(-mo.width/2 + 50, -mo.height/2 + 50, mo.width - 120, mo.height - 85);
        } else if(this.isEnemy(mo)){
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(-mo.width/2 + 70, -mo.height/2 + 25, mo.width - 135, mo.height - 85);
        } else if(this.isEndboss(mo)){
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(-mo.width/2 + 150, -mo.height/2 + 120, mo.width - 290, mo.height - 205);
        }
        
        this.ctx.restore();
    }

    createClouds() {
        this.clouds.forEach((cloud, i) => {
            cloud.positionX = i * (cloud.width - 10);
        });
    }

    drawFrameModel(mo){
        this.ctx.drawImage(mo.img, mo.positionX, mo.positionY, mo.width, mo.height);
        if(this.isCharacter(mo)){
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(mo.positionX + 50, mo.positionY + 50, mo.width - 120, mo.height - 85);
            this.ctx.stroke();
        } else if(this.isEnemy(mo)){
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(mo.positionX + 70, mo.positionY + 25, mo.width - 135, mo.height - 85);
            this.ctx.stroke();
        } else if(this.isEndboss(mo)){
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(mo.positionX + 150, mo.positionY + 120, mo.width - 290, mo.height - 205);
            this.ctx.stroke();
        }
    }
}