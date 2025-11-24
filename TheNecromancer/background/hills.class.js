/**
 * Hills decorative layer for the game background
 * @class Hills
 * @extends Model
 */
class Hills extends Model {
        /** @type {number} Height of hills layer */
        height = 480;
        /** @type {number} Width of hills layer (960px) */
        width = 1920/2;
        /** @type {number} Vertical position */
        positionY = 0;
        /** @type {number} Horizontal position */
        positionX = 0;

    /**
     * Creates a hills instance with image from template
     * @constructor
     */
    constructor(){
        super();
        const imagePath = ImageTemplateManager.getBackgroundLayer('hills');
        this.loadImage(imagePath);
    }
}