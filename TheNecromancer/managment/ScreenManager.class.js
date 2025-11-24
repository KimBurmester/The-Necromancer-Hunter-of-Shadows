/**
 * Manages all overlay screens (start, game over, victory)
 * @class ScreenManager
 */
class ScreenManager {
    /**
     * Initializes screen manager
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Displays start screen with event handlers
     */
    displayStartScreen() {
        this.setupStartButton();
        this.setupCanvasClick();
    }

    /**
     * Sets up start button event listener
     */
    setupStartButton() {
        const startBtn = document.getElementById('startGame');
        if (!startBtn) return;
        
        const newStartBtn = this.cloneButton(startBtn);
        this.attachStartListener(newStartBtn);
    }

    /**
     * Clones button to remove old listeners
     * @param {HTMLElement} button - Button to clone
     * @returns {HTMLElement} Cloned button
     */
    cloneButton(button) {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        return newButton;
    }

    /**
     * Attaches start listener to button
     * @param {HTMLElement} button - Button element
     */
    attachStartListener(button) {
        button.addEventListener('click', () => {
            this.world.gameStateManager.initializeGame();
        });
    }

    /**
     * Sets up canvas click event for starting game
     */
    setupCanvasClick() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        
        this.removeOldClickHandler(canvas);
        this.createNewClickHandler(canvas);
    }

    /**
     * Removes old click handler
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    removeOldClickHandler(canvas) {
        if (this.world.canvasClickHandler) {
            canvas.removeEventListener('click', this.world.canvasClickHandler);
            canvas.removeEventListener('touchstart', this.world.canvasClickHandler);
        }
    }

    /**
     * Creates and attaches new click handler
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    createNewClickHandler(canvas) {
        this.world.canvasClickHandler = (e) => {
            if (!this.world.gameStarted) {
                this.world.gameStateManager.initializeGame();
            }
        };
        
        canvas.addEventListener('click', this.world.canvasClickHandler);
        canvas.addEventListener('touchstart', this.world.canvasClickHandler, { passive: true });
    }

    /**
     * Renders start screen overlay
     */
    renderStartOverlay() {
        this.drawDarkOverlay();
        this.drawTitle();
        this.drawSubtitle();
        this.drawStartInstructions();
    }

    /**
     * Draws dark overlay background
     */
    drawDarkOverlay() {
        this.world.ctx.save();
        this.world.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.world.ctx.fillRect(0, 0, 720, 480);
    }

    /**
     * Draws game title
     */
    drawTitle() {
        this.setupTitleStyle();
        this.world.ctx.fillText('NECROMANCER', 360, 180);
    }

    /**
     * Sets up title text style
     */
    setupTitleStyle() {
        this.world.ctx.fillStyle = '#0a8e8e';
        this.world.ctx.font = 'bold 48px cinzel, Arial';
        this.setupTextAlignment();
        this.setupShadow();
    }

    /**
     * Draws subtitle text
     */
    drawSubtitle() {
        this.world.ctx.fillStyle = '#ffffff';
        this.world.ctx.font = 'bold 24px cinzel, Arial';
        this.world.ctx.fillText('The Hunter of The Shadows', 360, 230);
    }

    /**
     * Draws start instructions based on device
     */
    drawStartInstructions() {
        this.world.ctx.fillStyle = '#0a8e8e';
        this.world.ctx.font = '20px cinzel, Arial';
        
        const text = window.innerWidth <= 500 ? 
            'Tippe auf den Bildschirm zum Starten' : 
            'Klicke "Spiel starten" um zu beginnen';
        
        this.world.ctx.fillText(text, 360, 320);
        this.world.ctx.restore();
    }

    /**
     * Sets up text alignment
     */
    setupTextAlignment() {
        this.world.ctx.textAlign = 'center';
        this.world.ctx.textBaseline = 'middle';
    }

    /**
     * Sets up text shadow effect
     */
    setupShadow() {
        this.world.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        this.world.ctx.shadowBlur = 10;
        this.world.ctx.shadowOffsetX = 3;
        this.world.ctx.shadowOffsetY = 3;
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
     * Sets up game over text style
     */
    setupGameOverStyle() {
        this.world.ctx.fillStyle = '#0a8e8e';
        this.world.ctx.font = 'bold 72px cinzel, Arial';
        this.setupTextAlignment();
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

    /**
     * Renders victory screen with fade-in
     */
    renderVictoryOverlay() {
        this.updateVictoryAlpha();
        this.drawVictoryContent();
    }

    /**
     * Updates victory screen alpha
     */
    updateVictoryAlpha() {
        if (this.world.victoryScreenAlpha < 1) {
            this.world.victoryScreenAlpha += 0.02;
        }
    }

    /**
     * Draws victory screen content
     */
    drawVictoryContent() {
        this.drawVictoryBackground();
        
        if (this.world.victoryScreenAlpha >= 1) {
            this.drawVictoryTitle();
            this.drawDiamondCount();
            this.drawVictoryButtons();
        }
        
        this.world.ctx.restore();
    }

    /**
     * Draws victory background overlay
     */
    drawVictoryBackground() {
        this.world.ctx.save();
        const alpha = this.world.victoryScreenAlpha * 0.85;
        this.world.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        this.world.ctx.fillRect(0, 0, 720, 480);
    }

    /**
     * Draws victory title
     */
    drawVictoryTitle() {
        this.setupVictoryTitleStyle();
        this.world.ctx.fillText('Du hast Gewonnen!', 360, 150);
    }

    /**
     * Sets up victory title style
     */
    setupVictoryTitleStyle() {
        this.world.ctx.fillStyle = '#FFD700';
        this.world.ctx.font = 'bold 48px cinzel, Arial';
        this.setupTextAlignment();
        this.setupShadow();
    }

    /**
     * Draws collected diamond count
     */
    drawDiamondCount() {
        this.world.ctx.fillStyle = 'white';
        this.world.ctx.font = '28px cinzel, Arial';
        this.world.ctx.shadowBlur = 5;
        this.world.ctx.fillText(
            `Gesammelte Diamanten: ${this.world.diamond.diamonds}`, 
            360, 
            220
        );
    }

    /**
     * Draws victory buttons
     */
    drawVictoryButtons() {
        this.initializeVictoryButtons();
        this.world.victoryButtons.forEach(btn => this.drawVictoryButton(btn));
    }

    /**
     * Initializes victory button configurations
     */
    initializeVictoryButtons() {
        this.world.victoryButtons = [
            { text: 'Neues Spiel', x: 160, y: 300, width: 200, height: 50, action: 'restart' },
            { text: 'Beenden', x: 360, y: 300, width: 200, height: 50, action: 'quit' }
        ];
    }

    /**
     * Draws individual victory button
     * @param {Object} btn - Button configuration
     */
    drawVictoryButton(btn) {
        const isHover = this.checkButtonHover(btn);
        this.drawButtonBackground(btn, isHover);
        this.drawButtonBorder(btn);
        this.drawButtonText(btn);
        this.setupVictoryClickHandler();
    }

    /**
     * Checks if button is being hovered
     * @param {Object} btn - Button configuration
     * @returns {boolean} True if hovered
     */
    checkButtonHover(btn) {
        const mouseX = this.world.lastMouseX || 0;
        const mouseY = this.world.lastMouseY || 0;
        
        return mouseX >= btn.x && mouseX <= btn.x + btn.width && 
               mouseY >= btn.y && mouseY <= btn.y + btn.height;
    }

    /**
     * Draws button background
     * @param {Object} btn - Button configuration
     * @param {boolean} isHover - Hover state
     */
    drawButtonBackground(btn, isHover) {
        this.world.ctx.fillStyle = isHover ? 
            'rgba(10, 142, 142, 0.9)' : 
            'rgba(10, 142, 142, 0.6)';
        this.world.ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    }

    /**
     * Draws button border
     * @param {Object} btn - Button configuration
     */
    drawButtonBorder(btn) {
        this.world.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        this.world.ctx.lineWidth = 2;
        this.world.ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);
    }

    /**
     * Draws button text
     * @param {Object} btn - Button configuration
     */
    drawButtonText(btn) {
        this.world.ctx.fillStyle = 'white';
        this.world.ctx.font = 'bold 22px cinzel, Arial';
        this.setupTextAlignment();
        this.world.ctx.fillText(
            btn.text, 
            btn.x + btn.width / 2, 
            btn.y + btn.height / 2
        );
    }

    /**
     * Sets up victory button click handler
     */
    setupVictoryClickHandler() {
        if (this.world.victoryClickHandler) return;
        
        this.createVictoryClickHandler();
        this.createMouseMoveHandler();
    }

    /**
     * Creates victory click handler
     */
    createVictoryClickHandler() {
        this.world.victoryClickHandler = (e) => {
            this.handleVictoryClick(e);
        };
        this.world.canvas.addEventListener('click', this.world.victoryClickHandler);
    }

    /**
     * Handles victory button clicks
     * @param {Event} e - Click event
     */
    handleVictoryClick(e) {
        if (!this.world.gameWon) return;
        
        const { clickX, clickY } = this.getCanvasCoordinates(e);
        this.processButtonClick(clickX, clickY);
    }

    /**
     * Gets canvas click coordinates
     * @param {Event} e - Click event
     * @returns {Object} Click coordinates
     */
    getCanvasCoordinates(e) {
        const rect = this.world.canvas.getBoundingClientRect();
        return {
            clickX: e.clientX - rect.left,
            clickY: e.clientY - rect.top
        };
    }

    /**
     * Processes button click action
     * @param {number} clickX - X coordinate
     * @param {number} clickY - Y coordinate
     */
    processButtonClick(clickX, clickY) {
        this.world.victoryButtons.forEach(button => {
            if (this.isButtonClicked(button, clickX, clickY)) {
                this.executeButtonAction(button.action);
            }
        });
    }

    /**
     * Checks if button was clicked
     * @param {Object} button - Button configuration
     * @param {number} clickX - X coordinate
     * @param {number} clickY - Y coordinate
     * @returns {boolean} True if clicked
     */
    isButtonClicked(button, clickX, clickY) {
        return clickX >= button.x && clickX <= button.x + button.width && 
               clickY >= button.y && clickY <= button.y + button.height;
    }

    /**
     * Executes button action
     * @param {string} action - Action type
     */
    executeButtonAction(action) {
        if (action === 'restart') {
            this.world.gameStateManager.resetGame();
        } else if (action === 'quit') {
            location.reload();
        }
    }

    /**
     * Creates mouse move handler
     */
    createMouseMoveHandler() {
        this.world.canvas.addEventListener('mousemove', (e) => {
            this.updateMousePosition(e);
        });
    }

    /**
     * Updates mouse position
     * @param {Event} e - Mouse event
     */
    updateMousePosition(e) {
        const rect = this.world.canvas.getBoundingClientRect();
        this.world.lastMouseX = e.clientX - rect.left;
        this.world.lastMouseY = e.clientY - rect.top;
    }
}
