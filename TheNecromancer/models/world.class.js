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
  gameOverAlpha = 0;
  showCredits = false;
  gameOverStartTime = 0;
  gameStarted = false;
  gameWon = false;
  victoryScreenAlpha = 0;
  victoryStartTime = 0;
  canvasClickHandler = null;
  victoryButtons = []; 

constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    
    this.createBackgrounds();
    this.createClouds();
    
    this.level.background = this.background;
    this.level.hill = this.hill;
    this.level.grave = this.grave;
    this.level.fence = this.fence;
    this.level.street = this.street;
    this.level.clouds = this.clouds;
    
    this.createDiamonds();
    this.positionEndboss();
    this.level.calculateLevelEnd();
    
    this.camera_x = 0; // ✅ Kamera startet bei 0 (Level-Anfang)
    
    console.log('✅ Level Setup:');
    console.log('  - Background Count:', this.background.length);
    console.log('  - Level Start:', 0);
    console.log('  - Level Ende:', this.level.levelEndX);
    console.log('  - Endboss Position:', this.endboss.positionX);
    console.log('  - Character Start:', this.character.positionX);
    console.log('  - Camera Start:', this.camera_x);
    
    this.draw();
    this.showStartScreen();
}

showStartScreen() {
    this.setWorld();
    this.character.startAnimation();
    
    const startBtn = document.getElementById('startGame');
    if (startBtn) {
        // ✅ Alten Event-Listener entfernen
        const newStartBtn = startBtn.cloneNode(true);
        startBtn.parentNode.replaceChild(newStartBtn, startBtn);
        
        newStartBtn.addEventListener('click', () => {
            this.startGame();
        });
    }
    
    // ✅ Canvas-Click-Handler entfernen und neu setzen
    const canvas = document.getElementById('canvas');
    if (canvas) {
        if (this.canvasClickHandler) {
            canvas.removeEventListener('click', this.canvasClickHandler);
            canvas.removeEventListener('touchstart', this.canvasClickHandler);
        }
        
        this.canvasClickHandler = (e) => {
            if (!this.gameStarted) {
                this.startGame();
            }
        };
        
        canvas.addEventListener('click', this.canvasClickHandler);
        canvas.addEventListener('touchstart', this.canvasClickHandler, { passive: true }); // ✅ passive: true
    }
}

startGame() {
    if (this.gameStarted) return;
    
    this.gameStarted = true;
    this.checkCollisions();
    
    document.querySelectorAll('.sidebar, .title, .footer').forEach(el => {
        el.style.display = 'none';
    });
    
    const touchControls = document.getElementById('touch-controls');
    if (touchControls) {
        touchControls.style.display = 'flex';
    }
}

positionEndboss() {
    if (this.endboss && this.background.length > 0) {
        let lastBg = this.background[this.background.length - 1];
        let levelEnd = lastBg.positionX + lastBg.width; // = 0 + (3 * 960) = 2880
        
        // ✅ Endboss 700px vor Level-Ende positionieren
        this.endboss.positionX = levelEnd - 700; // = 2880 - 700 = 2180
        
        console.log('✅ Endboss positioniert:');
        console.log('  - Level Ende:', levelEnd);
        console.log('  - Endboss X:', this.endboss.positionX);
        console.log('  - Character Start:', this.character.positionX);
    }
}

createDiamonds() {
    this.lootable = [];
    let numberOfDiamonds = 5;
    let levelStartX = -100; // ✅ Character-Startposition
    let levelEndX = 0;
    
    if (this.background.length > 0) {
        let lastBg = this.background[this.background.length - 1];
        levelEndX = lastBg.positionX + lastBg.width - 400; // Vor dem Endboss
    }
    
    let levelLength = levelEndX - levelStartX;
    let spacing = levelLength / (numberOfDiamonds + 1);
    
    for (let i = 0; i < numberOfDiamonds; i++) {
        let diamond = new Looting();
        diamond.positionX = levelStartX + 200 + (i * spacing) + (Math.random() * 50 - 25);
        diamond.positionY = 280;       
        this.lootable.push(diamond);
    }
    
    console.log('✅ Diamanten platziert von X:', levelStartX, 'bis X:', levelEndX);
}

checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();  // Diese Zeile fehlt!
      this.checkEndbossCollision(); // Diese Zeile fehlt!
      this.checkDiamondCollection();
      this.checkAttackHits();
    }, 1000 / 60);
}

checkEnemyCollisions() {
    this.enemies.forEach((enemy) => {
        if (!enemy.isDead && this.character.isColliding(enemy) && this.character.energy > 0) {
            if (!this.character.isHurtRecently()) {
                this.character.hit(2);
                this.statusbar.setEnergy(this.character.energy);
            }
        }
    });
}

checkEndbossCollision() {
    if (this.endboss && !this.endboss.isDead && this.character.isColliding(this.endboss) && this.character.energy > 0) {
        if (!this.character.isHurtRecently()) {
            this.character.hit(3);
            this.statusbar.setEnergy(this.character.energy);
        }
    }
}

checkAttackHits() {
    if (this.character.isAttacking && this.character.currentImage === 6) {
        let attackHitbox = this.character.getAttackHitbox();
        
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let enemy = this.enemies[i];
            
            if (!enemy.isDead && !enemy.wasHitThisAttack) {
                let enemyHitbox = enemy.getHitbox();
                let distance = Math.abs(this.character.positionX - enemy.positionX);
                
                if (this.isHitboxColliding(attackHitbox, enemyHitbox) && distance < 150) {
                    enemy.takeDamage(10);
                    enemy.wasHitThisAttack = true;
                    
                    if (enemy.isDead) {
                        setTimeout(() => {
                            let enemyIndex = this.enemies.indexOf(enemy);
                            if (enemyIndex !== -1) {
                                this.enemies.splice(enemyIndex, 1);
                            }
                        }, 1000);
                    }
                }
            }
        }
        
        if (this.endboss && !this.endboss.isDead && !this.endboss.wasHitThisAttack) {
            let endbossHitbox = this.endboss.getHitbox();
            let distance = Math.abs(this.character.positionX - this.endboss.positionX);
            
            if (this.isHitboxColliding(attackHitbox, endbossHitbox) && distance < 200) {
                this.endboss.takeDamage(5);
                this.endboss.wasHitThisAttack = true;
            }
        }
    }
    
    if (!this.character.isAttacking) {
        this.enemies.forEach(enemy => {
            enemy.wasHitThisAttack = false;
        });
        if (this.endboss) {
            this.endboss.wasHitThisAttack = false;
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
            this.diamond.addDiamond();
            this.lootable.splice(i, 1);
        }
    }
}

createBackgrounds() {
    let numberOfBackgrounds = 5;
    let bgWidth = 960;
    let startX = 0;

    this.background = [];
    this.hill = [];
    this.fence = [];
    this.grave = [];
    this.street = [];
    
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
        
    console.log('✅ Backgrounds erstellt:');
    console.log('  - Start: 0');
    console.log('  - Ende:', numberOfBackgrounds * bgWidth);
    console.log('  - Anzahl:', numberOfBackgrounds);
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
    this.addObjectsToMap(this.lootable);
    
    if (this.endboss) {
        const screenX = this.endboss.positionX + this.camera_x;
        const isVisible = screenX > -this.endboss.width && screenX < 720;
        
        if (isVisible) {
            this.addToMap(this.endboss);
        }
        
        // Check for victory
        if (this.endboss.isDead && !this.character.isDead && !this.gameWon && this.gameStarted) {
            if (this.victoryStartTime === 0) {
                this.victoryStartTime = Date.now();
            }
            
            if (Date.now() - this.victoryStartTime > 1000) {
                this.gameWon = true;
            }
        }
    }
    
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.diamond);
    
    if (!this.gameStarted) {
        this.drawStartScreen();
    }
    
    if (this.character.isDead) {
        this.drawGameOverScreen();
    }
    
    if (this.gameWon) {
        this.drawVictoryScreen();
    }
    
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
    
    if (mo instanceof Endboss) {
        if (mo.isDead) {
            this.drawFrameModel(mo);
        } else if (mo.otherDirection || mo.isHurt) {
            this.flipImageBack(mo);
        } else {
            this.drawFrameModel(mo);
        }
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
    this.ctx.lineWidth = 1;
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
    if (!mo.img || !mo.img.complete || mo.img.naturalHeight === 0) {
        return;
    }
    
    try {
        this.ctx.drawImage(mo.img, mo.positionX, mo.positionY, mo.width, mo.height);
    } catch (error) {}
}

drawGameOverScreen() {
    if (this.gameOverStartTime === 0) {
      this.gameOverStartTime = Date.now();
    }
    
    const elapsed = Date.now() - this.gameOverStartTime;
    if (elapsed < 3000) {
      this.gameOverAlpha = Math.min(elapsed / 1000, 1);
      this.drawGameOverText();
    }
    else {
      if (!this.showCredits) {
        this.showCredits = true;
        this.gameOverAlpha = 0;
      }
      this.gameOverAlpha = Math.min((elapsed - 3000) / 1000, 1);
      this.drawCredits();
    }
}

drawGameOverText() {
    this.ctx.save();
    this.ctx.globalAlpha = this.gameOverAlpha;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, 720, 480);
    this.ctx.fillStyle = '#0a8e8e';
    this.ctx.font = 'bold 72px cinzel, Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('GAME OVER', 360, 240);
    
    this.ctx.restore();
}

drawCredits() {
    this.ctx.save();
    this.ctx.globalAlpha = this.gameOverAlpha;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    this.ctx.fillRect(0, 0, 720, 480);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '20px cinzel, Arial';
    this.ctx.fillText('All graphics from', 360, 180);
    this.ctx.fillStyle = '#0a8e8e';
    this.ctx.font = 'bold 22px cinzel, Arial';
    this.ctx.fillText('www.craftpix.net', 360, 210);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '20px cinzel, Arial';
    this.ctx.fillText('and All sounds from', 360, 250);
    this.ctx.fillStyle = '#0a8e8e';
    this.ctx.font = 'bold 22px cinzel, Arial';
    this.ctx.fillText('www.mixkit.co', 360, 280);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '20px cinzel, Arial';
    this.ctx.fillText('Developed by', 360, 330);
    this.ctx.fillStyle = '#0a8e8e';
    this.ctx.font = 'bold 24px cinzel, Arial';
    this.ctx.fillText('Kim P. Burmester', 360, 360);
    this.ctx.restore();
}

drawStartScreen() {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, 720, 480);
    this.ctx.fillStyle = '#0a8e8e';
    this.ctx.font = 'bold 48px cinzel, Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.fillText('NECROMANCER', 360, 180);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 24px cinzel, Arial';
    this.ctx.fillText('The Hunter of The Shadows', 360, 230);
    
    // ✅ NEU: Unterschiedlicher Text für Desktop/Mobile
    this.ctx.fillStyle = '#0a8e8e';
    this.ctx.font = '20px cinzel, Arial';
    if (window.innerWidth <= 500) {
        this.ctx.fillText('Tippe auf den Bildschirm zum Starten', 360, 320);
    } else {
        this.ctx.fillText('Klicke "Spiel starten" um zu beginnen', 360, 320);
    }
    
    this.ctx.restore();
}

drawVictoryScreen() {
    if (this.victoryScreenAlpha < 1) {
        this.victoryScreenAlpha += 0.02;
    }
    
    this.ctx.save();
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.victoryScreenAlpha * 0.85})`;
    this.ctx.fillRect(0, 0, 720, 480);
    
    if (this.victoryScreenAlpha >= 1) {
        // Titel
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 48px cinzel, Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 3;
        this.ctx.fillText('Du hast Gewonnen!', 360, 150);
        
        // ✅ FIX: Diamond-Count korrekt anzeigen
        this.ctx.fillStyle = 'white';
        this.ctx.font = '28px cinzel, Arial';
        this.ctx.shadowBlur = 5;
        this.ctx.fillText(`Gesammelte Diamanten: ${this.diamond.diamonds}`, 360, 220);
        
        // ✅ Buttons zeichnen und Bereiche speichern
        this.victoryButtons = [
            { text: 'Neues Spiel', x: 160, y: 300, width: 200, height: 50, action: 'restart' },
            { text: 'Beenden', x: 360, y: 300, width: 200, height: 50, action: 'quit' }
        ];
        
        this.victoryButtons.forEach(btn => {
            this.drawVictoryButton(btn);
        });
    }
    
    this.ctx.restore();
}

drawVictoryButton(btn) {
    const mouseX = this.lastMouseX || 0;
    const mouseY = this.lastMouseY || 0;
    
    const isHover = mouseX >= btn.x && mouseX <= btn.x + btn.width && 
                    mouseY >= btn.y && mouseY <= btn.y + btn.height;
    
    this.ctx.fillStyle = isHover ? 'rgba(10, 142, 142, 0.9)' : 'rgba(10, 142, 142, 0.6)';
    this.ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 22px cinzel, Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);
    
    // ✅ FIX: Event-Handler nur einmal registrieren
    if (!this.victoryClickHandler) {
        this.victoryClickHandler = (e) => {
            if (!this.gameWon) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            this.victoryButtons.forEach(button => {
                if (clickX >= button.x && clickX <= button.x + button.width && 
                    clickY >= button.y && clickY <= button.y + button.height) {
                    
                    if (button.action === 'restart') {
                        this.restartGame();
                    } else if (button.action === 'quit') {
                        location.reload();
                    }
                }
            });
        };
        
        this.canvas.addEventListener('click', this.victoryClickHandler);
        
        // Mouse-Move-Handler
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.lastMouseX = e.clientX - rect.left;
            this.lastMouseY = e.clientY - rect.top;
        });
    }
}

restartGame() {
    // ✅ FIX: Alle Event-Listener entfernen
    if (this.victoryClickHandler) {
        this.canvas.removeEventListener('click', this.victoryClickHandler);
        this.victoryClickHandler = null;
    }
    
    if (this.canvasClickHandler) {
        this.canvas.removeEventListener('click', this.canvasClickHandler);
        this.canvas.removeEventListener('touchstart', this.canvasClickHandler);
        this.canvasClickHandler = null;
    }
    
    // Reset Victory Screen
    this.gameWon = false;
    this.victoryScreenAlpha = 0;
    this.victoryStartTime = 0;
    this.victoryButtons = [];
    
    // Reset Game Over Screen
    this.gameOverAlpha = 0;
    this.gameOverStartTime = 0;
    this.showCredits = false;
    
    // ✅ NEU: Neues Level erstellen
    this.enemies = [];
    for (let i = 0; i < 3; i++) {
        this.enemies.push(new Enemy());
    }
    
    this.endboss = new Endboss();
    this.character = new Character();
    this.statusbar = new Statusbar();
    this.diamond = new Diamond();
    
    // Level neu initialisieren
    this.level.enemies = this.enemies;
    this.level.endboss = this.endboss;
    
    // World-Referenzen setzen
    this.setWorld();
    
    // Diamonds und Endboss-Position
    this.createDiamonds();
    this.positionEndboss();
    this.level.calculateLevelEnd();
    
    // Camera zurücksetzen
    this.camera_x = 1100;
    
    // ✅ DIREKT starten ohne Start-Screen
    this.gameStarted = true;
    this.checkCollisions();
    
    // Touch-Controls anzeigen, UI ausblenden
    document.querySelectorAll('.sidebar, .title, .footer').forEach(el => {
        el.style.display = 'none';
    });
    
    const touchControls = document.getElementById('touch-controls');
    if (touchControls) {
        touchControls.style.display = 'flex';
    }
    
    console.log('✅ Spiel neu gestartet!');
}
}
