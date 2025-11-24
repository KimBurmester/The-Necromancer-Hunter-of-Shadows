/**
 * Main game world controller managing all game objects and rendering
 * @class
 */
class World {
  /** @type {Character} Player character instance */
  character = new Character();
  /** @type {Level} Current level instance */
  level = level1;
  /** @type {Array<Enemy>} Enemy instances array */
  enemies = level1.enemies;
  /** @type {Endboss} End boss instance */
  endboss = level1.endboss;
  /** @type {Array<Background>} Background layers */
  background = level1.background;
  /** @type {Array<Hills>} Hill background objects */
  hill = level1.hill;
  /** @type {Array<Grave>} Grave decoration objects */
  grave = level1.grave;
  /** @type {Array<Fence>} Fence decoration objects */
  fence = level1.fence;
  /** @type {Array<Street>} Street ground objects */
  street = level1.street;
  /** @type {Array<Cloud>} Cloud objects */
  clouds = level1.clouds;
  /** @type {Statusbar} Health status bar */
  statusbar = new Statusbar();
  /** @type {Diamond} Diamond counter UI */
  diamond = new Diamond();
  /** @type {HTMLCanvasElement} Main canvas element */
  canvas;
  /** @type {CanvasRenderingContext2D} Canvas rendering context */
  ctx;
  /** @type {Keyboard} Keyboard input state */
  keyboard;
  /** @type {number} Camera X offset for scrolling */
  camera_x = 0;
  /** @type {Array<Looting>} Collectible items */
  lootable = [];
  /** @type {number} Game over screen fade alpha */
  gameOverAlpha = 0;
  /** @type {boolean} Credits display flag */
  showCredits = false;
  /** @type {number} Game over animation start time */
  gameOverStartTime = 0;
  /** @type {boolean} Game started flag */
  gameStarted = false;
  /** @type {boolean} Victory state flag */
  gameWon = false;
  /** @type {number} Victory screen fade alpha */
  victoryScreenAlpha = 0;
  /** @type {number} Victory animation start time */
  victoryStartTime = 0;
  /** @type {Function} Canvas click event handler */
  canvasClickHandler = null;
  /** @type {Function} Space key event handler */
  spaceKeyHandler = null;
  /** @type {Array<Object>} Victory screen button hitboxes */
  victoryButtons = [];
  /** @type {CollisionManager} Collision detection manager */
  collisionManager;
  /** @type {RenderManager} Rendering manager */
  renderManager;
  /** @type {ScreenManager} Screen overlay manager */
  screenManager;
  /** @type {GameStateManager} Game state manager */
  gameStateManager;
  /** @type {LevelBuilder} Level builder */
  levelBuilder;

  /**
   * Initializes world with canvas and keyboard
   * @method
   * @param {HTMLCanvasElement} canvas - Game canvas element
   * @param {Keyboard} keyboard - Keyboard state manager
   */
  constructor(canvas, keyboard) {
    this.initializeCanvas(canvas, keyboard);
    this.initializeManagers();
    this.initializeLevelObjects();
    this.startGameLoop();
  }

  /**
   * Initializes canvas and context
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {Keyboard} keyboard - Keyboard instance
   */
  initializeCanvas(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
  }

  /**
   * Initializes all manager instances
   */
  initializeManagers() {
    this.collisionManager = new CollisionManager(this);
    this.renderManager = new RenderManager(this);
    this.screenManager = new ScreenManager(this);
    this.gameStateManager = new GameStateManager(this);
    this.levelBuilder = new LevelBuilder(this);
  }

  /**
   * Initializes level objects and setup
   */
  initializeLevelObjects() {
    this.levelBuilder.generateBackgroundLayers();
    this.levelBuilder.generateClouds();
    this.assignLevelObjects();
    this.levelBuilder.generateDiamonds();
    this.gameStateManager.positionEndboss();
    this.level.calculateLevelEnd();
    this.camera_x = 0;
  }

  /**
   * Assigns created objects to level
   */
  assignLevelObjects() {
    this.level.background = this.background;
    this.level.hill = this.hill;
    this.level.grave = this.grave;
    this.level.fence = this.fence;
    this.level.street = this.street;
    this.level.clouds = this.clouds;
  }

  /**
   * Starts game loop and shows start screen
   */
  startGameLoop() {
    this.renderManager.renderFrame();
    this.screenManager.displayStartScreen();
  }

  /**
   * Sets world reference in all game entities
   */
  setWorld() {
    this.character.world = this;
    this.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    if (this.endboss) {
      this.endboss.world = this;
    }
  }

  /**
   * Adds array of objects to map
   * @param {Array<Object>} objects - Game objects array
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds single object to canvas with flipping logic
   * @param {Object} mo - Movable object to render
   */
  addToMap(mo) {
    if (this.isUIObject(mo)) {
      mo.draw(this.ctx);
      return;
    }
    
    if (this.isEndboss(mo)) {
      this.renderEndbossObject(mo);
      return;
    }
    
    this.renderStandardObject(mo);
  }

  /**
   * Checks if object is UI element
   * @param {Object} mo - Movable object
   * @returns {boolean} True if UI object
   */
  isUIObject(mo) {
    return mo instanceof Statusbar || mo instanceof Diamond;
  }

  /**
   * Checks if object is Endboss
   * @param {Object} mo - Movable object
   * @returns {boolean} True if Endboss
   */
  isEndboss(mo) {
    return mo instanceof Endboss;
  }

  /**
   * Renders endboss with special logic
   * @param {Object} mo - Endboss object
   */
  renderEndbossObject(mo) {
    if (mo.isDead) {
      this.renderManager.drawFrameModel(mo);
    } else if (mo.otherDirection || mo.isHurt) {
      this.renderManager.flipImageBack(mo);
    } else {
      this.renderManager.drawFrameModel(mo);
    }
  }

  /**
   * Renders standard game object
   * @param {Object} mo - Movable object
   */
  renderStandardObject(mo) {
    if (mo.otherDirection) {
      this.renderManager.flipImageBack(mo);
    } else {
      this.renderManager.drawFrameModel(mo);
    }
  }
}

