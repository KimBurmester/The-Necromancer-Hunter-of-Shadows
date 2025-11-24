/**
 * Manages all collision detection in the game
 * @class CollisionManager
 */
class CollisionManager {
    /**
     * Initializes collision manager with world reference
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Starts collision detection loop
     */
    startCollisionDetection() {
        setInterval(() => this.checkAllCollisions(), 1000 / 60);
    }

    /**
     * Checks all collision types
     */
    checkAllCollisions() {
        this.checkEnemyCollisions();
        this.checkEndbossCollision();
        this.checkDiamondCollection();
        this.checkAttackHits();
    }

    /**
     * Checks collisions between character and enemies
     */
    checkEnemyCollisions() {
        this.world.enemies.forEach((enemy) => {
            if (this.shouldCheckEnemyCollision(enemy)) {
                this.handleEnemyCollision();
            }
        });
    }

    /**
     * Determines if enemy collision should be checked
     * @param {Enemy} enemy - Enemy instance
     * @returns {boolean} True if collision check needed
     */
    shouldCheckEnemyCollision(enemy) {
        return !enemy.isDead && 
               this.world.character.isColliding(enemy) && 
               this.world.character.energy > 0;
    }

    /**
     * Handles character damage from enemy collision
     */
    handleEnemyCollision() {
        if (!this.world.character.isHurtRecently()) {
            this.applyCharacterDamage(2);
        }
    }

    /**
     * Applies damage to character and updates UI
     * @param {number} damage - Damage amount
     */
    applyCharacterDamage(damage) {
        this.world.character.hit(damage);
        this.world.statusbar.setEnergy(this.world.character.energy);
    }

    /**
     * Checks collision between character and endboss
     */
    checkEndbossCollision() {
        if (this.shouldCheckEndbossCollision()) {
            this.handleEndbossCollision();
        }
    }

    /**
     * Determines if endboss collision should be checked
     * @returns {boolean} True if collision check needed
     */
    shouldCheckEndbossCollision() {
        return this.world.endboss && 
               !this.world.endboss.isDead && 
               this.world.character.isColliding(this.world.endboss) && 
               this.world.character.energy > 0;
    }

    /**
     * Handles character damage from endboss collision
     */
    handleEndbossCollision() {
        if (!this.world.character.isHurtRecently()) {
            this.applyCharacterDamage(3);
        }
    }

    /**
     * Checks for diamond collection by character
     */
    checkDiamondCollection() {
        for (let i = this.world.lootable.length - 1; i >= 0; i--) {
            this.processDiamondCollision(i);
        }
    }

    /**
     * Processes single diamond collision
     * @param {number} index - Diamond index in lootable array
     */
    processDiamondCollision(index) {
        let diamond = this.world.lootable[index];
        if (!diamond.collected && this.world.character.isColliding(diamond)) {
            this.collectDiamond(diamond, index);
        }
    }

    /**
     * Collects diamond and updates counter
     * @param {Looting} diamond - Diamond object
     * @param {number} index - Array index to remove
     */
    collectDiamond(diamond, index) {
        diamond.collected = true;
        this.world.diamond.addDiamond();
        this.world.lootable.splice(index, 1);
    }

    /**
     * Checks if character attacks hit enemies or endboss
     */
    checkAttackHits() {
        if (this.isAttackActive()) {
            this.processAttackHits();
        } else {
            this.resetAttackFlags();
        }
    }

    /**
     * Checks if attack is in hitting frame
     * @returns {boolean} True if attack frame is active
     */
    isAttackActive() {
        return this.world.character.isAttacking && 
               this.world.character.currentImage === 6;
    }

    /**
     * Processes all attack hit checks
     */
    processAttackHits() {
        let attackHitbox = this.world.character.getAttackHitbox();
        this.processEnemyAttackHits(attackHitbox);
        this.processEndbossAttackHit(attackHitbox);
    }

    /**
     * Processes attack hits on enemies
     * @param {Object} attackHitbox - Attack hitbox coordinates
     */
    processEnemyAttackHits(attackHitbox) {
        for (let i = this.world.enemies.length - 1; i >= 0; i--) {
            this.checkEnemyHit(this.world.enemies[i], attackHitbox, i);
        }
    }

    /**
     * Checks single enemy for attack hit
     * @param {Enemy} enemy - Enemy instance
     * @param {Object} attackHitbox - Attack hitbox
     * @param {number} index - Enemy array index
     */
    checkEnemyHit(enemy, attackHitbox, index) {
        if (this.shouldDamageEnemy(enemy, attackHitbox)) {
            this.damageEnemy(enemy);
        }
    }

    /**
     * Determines if enemy should take damage
     * @param {Enemy} enemy - Enemy instance
     * @param {Object} attackHitbox - Attack hitbox
     * @returns {boolean} True if should damage
     */
    shouldDamageEnemy(enemy, attackHitbox) {
        if (enemy.isDead || enemy.wasHitThisAttack) return false;
        
        let enemyHitbox = enemy.getHitbox();
        let distance = Math.abs(this.world.character.positionX - enemy.positionX);
        
        return this.isHitboxColliding(attackHitbox, enemyHitbox) && distance < 150;
    }

    /**
     * Applies damage to enemy and schedules removal
     * @param {Enemy} enemy - Enemy to damage
     */
    damageEnemy(enemy) {
        enemy.takeDamage(10);
        enemy.wasHitThisAttack = true;
        
        if (enemy.isDead) {
            this.scheduleEnemyRemoval(enemy);
        }
    }

    /**
     * Schedules enemy removal after death animation
     * @param {Enemy} enemy - Enemy to remove
     */
    scheduleEnemyRemoval(enemy) {
        setTimeout(() => {
            let index = this.world.enemies.indexOf(enemy);
            if (index !== -1) {
                this.world.enemies.splice(index, 1);
            }
        }, 1000);
    }

    /**
     * Processes attack hit on endboss
     * @param {Object} attackHitbox - Attack hitbox
     */
    processEndbossAttackHit(attackHitbox) {
        if (this.shouldDamageEndboss(attackHitbox)) {
            this.damageEndboss();
        }
    }

    /**
     * Determines if endboss should take damage
     * @param {Object} attackHitbox - Attack hitbox
     * @returns {boolean} True if should damage
     */
    shouldDamageEndboss(attackHitbox) {
        if (!this.world.endboss || this.world.endboss.isDead || 
            this.world.endboss.wasHitThisAttack) return false;
        
        let endbossHitbox = this.world.endboss.getHitbox();
        let distance = Math.abs(this.world.character.positionX - this.world.endboss.positionX);
        
        return this.isHitboxColliding(attackHitbox, endbossHitbox) && distance < 200;
    }

    /**
     * Applies damage to endboss
     */
    damageEndboss() {
        this.world.endboss.takeDamage(5);
        this.world.endboss.wasHitThisAttack = true;
    }

    /**
     * Resets attack hit flags for all enemies
     */
    resetAttackFlags() {
        this.world.enemies.forEach(enemy => {
            enemy.wasHitThisAttack = false;
        });
        if (this.world.endboss) {
            this.world.endboss.wasHitThisAttack = false;
        }
    }

    /**
     * Checks if two hitboxes are colliding
     * @param {Object} hitbox1 - First hitbox
     * @param {Object} hitbox2 - Second hitbox
     * @returns {boolean} True if colliding
     */
    isHitboxColliding(hitbox1, hitbox2) {
        return hitbox1.x < hitbox2.x + hitbox2.width &&
               hitbox1.x + hitbox1.width > hitbox2.x &&
               hitbox1.y < hitbox2.y + hitbox2.height &&
               hitbox1.y + hitbox1.height > hitbox2.y;
    }
}
