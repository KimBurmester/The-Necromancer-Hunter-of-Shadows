/**
 * Manages all rendering operations for the game
 * @class RenderManager
 */
class RenderManager {
    /**
     * Initializes render manager
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Main rendering frame method
     */
    renderFrame() {
        this.clearCanvas();
        this.renderWithCamera();
        this.renderUI();
        this.renderOverlays();
        this.scheduleNextFrame();
    }

    /**
     * Clears the entire canvas
     */
    clearCanvas() {
        this.world.ctx.clearRect(0, 0, 720, 480);
    }

    /**
     * Renders all game objects with camera translation
     */
    renderWithCamera() {
        this.world.ctx.translate(this.world.camera_x, 0);
        this.renderBackgroundLayers();
        this.renderGameObjects();
        this.world.ctx.translate(-this.world.camera_x, 0);
    }

    /**
     * Renders all background layers in order
     */
    renderBackgroundLayers() {
        this.world.addObjectsToMap(this.world.background);
        this.world.addObjectsToMap(this.world.hill);
        this.world.addObjectsToMap(this.world.fence);
        this.world.addObjectsToMap(this.world.clouds);
        this.world.addObjectsToMap(this.world.grave);
        this.world.addObjectsToMap(this.world.street);
    }

    /**
     * Renders character, enemies, and loot
     */
    renderGameObjects() {
        this.world.addToMap(this.world.character);
        this.world.addObjectsToMap(this.world.enemies);
        this.world.addObjectsToMap(this.world.lootable);
        this.renderEndboss();
    }

    /**
     * Renders endboss if visible and checks victory
     */
    renderEndboss() {
        if (!this.world.endboss) return;
        
        if (this.isEndbossVisible()) {
            this.world.addToMap(this.world.endboss);
        }
        
        this.checkVictoryCondition();
    }

    /**
     * Checks if endboss is visible on screen
     * @returns {boolean} True if visible
     */
    isEndbossVisible() {
        const screenX = this.world.endboss.positionX + this.world.camera_x;
        return screenX > -this.world.endboss.width && screenX < 720;
    }

    /**
     * Checks and handles victory condition
     */
    checkVictoryCondition() {
        if (this.shouldTriggerVictory()) {
            this.initializeVictory();
        }
        
        if (this.canShowVictory()) {
            this.world.gameWon = true;
        }
    }

    /**
     * Checks if victory should be triggered
     * @returns {boolean} True if should trigger
     */
    shouldTriggerVictory() {
        return this.world.endboss.isDead && 
               !this.world.character.isDead && 
               !this.world.gameWon && 
               this.world.gameStarted && 
               this.world.victoryStartTime === 0;
    }

    /**
     * Initializes victory timer
     */
    initializeVictory() {
        this.world.victoryStartTime = Date.now();
    }

    /**
     * Checks if victory screen can be shown
     * @returns {boolean} True if can show
     */
    canShowVictory() {
        return this.world.victoryStartTime > 0 && 
               Date.now() - this.world.victoryStartTime > 1000;
    }

    /**
     * Renders UI elements (statusbar, diamond counter)
     */
    renderUI() {
        this.world.addToMap(this.world.statusbar);
        this.world.addToMap(this.world.diamond);
    }

    /**
     * Renders overlay screens based on game state
     */
    renderOverlays() {
        if (!this.world.gameStarted) {
            this.world.screenManager.renderStartOverlay();
        }
        
        if (this.world.character.isDead) {
            this.world.screenManager.renderGameOverOverlay();
        }
        
        if (this.world.gameWon) {
            this.world.screenManager.renderVictoryOverlay();
        }
    }

    /**
     * Schedules next animation frame
     */
    scheduleNextFrame() {
        requestAnimationFrame(() => this.renderFrame());
    }

    /**
     * Draws object frame if image is loaded
     * @param {Object} mo - Movable object to draw
     */
    drawFrameModel(mo) {
        if (!this.isImageLoaded(mo.img)) return;
        
        try {
            this.drawImage(mo);
        } catch (error) {}
    }

    /**
     * Checks if image is fully loaded
     * @param {HTMLImageElement} img - Image to check
     * @returns {boolean} True if loaded
     */
    isImageLoaded(img) {
        return img && img.complete && img.naturalHeight !== 0;
    }

    /**
     * Draws image on canvas
     * @param {Object} mo - Movable object
     */
    drawImage(mo) {
        this.world.ctx.drawImage(
            mo.img, 
            mo.positionX, 
            mo.positionY, 
            mo.width, 
            mo.height
        );
    }

    /**
     * Flips and renders object image horizontally
     * @param {Object} mo - Movable object to flip
     */
    flipImageBack(mo) {
        this.world.ctx.save();
        this.translateToCenter(mo);
        this.flipHorizontally();
        this.drawFlippedImage(mo);
        this.restoreContext();
    }

    /**
     * Translates context to object center
     * @param {Object} mo - Movable object
     */
    translateToCenter(mo) {
        this.world.ctx.translate(
            mo.positionX + mo.width / 2,
            mo.positionY + mo.height / 2
        );
    }

    /**
     * Flips context horizontally
     */
    flipHorizontally() {
        this.world.ctx.scale(-1, 1);
    }

    /**
     * Draws flipped image
     * @param {Object} mo - Movable object
     */
    drawFlippedImage(mo) {
        this.world.ctx.drawImage(
            mo.img,
            -mo.width / 2,
            -mo.height / 2,
            mo.width,
            mo.height
        );
    }

    /**
     * Restores context after flipping
     */
    restoreContext() {
        this.world.ctx.scale(-1, 1);
        this.world.ctx.restore();
    }
}
