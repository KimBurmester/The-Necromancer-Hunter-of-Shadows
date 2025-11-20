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
  energy = 100;


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

  /**
   * Gibt die Hitbox-Dimensionen für dieses Objekt zurück
   * Kann in Subklassen überschrieben werden
   */
  getHitbox() {
    return {
      x: this.positionX,
      y: this.positionY,
      width: this.width,
      height: this.height
    };
  }

  /**
   * Prüft ob dieses Objekt mit einem anderen kollidiert
   * @param {Model} other - Das andere Objekt
   * @returns {boolean} - true wenn Kollision, sonst false
   */
  isColliding(other) {
    let myHitbox = this.getHitbox();
    let otherHitbox = other.getHitbox();
    
    return myHitbox.x < otherHitbox.x + otherHitbox.width &&
           myHitbox.x + myHitbox.width > otherHitbox.x &&
           myHitbox.y < otherHitbox.y + otherHitbox.height &&
           myHitbox.y + myHitbox.height > otherHitbox.y;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path.replace(/\\/g, '/');
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      let normalizedPath = path.replace(/\\/g, '/');
      img.src = normalizedPath;
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