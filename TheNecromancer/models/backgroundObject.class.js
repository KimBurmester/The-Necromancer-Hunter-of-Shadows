/**
 * Generic background object with customizable image and position
 * @class BackgroundObject
 * @extends Model
 */
class BackgroundObject extends Model {

    /** @type {number} Width of background object */
    width = 720;
    /** @type {number} Height of background object */
    height = 400;

    /**
     * Creates a background object with custom image at specified position
     * @constructor
     * @param {string} imagePath - Path to the background image
     * @param {number} positionX - Horizontal position of the object
     */
    constructor(imagePath, positionX){
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 480 - this.height;
    }
}