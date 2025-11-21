class Statusbar extends Model {
    energy = 100;

    constructor() {
        super();
        this.positionX = 20;
        this.positionY = 20;
        this.width = 200;
        this.height = 40;
        this.borderRadius = 10;
    }

    setEnergy(energy) {
        this.energy = energy;
    }

    drawRoundedRect(ctx, x, y, width, height, radius) {
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

    setShadow(ctx, color, blur, offsetX, offsetY) {
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
    }

    drawBackground(ctx) {
        this.setShadow(ctx, 'rgba(0, 0, 0, 0.5)', 8, 3, 3);
        this.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.fillStyle = '#2a0a0a';
        ctx.fill();
        this.setShadow(ctx, 'transparent', 0, 0, 0);
    }

    drawInnerShadow(ctx) {
        this.drawRoundedRect(ctx, this.positionX + 2, this.positionY + 2, this.width - 4, this.height - 4, this.borderRadius - 2);
        ctx.fillStyle = '#4a1a1a';
        ctx.fill();
    }

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

    createGlossGradient(ctx) {
        let gloss = ctx.createLinearGradient(this.positionX + 4, this.positionY + 4, this.positionX + 4, this.positionY + this.height / 2);
        gloss.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gloss.addColorStop(1, 'rgba(255, 255, 255, 0)');
        return gloss;
    }

    drawHealthBar(ctx, fillWidth) {
        ctx.save();
        this.drawRoundedRect(ctx, this.positionX + 4, this.positionY + 4, this.width - 8, this.height - 8, this.borderRadius - 4);
        ctx.clip();
        ctx.fillStyle = this.createHealthGradient(ctx);
        ctx.fillRect(this.positionX + 4, this.positionY + 4, fillWidth, this.height - 8);
        ctx.fillStyle = this.createGlossGradient(ctx);
        ctx.fillRect(this.positionX + 4, this.positionY + 4, fillWidth, (this.height - 8) / 2);
        ctx.restore();
    }

    drawBorder(ctx) {
        this.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    drawText(ctx) {
        this.setShadow(ctx, 'rgba(0, 0, 0, 0.8)', 4, 2, 2);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`HP: ${Math.round(this.energy)}%`, this.positionX + this.width / 2, this.positionY + this.height / 2);
        this.setShadow(ctx, 'transparent', 0, 0, 0);
    }

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