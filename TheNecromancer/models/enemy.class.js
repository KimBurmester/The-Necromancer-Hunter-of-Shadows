class Enemy extends Model {
  isHurt = false;
  lastHit = 0;
  isDead = false;
  health = 30;
  currentImage = 0;
  floatOffset = 0;
  baseY = 0;
  isAttacking = false;

  constructor(enemyType = "wraith_01") {
    super();
    this.enemyType = enemyType;
    this.speed = 0.15 + Math.random() * 0.25;
    this.wasHitThisAttack = false;
    this.Enemy_Idle = ImageTemplateManager.getEnemyImages(
      this.enemyType,
      "idle"
    );
    this.Enemy_Walking = ImageTemplateManager.getEnemyImages(
      this.enemyType,
      "walking"
    );
    this.Enemy_Hurt = ImageTemplateManager.getEnemyImages(
      this.enemyType,
      "hurting"
    );
    this.Enemy_Dying = ImageTemplateManager.getEnemyImages(
      this.enemyType,
      "dying"
    );
    this.Enemy_Attacking = ImageTemplateManager.getEnemyImages(
      this.enemyType,
      "attacking"
    );

    this.loadImages(this.Enemy_Idle);
    this.loadImages(this.Enemy_Walking);
    this.loadImages(this.Enemy_Hurt);
    this.loadImages(this.Enemy_Dying);
    this.loadImages(this.Enemy_Attacking);

    if (this.Enemy_Idle && this.Enemy_Idle.length > 0) {
      this.img = new Image();
      this.img.src = this.Enemy_Idle[0].replace(/\\/g, '/');
    }
    this.positionX = 200 + Math.random() * 500;
    this.positionY = 240;
    this.baseY = this.positionY;
    this.width = 260;
    this.height = 260;
    this.animate();
    this.checkCharacterDistance();
  }

checkCharacterDistance() {
    setInterval(() => {
      if (this.world && this.world.character && !this.isDead && !this.isHurt && this.world.character.energy > 0 && this.world.gameStarted) {
        let distance = Math.abs(this.positionX - this.world.character.positionX);
        
        if (distance < this.world.character.width / 3 && !this.isAttacking) {
          this.isAttacking = true;
          this.currentImage = 0;
          
          // ✅ NEU: Damage erst nach 300ms (wenn Attack-Animation läuft)
          setTimeout(() => {
            if (!this.world.character.isHurtRecently() && this.isAttacking) {
              this.world.character.hit(2);
              this.world.statusbar.setEnergy(this.world.character.energy);
            }
          }, 300);
          
          setTimeout(() => {
            this.isAttacking = false;
          }, 600);
        }
      }
    }, 100);
  }

checkSlashingDistance() {
    setInterval(() => {
        if (this.world && this.world.character && !this.isDead && !this.isHurt && this.hasStarted && this.world.character.energy > 0 && this.world.gameStarted) {
            let distance = Math.abs(this.positionX - this.world.character.positionX);
            
            if (distance < 150 && !this.isSlashing) {
                this.isSlashing = true;
                this.currentSlashingImage = 0;
                
                // ✅ NEU: Damage erst nach 400ms (wenn Slashing-Animation läuft)
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

  takeDamage(damage) {
    if (this.isDead) return;

    this.health -= damage;
    this.lastHit = Date.now();
    this.isHurt = true;
    this.currentImage = 0;

    if (this.health <= 0) {
      this.isDead = true;
      this.currentImage = 0;
    } else {
      setTimeout(() => {
        this.isHurt = false;
      }, 600);
    }
  }

  playAnimation(images) {
    if (!images || images.length === 0) return;

    let i = this.currentImage % images.length;
    let path = images[i].replace(/\\/g, '/');

    if (this.walkingImages && this.walkingImages[path]) {
      this.img = this.walkingImages[path];
    }

    this.currentImage++;
  }

animate() {
    setInterval(() => {
      if (this.isDead) {
        if (this.Enemy_Dying && this.Enemy_Dying.length > 0) {
          this.playAnimation(this.Enemy_Dying);
        }
        return;
      }

      if (this.isHurt) {
        if (this.Enemy_Hurt && this.Enemy_Hurt.length > 0) {
          this.playAnimation(this.Enemy_Hurt);
        }
        return;
      }

      if (this.isAttacking) {
        if (this.Enemy_Attacking && this.Enemy_Attacking.length > 0) {
          this.playAnimation(this.Enemy_Attacking);
        }
        return;
      }

      if (this.Enemy_Walking && this.Enemy_Walking.length > 0) {
        this.playAnimation(this.Enemy_Walking);
      } else {
        this.playAnimation(this.Enemy_Idle);
      }
    }, 100);

    setInterval(() => {
      if (!this.isDead && !this.isAttacking && this.world && this.world.gameStarted) {
        this.positionX -= this.speed;
        this.floatOffset += 0.05;
        this.positionY = this.baseY + Math.sin(this.floatOffset) * 8;
      }
    }, 1000 / 60);
  }

  getHitbox() {
    return {
      x: this.positionX + 90,
      y: this.positionY + 40,
      width: this.width - 180,
      height: this.height - 100,
    };
  }
}