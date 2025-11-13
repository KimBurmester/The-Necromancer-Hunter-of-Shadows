class Cloud extends Model {
        height = canvas.height;
        width = 1920;
        positionY = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\clouds\\2-side-clouds.png');

        this.positionX = -300 + Math.random() * 150;
        this.animate();
    }

    animate(){
        setInterval(() =>{
            this.positionX -= 0.15;
        }, 1000/60);
    }
}