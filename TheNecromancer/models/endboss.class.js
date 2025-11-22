class Endboss extends Model{
    isHurt = false;
    lastHit = 0;
    isDead = false;
    health = 100;
    isIdle = true;
    idleTime = 6000;
    speed = 0.5;
    hasStarted = false;
    world;
    currentIdleImage = 0;
    currentWalkImage = 0;
    idleAnimationDirection = 1;
    walkAnimationDirection = 1;
    otherDirection = true;
    lastDamageTime = 0;
    
    constructor(){
        super();
        this.wasHitThisAttack = false;
        this.Endboss_Idle = ImageTemplateManager.getEnemyImages('endboss', 'idle');
        this.Endboss_Walking = ImageTemplateManager.getEnemyImages('endboss', 'walking');
        this.Endboss_Hurt = ImageTemplateManager.getEnemyImages('endboss', 'hurt');
        this.loadImages(this.Endboss_Idle);
        this.loadImages(this.Endboss_Walking);
        this.loadImages(this.Endboss_Hurt);
        
        if (this.Endboss_Idle && this.Endboss_Idle.length > 0) {
            this.img = new Image();
            this.img.src = this.Endboss_Idle[0];
        }
        this.positionX = 400;
        this.positionY = 100;
        this.width = 525;
        this.height = 400;
        this.animate();
        this.checkCharacterDistance();
    }

takeDamage(damage) {
    if (this.isDead) return;
    const now = Date.now();
    if (now - this.lastDamageTime < 500) {
        return;
    }
    
    this.lastDamageTime = now;
    this.health -= damage;
    this.lastHit = now;
    this.isHurt = true;
    this.currentIdleImage = 0;
    
    if (this.health <= 0) {
        this.isDead = true;
        this.isHurt = false;
    }
    
    setTimeout(() => {
        this.isHurt = false;
    }, 500);
}

animate() {
    setInterval(() => {
        if (this.isDead) return;
        
        if (this.isHurt && this.Endboss_Hurt.length > 0) {
            let path = this.Endboss_Hurt[this.currentIdleImage % this.Endboss_Hurt.length];
            if (this.walkingImages[path]) {
                this.img = this.walkingImages[path];
            }
            this.currentIdleImage++;
            return;
        }
        
        if (this.isIdle) {
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

    setInterval(() => {
        if (!this.isIdle && !this.isDead) {
            this.positionX -= this.speed;
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
        x: this.positionX + 180,
        y: this.positionY + 150,
        width: this.width - 360,
        height: this.height - 250
    };
}
}