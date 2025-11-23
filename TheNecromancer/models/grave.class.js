/**
 * Grave decorative layer for the game environment
 * @class Grave
 * @extends Model
 */
class Grave extends Model {
        /** @type {number} Height of grave layer (540px) */
        height = 1080/2;
        /** @type {number} Width of grave layer (960px) */
        width = 1920/2;
        /** @type {number} Vertical position offset */
        positionY = -38;
        /** @type {number} Horizontal position */
        positionX = 0;
    /**
     * Creates a grave instance with default image
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\background-graves\\6.png', 0);
    }
}