class Model {
  life;
  positionX = 50;
  positionY = 250;
  img;
  width = 225;
  height = 225;
  walkingImages = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;


applyGravity(){
    setInterval(() => {
        if(this.isAboveGround() || this.speedY > 0){
            this.positionY -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.positionY = 250;
            this.speedY = 0;
        }
    }, 1000 / 25);
}

isAboveGround(){
    return this.positionY < 250;
}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path.replace(/\\/g, '/');
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      // WICHTIG: Normalisiere Pfad für Browser
      let normalizedPath = path.replace(/\\/g, '/');
      img.src = normalizedPath;
      // Speichere mit normalisiertem Pfad
      this.walkingImages[normalizedPath] = img;
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