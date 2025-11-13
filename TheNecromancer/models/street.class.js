class Street extends Model {
        height = canvas.height;
        width = 1920;
        positionY = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\street\\9-side-street.png');

        this.positionX = -300 + Math.random() * 150;
    }
}