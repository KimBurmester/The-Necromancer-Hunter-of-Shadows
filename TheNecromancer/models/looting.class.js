/**
 * Collectible diamond loot item that can be picked up by the player
 * @class Looting
 * @extends Model
 */
class Looting extends Model{
    /** @type {boolean} Whether this item has been collected */
    collected = false;


    /**
     * Creates a diamond loot item with default position and size
     * @constructor
     */
    constructor(){
        super().loadImage('TheNecromancer\\img\\loot\\PNG\\without_shadow\\3.png');
        this.positionX = 100;
        this.positionY = 280;
        this.width = 130;
        this.height = 130;
    }

    /**
     * Returns the collision hitbox for the diamond with smaller dimensions for precise collision
     * @method getHitbox
     * @returns {{x: number, y: number, width: number, height: number}} Hitbox dimensions
     */
    getHitbox() {
        return {
            x: this.positionX + 30,
            y: this.positionY + 30,
            width: this.width - 60,
            height: this.height - 60
        };
    }

}