/**
 * Manages character animation states and transitions
 * @class CharacterStateManager
 */
class CharacterStateManager {
  /**
   * Initializes character state manager
   * @method
   * @param {Character} character - Character instance
   */
  constructor(character) {
    this.character = character;
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
    if (this.character.speedY < 0 && !this.character.isFalling) {
      this.character.isFalling = true;
      this.character.currentAnimationState = "jumping_end";
    }
  }

  /**
   * Plays jump start animation if active
   * @method
   */
  playJumpStartAnimation() {
    if (this.character.currentAnimationState === "jumping_start") {
      this.character.playAnimation(
        this.character.Character_Jump_Start,
        this.getJumpStartFrame()
      );
    }
  }

  /**
   * Plays jump end animation if active
   * @method
   */
  playJumpEndAnimation() {
    if (this.character.currentAnimationState === "jumping_end") {
      this.character.playAnimation(
        this.character.Character_Jump_End,
        this.getJumpEndFrame()
      );
    }
  }

  /**
   * Checks if character has landed on ground
   * @method
   */
  checkLanding() {
    if (this.character.positionY >= 250 && this.character.speedY <= 0) {
      this.character.isJumping = false;
      this.character.isFalling = false;
      this.character.currentAnimationState = this.character.isMoving
        ? "walking"
        : "idle";
      this.character.currentImage = 0;
      this.character.idleTime = 0;
    }
  }

  /**
   * Handles walking animation playback
   * @method
   */
  handleWalkingAnimation() {
    if (
      this.character.isMoving &&
      this.character.currentAnimationState === "walking"
    ) {
      let i = this.character.currentImage % this.character.Character_Walking.length;
      this.character.playAnimation(this.character.Character_Walking, i);
      this.character.currentImage++;
      this.character.idleTime = 0;
    } else if (
      !this.character.isMoving &&
      !this.character.isJumping &&
      this.character.currentAnimationState === "walking"
    ) {
      this.character.currentAnimationState = "idle";
      this.character.currentImage = 0;
    }
  }

  /**
   * Handles idle state animations (idle/blinking)
   * @method
   */
  handleIdleState() {
    this.checkBlinkingTransition();

    if (this.character.currentAnimationState === "idle") {
      this.playIdleFrame(this.character.Character_Idle);
    }

    if (this.character.currentAnimationState === "blinking") {
      this.playIdleFrame(this.character.Character_Idle_Blinking);
      this.checkBlinkingEnd();
    }
  }

  /**
   * Checks if blinking animation should start
   * @method
   */
  checkBlinkingTransition() {
    if (
      this.character.idleTime >= this.character.blinkInterval &&
      this.character.currentAnimationState !== "blinking"
    ) {
      this.character.currentAnimationState = "blinking";
      this.character.currentImage = 0;
    }
  }

  /**
   * Checks if blinking animation has finished
   * @method
   */
  checkBlinkingEnd() {
    if (this.character.currentImage >= this.character.Character_Idle_Blinking.length) {
      this.character.currentAnimationState = "idle";
      this.character.currentImage = 0;
      this.character.idleTime = 0;
    }
  }

  /**
   * Plays single idle animation frame
   * @method
   * @param {Array<string>} animationArray - Animation frames array
   */
  playIdleFrame(animationArray) {
    let i = this.character.currentImage % animationArray.length;
    this.character.playAnimation(animationArray, i);
    this.character.currentImage++;
  }

  /**
   * Handles hurt animation playback
   * @method
   */
  handleHurtAnimation() {
    if (this.character.isHurt && this.character.Character_Hurt.length > 0) {
      let i = this.character.currentImage % this.character.Character_Hurt.length;
      this.character.playAnimation(this.character.Character_Hurt, i);
      this.character.currentImage++;
      if (this.character.currentImage >= this.character.Character_Hurt.length) {
        this.character.isHurt = false;
        this.character.currentAnimationState = "idle";
        this.character.currentImage = 0;
      }
    }
  }

  /**
   * Handles death animation playback
   * @method
   */
  handleDeadAnimation() {
    if (this.character.isDead && this.character.Character_Dead.length > 0) {
      let i = Math.min(
        this.character.currentImage,
        this.character.Character_Dead.length - 1
      );
      this.character.playAnimation(this.character.Character_Dead, i);
      if (this.character.currentImage < this.character.Character_Dead.length - 1) {
        this.character.currentImage++;
      }
    }
  }

  /**
   * Handles attack animation playback
   * @method
   */
  handleAttackAnimation() {
    if (this.character.isAttacking && this.character.Character_Slashing.length > 0) {
      let i = this.character.currentImage % this.character.Character_Slashing.length;
      this.character.playAnimation(this.character.Character_Slashing, i);
      this.character.currentImage++;

      if (this.character.currentImage >= this.character.Character_Slashing.length) {
        this.character.currentImage = 0;
      }
    }
  }

  /**
   * Calculates current frame for jump start animation
   * @method
   * @returns {number} Frame index for jump start
   */
  getJumpStartFrame() {
    let totalFrames = this.character.Character_Jump_Start.length;
    let jumpRange = this.character.jumpStartHeight - this.character.maxJumpHeight;
    let currentHeight = this.character.jumpStartHeight - this.character.positionY;
    let frame = Math.floor((currentHeight / jumpRange) * totalFrames);
    return Math.max(0, Math.min(frame, totalFrames - 1));
  }

  /**
   * Calculates current frame for jump end animation
   * @method
   * @returns {number} Frame index for jump end
   */
  getJumpEndFrame() {
    let totalFrames = this.character.Character_Jump_End.length;
    let jumpRange = this.character.jumpStartHeight - this.character.maxJumpHeight;
    let currentHeight = this.character.jumpStartHeight - this.character.positionY;
    let frame = Math.floor(
      ((jumpRange - currentHeight) / jumpRange) * totalFrames
    );
    return Math.max(0, Math.min(frame, totalFrames - 1));
  }

  /**
   * Updates camera position to follow character
   * @method
   */
  updateCamera() {
    let canvasWidth = 720;
    let targetCameraX = -this.character.positionX + 360;
    let maxCameraX = 0;
    let minCameraX = -(this.character.world.level.levelEndX - canvasWidth);

    this.character.world.camera_x = Math.max(
      minCameraX,
      Math.min(maxCameraX, targetCameraX)
    );
  }
}