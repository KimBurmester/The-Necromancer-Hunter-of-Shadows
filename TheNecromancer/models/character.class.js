class Character extends Model {
    world;
    speed = 5;
    isMoving = false;
    idleTime = 0;
    blinkInterval = 10000;
    currentAnimationState = 'idle';
    isJumping = false;
    isFalling = false;
    jumpStartHeight = 250;
    maxJumpHeight = 80;

    constructor(){
        super();
        this.loadAllCharacterImages();
        this.setInitialPosition();
        this.applyGravity();
    }

    loadAllCharacterImages() {
        this.Character_Walking = ImageTemplateManager.getCharacterImages('walking');
        this.Character_Idle = ImageTemplateManager.getCharacterImages('idle');
        this.Character_Idle_Blinking = ImageTemplateManager.getCharacterImages('idle_blinking');
        this.Character_Jump_Start = ImageTemplateManager.getCharacterImages('jumping_start');
        this.Character_Jump_End = ImageTemplateManager.getCharacterImages('jumping_end');
        
        this.loadImages(this.Character_Walking);
        this.loadImages(this.Character_Idle);
        this.loadImages(this.Character_Idle_Blinking);
        this.loadImages(this.Character_Jump_Start);
        this.loadImages(this.Character_Jump_End);
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
            this.currentAnimationState = 'jumping_start';
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
        let frame = Math.floor(((jumpRange - currentHeight) / jumpRange) * totalFrames);
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
            this.currentAnimationState = 'walking';
        }
    }

    moveLeft() {
        this.positionX -= this.speed;
        this.otherDirection = true;
        this.isMoving = true;
        if (!this.isJumping) {
            this.currentAnimationState = 'walking';
        }
    }

    playAnimation(animationArray, frameIndex) {
        let path = animationArray[frameIndex].replace(/\\/g, '/');
        if (this.walkingImages[path]) {
            this.img = this.walkingImages[path];
        }
    }

    handleJumpAnimation() {
        if (this.speedY < 0 && !this.isFalling) {
            this.isFalling = true;
            this.currentAnimationState = 'jumping_end';
        }
        
        if (this.currentAnimationState === 'jumping_start') {
            this.playAnimation(this.Character_Jump_Start, this.getJumpStartFrame());
        }
        
        if (this.currentAnimationState === 'jumping_end') {
            this.playAnimation(this.Character_Jump_End, this.getJumpEndFrame());
        }
        
        this.checkLanding();
    }

    checkLanding() {
        if (this.positionY >= 250 && this.speedY <= 0) {
            this.isJumping = false;
            this.isFalling = false;
            this.currentAnimationState = this.isMoving ? 'walking' : 'idle';
            this.currentImage = 0;
            this.idleTime = 0;
        }
    }

    handleWalkingAnimation() {
        if (this.isMoving && this.currentAnimationState === 'walking') {
            let i = this.currentImage % this.Character_Walking.length;
            this.playAnimation(this.Character_Walking, i);
            this.currentImage++;
            this.idleTime = 0;
        } else if (!this.isMoving && !this.isJumping && this.currentAnimationState === 'walking') {
            this.currentAnimationState = 'idle';
            this.currentImage = 0;
        }
    }

updateCamera() {
    let canvasWidth = 720;
    let newCameraX = -this.positionX + 60;
    
    // ✅ Dynamische Kamera-Grenzen
    let maxCameraX = -this.world.level.levelStartX; // Start
    let minCameraX = -(this.world.level.levelEndX - canvasWidth + 60); // Ende
    
    this.world.camera_x = Math.max(minCameraX, Math.min(maxCameraX, newCameraX));
}

    animate(){
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                this.handleMovement();
                
                if (this.isJumping) {
                    this.handleJumpAnimation();
                } else {
                    this.handleWalkingAnimation();
                }
                
                this.updateCamera();
            }
        }, 1000/30);
    }

    playIdleFrame(animationArray) {
        let i = this.currentImage % animationArray.length;
        this.playAnimation(animationArray, i);
        this.currentImage++;
    }

    checkBlinkingTransition() {
        if (this.idleTime >= this.blinkInterval && this.currentAnimationState !== 'blinking') {
            this.currentAnimationState = 'blinking';
            this.currentImage = 0;
        }
    }

    handleIdleState() {
        this.checkBlinkingTransition();
        
        if (this.currentAnimationState === 'idle') {
            this.playIdleFrame(this.Character_Idle);
        }
        
        if (this.currentAnimationState === 'blinking') {
            this.playIdleFrame(this.Character_Idle_Blinking);
            this.checkBlinkingEnd();
        }
    }

    checkBlinkingEnd() {
        if (this.currentImage >= this.Character_Idle_Blinking.length) {
            this.currentAnimationState = 'idle';
            this.currentImage = 0;
            this.idleTime = 0;
        }
    }

    animateIdle() {
        setInterval(() => {
            if (!this.isMoving && !this.isJumping) {
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
        height: this.height - 85
    };
}
}