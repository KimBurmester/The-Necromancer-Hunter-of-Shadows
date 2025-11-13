class Enemy extends Model {
    constructor(){
        super().loadImage('TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Idle\\Wraith_01_Idle_000.png');
    
        this.positionX = 250 + Math.random() * 500;
        this.positionY = 240 + Math.random() * 20;
    }


    eat(){
    }
        
}