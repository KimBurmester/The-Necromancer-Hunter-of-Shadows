class Character extends Model {
  world;
  speed = 5;
  isMoving = false;
  idleTime = 0;
  blinkInterval = 10000;
  currentAnimationState = "idle";
  isJumping = false;
  isFalling = false;
  jumpStartHeight = 250;
  maxJumpHeight = 80;
  isHurt = false;
  isDead = false;
  lastHit = 0;

  constructor() {
    super();
    this.loadAllCharacterImages();
    this.setInitialPosition();
    this.applyGravity();
  }

  loadAllCharacterImages() {
    this.Character_Walking = ImageTemplateManager.getCharacterImages("walking");
    this.Character_Idle = ImageTemplateManager.getCharacterImages("idle");
    this.Character_Idle_Blinking = ImageTemplateManager.getCharacterImages("idle_blinking");
    this.Character_Jump_Start = ImageTemplateManager.getCharacterImages("jumping_start");
    this.Character_Jump_End = ImageTemplateManager.getCharacterImages("jumping_end");
    this.Character_Hurt = ImageTemplateManager.getCharacterImages("hurting");
    this.Character_Dead = ImageTemplateManager.getCharacterImages("dying");
    this.Character_Slashing = ImageTemplateManager.getCharacterImages("slashing");
    this.loadImages(this.Character_Walking);
    this.loadImages(this.Character_Idle);
    this.loadImages(this.Character_Idle_Blinking);
    this.loadImages(this.Character_Jump_Start);
    this.loadImages(this.Character_Jump_End);
    this.loadImages(this.Character_Hurt);
    this.loadImages(this.Character_Dead);
    this.loadImages(this.Character_Slashing);
  }

  setInitialPosition() {
    if (this.Character_Idle.length > 0) {
      this.loadImage(this.Character_Idle[0]);
      this.positionX = -820;
      this.positionY = 250;
    }
  }

  startAnimation() {
    this.animate();
    this.animateIdle();
  }

  jump() {
    if (this.positionY >= 250 && !this.isJumping) {
      this.speedY = 30;
      this.isJumping = true;
      this.isFalling = false;
      this.currentAnimationState = "jumping_start";
      this.jumpStartHeight = this.positionY;
    }
  }

  getJumpStartFrame() {
    let totalFrames = this.Character_Jump_Start.length;
    let jumpRange = this.jumpStartHeight - this.maxJumpHeight;
    let currentHeight = this.jumpStartHeight - this.positionY;
    let frame = Math.floor((currentHeight / jumpRange) * totalFrames);
    return Math.max(0, Math.min(frame, totalFrames - 1));
  }

  getJumpEndFrame() {
    let totalFrames = this.Character_Jump_End.length;
    let jumpRange = this.jumpStartHeight - this.maxJumpHeight;
    let currentHeight = this.jumpStartHeight - this.positionY;
    let frame = Math.floor(
      ((jumpRange - currentHeight) / jumpRange) * totalFrames
    );
    return Math.max(0, Math.min(frame, totalFrames - 1));
  }

  handleMovement() {
    if (this.isHurt) return;
    this.isMoving = false;
    let levelEndX = this.world.level.levelEndX - 225;
    let levelStartX = this.world.level.levelStartX;

    if (this.world.keyboard.RIGHT && this.positionX < levelEndX) {
      this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.positionX > levelStartX) {
      this.moveLeft();
    }
    if (this.world.keyboard.SPACE) {
      this.jump();
    }
  }

  moveRight() {
    this.positionX += this.speed;
    this.otherDirection = false;
    this.isMoving = true;
    if (!this.isJumping) {
      this.currentAnimationState = "walking";
    }
  }

  moveLeft() {
    this.positionX -= this.speed;
    this.otherDirection = true;
    this.isMoving = true;
    if (!this.isJumping) {
      this.currentAnimationState = "walking";
    }
  }

  playAnimation(animationArray, frameIndex) {
    let path = animationArray[frameIndex].replace(/\\/g, "/");
    if (this.walkingImages[path]) {
      this.img = this.walkingImages[path];
    }
  }

  handleJumpAnimation() {
    if (this.speedY < 0 && !this.isFalling) {
      this.isFalling = true;
      this.currentAnimationState = "jumping_end";
    }

    if (this.currentAnimationState === "jumping_start") {
      this.playAnimation(this.Character_Jump_Start, this.getJumpStartFrame());
    }

    if (this.currentAnimationState === "jumping_end") {
      this.playAnimation(this.Character_Jump_End, this.getJumpEndFrame());
    }

    this.checkLanding();
  }

  checkLanding() {
    if (this.positionY >= 250 && this.speedY <= 0) {
      this.isJumping = false;
      this.isFalling = false;
      this.currentAnimationState = this.isMoving ? "walking" : "idle";
      this.currentImage = 0;
      this.idleTime = 0;
    }
  }

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

  updateCamera() {
    let canvasWidth = 720;
    let newCameraX = -this.positionX + 60;
    let maxCameraX = -this.world.level.levelStartX;
    let minCameraX = -(this.world.level.levelEndX - canvasWidth + 60);

    this.world.camera_x = Math.max(
      minCameraX,
      Math.min(maxCameraX, newCameraX)
    );
  }

  animate() {
    setInterval(() => {
      if (this.world && this.world.keyboard) {
          if (this.isDeadCheck() && !this.isDead) {
                this.isDead = true;
                this.currentAnimationState = "dead";
                this.currentImage = 0;
          }
          if (this.isDead) { this.handleDeadAnimation(); return; }
          if (this.isHurt) { this.handleHurtAnimation(); return; }
        this.handleMovement();
        this.handleJumpingAndWalking();
        this.updateCamera();
      }
    }, 1000 / 30);
  }

  playIdleFrame(animationArray) {
    let i = this.currentImage % animationArray.length;
    this.playAnimation(animationArray, i);
    this.currentImage++;
  }

  checkBlinkingTransition() {
    if (
      this.idleTime >= this.blinkInterval &&
      this.currentAnimationState !== "blinking"
    ) {
      this.currentAnimationState = "blinking";
      this.currentImage = 0;
    }
  }

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

  checkBlinkingEnd() {
    if (this.currentImage >= this.Character_Idle_Blinking.length) {
      this.currentAnimationState = "idle";
      this.currentImage = 0;
      this.idleTime = 0;
    }
  }

  animateIdle() {
    setInterval(() => {
      if (!this.isMoving && !this.isJumping && !this.isDead && !this.isHurt) {
        this.idleTime += 100;
        this.handleIdleState();
      }
    }, 100);
  }
  getHitbox() {
    return {
      x: this.positionX + 50,
      y: this.positionY + 50,
      width: this.width - 120,
      height: this.height - 85,
    };
  }
  hit() {
    this.energy -= 1;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = Date.now();
      this.isHurt = true;
      this.currentAnimationState = "hurting";
      this.currentImage = 0;
    }
  }

  isHurtRecently() {
    let timePassed = Date.now() - this.lastHit;
    return timePassed < 500;
  }

  isDeadCheck() {
    return this.energy === 0;
  }

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

  handleDeadAnimation() {
    if (this.isDead && this.Character_Dead.length > 0) {
      let i = Math.min(this.currentImage, this.Character_Dead.length - 1);
      this.playAnimation(this.Character_Dead, i);
      if (this.currentImage < this.Character_Dead.length - 1) {
        this.currentImage++;
      }
    }
  }

  handleJumpingAndWalking() {
    if (this.isJumping) {
      this.handleJumpAnimation();
    } else {
      this.handleWalkingAnimation();
    }
  }
}
