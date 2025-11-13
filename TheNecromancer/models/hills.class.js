class Hills extends Model {
        height = canvas.height;
        width = 1920;
        positionY = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\background-hill\\4-side-backgroundhill.png');

        this.positionX = -300 + Math.random() * 150;
    }
}