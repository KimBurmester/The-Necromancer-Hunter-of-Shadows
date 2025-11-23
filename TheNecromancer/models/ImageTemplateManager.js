/**
 * Centralized image template manager for characters and enemies
 * @class
 */
class ImageTemplateManager {
    /** @type {CharacterImageTemplates} Character animation templates */
    static characterTemplates = null;
    /** @type {EnemyImageTemplates} Enemy animation templates */
    static enemyTemplates = null;

    /**
     * Initializes template instances
     * @method
     */
    static initialize() {
        this.characterTemplates = new CharacterImageTemplates();
        this.enemyTemplates = new EnemyImageTemplates();
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
        if (!this.enemyTemplates) {
            this.initialize();
        }
        
        if (enemyType === 'endboss') {
            return this.getEndbossImages(animationType);
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
        const basePath = 'TheNecromancer/img/endboss/level1/';
        const animations = {
            'idle': { folder: 'Idle/', count: 6, name: 'Idle' },
            'idle_blinking': { folder: 'Idle Blinking/', count: 9, name: 'Idle Blinking' },
            'walking': { folder: 'Walking/', count: 12, name: 'Walking' },
            'hurt': { folder: 'Hurt/', count: 3, name: 'Hurt' },
            'dying': { folder: 'Dying/', count: 15, name: 'Dying' },
            'slashing': { folder: 'Slashing/', count: 12, name: 'Slashing' }
        };
        
        if (animations[animationType]) {
            return this.generateEndbossImagePaths(
                basePath + animations[animationType].folder,
                animations[animationType].count,
                animations[animationType].name
            );
        }
        return [];
    }

    /**
     * Generates endboss image paths with padding
     * @method
     * @param {string} basePath - Base directory path
     * @param {number} count - Number of frames
     * @param {string} animationName - Animation name
     * @returns {Array<string>} Generated image paths
     */
    static generateEndbossImagePaths(basePath, count, animationName) {
        const paths = [];
        for (let i = 0; i < count; i++) {
            const paddedNumber = i.toString().padStart(3, '0');
            paths.push(`${basePath}0_Golem_${animationName}_${paddedNumber}.png`);
        }
        return paths;
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