/**
 * Builds and manages level layout and objects
 * @class LevelBuilder
 */
class LevelBuilder {
    /**
     * Initializes level builder
     * @param {World} world - Game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Generates all background layers
     */
    generateBackgroundLayers() {
        this.initializeArrays();
        const config = this.getBackgroundConfig();
        this.createLayerObjects(config);
    }

    /**
     * Initializes background arrays
     */
    initializeArrays() {
        this.world.background = [];
        this.world.hill = [];
        this.world.fence = [];
        this.world.grave = [];
        this.world.street = [];
    }

    /**
     * Gets background configuration
     * @returns {Object} Configuration object
     */
    getBackgroundConfig() {
        return {
            count: 5,
            width: 960,
            startX: 0
        };
    }

    /**
     * Creates layer objects based on config
     * @param {Object} config - Configuration object
     */
    createLayerObjects(config) {
        for (let i = 0; i < config.count; i++) {
            const posX = this.calculatePosition(i, config);
            this.addLayerSet(posX);
        }
    }

    /**
     * Calculates position for layer
     * @param {number} index - Layer index
     * @param {Object} config - Configuration object
     * @returns {number} Position X
     */
    calculatePosition(index, config) {
        return config.startX + (index * config.width);
    }

    /**
     * Adds complete layer set at position
     * @param {number} posX - X position
     */
    addLayerSet(posX) {
        this.world.background.push(this.createBackground(posX));
        this.world.hill.push(this.createHill(posX));
        this.world.fence.push(this.createFence(posX));
        this.world.grave.push(this.createGrave(posX));
        this.world.street.push(this.createStreet(posX));
    }

    /**
     * Creates background layer
     * @param {number} posX - X position
     * @returns {Background} Background instance
     */
    createBackground(posX) {
        let bg = new Background();
        bg.positionX = posX;
        return bg;
    }

    /**
     * Creates hill layer
     * @param {number} posX - X position
     * @returns {Hills} Hills instance
     */
    createHill(posX) {
        let hill = new Hills();
        hill.positionX = posX;
        return hill;
    }

    /**
     * Creates fence layer
     * @param {number} posX - X position
     * @returns {Fence} Fence instance
     */
    createFence(posX) {
        let fence = new Fence();
        fence.positionX = posX;
        return fence;
    }

    /**
     * Creates grave layer
     * @param {number} posX - X position
     * @returns {Grave} Grave instance
     */
    createGrave(posX) {
        let grave = new Grave();
        grave.positionX = posX;
        return grave;
    }

    /**
     * Creates street layer
     * @param {number} posX - X position
     * @returns {Street} Street instance
     */
    createStreet(posX) {
        let street = new Street();
        street.positionX = posX;
        return street;
    }

    /**
     * Generates cloud objects
     */
    generateClouds() {
        const config = this.getCloudConfig();
        this.createCloudObjects(config);
    }

    /**
     * Gets cloud configuration
     * @returns {Object} Configuration object
     */
    getCloudConfig() {
        return {
            count: this.world.background.length * 2,
            width: 1920,
            startX: -1920 - 1920
        };
    }

    /**
     * Creates cloud objects
     * @param {Object} config - Configuration object
     */
    createCloudObjects(config) {
        this.world.clouds = [];
        for (let i = 0; i < config.count; i++) {
            this.addCloud(i, config);
        }
    }

    /**
     * Adds single cloud
     * @param {number} index - Cloud index
     * @param {Object} config - Configuration object
     */
    addCloud(index, config) {
        let cloud = new Cloud();
        cloud.positionX = config.startX + (index * config.width);
        cloud.positionY = 0;
        this.world.clouds.push(cloud);
    }

    /**
     * Generates diamond collectibles
     */
    generateDiamonds() {
        const positions = this.calculateDiamondPositions();
        this.createDiamondObjects(positions);
    }

    /**
     * Calculates diamond positions
     * @returns {Array<number>} Array of X positions
     */
    calculateDiamondPositions() {
        const bounds = this.getLevelBounds();
        return this.distributeDiamondsEvenly(bounds);
    }

    /**
     * Gets level boundaries
     * @returns {Object} Start and end X coordinates
     */
    getLevelBounds() {
        let endX = 0;
        if (this.world.background.length > 0) {
            let lastBg = this.world.background[this.world.background.length - 1];
            endX = lastBg.positionX + lastBg.width - 400;
        }
        return { startX: -100, endX: endX };
    }

    /**
     * Distributes diamonds evenly
     * @param {Object} bounds - Level boundaries
     * @returns {Array<number>} Array of X positions
     */
    distributeDiamondsEvenly(bounds) {
        const count = 5;
        const length = bounds.endX - bounds.startX;
        const spacing = length / (count + 1);
        const positions = [];
        
        for (let i = 0; i < count; i++) {
            const pos = this.calculateDiamondPosition(i, bounds.startX, spacing);
            positions.push(pos);
        }
        
        return positions;
    }

    /**
     * Calculates single diamond position
     * @param {number} index - Diamond index
     * @param {number} startX - Start X position
     * @param {number} spacing - Space between diamonds
     * @returns {number} X position
     */
    calculateDiamondPosition(index, startX, spacing) {
        const basePos = startX + 200 + (index * spacing);
        const randomOffset = Math.random() * 50 - 25;
        return basePos + randomOffset;
    }

    /**
     * Creates diamond objects
     * @param {Array<number>} positions - Array of X positions
     */
    createDiamondObjects(positions) {
        this.world.lootable = [];
        positions.forEach(posX => {
            this.addDiamond(posX);
        });
    }

    /**
     * Adds single diamond
     * @param {number} posX - X position
     */
    addDiamond(posX) {
        let diamond = new Looting();
        diamond.positionX = posX;
        diamond.positionY = 280;
        this.world.lootable.push(diamond);
    }
}
