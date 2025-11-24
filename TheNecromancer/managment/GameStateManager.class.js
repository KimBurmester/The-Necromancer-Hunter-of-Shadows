/**
 * Manages game state transitions and initialization
 * @class GameStateManager
 */
class GameStateManager {
    /**
     * Initializes game state manager
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Initializes and starts the game
     */
    initializeGame() {
        if (this.world.gameStarted) return;
        
        this.world.setWorld();
        this.setGameStarted();
        this.removeSpaceKeyListener();
        this.startCharacterAnimation();
        this.startCollisionDetection();
        this.hideMenuElements();
        this.showTouchControls();
    }

    /**
     * Starts character animation loop
     */
    startCharacterAnimation() {
        this.world.character.startAnimation();
    }

    /**
     * Sets game started flag
     */
    setGameStarted() {
        this.world.gameStarted = true;
    }

    /**
     * Starts collision detection
     */
    startCollisionDetection() {
        this.world.collisionManager.startCollisionDetection();
    }

    /**
     * Hides menu UI elements
     */
    hideMenuElements() {
        document.querySelectorAll('.sidebar, .title, .footer').forEach(el => {
            el.style.display = 'none';
        });
    }

    /**
     * Shows touch controls for mobile
     */
    showTouchControls() {
        const touchControls = document.getElementById('touch-controls');
        if (touchControls) {
            touchControls.style.display = 'flex';
        }
    }

    /**
     * Resets game to initial state
     */
    resetGame() {
        this.cleanupEventListeners();
        this.resetGameFlags();
        this.recreateGameObjects();
        this.reinitializeLevel();
        this.startNewGame();
    }

    /**
     * Cleans up all event listeners
     */
    cleanupEventListeners() {
        this.removeVictoryListener();
        this.removeCanvasListener();
        this.removeSpaceKeyListener();
    }

    /**
     * Removes victory click listener
     */
    removeVictoryListener() {
        if (this.world.victoryClickHandler) {
            this.world.canvas.removeEventListener('click', this.world.victoryClickHandler);
            this.world.victoryClickHandler = null;
        }
    }

    /**
     * Removes canvas click listener
     */
    removeCanvasListener() {
        if (this.world.canvasClickHandler) {
            this.world.canvas.removeEventListener('click', this.world.canvasClickHandler);
            this.world.canvas.removeEventListener('touchstart', this.world.canvasClickHandler);
            this.world.canvasClickHandler = null;
        }
    }

    /**
     * Removes space key listener
     */
    removeSpaceKeyListener() {
        if (this.world.spaceKeyHandler) {
            document.removeEventListener('keydown', this.world.spaceKeyHandler);
            this.world.spaceKeyHandler = null;
        }
    }

    /**
     * Resets all game state flags
     */
    resetGameFlags() {
        this.resetVictoryFlags();
        this.resetGameOverFlags();
    }

    /**
     * Resets victory-related flags
     */
    resetVictoryFlags() {
        this.world.gameWon = false;
        this.world.victoryScreenAlpha = 0;
        this.world.victoryStartTime = 0;
        this.world.victoryButtons = [];
    }

    /**
     * Resets game over flags
     */
    resetGameOverFlags() {
        this.world.gameOverAlpha = 0;
        this.world.gameOverStartTime = 0;
        this.world.showCredits = false;
    }

    /**
     * Recreates all game objects
     */
    recreateGameObjects() {
        this.createEnemies();
        this.createEndboss();
        this.createCharacter();
        this.createUI();
        this.updateLevelReferences();
    }

    /**
     * Creates new enemy instances
     */
    createEnemies() {
        this.world.enemies = [];
        for (let i = 0; i < 3; i++) {
            this.world.enemies.push(new Enemy());
        }
    }

    /**
     * Creates new endboss instance
     */
    createEndboss() {
        this.world.endboss = new Endboss();
    }

    /**
     * Creates new character instance
     */
    createCharacter() {
        this.world.character = new Character();
    }

    /**
     * Creates new UI instances
     */
    createUI() {
        this.world.statusbar = new Statusbar();
        this.world.diamond = new Diamond();
    }

    /**
     * Updates level object references
     */
    updateLevelReferences() {
        this.world.level.enemies = this.world.enemies;
        this.world.level.endboss = this.world.endboss;
    }

    /**
     * Reinitializes level setup
     */
    reinitializeLevel() {
        this.world.setWorld();
        this.world.levelBuilder.generateDiamonds();
        this.positionEndboss();
        this.world.level.calculateLevelEnd();
    }

    /**
     * Positions endboss at level end
     */
    positionEndboss() {
        if (this.world.endboss && this.world.background.length > 0) {
            let lastBg = this.world.background[this.world.background.length - 1];
            let levelEnd = lastBg.positionX + lastBg.width;
            this.world.endboss.positionX = levelEnd - 700;
        }
    }

    /**
     * Starts new game session
     */
    startNewGame() {
        this.setCameraPosition();
        this.setGameStarted();
        this.startCollisionDetection();
        this.hideMenuElements();
        this.showTouchControls();
    }

    /**
     * Sets initial camera position
     */
    setCameraPosition() {
        this.world.camera_x = 1100;
    }
}
