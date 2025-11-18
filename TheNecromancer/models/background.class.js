class Background extends Model {
        height = 1080;
        width = 1920/2;
        positionY = 0;
        positionX = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\background\\1.png', 0);
    }
}