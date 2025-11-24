/**
 * Street ground layer for the game environment
 * @class Street
 * @extends Model
 */
class Street extends Model {
        /** @type {number} Height of street layer */
        height = 480;
        /** @type {number} Width of street layer (960px) */
        width = 1920/2;
        /** @type {number} Vertical position */
        positionY = 0;
        /** @type {number} Horizontal position */
        positionX = 0;
    /**
     * Creates a street instance with default image
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\street\\9.png', 0);
    }
}