/**
 * Base model class for all game entities with physics, collision, and rendering capabilities
 * @class Model
 */
class Model {
  /** @type {number} Life points (unused in current implementation) */
  life;
  /** @type {number} Horizontal position in pixels */
  positionX = 50;
  /** @type {number} Vertical position in pixels */
  positionY = 250;
  /** @type {HTMLImageElement} Current image to render */
  img;
  /** @type {number} Width of the entity */
  width = 225;
  /** @type {number} Height of the entity */
  height = 225;
  /** @type {Object<string, HTMLImageElement>} Cache of loaded images */
  walkingImages = {};
  /** @type {number} Current frame index for animations */
  currentImage = 0;
  /** @type {number} Movement speed per frame */
  speed = 0.15;
  /** @type {boolean} Whether entity is facing left */
  otherDirection = false;
  /** @type {number} Vertical velocity for jumping/falling */
  speedY = 0;
  /** @type {number} Gravity acceleration */
  acceleration = 2.5;
  /** @type {number} Health/energy points */
  energy = 100;


/**
 * Applies gravity to the entity, making it fall when above ground
 * @method applyGravity
 * @returns {void}
 */
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

/**
 * Checks if the entity is currently above ground level
 * @method isAboveGround
 * @returns {boolean} True if entity is above ground (positionY < 250)
 */
isAboveGround(){
    return this.positionY < 250;
}

  /**
   * Returns the collision hitbox of this entity
   * @method getHitbox
   * @returns {{x: number, y: number, width: number, height: number}} Hitbox coordinates and dimensions
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
   * Checks if this entity is colliding with another entity using AABB collision detection
   * @method isColliding
   * @param {Model} other - The other entity to check collision with
   * @returns {boolean} True if entities are overlapping
   */
  isColliding(other) {
    let myHitbox = this.getHitbox();
    let otherHitbox = other.getHitbox();
    
    return myHitbox.x < otherHitbox.x + otherHitbox.width &&
           myHitbox.x + myHitbox.width > otherHitbox.x &&
           myHitbox.y < otherHitbox.y + otherHitbox.height &&
           myHitbox.y + myHitbox.height > otherHitbox.y;
  }

  /**
   * Loads a single image from the specified path
   * @method loadImage
   * @param {string} path - File path to the image
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path.replace(/\\/g, '/');
  }

  /**
   * Loads multiple images and caches them for animation
   * @method loadImages
   * @param {Array<string>} arr - Array of image file paths
   * @returns {void}
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      let normalizedPath = path.replace(/\\/g, '/');
      img.src = normalizedPath;
      this.walkingImages[normalizedPath] = img;
    });
  }

  /**
   * Starts continuous rightward movement using setInterval
   * @method moveRight
   * @returns {void}
   */
  moveRight() {
    setInterval(() => {
      this.positionX += this.speed;
    }, 1000 / 60);
  }

  /**
   * Starts continuous leftward movement using setInterval
   * @method moveLeft
   * @returns {void}
   */
  moveLeft() {
    setInterval(() => {
      this.positionX -= this.speed;
    }, 1000 / 60);
  }
  
  /**
   * Sets the position of the entity (currently empty)
   * @method setPostion
   * @returns {void}
   */
  setPostion() {}
}