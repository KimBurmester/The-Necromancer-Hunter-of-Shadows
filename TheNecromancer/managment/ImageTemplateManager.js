/**
 * Centralized image template manager for characters and enemies
 * @class
 */
class ImageTemplateManager {
    /** @type {CharacterImageTemplates} Character animation templates */
    static characterTemplates = null;
    /** @type {EnemyImageTemplates} Enemy animation templates */
    static enemyTemplates = null;
    /** @type {EndbossImageTemplates} Endboss animation templates */
    static endbossTemplates = null;
    /** @type {BackgroundImageTemplates} Background layer templates */
    static backgroundTemplates = null;

    /**
     * Initializes template instances
     * @method
     */
    static initialize() {
        this.characterTemplates = new CharacterImageTemplates();
        this.enemyTemplates = new EnemyImageTemplates();
        this.endbossTemplates = new EndbossImageTemplates();
        this.backgroundTemplates = new BackgroundImageTemplates();
    }

    /**
     * Retrieves character animation images
     * @method
     * @param {string} animationType - Animation type (idle, walking, etc.)
     * @returns {Array<string>} Image paths array
     */
    static getCharacterImages(animationType) {
        if (!this.characterTemplates) {
            this.initialize();
        }
        return this.characterTemplates.getImages(animationType);
    }

    /**
     * Retrieves enemy animation images
     * @method
     * @param {string} enemyType - Enemy type (wraith_01/02/03, endboss)
     * @param {string} animationType - Animation type
     * @returns {Array<string>} Image paths array
     */
    static getEnemyImages(enemyType, animationType) {
        if (enemyType === 'endboss') {
            return this.getEndbossImages(animationType);
        }
        
        if (!this.enemyTemplates) {
            this.initialize();
        }
        
        return this.enemyTemplates.getImages(enemyType, animationType);
    }

    /**
     * Gets available character animation types
     * @method
     * @returns {Array<string>} Animation type names
     */
    static getAvailableCharacterAnimations() {
        if (!this.characterTemplates) {
            this.initialize();
        }
        return this.characterTemplates.getAvailableAnimations();
    }

    /**
     * Gets available enemy types
     * @method
     * @returns {Array<string>} Enemy type names
     */
    static getAvailableEnemyTypes() {
        if (!this.enemyTemplates) {
            this.initialize();
        }
        return this.enemyTemplates.getAvailableEnemyTypes();
    }

    /**
     * Retrieves endboss animation images
     * @method
     * @param {string} animationType - Animation type
     * @returns {Array<string>} Image paths array
     */
    static getEndbossImages(animationType) {
        if (!this.endbossTemplates) {
            this.initialize();
        }
        return this.endbossTemplates.getImages(animationType);
    }

    /**
     * Gets available endboss animation types
     * @method
     * @returns {Array<string>} Animation type names
     */
    static getAvailableEndbossAnimations() {
        if (!this.endbossTemplates) {
            this.initialize();
        }
        return this.endbossTemplates.getAvailableAnimations();
    }

    /**
     * Retrieves background layer image path
     * @method
     * @param {string} layerType - Layer type (background, hills, fence, etc.)
     * @returns {string} Image path
     */
    static getBackgroundLayer(layerType) {
        if (!this.backgroundTemplates) {
            this.initialize();
        }
        return this.backgroundTemplates.getLayerPath(layerType);
    }

    /**
     * Gets available background layer types
     * @method
     * @returns {Array<string>} Layer type names
     */
    static getAvailableBackgroundLayers() {
        if (!this.backgroundTemplates) {
            this.initialize();
        }
        return this.backgroundTemplates.getAvailableLayers();
    }

    /**
     * Generates sequential image paths
     * @method
     * @param {string} basePath - Base directory path
     * @param {number} count - Number of images
     * @returns {Array<string>} Generated image paths
     */
    static generateImagePaths(basePath, count) {
        const paths = [];
        for (let i = 1; i <= count; i++) {
            paths.push(`${basePath}${i}.png`);
        }
        return paths;
    }
}