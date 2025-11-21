class Enemy extends Model {
    isHurt = false;
    lastHit = 0;
    isDead = false;
    health = 30;
    currentImage = 0;

    constructor(enemyType = 'wraith_01'){
        super();
        this.enemyType = enemyType;
        this.speed = 0.15 + Math.random() * 0.25;
        this.Enemy_Idle = ImageTemplateManager.getEnemyImages(this.enemyType, 'idle');
        this.Enemy_Hurt = ImageTemplateManager.getEnemyImages(this.enemyType, 'hurt');
        this.loadImages(this.Enemy_Idle);
        this.loadImages(this.Enemy_Hurt);
        if (this.Enemy_Idle && this.Enemy_Idle.length > 0) {
            this.loadImage(this.Enemy_Idle[0]);
        }
        this.positionX = 200 + Math.random() * 500;
        this.positionY = 240;
        this.width = 160;
        this.height = 160;
        this.animate();
    }

    takeDamage(damage) {
        this.health -= damage;
        this.lastHit = Date.now();
        this.isHurt = true;
        
        console.log(`💥 Enemy getroffen! Health: ${this.health}`);
        
        if (this.health <= 0) {
            this.isDead = true;
            console.log('💀 Enemy besiegt!');
        }
        
        setTimeout(() => {
            this.isHurt = false;
        }, 300);
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
                return;
            }
            if (this.isHurt && this.Enemy_Hurt.length > 0) {
                this.playAnimation(this.Enemy_Hurt);
            } else {
                this.playAnimation(this.Enemy_Idle);
            }
        }, 200);
        setInterval(() => {
            if (!this.isDead) {
                this.positionX -= this.speed;
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