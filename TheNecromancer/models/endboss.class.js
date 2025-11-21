class Endboss extends Model{
    isIdle = true;
    idleTime = 6000;
    speed = 2;
    hasStarted = false;
    world;
    idleAnimationDirection = 1; // Separate Direction für Idle
    walkAnimationDirection = 1; // Separate Direction für Walking
    currentIdleImage = 0;
    currentWalkImage = 0;
    
    constructor(){
        super();
        
        // Lade Endboss-Bilder
        this.Endboss_Idle = ImageTemplateManager.getEndbossImages('idle');
        this.Endboss_Walking = ImageTemplateManager.getEndbossImages('walking');
        this.Endboss_Hurt = ImageTemplateManager.getEndbossImages('hurt');
        this.Endboss_Dying = ImageTemplateManager.getEndbossImages('dying');
        
        // Lade das erste Idle-Bild als Standard
        if (this.Endboss_Idle.length > 0) {
            this.loadImage(this.Endboss_Idle[0]);
        }
        
        // Lade alle Bilder
        this.loadImages(this.Endboss_Idle);
        this.loadImages(this.Endboss_Walking);
        this.loadImages(this.Endboss_Hurt);
        this.loadImages(this.Endboss_Dying);
        
        // Position am Ende der Karte - Golem ist größer
        this.positionX = 720;
        this.positionY = 17;
        this.width = 500;
        this.height = 500;
        this.otherDirection = true;

        this.baseY = this.positionY;
        
        this.animateIdle();
        this.checkCharacterDistance();
    }

    checkCharacterDistance() {
        setInterval(() => {
            if (!this.hasStarted && this.world && this.world.character) {
                let distanceToEndboss = this.positionX - this.world.character.positionX;
                
                if (distanceToEndboss <= 720) {
                    this.hasStarted = true;
                    this.startIdlePhase();
                }
            }
        }, 100);
    }

    startIdlePhase() {
        setTimeout(() => {
            this.isIdle = false;
            this.currentWalkImage = 0; // Reset Walking-Animation
            this.walkAnimationDirection = 1; // Reset Direction
            this.animate();
        }, this.idleTime);
    }

    animateIdle() {
        let idleInterval = setInterval(() => {
            if (!this.isIdle) {
                clearInterval(idleInterval);
                return;
            }
            
            // Zeige aktuelles Bild
            let path = this.Endboss_Idle[this.currentIdleImage];
            if (this.walkingImages[path]) {
                this.img = this.walkingImages[path];
            }
            
            // Nächstes Bild berechnen
            this.currentIdleImage += this.idleAnimationDirection;
            
            // Richtung umkehren wenn Ende erreicht (0→5→4→3...→0)
            if (this.currentIdleImage >= this.Endboss_Idle.length - 1) {
                this.idleAnimationDirection = -1;
            } else if (this.currentIdleImage <= 0) {
                this.idleAnimationDirection = 1;
            }
        }, 150);
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            if (this.isIdle) return;
            
            // Bewege Endboss nach links
            this.positionX -= this.speed;
            
            // Zeige aktuelles Bild
            let path = this.Endboss_Walking[this.currentWalkImage];
            if (this.walkingImages[path]) {
                this.img = this.walkingImages[path];
            }
            
            // Nächstes Bild berechnen
            this.currentWalkImage += this.walkAnimationDirection;
            
            // Richtung umkehren wenn Ende erreicht (0→11→10→9...→0)
            if (this.currentWalkImage >= this.Endboss_Walking.length - 1) {
                this.walkAnimationDirection = -1;
            } else if (this.currentWalkImage <= 0) {
                this.walkAnimationDirection = 1;
            }
        }, 120);
    }

    getHitbox() {
    return {
        x: this.positionX + 150,
        y: this.positionY + 120,
        width: this.width - 290,
        height: this.height - 205
    };
}
}