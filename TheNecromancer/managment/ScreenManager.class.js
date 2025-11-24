/**
 * Facade for managing all game screens (start, game over, victory)
 * Delegates to specialized screen managers
 * @class ScreenManager
 */
class ScreenManager {
    /**
     * Initializes screen manager with specialized managers
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
        this.startScreenManager = new StartScreenManager(world);
        this.gameOverScreenManager = new GameOverScreenManager(world);
        this.victoryScreenManager = new VictoryScreenManager(world);
    }

    /**
     * Displays start screen with event handlers
     */
    displayStartScreen() {
        this.startScreenManager.displayStartScreen();
    }

    /**
     * Renders start screen overlay
     */
    renderStartOverlay() {
        this.startScreenManager.renderStartOverlay();
    }

    /**
     * Renders game over overlay with animation
     */
    renderGameOverOverlay() {
        this.gameOverScreenManager.renderGameOverOverlay();
    }

    /**
     * Renders victory screen with fade-in
     */
    renderVictoryOverlay() {
        this.victoryScreenManager.renderVictoryOverlay();
    }
}
