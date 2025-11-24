/**
 * Animated cloud element that moves across the sky
 * @class Cloud
 * @extends Model
 */
class Cloud extends Model {
    /** @type {number} Height of cloud */
    height = 680;
    /** @type {number} Width of cloud */
    width = 1920;
    /** @type {number} Vertical position */
    positionY = 0;
    /** @type {number} Movement speed */
    speed = 0.15;

    /**
     * Creates a cloud instance and starts animation
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\clouds\\2.png', 0);
        this.animate();
    }
    
    /**
     * Starts the cloud's leftward movement animation
     * @method animate
     * @returns {void}
     */
    animate(){
        this.moveLeft();
    }
}