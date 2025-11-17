class Background extends Model {
        height = canvas.height;
        width = canvas.width;
        positionY = 0;
        positionX = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\halloween-backgrounds\\1.png', 0);
    }
}