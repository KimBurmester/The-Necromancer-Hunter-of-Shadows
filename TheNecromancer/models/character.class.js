class Character extends Model {
    world;
    speed = 5;
    isMoving = false;
    idleTime = 0;
    blinkInterval = 10000;
    currentAnimationState = 'idle';
    isJumping = false;
    isFalling = false;
    jumpStartHeight = 250; // Start-Position beim Sprung
    maxJumpHeight = 80; // Höchster Punkt (kleinster Y-Wert)

    constructor(){
        super();
        this.Character_Walking = ImageTemplateManager.getCharacterImages('walking');
        this.Character_Idle = ImageTemplateManager.getCharacterImages('idle');
        this.Character_Idle_Blinking = ImageTemplateManager.getCharacterImages('idle_blinking');
        this.Character_Jump_Start = ImageTemplateManager.getCharacterImages('jumping_start');
        this.Character_Jump_End = ImageTemplateManager.getCharacterImages('jumping_end');
        
        if (this.Character_Idle.length > 0) {
            this.loadImage(this.Character_Idle[0]);
            this.positionX = -820;
            this.positionY = 250;
        }
        
        this.loadImages(this.Character_Walking);
        this.loadImages(this.Character_Idle);
        this.loadImages(this.Character_Idle_Blinking);
        this.loadImages(this.Character_Jump_Start);
        this.loadImages(this.Character_Jump_End);
        
        this.applyGravity();
    }
    
    startAnimation() {
        this.animate();
        this.animateIdle();
    }

    jump() {
        if (this.positionY >= 250 && !this.isJumping) {
            console.log('🚀 Sprung gestartet!');
            this.speedY = 30;
            this.isJumping = true;
            this.isFalling = false;
            this.currentAnimationState = 'jumping_start';
            this.jumpStartHeight = this.positionY;
        }
    }

    getJumpStartFrame() {
        // Berechne Frame basierend auf Höhe (250 → 80)
        let totalFrames = this.Character_Jump_Start.length; // 6 Frames
        let jumpRange = this.jumpStartHeight - this.maxJumpHeight; // 250 - 80 = 170
        let currentHeight = this.jumpStartHeight - this.positionY; // Wie weit ist er schon gesprungen?
        
        // Frame berechnen (0-5)
        let frame = Math.floor((currentHeight / jumpRange) * totalFrames);
        frame = Math.min(frame, totalFrames - 1); // Max 5 (letztes Frame)
        frame = Math.max(frame, 0); // Min 0
        
        console.log(`⬆️ Hochsprung - Y: ${this.positionY.toFixed(0)}, Frame: ${frame}/${totalFrames-1}`);
        return frame;
    }

    getJumpEndFrame() {
        // Berechne Frame basierend auf Höhe (80 → 250)
        let totalFrames = this.Character_Jump_End.length; // 6 Frames
        let jumpRange = this.jumpStartHeight - this.maxJumpHeight; // 250 - 80 = 170
        let currentHeight = this.jumpStartHeight - this.positionY; // Wie weit ist er vom Boden entfernt?
        
        // Frame berechnen (0-5) - umgekehrt, weil er nach unten fällt
        let frame = Math.floor(((jumpRange - currentHeight) / jumpRange) * totalFrames);
        frame = Math.min(frame, totalFrames - 1); // Max 5
        frame = Math.max(frame, 0); // Min 0
        
        console.log(`⬇️ Runterfall - Y: ${this.positionY.toFixed(0)}, Frame: ${frame}/${totalFrames-1}`);
        return frame;
    }

    animate(){
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                
                this.isMoving = false;
                
                if (this.world.keyboard.RIGHT && this.positionX < 7490) {
                    this.positionX += this.speed;
                    this.otherDirection = false;
                    this.isMoving = true;
                    if (!this.isJumping) {
                        this.currentAnimationState = 'walking';
                    }
                }
                if (this.world.keyboard.LEFT && this.positionX > -1500) {
                    this.positionX -= this.speed;
                    this.otherDirection = true;
                    this.isMoving = true;
                    if (!this.isJumping) {
                        this.currentAnimationState = 'walking';
                    }
                }
                
                if (this.world.keyboard.SPACE) {
                    this.jump();
                }
                
                // Jump Animation
                if (this.isJumping) {
                    // Wechsel zu Fall-Animation wenn Character nach unten fällt
                    if (this.speedY < 0 && !this.isFalling) {
                        console.log('⬇️ Falle runter - wechsle zu Jump End Animation');
                        this.isFalling = true;
                        this.currentAnimationState = 'jumping_end';
                    }
                    
                    // Jump Start Animation (nach oben) - Frame basiert auf Höhe
                    if (this.currentAnimationState === 'jumping_start') {
                        let frameIndex = this.getJumpStartFrame();
                        let path = this.Character_Jump_Start[frameIndex].replace(/\\/g, '/');
                        
                        if (this.walkingImages[path]) {
                            this.img = this.walkingImages[path];
                        }
                    }
                    
                    // Jump End Animation (nach unten) - Frame basiert auf Höhe
                    if (this.currentAnimationState === 'jumping_end') {
                        let frameIndex = this.getJumpEndFrame();
                        let path = this.Character_Jump_End[frameIndex].replace(/\\/g, '/');
                        
                        if (this.walkingImages[path]) {
                            this.img = this.walkingImages[path];
                        }
                    }
                    
                    // Landung
                    if (this.positionY >= 250 && this.speedY <= 0) {
                        console.log('🛬 Landung!');
                        this.isJumping = false;
                        this.isFalling = false;
                        this.currentAnimationState = this.isMoving ? 'walking' : 'idle';
                        this.currentImage = 0;
                        this.idleTime = 0;
                    }
                }
                // Walking Animation
                else if (this.isMoving && this.currentAnimationState === 'walking') {
                    let i = this.currentImage % this.Character_Walking.length;
                    let path = this.Character_Walking[i].replace(/\\/g, '/');
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                    this.currentImage++;
                    this.idleTime = 0;
                } 
                // Zurück zu Idle
                else if (!this.isMoving && !this.isJumping && this.currentAnimationState === 'walking') {
                    this.currentAnimationState = 'idle';
                    this.currentImage = 0;
                }
                 
                let newCameraX = -this.positionX + 60;
                let minCameraX = -(7490 - 720 + 60);
                let maxCameraX = 820;
                
                this.world.camera_x = Math.max(minCameraX, Math.min(maxCameraX, newCameraX));
            }
        }, 1000/30);
    }

    animateIdle() {
        setInterval(() => {
            if (!this.isMoving && !this.isJumping) {
                this.idleTime += 100;
                
                if (this.idleTime >= this.blinkInterval && this.currentAnimationState !== 'blinking') {
                    this.currentAnimationState = 'blinking';
                    this.currentImage = 0;
                }
                
                if (this.currentAnimationState === 'idle') {
                    let i = this.currentImage % this.Character_Idle.length;
                    let path = this.Character_Idle[i].replace(/\\/g, '/');
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                    this.currentImage++;
                }
                
                if (this.currentAnimationState === 'blinking') {
                    let i = this.currentImage % this.Character_Idle_Blinking.length;
                    let path = this.Character_Idle_Blinking[i].replace(/\\/g, '/');
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                    this.currentImage++;
                    
                    if (this.currentImage >= this.Character_Idle_Blinking.length) {
                        this.currentAnimationState = 'idle';
                        this.currentImage = 0;
                        this.idleTime = 0;
                    }
                }
            }
        }, 100);
    }
}