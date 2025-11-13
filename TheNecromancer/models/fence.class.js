class Fence extends Model {
        height = canvas.height;
        width = 1920;
        positionY = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\background-fence\\5-side-background-fence.png');

        this.positionX = -300 + Math.random() * 150;
    }
}