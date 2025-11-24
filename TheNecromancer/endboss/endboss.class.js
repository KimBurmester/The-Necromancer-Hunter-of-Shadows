/**
 * Final boss enemy with advanced AI and animations
 * @class
 */
class Endboss extends Model{
    /** @type {boolean} Hurt state flag */
    isHurt = false;
    /** @type {number} Timestamp of last damage */
    lastHit = 0;
    /** @type {boolean} Death state flag */
    isDead = false;
    /** @type {number} Current health points */
    health = 100;
    /** @type {boolean} Idle state flag */
    isIdle = true;
    /** @type {number} Idle duration before activation */
    idleTime = 6000;
    /** @type {number} Movement speed */
    speed = 0.5;
    /** @type {boolean} Activation flag */
    hasStarted = false;
    /** @type {World} Reference to game world */
    world;
    /** @type {number} Current idle animation frame */
    currentIdleImage = 0;
    /** @type {number} Current walk animation frame */
    currentWalkImage = 0;
    /** @type {number} Current hurt animation frame */
    currentHurtImage = 0;
    /** @type {number} Current dying animation frame */
    currentDyingImage = 0;
    /** @type {number} Current slashing animation frame */
    currentSlashingImage = 0;
    /** @type {number} Idle animation direction (1 or -1) */
    idleAnimationDirection = 1;
    /** @type {number} Walk animation direction (1 or -1) */
    walkAnimationDirection = 1;
    /** @type {boolean} Facing direction flag */
    otherDirection = true;
    /** @type {boolean} Original facing direction */
    originalDirection = true;
    /** @type {number} Timestamp of last damage for cooldown */
    lastDamageTime = 0;
    /** @type {boolean} Slashing attack state */
    isSlashing = false;
    
    /**
     * Initializes endboss with animations and behavior
     * @method
     */
    constructor(){
        super();
        this.wasHitThisAttack = false;
        this.Endboss_Idle = ImageTemplateManager.getEnemyImages('endboss', 'idle');
        this.Endboss_Walking = ImageTemplateManager.getEnemyImages('endboss', 'walking');
        this.Endboss_Hurt = ImageTemplateManager.getEnemyImages('endboss', 'hurt');
        this.Endboss_Dying = ImageTemplateManager.getEnemyImages('endboss', 'dying');
        this.Endboss_Slashing = ImageTemplateManager.getEnemyImages('endboss', 'slashing');
        this.loadImages(this.Endboss_Idle);
        this.loadImages(this.Endboss_Walking);
        this.loadImages(this.Endboss_Hurt);
        this.loadImages(this.Endboss_Dying);
        this.loadImages(this.Endboss_Slashing);
        
        if (this.Endboss_Idle && this.Endboss_Idle.length > 0) {
            this.img = new Image();
            this.img.src = this.Endboss_Idle[0];
        }
        this.positionX = 300;
        this.positionY = 100;
        this.width = 525;
        this.height = 400;
        this.originalDirection = this.otherDirection;
        this.animate();
        this.checkCharacterDistance();
        this.checkSlashingDistance();
    }

/**
 * Monitors distance for slashing attacks
 * @method
 */
checkSlashingDistance() {
    setInterval(() => {
        if (this.world && this.world.character && !this.isDead && !this.isHurt && this.hasStarted && this.world.character.energy > 0 && this.world.gameStarted) {
            let distance = Math.abs(this.positionX - this.world.character.positionX);
            
            if (distance < 150 && !this.isSlashing) {
                this.isSlashing = true;
                this.currentSlashingImage = 0;
                
                setTimeout(() => {
                    if (!this.world.character.isHurtRecently() && this.isSlashing) {
                        this.world.character.hit(3);
                        this.world.statusbar.setEnergy(this.world.character.energy);
                    }
                }, 400);
                
                setTimeout(() => {
                    this.isSlashing = false;
                }, 800);
            }
        }
    }, 100);
}

    /**
     * Applies damage to endboss with cooldown
     * @method
     * @param {number} damage - Damage amount
     */
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
        this.currentHurtImage = 0;
        this.otherDirection = false;
        
        if (this.health <= 0) {
            this.isDead = true;
            this.isHurt = false;
            this.currentDyingImage = 0;
            this.otherDirection = false;
        }
        
        setTimeout(() => {
            this.isHurt = false;
            this.otherDirection = this.originalDirection;
        }, 600);
    }

    /**
     * Main animation loop for endboss states
     * @method
     */
    animate() {
    setInterval(() => {
        if (this.isDead) {
            if (this.Endboss_Dying && this.Endboss_Dying.length > 0) {
                let i = this.currentDyingImage % this.Endboss_Dying.length;
                let path = this.Endboss_Dying[i];
                if (this.walkingImages[path]) {
                    this.img = this.walkingImages[path];
                }
                
                if (this.currentDyingImage < this.Endboss_Dying.length - 1) {
                    this.currentDyingImage++;
                }
            }
            return;
        }
        
        if (this.isHurt && this.Endboss_Hurt.length > 0) {
            let i = this.currentHurtImage % this.Endboss_Hurt.length;
            let path = this.Endboss_Hurt[i];
            if (this.walkingImages[path]) {
                this.img = this.walkingImages[path];
            }
            this.currentHurtImage++;
            
            if (this.currentHurtImage >= this.Endboss_Hurt.length) {
                this.currentHurtImage = 0;
            }
            return;
        }

        if (this.isSlashing && this.Endboss_Slashing.length > 0) {
            let i = this.currentSlashingImage % this.Endboss_Slashing.length;
            let path = this.Endboss_Slashing[i];
            if (this.walkingImages[path]) {
                this.img = this.walkingImages[path];
            }
            this.currentSlashingImage++;
            
            if (this.currentSlashingImage >= this.Endboss_Slashing.length) {
                this.currentSlashingImage = 0;
            }
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
        if (!this.isIdle && !this.isDead && !this.isSlashing && this.world && this.world.gameStarted) {
            this.positionX -= this.speed;
        }
    }, 1000 / 60);
}

/**
 * Monitors character proximity to trigger endboss activation
 * @method
 */
checkCharacterDistance() {
    setInterval(() => {
        if (!this.hasStarted && this.world && this.world.character && this.world.gameStarted) {
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

    /**
     * Returns endboss hitbox for collision detection
     * @method
     * @returns {Object} Hitbox with x, y, width, height
     */
    getHitbox() {
        return {
            x: this.positionX + 180,
            y: this.positionY + 150,
            width: this.width - 360,
            height: this.height - 250
        };
    }
}