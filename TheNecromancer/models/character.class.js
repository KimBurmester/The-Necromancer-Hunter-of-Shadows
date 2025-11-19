class Character extends Model {
    world;
    speed = 5;
    isMoving = false;
    idleTime = 0;
    blinkInterval = 10000; // 10 Sekunden bis Blinking
    currentAnimationState = 'idle'; // 'idle', 'blinking', 'walking'

    constructor(){
        super();
        this.Character_Walking = ImageTemplateManager.getCharacterImages('walking');
        this.Character_Idle = ImageTemplateManager.getCharacterImages('idle');
        this.Character_Idle_Blinking = ImageTemplateManager.getCharacterImages('idle_blinking');
        
        if (this.Character_Idle.length > 0) {
            this.loadImage(this.Character_Idle[0]);
            this.positionX = -820;
            this.positionY = 80;
        }
        
        this.loadImages(this.Character_Walking);
        this.loadImages(this.Character_Idle);
        this.loadImages(this.Character_Idle_Blinking);
        
        this.applyGravity();
    }
    
    startAnimation() {
        this.animate();
        this.animateIdle();
    }

    animate(){
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                
                this.isMoving = false;
                
                if (this.world.keyboard.RIGHT && this.positionX < 7490) {
                    this.positionX += this.speed;
                    this.otherDirection = false;
                    this.isMoving = true;
                    this.currentAnimationState = 'walking';
                }
                if (this.world.keyboard.LEFT && this.positionX > -1500) {
                    this.positionX -= this.speed;
                    this.otherDirection = true;
                    this.isMoving = true;
                    this.currentAnimationState = 'walking';
                }
                if (this.world.keyboard.UP) {
                    this.positionY -= this.speed;
                    this.isMoving = true;
                }
                if (this.world.keyboard.DOWN) {
                    this.positionY += this.speed;
                    this.isMoving = true;
                }
                
                // Walking Animation
                if (this.isMoving && this.currentAnimationState === 'walking') {
                    let i = this.currentImage % this.Character_Walking.length;
                    let path = this.Character_Walking[i];
                    this.img = this.walkingImages[path];
                    this.currentImage++;
                    this.idleTime = 0; // Reset Idle-Timer
                } else if (!this.isMoving) {
                    // Zurück zu Idle wenn keine Bewegung
                    if (this.currentAnimationState === 'walking') {
                        this.currentAnimationState = 'idle';
                        this.currentImage = 0;
                    }
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
            if (!this.isMoving) {
                this.idleTime += 100; // Erhöhe Timer alle 100ms
                
                // Wechsel zu Blinking nach 10 Sekunden
                if (this.idleTime >= this.blinkInterval && this.currentAnimationState !== 'blinking') {
                    this.currentAnimationState = 'blinking';
                    this.currentImage = 0;
                }
                
                // Idle Animation abspielen
                if (this.currentAnimationState === 'idle') {
                    let i = this.currentImage % this.Character_Idle.length;
                    let path = this.Character_Idle[i];
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                    this.currentImage++;
                }
                
                // Idle Blinking Animation abspielen
                if (this.currentAnimationState === 'blinking') {
                    let i = this.currentImage % this.Character_Idle_Blinking.length;
                    let path = this.Character_Idle_Blinking[i];
                    if (this.walkingImages[path]) {
                        this.img = this.walkingImages[path];
                    }
                    this.currentImage++;
                    
                    // Nach Blinking-Zyklus zurück zu Idle
                    if (this.currentImage >= this.Character_Idle_Blinking.length) {
                        this.currentAnimationState = 'idle';
                        this.currentImage = 0;
                        this.idleTime = 0;
                    }
                }
            }
        }, 100); // Prüfe alle 100ms
    }
}