/**
 * Endboss animation image path templates
 * @class
 */
class EndbossImageTemplates {
    /**
     * Initializes endboss image templates with all animation paths
     * @method
     */
    constructor() {
        this.animations = {
            'idle': this.generateImagePaths('Idle/', 6, 'Idle'),
            'idle_blinking': this.generateImagePaths('Idle Blinking/', 9, 'Idle Blinking'),
            'walking': this.generateImagePaths('Walking/', 12, 'Walking'),
            'hurt': this.generateImagePaths('Hurt/', 3, 'Hurt'),
            'dying': this.generateImagePaths('Dying/', 15, 'Dying'),
            'slashing': this.generateImagePaths('Slashing/', 12, 'Slashing')
        };
    }

    /**
     * Retrieves image paths for specific animation type
     * @method
     * @param {string} animationType - Animation type name
     * @returns {Array<string>} Image paths array
     */
    getImages(animationType) {
        return this.animations[animationType] || [];
    }

    /**
     * Gets all available animation type names
     * @method
     * @returns {Array<string>} Animation type names
     */
    getAvailableAnimations() {
        return Object.keys(this.animations);
    }

    /**
     * Generates endboss image paths with padding
     * @method
     * @param {string} folder - Animation folder name
     * @param {number} count - Number of frames
     * @param {string} animationName - Animation name
     * @returns {Array<string>} Generated image paths
     */
    generateImagePaths(folder, count, animationName) {
        const basePath = 'TheNecromancer/img/endboss/level1/';
        const paths = [];
        for (let i = 0; i < count; i++) {
            const paddedNumber = i.toString().padStart(3, '0');
            paths.push(`${basePath}${folder}0_Golem_${animationName}_${paddedNumber}.png`);
        }
        return paths;
    }

    /**
     * Adds new animation type with image paths
     * @method
     * @param {string} animationType - Animation type name
     * @param {string} folder - Animation folder name
     * @param {number} count - Number of frames
     * @param {string} animationName - Animation display name
     */
    addAnimation(animationType, folder, count, animationName) {
        this.animations[animationType] = this.generateImagePaths(folder, count, animationName);
    }
}
