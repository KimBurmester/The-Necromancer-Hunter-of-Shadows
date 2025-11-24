/**
 * Fence decorative layer for the game environment
 * @class Fence
 * @extends Model
 */
class Fence extends Model {
        /** @type {number} Height of fence layer */
        height = 480;
        /** @type {number} Width of fence layer (960px) */
        width = 1920/2;
        /** @type {number} Vertical position offset */
        positionY = 25;
        /** @type {number} Horizontal position */
        positionX = 0;

    /**
     * Creates a fence instance with default image
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\background-fence\\5.png');
    }
}