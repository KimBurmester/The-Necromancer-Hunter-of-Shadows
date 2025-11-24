/**
 * Manages victory screen display and interactions
 * @class VictoryScreenManager
 */
class VictoryScreenManager {
    /**
     * Initializes victory screen manager
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
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
