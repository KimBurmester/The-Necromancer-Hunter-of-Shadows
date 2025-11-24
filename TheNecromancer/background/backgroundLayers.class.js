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
     * Creates a background instance with image from template
     * @constructor
     */
    constructor(){
        super();
        const imagePath = ImageTemplateManager.getBackgroundLayer('background');
        this.loadImage(imagePath);
    }
}

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
     * Creates a fence instance with image from template
     * @constructor
     */
    constructor(){
        super();
        const imagePath = ImageTemplateManager.getBackgroundLayer('fence');
        this.loadImage(imagePath);
    }
}

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
     * Creates a grave instance with image from template
     * @constructor
     */
    constructor(){
        super();
        const imagePath = ImageTemplateManager.getBackgroundLayer('graves');
        this.loadImage(imagePath);
    }
}

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
     * Creates a street instance with image from template
     * @constructor
     */
    constructor(){
        super();
        const imagePath = ImageTemplateManager.getBackgroundLayer('street');
        this.loadImage(imagePath);
    }
}

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
        super();
        const imagePath = ImageTemplateManager.getBackgroundLayer('clouds');
        this.loadImage(imagePath);
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
