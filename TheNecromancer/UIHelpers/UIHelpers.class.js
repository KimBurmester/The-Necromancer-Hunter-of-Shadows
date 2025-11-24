/**
 * UI utility functions for drawing common UI elements
 * @class UIHelpers
 */
class UIHelpers {
    /**
     * Draws a rounded rectangle path
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Rectangle width
     * @param {number} height - Rectangle height
     * @param {number} radius - Corner radius
     */
    static drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    /**
     * Sets shadow properties for canvas context
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {string} color - Shadow color
     * @param {number} blur - Shadow blur radius
     * @param {number} offsetX - Horizontal shadow offset
     * @param {number} offsetY - Vertical shadow offset
     */
    static setShadow(ctx, color, blur, offsetX, offsetY) {
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
    }

    /**
     * Clears shadow from canvas context
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    static clearShadow(ctx) {
        this.setShadow(ctx, 'transparent', 0, 0, 0);
    }

    /**
     * Draws a gradient-filled rectangle
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Rectangle width
     * @param {number} height - Rectangle height
     * @param {Array<Object>} colorStops - Array of {offset, color} objects
     */
    static drawGradientRect(ctx, x, y, width, height, colorStops) {
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        colorStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
    }
}
