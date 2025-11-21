class Endboss extends Model{
    isHurt = false;
    lastHit = 0;
    isDead = false;
    health = 100;
    isIdle = true;
    idleTime = 6000;
    speed = 2;
    hasStarted = false;
    world;
    currentIdleImage = 0;
    currentWalkImage = 0;
    idleAnimationDirection = 1;
    walkAnimationDirection = 1;
    
    constructor(){
        super();
        this.Endboss_Idle = ImageTemplateManager.getEnemyImages('endboss', 'idle');
        this.Endboss_Walking = ImageTemplateManager.getEnemyImages('endboss', 'walking');
        this.Endboss_Hurt = ImageTemplateManager.getEnemyImages('endboss', 'hurt');
        this.loadImages(this.Endboss_Idle);
        this.loadImages(this.Endboss_Walking);
        this.loadImages(this.Endboss_Hurt);
        
        // ✅ KORRIGIERT: Prüfe ob Array nicht leer ist
        if (this.Endboss_Idle && this.Endboss_Idle.length > 0) {
            this.loadImage(this.Endboss_Idle[0]);
        }
        
        this.positionX = 400;
        this.positionY = 24;
        this.width = 525;
        this.height = 400;
        this.animate();
        this.checkCharacterDistance();
    }

    takeDamage(damage) {
        this.health -= damage;
        this.lastHit = Date.now();
        this.isHurt = true;
        
        console.log(`💥 ENDBOSS getroffen! Health: ${this.health}`);
        
        if (this.health <= 0) {
            this.isDead = true;
            console.log('💀 ENDBOSS besiegt!');
        }
        
        setTimeout(() => {
            this.isHurt = false;
        }, 500);
    }

    animate() {
        // ✅ ANIMATION Interval
        setInterval(() => {
            if (this.isDead) return;
            
            if (this.isHurt && this.Endboss_Hurt.length > 0) {
                this.playAnimation(this.Endboss_Hurt);
            } else if (this.isIdle) {
                // Idle Animation mit Richtungswechsel
                let path = this.Endboss_Idle[this.currentIdleImage];
                if (this.walkingImages[path]) {
                    this.img = this.walkingImages[path];
                }
                
                this.currentIdleImage += this.idleAnimationDirection;
                
                if (this.currentIdleImage >= this.Endboss_Idle.length - 1) {
                    this.idleAnimationDirection = -1;
                } else if (this.currentIdleImage <= 0) {
                    this.idleAnimationDirection = 1;
                }
            } else {
                // Walking Animation mit Richtungswechsel
                let path = this.Endboss_Walking[this.currentWalkImage];
                if (this.walkingImages[path]) {
                    this.img = this.walkingImages[path];
                }
                
                this.currentWalkImage += this.walkAnimationDirection;
                
                if (this.currentWalkImage >= this.Endboss_Walking.length - 1) {
                    this.walkAnimationDirection = -1;
                } else if (this.currentWalkImage <= 0) {
                    this.walkAnimationDirection = 1;
                }
            }
        }, 150);

        // ✅ BEWEGUNG Interval - NUR HIER!
        setInterval(() => {
            if (!this.isIdle && !this.isDead) {
                this.positionX -= this.speed; // ✅ Direkt hier bewegen
            }
        }, 1000 / 60);
    }

    checkCharacterDistance() {
        setInterval(() => {
            if (!this.hasStarted && this.world && this.world.character) {
                let distanceToEndboss = this.positionX - this.world.character.positionX;
                
                if (distanceToEndboss <= 720) {
                    this.hasStarted = true;
                    setTimeout(() => {
                        this.isIdle = false;
                        this.currentWalkImage = 0;
                        this.walkAnimationDirection = 1;
                    }, this.idleTime);
                }
            }
        }, 100);
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