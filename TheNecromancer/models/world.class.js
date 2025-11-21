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
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.createBackgrounds();
    this.createClouds();
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
      }
    });
  }

  checkEndbossCollision() {
    if (this.endboss && this.character.isColliding(this.endboss)) {
      this.character.energy -= 0.1;
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
