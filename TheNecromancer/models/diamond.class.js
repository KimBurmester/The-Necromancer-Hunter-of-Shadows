/**
 * Diamond counter display class for UI rendering
 * @class
 */
class Diamond extends Model {
    /** @type {number} Number of collected diamonds */
    diamonds = 0;

    /**
     * Initializes diamond counter display
     * @method
     */
    constructor(){
        super();
        this.positionX = 20;
        this.positionY = 70;
        this.width = 150;
        this.height = 40;
        this.borderRadius = 5;
    }

    /**
     * Increments diamond counter by one
     * @method
     */
    addDiamond() {
        this.diamonds++;
    }

    /**
     * Draws the background layer of diamond counter
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawBackground(ctx) {
        UIHelpers.setShadow(ctx, 'rgba(0, 0, 0, 0.5)', 8, 3, 3);
        UIHelpers.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.fillStyle = '#2a2a0a';
        ctx.fill();
        UIHelpers.clearShadow(ctx);
    }

    /**
     * Draws inner shadow effect for depth
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawInnerShadow(ctx) {
        UIHelpers.drawRoundedRect(ctx, this.positionX + 2, this.positionY + 2, this.width - 4, this.height - 4, this.borderRadius - 2);
        ctx.fillStyle = '#4a4a1a';
        ctx.fill();
    }

    /**
     * Draws golden border around diamond counter
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawBorder(ctx) {
        UIHelpers.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    /**
     * Draws diamond icon with cyan color and blue stroke
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawDiamondIcon(ctx) {
        ctx.save();
        ctx.fillStyle = '#00CED1';
        ctx.beginPath();
        const centerX = this.positionX + 25;
        const centerY = this.positionY + this.height / 2;
        const size = 12;
        
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX + size, centerY);
        ctx.lineTo(centerX, centerY + size);
        ctx.lineTo(centerX - size, centerY);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = '#0080FF';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Draws diamond count text next to icon
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawText(ctx) {
        UIHelpers.setShadow(ctx, 'rgba(0, 0, 0, 0.8)', 4, 2, 2);
        ctx.fillStyle = '#00CED1';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`x ${this.diamonds}`, this.positionX + 45, this.positionY + this.height / 2);
        UIHelpers.clearShadow(ctx);
    }

    /**
     * Renders complete diamond counter UI
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        this.drawBackground(ctx);
        this.drawInnerShadow(ctx);
        this.drawBorder(ctx);
        this.drawDiamondIcon(ctx);
        this.drawText(ctx);
    }
}