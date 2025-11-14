class Model {
  life;
  positionX = 50;
  positionY = 250;
  img;
  width = 225;
  height = 225;
  walkingImages = {}; //json
  currentImage = 0;
  speed = 0.15;

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
