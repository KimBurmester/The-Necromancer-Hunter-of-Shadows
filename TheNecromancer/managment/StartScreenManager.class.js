/**
 * Manages start screen display and interactions
 * @class StartScreenManager
 */
class StartScreenManager {
    /**
     * Initializes start screen manager
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
}
