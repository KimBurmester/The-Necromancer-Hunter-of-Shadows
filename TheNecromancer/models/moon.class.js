class Moon extends Model {
    height = 480/2;
    width = 750/2;
    positionY = -50;
    
    constructor(){
        super().loadImage('TheNecromancer\\img\\moon\\3.png');
    
        this.positionX = 100 + Math.random() * 700;
    }
        
}