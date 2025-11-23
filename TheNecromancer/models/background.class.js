/**
 * Background layer for the game level
 * Represents a single background image tile
 * @class Background
 * @extends Model
 */
class Background extends Model {
        /** @type {number} Height of background (540px) */
        height = 1080/2;
        /** @type {number} Width of background (960px) */
        width = 1920/2;
        /** @type {number} Vertical position */
        positionY = 0;
        /** @type {number} Horizontal position */
        positionX = 0;

    /**
     * Creates a background instance with default image
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\background\\1.png', 0);
    }
}