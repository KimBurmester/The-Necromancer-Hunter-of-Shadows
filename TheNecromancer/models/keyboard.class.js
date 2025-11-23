/**
 * Keyboard input state manager for player controls
 * Tracks the pressed state of all game control keys
 * @class Keyboard
 */
class Keyboard {
    /** @type {boolean} Left arrow key state */
    LEFT = false;
    /** @type {boolean} Right arrow key state */
    RIGHT = false;
    /** @type {boolean} Up arrow key state */
    UP = false;
    /** @type {boolean} Down arrow key state */
    DOWN = false;
    /** @type {boolean} Spacebar key state for jumping */
    SPACE = false;
    /** @type {boolean} D key state for attacking */
    D = false;
}