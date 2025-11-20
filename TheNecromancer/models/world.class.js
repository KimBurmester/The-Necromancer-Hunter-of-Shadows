class World {
  character = new Character();
  enemies = level1.enemies;
  endboss = level1.endboss;
  background = level1.background;
  hill = level1.hill;
  grave = level1.grave;
  fence = level1.fence;
  street = level1.street;
  clouds = level1.clouds;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.createClouds();
    this.setWorld();
    this.createBackgrounds();
    this.character.startAnimation();
    this.camera_x = -820;
    this.checkCollisions();
    this.draw();
  }

  checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkEndbossCollision();
    }, 1000 / 60);
  }

  checkEnemyCollisions() {
    this.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        this.character.energy -= 0.05;
/*      console.log("💥 KOLLISION mit Enemy", index + 1);
        console.log("Character Hitbox:", this.character.getHitbox());
        console.log("Enemy Hitbox:", enemy.getHitbox()); */
        console.log("Character Energy after collision by Enemy:", this.character.energy);
      }
    });
  }

  checkEndbossCollision() {
    if (this.endboss && this.character.isColliding(this.endboss)) {
      this.character.energy -= 0.1;
/*       console.log("💥 KOLLISION mit ENDBOSS!");
      console.log("Character Hitbox:", this.character.getHitbox());
      console.log("Endboss Hitbox:", this.endboss.getHitbox()); */
      // Hier kannst du Schaden verursachen
      console.log("Character Energy after collision by Endboss:", this.character.energy);
    }
  }

  createBackgrounds() {
    let numberOfBackgrounds = 2;
    let startOffset = -2;
    for (let i = 0; i < numberOfBackgrounds; i++) {
      let bg = new Background();
      let hills = new Hills();
      let fence = new Fence();
      let grave = new Grave();
      let street = new Street();
      bg.positionX = (i + startOffset) * bg.width;
      hills.positionX = (i + startOffset) * hills.width;
      fence.positionX = (i + startOffset) * fence.width;
      grave.positionX = (i + startOffset) * grave.width;
      street.positionX = (i + startOffset) * street.width;
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
    this.addToMap(this.endboss);
    this.ctx.translate(-this.camera_x, 0);
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
      console.log("✅ Endboss hat World-Referenz erhalten");
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
    this.clouds.forEach((cloud, i) => {
      cloud.positionX = i * (cloud.width - 10);
    });
  }

  drawFrameModel(mo) {
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
