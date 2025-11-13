class Grave extends Model {
        height = canvas.height;
        width = 3840;
        positionY = 14.8;

    constructor(){
        super().loadImage('TheNecromancer\\img\\background-graves\\6-side-background-graves.png');

        this.positionX = -3840 + Math.random() * 3840/2;
    }
}