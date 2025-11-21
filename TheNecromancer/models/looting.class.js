class Looting extends Model{
    collected = false;


    constructor(){
        super().loadImage('TheNecromancer\\img\\loot\\PNG\\without_shadow\\3.png');
        this.positionX = 100;
        this.positionY = 280;
        this.width = 130;
        this.height = 130;
    }

    getHitbox() {
        return {
            x: this.positionX + 30,
            y: this.positionY + 30,
            width: this.width - 60,
            height: this.height - 60
        };
    }

}