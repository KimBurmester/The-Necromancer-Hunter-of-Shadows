class BackgroundObject extends Model {

    width = 720;
    height = 400;

    constructor(imagePath, positionX){
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 480 - this.height;
    }
}