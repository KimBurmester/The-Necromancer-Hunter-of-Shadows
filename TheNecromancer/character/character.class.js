/**
 * Main playable character class with movement, combat, and animation
 * @class
 */
class Character extends Model {
  /** @type {World} Reference to game world */
  world;
  /** @type {number} Character movement speed */
  speed = 5;
  /** @type {boolean} Movement state flag */
  isMoving = false;
  /** @type {number} Idle duration counter */
  idleTime = 0;
  /** @type {number} Interval for blinking animation */
  blinkInterval = 10000;
  /** @type {string} Current animation state */
  currentAnimationState = "idle";
  /** @type {boolean} Jump state flag */
  isJumping = false;
  /** @type {boolean} Falling state flag */
  isFalling = false;
  /** @type {number} Ground level Y position */
  jumpStartHeight = 250;
  /** @type {number} Maximum jump height */
  maxJumpHeight = 80;
  /** @type {boolean} Hurt state flag */
  isHurt = false;
  /** @type {boolean} Death state flag */
  isDead = false;
  /** @type {number} Timestamp of last damage taken */
  lastHit = 0;

  /**
   * Initializes character with images and position
   * @method
   */
  constructor() {
    super();
    this.loadAllCharacterImages();
    this.setInitialPosition();
    this.applyGravity();
    this.initializeCharacterStates();
}  

  /**
   * Initializes character state flags
   * @method
   */
  initializeCharacterStates() {
    this.isHurt = false;
    this.isDead = false;
    this.lastHit = 0;
    this.isAttacking = false;
    this.attackCooldown = false;
  }

  /**
   * Loads all character animation image sequences
   * @method
   */
  loadAllCharacterImages() {
    this.loadCharacterImagePaths();
    this.cacheCharacterImages();
  }

  /**
   * Retrieves all character animation paths
   * @method
   */
  loadCharacterImagePaths() {
    this.Character_Walking = ImageTemplateManager.getCharacterImages("walking");
    this.Character_Idle = ImageTemplateManager.getCharacterImages("idle");
    this.Character_Idle_Blinking = ImageTemplateManager.getCharacterImages("idle_blinking");
    this.Character_Jump_Start = ImageTemplateManager.getCharacterImages("jumping_start");
    this.Character_Jump_End = ImageTemplateManager.getCharacterImages("jumping_end");
    this.Character_Hurt = ImageTemplateManager.getCharacterImages("hurting");
    this.Character_Dead = ImageTemplateManager.getCharacterImages("dying");
    this.Character_Slashing = ImageTemplateManager.getCharacterImages("slashing");
  }

  /**
   * Caches all character images for rendering
   * @method
   */
  cacheCharacterImages() {
    this.loadImages(this.Character_Walking);
    this.loadImages(this.Character_Idle);
    this.loadImages(this.Character_Idle_Blinking);
    this.loadImages(this.Character_Jump_Start);
    this.loadImages(this.Character_Jump_End);
    this.loadImages(this.Character_Hurt);
    this.loadImages(this.Character_Dead);
    this.loadImages(this.Character_Slashing);
  }

/**
 * Triggers attack animation and state
 * @method
 */
attack() {
    if (!this.isAttacking && !this.isDead) {
        this.isAttacking = true;
        this.currentAnimationState = 'slashing';
        this.currentImage = 0;
        
        setTimeout(() => {
            this.isAttacking = false;
            this.currentAnimationState = 'idle';
            this.currentImage = 0;
        }, 400);
    }
}

/**
 * Returns attack hitbox for collision detection
 * @method
 * @returns {Object} Hitbox with x, y, width, height
 */
getAttackHitbox() {
    let attackRange = 100;
    let hitboxWidth = 120;
    
    if (this.otherDirection) {
        return {
            x: this.positionX - attackRange + 30,
            y: this.positionY + 80,
            width: hitboxWidth,
            height: 100
        };
    } else {
        return {
            x: this.positionX + this.width - 50,
            y: this.positionY + 80,
            width: hitboxWidth,
            height: 100
        };
    }
}

/**
 * Sets initial character position on game start
 * @method
 */
setInitialPosition() {
    if (this.Character_Idle.length > 0) {
      this.loadImage(this.Character_Idle[0]);
      this.positionX = -60; // ✅ Character startet bei X = -100 (sichtbar am linken Rand)
      this.positionY = 250;
      this.jumpStartHeight = this.positionY;
    }
}

  /**
   * Starts animation loops for character
   * @method
   */
  startAnimation() {
    this.animate();
    this.animateIdle();
  }

  /**
   * Initiates jump if character is on ground
   * @method
   */
  jump() {
    if (this.positionY >= 250 && !this.isJumping) {
      this.speedY = 30;
      this.isJumping = true;
      this.isFalling = false;
      this.currentAnimationState = "jumping_start";
      this.jumpStartHeight = this.positionY;
    }
  }

  /**
   * Calculates current frame for jump start animation
   * @method
   * @returns {number} Frame index for jump start
   */
  getJumpStartFrame() {
    let totalFrames = this.Character_Jump_Start.length;
    let jumpRange = this.jumpStartHeight - this.maxJumpHeight;
    let currentHeight = this.jumpStartHeight - this.positionY;
    let frame = Math.floor((currentHeight / jumpRange) * totalFrames);
    return Math.max(0, Math.min(frame, totalFrames - 1));
  }

  /**
   * Calculates current frame for jump end animation
   * @method
   * @returns {number} Frame index for jump end
   */
  getJumpEndFrame() {
    let totalFrames = this.Character_Jump_End.length;
    let jumpRange = this.jumpStartHeight - this.maxJumpHeight;
    let currentHeight = this.jumpStartHeight - this.positionY;
    let frame = Math.floor(
      ((jumpRange - currentHeight) / jumpRange) * totalFrames
    );
    return Math.max(0, Math.min(frame, totalFrames - 1));
  }

/**
 * Handles keyboard input for character movement and actions
 * @method
 */
handleMovement() {
    if (this.isHurt || this.isDead || !this.world.gameStarted) return;
    
    if (this.isAttacking) {
        if (this.world.keyboard.LEFT) {
            this.otherDirection = true;
        }
        if (this.world.keyboard.RIGHT) {
            this.otherDirection = false;
        }
        if (this.world.keyboard.D) {
            this.attack();
        }
        return;
    }
    
    this.isMoving = false;
    
    let levelEndX = this.world.level.levelEndX - 100;
    let levelStartX = -200;
    
    if (this.world.keyboard.RIGHT && this.positionX < levelEndX) {
        this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.positionX > levelStartX) {
        this.moveLeft();
    }
    if (this.world.keyboard.SPACE) {
        this.jump();
    }
    if (this.world.keyboard.D) {
        this.attack();
    }
}

/**
 * Handles attack animation playback
 * @method
 */
handleAttackAnimation() {
    if (this.isAttacking && this.Character_Slashing.length > 0) {
        let i = this.currentImage % this.Character_Slashing.length;
        this.playAnimation(this.Character_Slashing, i);
        this.currentImage++;
        
        if (this.currentImage >= this.Character_Slashing.length) {
            this.currentImage = 0;
        }
    }
}


  /**
   * Moves character to the right
   * @method
   */
  moveRight() {
    this.positionX += this.speed;
    this.otherDirection = false;
    this.isMoving = true;
    if (!this.isJumping) {
      this.currentAnimationState = "walking";
    }
  }

  /**
   * Moves character to the left
   * @method
   */
  moveLeft() {
    this.positionX -= this.speed;
    this.otherDirection = true;
    this.isMoving = true;
    if (!this.isJumping) {
      this.currentAnimationState = "walking";
    }
  }

  /**
   * Plays specific frame from animation array
   * @method
   * @param {Array<string>} animationArray - Image paths array
   * @param {number} frameIndex - Frame index to display
   */
  playAnimation(animationArray, frameIndex) {
    let path = animationArray[frameIndex].replace(/\\/g, "/");
    if (this.walkingImages[path]) {
      this.img = this.walkingImages[path];
    }
  }

  /**
   * Handles jump animation state transitions
   * @method
   */
  handleJumpAnimation() {
    this.updateFallingState();
    this.playJumpStartAnimation();
    this.playJumpEndAnimation();
    this.checkLanding();
  }

  /**
   * Updates falling state when character descends
   * @method
   */
  updateFallingState() {
    if (this.speedY < 0 && !this.isFalling) {
      this.isFalling = true;
      this.currentAnimationState = "jumping_end";
    }
  }

  /**
   * Plays jump start animation if active
   * @method
   */
  playJumpStartAnimation() {
    if (this.currentAnimationState === "jumping_start") {
      this.playAnimation(this.Character_Jump_Start, this.getJumpStartFrame());
    }
  }

  /**
   * Plays jump end animation if active
   * @method
   */
  playJumpEndAnimation() {
    if (this.currentAnimationState === "jumping_end") {
      this.playAnimation(this.Character_Jump_End, this.getJumpEndFrame());
    }
  }

  /**
   * Checks if character has landed on ground
   * @method
   */
  checkLanding() {
    if (this.positionY >= 250 && this.speedY <= 0) {
      this.isJumping = false;
      this.isFalling = false;
      this.currentAnimationState = this.isMoving ? "walking" : "idle";
      this.currentImage = 0;
      this.idleTime = 0;
    }
  }

  /**
   * Handles walking animation playback
   * @method
   */
  handleWalkingAnimation() {
    if (this.isMoving && this.currentAnimationState === "walking") {
      let i = this.currentImage % this.Character_Walking.length;
      this.playAnimation(this.Character_Walking, i);
      this.currentImage++;
      this.idleTime = 0;
    } else if (
      !this.isMoving &&
      !this.isJumping &&
      this.currentAnimationState === "walking"
    ) {
      this.currentAnimationState = "idle";
      this.currentImage = 0;
    }
  }

/**
 * Updates camera position to follow character
 * @method
 */
updateCamera() {
    let canvasWidth = 720;
    
    let targetCameraX = -this.positionX + 360;
    
    let maxCameraX = 0;
    let minCameraX = -(this.world.level.levelEndX - canvasWidth);
    
    this.world.camera_x = Math.max(minCameraX, Math.min(maxCameraX, targetCameraX));
}


/**
 * Main animation loop for character updates
 * @method
 */
animate() {
    setInterval(() => {
        if (this.world && this.world.keyboard) {
            if (this.isDeadCheck() && !this.isDead) {
                this.isDead = true;
                this.currentAnimationState = "dead";
                this.currentImage = 0;
            }
            if (this.isDead) {
                this.handleDeadAnimation();
                return;
            }
            if (this.isHurt) {
                this.handleHurtAnimation();
                return;
            }
            if (this.isAttacking) {
                this.handleAttackAnimation();
                this.handleMovement();
                return;
            }
            this.handleMovement();
            this.handleJumpingAndWalking();
            this.updateCamera();
        }
    }, 1000 / 30);
}

  /**
   * Plays single idle animation frame
   * @method
   * @param {Array<string>} animationArray - Animation frames array
   */
  playIdleFrame(animationArray) {
    let i = this.currentImage % animationArray.length;
    this.playAnimation(animationArray, i);
    this.currentImage++;
  }

  /**
   * Checks if blinking animation should start
   * @method
   */
  checkBlinkingTransition() {
    if (
      this.idleTime >= this.blinkInterval &&
      this.currentAnimationState !== "blinking"
    ) {
      this.currentAnimationState = "blinking";
      this.currentImage = 0;
    }
  }

  /**
   * Handles idle state animations (idle/blinking)
   * @method
   */
  handleIdleState() {
    this.checkBlinkingTransition();

    if (this.currentAnimationState === "idle") {
      this.playIdleFrame(this.Character_Idle);
    }

    if (this.currentAnimationState === "blinking") {
      this.playIdleFrame(this.Character_Idle_Blinking);
      this.checkBlinkingEnd();
    }
  }

  /**
   * Checks if blinking animation has finished
   * @method
   */
  checkBlinkingEnd() {
    if (this.currentImage >= this.Character_Idle_Blinking.length) {
      this.currentAnimationState = "idle";
      this.currentImage = 0;
      this.idleTime = 0;
    }
  }

  /**
   * Animation loop for idle states
   * @method
   */
  animateIdle() {
    setInterval(() => {
      if (!this.isMoving && !this.isJumping && !this.isDead && !this.isHurt) {
        this.idleTime += 100;
        this.handleIdleState();
      }
    }, 100);
  }

  /**
   * Returns character hitbox for collision detection
   * @method
   * @returns {Object} Hitbox with x, y, width, height
   */
  getHitbox() {
    return {
      x: this.positionX + 50,
      y: this.positionY + 50,
      width: this.width - 120,
      height: this.height - 85,
    };
  }

/**
 * Applies damage to character
 * @method
 * @param {number} damage - Damage amount (default 1)
 */
hit(damage = 1) {
    this.energy -= damage;
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = Date.now();
        this.isHurt = true;
        this.currentAnimationState = "hurting";
        this.currentImage = 0;
    }
}

  /**
   * Checks if character was recently hurt (within 500ms)
   * @method
   * @returns {boolean} True if hurt recently
   */
  isHurtRecently() {
    let timePassed = Date.now() - this.lastHit;
    return timePassed < 500;
  }

  /**
   * Checks if character energy has reached zero
   * @method
   * @returns {boolean} True if character is dead
   */
  isDeadCheck() {
    return this.energy === 0;
  }

  /**
   * Handles hurt animation playback
   * @method
   */
  handleHurtAnimation() {
    if (this.isHurt && this.Character_Hurt.length > 0) {
      let i = this.currentImage % this.Character_Hurt.length;
      this.playAnimation(this.Character_Hurt, i);
      this.currentImage++;
      if (this.currentImage >= this.Character_Hurt.length) {
        this.isHurt = false;
        this.currentAnimationState = "idle";
        this.currentImage = 0;
      }
    }
  }

  /**
   * Handles death animation playback
   * @method
   */
  handleDeadAnimation() {
    if (this.isDead && this.Character_Dead.length > 0) {
      let i = Math.min(this.currentImage, this.Character_Dead.length - 1);
      this.playAnimation(this.Character_Dead, i);
      if (this.currentImage < this.Character_Dead.length - 1) {
        this.currentImage++;
      }
    }
  }

  /**
   * Coordinates jump and walking animations
   * @method
   */
  handleJumpingAndWalking() {
    if (this.isJumping) {
      this.handleJumpAnimation();
    } else {
      this.handleWalkingAnimation();
    }
  }
}
