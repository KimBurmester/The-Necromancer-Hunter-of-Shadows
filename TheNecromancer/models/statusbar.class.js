class Statusbar extends Model {
    energy= 100;

    constructor() {
        super();
        this.positionX = 20;
        this.positionY = 20;
        this.width = 200;
        this.height = 50;
        this.setEnergy(100);
    }

    setEnergy(energy) {
        this.energy = energy;
    }

    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.positionX, this.positionY, this.width, this.height);
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
        
        let fillWidth = (this.width * this.energy) / 100;
        
        if (this.energy > 60) {
            ctx.fillStyle = '#7afefe';
        } else if (this.energy > 30) {
            ctx.fillStyle = '#7afefec0';
        } else {
            ctx.fillStyle = '#7afefea0';
        }
        
        ctx.fillRect(this.positionX, this.positionY, fillWidth, this.height);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`HP: ${Math.round(this.energy)}%`, this.positionX + this.width / 2, this.positionY + 20);
    }
}