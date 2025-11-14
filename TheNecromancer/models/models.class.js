class Model{
    life;
    speed;
    positionX = 50;
    positionY = 250;
    img;
    width = 225;
    height = 225;
    walkingImages = {}; //json

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.walkingImages[path] = img;
        });
    }

    moveRight(){
        console.log("Model moved right");
    }

    moveLeft(){
        console.log("Model moved left");
    }
}