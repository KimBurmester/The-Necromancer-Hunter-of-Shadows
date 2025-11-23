/**
 * Moon decorative element for the night sky
 * Position is randomized on creation
 * @class Moon
 * @extends Model
 */
class Moon extends Model {
    /** @type {number} Height of moon (240px) */
    height = 480/2;
    /** @type {number} Width of moon (375px) */
    width = 750/2;
    /** @type {number} Vertical position offset */
    positionY = -50;
    
    /**
     * Creates a moon instance with randomized horizontal position
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\moon\\3.png');
    
        this.positionX = 100 + Math.random() * 700;
    }
        
}