/**
 * Manages game over screen and credits display
 * @class GameOverScreenManager
 */
class GameOverScreenManager {
    /**
     * Initializes game over screen manager
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Renders game over overlay with animation
     */
    renderGameOverOverlay() {
        this.updateGameOverAlpha();
        
        if (this.shouldShowGameOverText()) {
            this.drawGameOverText();
        } else {
            this.handleCreditsTransition();
            this.drawCredits();
        }
    }

    /**
     * Updates game over alpha value
     */
    updateGameOverAlpha() {
        if (this.world.gameOverStartTime === 0) {
            this.world.gameOverStartTime = Date.now();
        }
    }

    /**
     * Checks if game over text should be shown
     * @returns {boolean} True if should show text
     */
    shouldShowGameOverText() {
        const elapsed = this.getGameOverElapsed();
        this.world.gameOverAlpha = Math.min(elapsed / 1000, 1);
        return elapsed < 3000;
    }

    /**
     * Gets elapsed time since game over
     * @returns {number} Elapsed milliseconds
     */
    getGameOverElapsed() {
        return Date.now() - this.world.gameOverStartTime;
    }

    /**
     * Handles transition to credits
     */
    handleCreditsTransition() {
        if (!this.world.showCredits) {
            this.initializeCredits();
        }
        this.updateCreditsAlpha();
    }

    /**
     * Initializes credits display
     */
    initializeCredits() {
        this.world.showCredits = true;
        this.world.gameOverAlpha = 0;
    }

    /**
     * Updates credits alpha value
     */
    updateCreditsAlpha() {
        const elapsed = this.getGameOverElapsed();
        this.world.gameOverAlpha = Math.min((elapsed - 3000) / 1000, 1);
    }

    /**
     * Draws game over text
     */
    drawGameOverText() {
        this.world.ctx.save();
        this.world.ctx.globalAlpha = this.world.gameOverAlpha;
        this.drawDarkOverlay();
        this.setupGameOverStyle();
        this.world.ctx.fillText('GAME OVER', 360, 240);
        this.world.ctx.restore();
    }

    /**
     * Draws dark overlay background
     */
    drawDarkOverlay() {
        this.world.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.world.ctx.fillRect(0, 0, 720, 480);
    }

    /**
     * Sets up game over text style
     */
    setupGameOverStyle() {
        this.world.ctx.fillStyle = '#0a8e8e';
        this.world.ctx.font = 'bold 72px cinzel, Arial';
        this.setupTextAlignment();
    }

    /**
     * Sets up text alignment
     */
    setupTextAlignment() {
        this.world.ctx.textAlign = 'center';
        this.world.ctx.textBaseline = 'middle';
    }

    /**
     * Draws credits screen
     */
    drawCredits() {
        this.world.ctx.save();
        this.world.ctx.globalAlpha = this.world.gameOverAlpha;
        this.drawCreditsBackground();
        this.drawCreditsContent();
        this.world.ctx.restore();
    }

    /**
     * Draws credits background
     */
    drawCreditsBackground() {
        this.world.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        this.world.ctx.fillRect(0, 0, 720, 480);
        this.setupTextAlignment();
    }

    /**
     * Draws credits content lines
     */
    drawCreditsContent() {
        this.drawGraphicsCredit();
        this.drawSoundsCredit();
        this.drawDeveloperCredit();
    }

    /**
     * Draws graphics attribution
     */
    drawGraphicsCredit() {
        this.drawWhiteText('All graphics from', 180);
        this.drawCyanText('www.craftpix.net', 210);
    }

    /**
     * Draws sounds attribution
     */
    drawSoundsCredit() {
        this.drawWhiteText('and All sounds from', 250);
        this.drawCyanText('www.mixkit.co', 280);
    }

    /**
     * Draws developer attribution
     */
    drawDeveloperCredit() {
        this.drawWhiteText('Developed by', 330);
        this.world.ctx.fillStyle = '#0a8e8e';
        this.world.ctx.font = 'bold 24px cinzel, Arial';
        this.world.ctx.fillText('Kim P. Burmester', 360, 360);
    }

    /**
     * Draws white text at Y position
     * @param {string} text - Text to draw
     * @param {number} y - Y position
     */
    drawWhiteText(text, y) {
        this.world.ctx.fillStyle = '#ffffff';
        this.world.ctx.font = '20px cinzel, Arial';
        this.world.ctx.fillText(text, 360, y);
    }

    /**
     * Draws cyan text at Y position
     * @param {string} text - Text to draw
     * @param {number} y - Y position
     */
    drawCyanText(text, y) {
        this.world.ctx.fillStyle = '#0a8e8e';
        this.world.ctx.font = 'bold 22px cinzel, Arial';
        this.world.ctx.fillText(text, 360, y);
    }
}
