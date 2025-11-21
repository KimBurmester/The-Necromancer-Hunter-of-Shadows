class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  endboss = level1.endboss;
  background = level1.background;
  hill = level1.hill;
  grave = level1.grave;
  fence = level1.fence;
  street = level1.street;
  clouds = level1.clouds;
  statusbar = new Statusbar();
  diamond = new Diamond();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  lootable = [];

constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.createBackgrounds();
    this.createClouds();
    this.createDiamonds();
    this.positionEndboss();
    this.level.calculateLevelEnd();
    this.character.startAnimation();
    this.camera_x = 1100;
    this.checkCollisions();
    this.draw();
}

positionEndboss() {
    if (this.endboss && this.background.length > 0) {
        let lastBg = this.background[this.background.length - 1];
        let levelEnd = lastBg.positionX + lastBg.width;
        this.endboss.positionX = levelEnd - 300;
    }
}

createDiamonds() {
    this.lootable = [];
    let numberOfDiamonds = 5;
    
    // ✅ Berechne Level-Länge basierend auf Backgrounds
    let levelStartX = -820;
    let levelEndX = 0;
    
    if (this.background.length > 0) {
        let lastBg = this.background[this.background.length - 1];
        levelEndX = lastBg.positionX + lastBg.width - 200; // 200px Abstand vom Ende
    }
    
    let levelLength = levelEndX - levelStartX;
    let spacing = levelLength / (numberOfDiamonds + 1); // +1 für bessere Verteilung
    
    console.log('💎 Diamond-Verteilung:');
    console.log('  Level Start:', levelStartX);
    console.log('  Level End:', levelEndX);
    console.log('  Level Länge:', levelLength);
    console.log('  Spacing:', spacing);
    
    for (let i = 0; i < numberOfDiamonds; i++) {
        let diamond = new Looting();
        
        // ✅ Gleichmäßige Verteilung über die Level-Länge
        diamond.positionX = levelStartX + 400 + (i * spacing) + (Math.random() * 50 - 25); // ±25px Variation
        diamond.positionY = 280;
        
        console.log(`  Diamond ${i + 1}: X=${diamond.positionX.toFixed(0)}`);
        
        this.lootable.push(diamond);
    }
    
    console.log('✅ Gesamt Diamonds erstellt:', this.lootable.length);
}

checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkEndbossCollision();
      this.checkDiamondCollection();
      this.checkAttackHits();
    }, 1000 / 60);
  }

  checkAttackHits() {
    if (this.character.isAttacking) {
        let attackHitbox = this.character.getAttackHitbox();
        
        // ✅ Prüfe Enemies
        this.enemies.forEach((enemy, index) => {
            if (!enemy.isDead) {
                let enemyHitbox = enemy.getHitbox();
                
                if (this.isHitboxColliding(attackHitbox, enemyHitbox)) {
                    enemy.takeDamage(10);
                    
                    // Entferne Enemy wenn tot
                    if (enemy.isDead) {
                        setTimeout(() => {
                            this.enemies.splice(index, 1);
                            console.log('🗑️ Toter Enemy entfernt');
                        }, 500); // Warte 500ms bevor Entfernung
                    }
                }
            }
        });
        
        // ✅ Prüfe Endboss
        if (this.endboss && !this.endboss.isDead) {
            let endbossHitbox = this.endboss.getHitbox();
            
            if (this.isHitboxColliding(attackHitbox, endbossHitbox)) {
                this.endboss.takeDamage(5);
                
                // Endboss besiegt?
                if (this.endboss.isDead) {
                    console.log('🎉 LEVEL GESCHAFFT! Endboss besiegt!');
                }
            }
        }
    }
}

isHitboxColliding(hitbox1, hitbox2) {
    return hitbox1.x < hitbox2.x + hitbox2.width &&
           hitbox1.x + hitbox1.width > hitbox2.x &&
           hitbox1.y < hitbox2.y + hitbox2.height &&
           hitbox1.y + hitbox1.height > hitbox2.y;
}

checkDiamondCollection() {
    for (let i = this.lootable.length - 1; i >= 0; i--) {
        let diamond = this.lootable[i];
        
        if (!diamond.collected && this.character.isColliding(diamond)) {
            diamond.collected = true;
            
            // ✅ VORHER diamonds erhöhen
            this.diamond.addDiamond();
            
            // ✅ DANN aus Array entfernen
            this.lootable.splice(i, 1);
            
            console.log('💎 Diamond eingesammelt!');
            console.log('  Aktueller Score:', this.diamond.diamonds);
            console.log('  Verbleibende Diamonds:', this.lootable.length);
        }
    }
}

checkEnemyCollisions() {
    this.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && this.character.energy > 0) {
            if (!this.character.isHurtRecently()) {
                this.character.hit();
                this.statusbar.setEnergy(this.character.energy);
            }
        }
    });
}

checkEndbossCollision() {
    if (this.endboss && this.character.isColliding(this.endboss) && this.character.energy > 0) {
        if (!this.character.isHurtRecently()) {
            this.character.hit();
            this.character.hit();
            this.statusbar.setEnergy(this.character.energy);
        }
    }
}

createBackgrounds() {
    let numberOfBackgrounds = 5;
    let bgWidth = 960;
    let startX = -1920;
    
    for (let i = 0; i < numberOfBackgrounds; i++) {
        let bg = new Background();
        let hills = new Hills();
        let fence = new Fence();
        let grave = new Grave();
        let street = new Street();
        let posX = startX + (i * bgWidth);
        
        bg.positionX = posX;
        hills.positionX = posX;
        fence.positionX = posX;
        grave.positionX = posX;
        street.positionX = posX;
        
        this.background.push(bg);
        this.hill.push(hills);
        this.fence.push(fence);
        this.grave.push(grave);
        this.street.push(street);
    }
}

  draw() {
    this.ctx.clearRect(0, 0, 720, 480);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.background);
    this.addObjectsToMap(this.hill);
    this.addObjectsToMap(this.fence);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.grave);
    this.addObjectsToMap(this.street);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.lootable);//Coins
    this.addToMap(this.endboss);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.diamond);
    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  setWorld() {
    this.character.world = this;
    this.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    if (this.endboss) {
      this.endboss.world = this;
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  isCharacter(mo) {
    return mo instanceof Character;
  }

  isEnemy(mo) {
    return mo instanceof Enemy;
  }

  isEndboss(mo) {
    return mo instanceof Endboss;
  }

addToMap(mo) {
    if (mo instanceof Statusbar || mo instanceof Diamond) {
        mo.draw(this.ctx);
        return;
    }
    if (mo.otherDirection) {
        this.flipImageBack(mo);
    } else {
        this.drawFrameModel(mo);
    }
}

  setupHitboxStyle() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "red";
  }

  drawHitbox(x, y, width, height) {
    this.setupHitboxStyle();
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.stroke();
  }

  getHitboxDimensions(mo) {
    if (this.isCharacter(mo)) {
      return {
        offsetX: 50,
        offsetY: 50,
        widthReduction: 120,
        heightReduction: 85,
      };
    } else if (this.isEnemy(mo)) {
      return {
        offsetX: 70,
        offsetY: 25,
        widthReduction: 135,
        heightReduction: 85,
      };
    } else if (this.isEndboss(mo)) {
      return {
        offsetX: 150,
        offsetY: 120,
        widthReduction: 290,
        heightReduction: 205,
      };
    }
    return null;
  }

  flipImageBack(mo) {
    this.ctx.save();
    this.ctx.translate(
      mo.positionX + mo.width / 2,
      mo.positionY + mo.height / 2
    );
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      mo.img,
      -mo.width / 2,
      -mo.height / 2,
      mo.width,
      mo.height
    );
    this.ctx.scale(-1, 1);
    let hitbox = this.getHitboxDimensions(mo);
    if (hitbox) {
      let hitboxX = -mo.width / 2 + hitbox.offsetX;
      if (this.isCharacter(mo)) {
        hitboxX += 20;
      }
      this.drawHitbox(
        hitboxX,
        -mo.height / 2 + hitbox.offsetY,
        mo.width - hitbox.widthReduction,
        mo.height - hitbox.heightReduction
      );
    }
    this.ctx.restore();
  }

createClouds() {
    let numberOfClouds = this.background.length * 2;
    let cloudWidth = 1920;
    let startX = -1920 - cloudWidth;
    this.clouds = [];
    for (let i = 0; i < numberOfClouds; i++) {
        let cloud = new Cloud();
        cloud.positionX = startX + (i * cloudWidth);
        cloud.positionY = 0;
        this.clouds.push(cloud);
    }
}

drawFrameModel(mo) {
    // ✅ Prüfe ob Bild existiert, bevor es gezeichnet wird
    if (!mo.img) {
        console.warn('Bild noch nicht geladen für:', mo.constructor.name);
        return;
    }
    
    this.ctx.drawImage(mo.img, mo.positionX, mo.positionY, mo.width, mo.height);
    let hitbox = this.getHitboxDimensions(mo);
    if (hitbox) {
      this.drawHitbox(
        mo.positionX + hitbox.offsetX,
        mo.positionY + hitbox.offsetY,
        mo.width - hitbox.widthReduction,
        mo.height - hitbox.heightReduction
      );
    }
}
}
