class Cloud extends Model {
        height = 680;
        width = 1920;
        positionY = 0;
        speed = 0.15;

    constructor(){
        super().loadImage('TheNecromancer\\img\\clouds\\2.png', 0);
        this.setPosition();
        this.animate();
    }
    animate(){
        this.moveLeft();
    }
    setPosition(){
        this.positionX = -300 + Math.random() * 150;
    }
}