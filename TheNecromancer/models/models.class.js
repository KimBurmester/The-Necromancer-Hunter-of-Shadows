class Model {
  life;
  positionX = 50;
  positionY = 230;
  img;
  width = 225;
  height = 225;
  walkingImages = {}; //json
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;


applyGravity(){
    setInterval(() => {
        if(this.positionY < 230){
            this.positionY -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }, 1000 / 25);
}


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.walkingImages[path] = img;
    });
  }

  moveRight() {
    setInterval(() => {
      this.positionX += this.speed;
    }, 1000 / 60);
  }

  moveLeft() {
    setInterval(() => {
      this.positionX -= this.speed;
    }, 1000 / 60);
  }
  setPostion() {}
}
