class Enemy extends Model {
    constructor(){
        super().loadImage('El_Pollo_Loco\\img\\craftpix-net-563568-free-wraith-tiny-style-2d-sprites\\PNG\\Wraith_01\\PNG Sequences\\Idle\\Wraith_01_Idle_000.png');
    
        this.positionX = 250 + Math.random() * 500;
        this.positionY = 245 + Math.random() * 20;
    }


    eat(){
    }
        
}