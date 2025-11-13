class Cloud extends Model {
        height = canvas.height;
        width = 1920;
        positionY = 0;

    constructor(){
        super().loadImage('El_Pollo_Loco\\img\\clouds\\2-side-clouds.png');

        this.positionX = -300 + Math.random() * 150;
    }
}