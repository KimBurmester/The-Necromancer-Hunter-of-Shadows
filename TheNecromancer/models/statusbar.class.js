/**
 * Health/energy statusbar display for UI
 * @class
 */
class Statusbar extends Model {
    /** @type {number} Current energy level (0-100) */
    energy = 100;

    /**
     * Initializes statusbar with position and dimensions
     * @method
     */
    constructor() {
        super();
        this.positionX = 20;
        this.positionY = 20;
        this.width = 200;
        this.height = 40;
        this.borderRadius = 10;
    }

    /**
     * Updates current energy level
     * @method
     * @param {number} energy - New energy value (0-100)
     */
    setEnergy(energy) {
        this.energy = energy;
    }

    /**
     * Draws dark background with shadow
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawBackground(ctx) {
        UIHelpers.setShadow(ctx, 'rgba(0, 0, 0, 0.5)', 8, 3, 3);
        UIHelpers.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.fillStyle = '#2a0a0a';
        ctx.fill();
        UIHelpers.clearShadow(ctx);
    }

    /**
     * Draws inner shadow for depth effect
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawInnerShadow(ctx) {
        UIHelpers.drawRoundedRect(ctx, this.positionX + 2, this.positionY + 2, this.width - 4, this.height - 4, this.borderRadius - 2);
        ctx.fillStyle = '#4a1a1a';
        ctx.fill();
    }

    /**
     * Creates gradient based on energy level (cyan>60%, yellow>30%, red<30%)
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @returns {CanvasGradient} Color gradient for health bar
     */
    createHealthGradient(ctx) {
        let gradient = ctx.createLinearGradient(this.positionX + 4, this.positionY + 4, this.positionX + 4, this.positionY + this.height - 4);
        if (this.energy > 60) {
            gradient.addColorStop(0, '#9afefe');
            gradient.addColorStop(1, '#5afefe');
        } else if (this.energy > 30) {
            gradient.addColorStop(0, '#fef89a');
            gradient.addColorStop(1, '#fef85a');
        } else {
            gradient.addColorStop(0, '#fe9a9a');
            gradient.addColorStop(1, '#fe5a5a');
        }
        return gradient;
    }

    /**
     * Creates white gloss gradient for shine effect
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @returns {CanvasGradient} Gloss gradient overlay
     */
    createGlossGradient(ctx) {
        let gloss = ctx.createLinearGradient(this.positionX + 4, this.positionY + 4, this.positionX + 4, this.positionY + this.height / 2);
        gloss.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gloss.addColorStop(1, 'rgba(255, 255, 255, 0)');
        return gloss;
    }

    /**
     * Draws health bar fill with gradient and gloss effect
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @param {number} fillWidth - Width of health bar fill
     */
    drawHealthBar(ctx, fillWidth) {
        ctx.save();
        UIHelpers.drawRoundedRect(ctx, this.positionX + 4, this.positionY + 4, this.width - 8, this.height - 8, this.borderRadius - 4);
        ctx.clip();
        ctx.fillStyle = this.createHealthGradient(ctx);
        ctx.fillRect(this.positionX + 4, this.positionY + 4, fillWidth, this.height - 8);
        ctx.fillStyle = this.createGlossGradient(ctx);
        ctx.fillRect(this.positionX + 4, this.positionY + 4, fillWidth, (this.height - 8) / 2);
        ctx.restore();
    }

    /**
     * Draws black border around statusbar
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawBorder(ctx) {
        UIHelpers.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    /**
     * Draws HP percentage text in center
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawText(ctx) {
        UIHelpers.setShadow(ctx, 'rgba(0, 0, 0, 0.8)', 4, 2, 2);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`HP: ${Math.round(this.energy)}%`, this.positionX + this.width / 2, this.positionY + this.height / 2);
        UIHelpers.clearShadow(ctx);
    }

    /**
     * Renders complete statusbar UI with health level
     * @method
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        this.drawBackground(ctx);
        this.drawInnerShadow(ctx);
        let fillWidth = ((this.width - 8) * this.energy) / 100;
        if (fillWidth > 0) {
            this.drawHealthBar(ctx, fillWidth);
        }
        this.drawBorder(ctx);
        this.drawText(ctx);
    }
}