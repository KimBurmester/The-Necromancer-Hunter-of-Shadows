/**
 * Game level container managing all level entities and boundaries
 * @class Level
 */
class Level {
    /** @type {Array<Enemy>} Array of enemy instances */
    enemies;
    /** @type {Array<Background>} Background layer objects */
    background;
    /** @type {Array<Hills>} Hill decoration objects */
    hill;
    /** @type {Array<Grave>} Grave decoration objects */
    grave;
    /** @type {Array<Fence>} Fence decoration objects */
    fence;
    /** @type {Array<Street>} Street ground objects */
    street;
    /** @type {Array<Cloud>} Cloud animation objects */
    clouds;
    /** @type {Endboss} Level boss enemy */
    endboss;
    /** @type {number} Left boundary of level */
    levelStartX;
    /** @type {number} Right boundary of level */
    levelEndX;

    /**
     * Creates a new level with all entities and decorations
     * @constructor
     * @param {Array<Enemy>} enemies - Enemy instances for this level
     * @param {Array<Background>} background - Background layer objects
     * @param {Array<Hills>} hill - Hill decoration objects
     * @param {Array<Grave>} grave - Grave decoration objects
     * @param {Array<Fence>} fence - Fence decoration objects
     * @param {Array<Street>} street - Street ground objects
     * @param {Array<Cloud>} clouds - Cloud animation objects
     * @param {Endboss} endboss - Boss enemy for this level
     */
    constructor(enemies, background, hill, grave, fence, street, clouds, endboss) {
        this.enemies = enemies;
        this.background = background;
        this.hill = hill;
        this.grave = grave;
        this.fence = fence;
        this.street = street;
        this.clouds = clouds;
        this.endboss = endboss;
    }

/**
 * Calculates the level boundaries based on background position and endboss location
 * Sets levelStartX to -200 and levelEndX to endboss position + 200
 * @method calculateLevelEnd
 * @returns {void}
 */
calculateLevelEnd() {
    let maxX = 0;
    
    if (this.background.length > 0) {
        let lastBg = this.background[this.background.length - 1];
        maxX = lastBg.positionX + lastBg.width;
    }
    
    if (this.endboss) {
        this.levelEndX = this.endboss.positionX + 200;
    } else {
        this.levelEndX = maxX;
    }
    
    this.levelStartX = -200;
}
}