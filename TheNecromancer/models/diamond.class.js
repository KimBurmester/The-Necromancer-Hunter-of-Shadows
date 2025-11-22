class Diamond extends Model {
    diamonds = 0;

    constructor(){
        super();
        this.positionX = 20;
        this.positionY = 70;
        this.width = 150;
        this.height = 40;
        this.borderRadius = 5;
    }

    addDiamond() {
        this.diamonds++;
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
        ctx.fillStyle = '#2a2a0a';
        ctx.fill();
        this.setShadow(ctx, 'transparent', 0, 0, 0);
    }

    drawInnerShadow(ctx) {
        this.drawRoundedRect(ctx, this.positionX + 2, this.positionY + 2, this.width - 4, this.height - 4, this.borderRadius - 2);
        ctx.fillStyle = '#4a4a1a';
        ctx.fill();
    }

    drawBorder(ctx) {
        this.drawRoundedRect(ctx, this.positionX, this.positionY, this.width, this.height, this.borderRadius);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

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

    drawText(ctx) {
        this.setShadow(ctx, 'rgba(0, 0, 0, 0.8)', 4, 2, 2);
        ctx.fillStyle = '#00CED1';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`x ${this.diamonds}`, this.positionX + 45, this.positionY + this.height / 2);
        this.setShadow(ctx, 'transparent', 0, 0, 0);
    }

    draw(ctx) {
        this.drawBackground(ctx);
        this.drawInnerShadow(ctx);
        this.drawBorder(ctx);
        this.drawDiamondIcon(ctx);
        this.drawText(ctx);
    }
}