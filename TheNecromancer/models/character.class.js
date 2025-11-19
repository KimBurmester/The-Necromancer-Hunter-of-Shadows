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
        frame = Math.min(frame, totalFrames - 1);
        frame = Math.max(frame, 0);
        
        return frame;
    }

    getJumpEndFrame() {
        let totalFrames = this.Character_Jump_End.length;
        let jumpRange = this.jumpStartHeight - this.maxJumpHeight;
        let currentHeight = this.jumpStartHeight - this.positionY;
        let frame = Math.floor(((jumpRange - currentHeight) / jumpRange) * totalFrames);
        frame = Math.min(frame, totalFrames - 1);
        frame = Math.max(frame, 0);
        
        return frame;
    }


animate(){
    let frameCount = 0;
    
    setInterval(() => {
        if (this.world && this.world.keyboard) {
            
            this.isMoving = false;
            
            if (this.world.keyboard.RIGHT && this.positionX < 495) {
                this.positionX += this.speed;
                this.otherDirection = false;
                this.isMoving = true;
                if (!this.isJumping) {
                    this.currentAnimationState = 'walking';
                }
            }
            if (this.world.keyboard.LEFT && this.positionX > -820) {
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
                if (this.speedY < 0 && !this.isFalling) {
                    this.isFalling = true;
                    this.currentAnimationState = 'jumping_end';
                }
                
                if (this.currentAnimationState === 'jumping_start') {
                    let frameIndex = this.getJumpStartFrame();
                    let path = this.Character_Jump_Start[frameIndex].replace(/\\/g, '/');
                    
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                }
                
                if (this.currentAnimationState === 'jumping_end') {
                    let frameIndex = this.getJumpEndFrame();
                    let path = this.Character_Jump_End[frameIndex].replace(/\\/g, '/');
                    
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                }
                
                if (this.positionY >= 250 && this.speedY <= 0) {
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
            else if (!this.isMoving && !this.isJumping && this.currentAnimationState === 'walking') {
                this.currentAnimationState = 'idle';
                this.currentImage = 0;
            }
             
            // KORRIGIERTE KAMERA-LOGIK
            let canvasWidth = 720;
            
            // Kamera folgt Character mit Offset von 60px
            let newCameraX = -this.positionX + 60;
            
            // Grenzen für camera_x
            let maxCameraX = 820;  // Linke Grenze (Start)
            let minCameraX = -60;  // Rechte Grenze (Ende bei Endboss)
            
            // Kamera zwischen den Grenzen halten
            this.world.camera_x = Math.max(minCameraX, Math.min(maxCameraX, newCameraX));
            
            // Log nur alle 30 Frames (ca. jede Sekunde)
            if (frameCount % 30 === 0) {
                console.log('═══════════════════════════════════');
                console.log('📍 Character Position X:', this.positionX.toFixed(2));
                console.log('📷 Berechnet camera_x:', newCameraX.toFixed(2));
                console.log('📐 minCameraX:', minCameraX, '| maxCameraX:', maxCameraX);
                console.log('🎥 Finale camera_x:', this.world.camera_x.toFixed(2));
                
                if (this.world.camera_x === maxCameraX) {
                    console.log('⬅️ LINKS ENDE: Kamera am Anfang fixiert');
                } else if (this.world.camera_x === minCameraX) {
                    console.log('➡️ RECHTS ENDE: Kamera am Ende fixiert');
                } else {
                    console.log('✅ NORMAL: Camera folgt Character');
                }
                console.log('═══════════════════════════════════');
            }
            
            frameCount++;
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