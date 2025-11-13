class Model{
    life;
    speed;
    positionX = 50;
    positionY = 250;
    img;
    width = 225;
    height = 225;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log("Model moved right");
    }

    moveLeft(){
        console.log("Model moved left");
    }
}