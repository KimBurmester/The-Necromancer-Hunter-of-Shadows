class Moon extends Model {
    height = canvas.height/2;
    width = canvas.width/2;
    positionY = 150;
    
    constructor(){
        super().loadImage('El_Pollo_Loco\\img\\moon\\3.png');
    
        this.positionX = 100 + Math.random() * 700;
    }
        
}