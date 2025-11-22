class Enemy extends Model {
    isHurt = false;
    lastHit = 0;
    isDead = false;
    health = 30;
    currentImage = 0;
    floatOffset = 0;
    baseY = 0;

    constructor(enemyType = 'wraith_01'){
        super();
        this.enemyType = enemyType;
        this.speed = 0.15 + Math.random() * 0.25;
        this.wasHitThisAttack = false;
        this.Enemy_Idle = ImageTemplateManager.getEnemyImages(this.enemyType, 'idle');
        this.Enemy_Walking = ImageTemplateManager.getEnemyImages(this.enemyType, 'walking');
        this.Enemy_Hurt = ImageTemplateManager.getEnemyImages(this.enemyType, 'hurting');
        this.Enemy_Dying = ImageTemplateManager.getEnemyImages(this.enemyType, 'dying');
        
        this.loadImages(this.Enemy_Idle);
        this.loadImages(this.Enemy_Walking);
        this.loadImages(this.Enemy_Hurt);
        this.loadImages(this.Enemy_Dying);
        
        if (this.Enemy_Idle && this.Enemy_Idle.length > 0) {
            this.img = new Image();
            this.img.src = this.Enemy_Idle[0];
        }
        this.positionX = 200 + Math.random() * 500;
        this.positionY = 240;
        this.baseY = this.positionY;
        this.width = 260;
        this.height = 260;
        this.animate();
    }

    takeDamage(damage) {
        if (this.isDead) return;
        
        this.health -= damage;
        this.lastHit = Date.now();
        this.isHurt = true;      
        if (this.health <= 0) {
            this.isDead = true;
            this.currentImage = 0;
        } else {
            setTimeout(() => {
                this.isHurt = false;
            }, 300);
        }
    }

    playAnimation(images) {
        if (!images || images.length === 0) return;
        
        let i = this.currentImage % images.length;
        let path = images[i];
        
        if (this.walkingImages && this.walkingImages[path]) {
            this.img = this.walkingImages[path];
        }
        
        this.currentImage++;
    }

    animate(){
        setInterval(() => {
            if (this.isDead) {
                if (this.Enemy_Dying && this.Enemy_Dying.length > 0) {
                    this.playAnimation(this.Enemy_Dying);
                }
                return;
            }
            
            if (this.isHurt && this.Enemy_Hurt.length > 0) {
                this.playAnimation(this.Enemy_Hurt);
            } else if (this.Enemy_Walking && this.Enemy_Walking.length > 0) {
                this.playAnimation(this.Enemy_Walking);
            } else {
                this.playAnimation(this.Enemy_Idle);
            }
        }, 200);

        setInterval(() => {
            if (!this.isDead) {
                this.positionX -= this.speed;
                this.floatOffset += 0.05;
                this.positionY = this.baseY + Math.sin(this.floatOffset) * 8;
            }
        }, 1000 / 60);
    }

    getHitbox() {
        return {
            x: this.positionX + 70,
            y: this.positionY + 25,
            width: this.width - 135,
            height: this.height - 85
        };
    }
}