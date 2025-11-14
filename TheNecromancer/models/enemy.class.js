class Enemy extends Model {
    
    constructor(enemyType = 'wraith_01'){
        super();
        
        // Setze den Enemy-Typ (Standard: wraith_01)
        this.enemyType = enemyType;
        
        // Lade Enemy-Bilder über den ImageTemplateManager
        this.Enemy_Walking = ImageTemplateManager.getEnemyImages(this.enemyType, 'walking');
        
        // Lade das erste Bild als Standard
        if (this.Enemy_Walking.length > 0) {
            this.loadImage(this.Enemy_Walking[0]);
        }
        
        // Lade alle Walking-Bilder
        this.loadImages(this.Enemy_Walking);
        
        // Setze zufällige Position
        this.positionX = 250 + Math.random() * 500;
        this.positionY = 240 + Math.random() * 20;
        
        this.animate();
    }
    animate(){
        this.moveLeft();
    }

    moveLeft(){
        setInterval(() =>{
            this.positionX -= this.speed;
        }, 1000/60);
        setInterval(() =>{
            let i = this.currentImage % this.Enemy_Walking.length;
            let path = this.Enemy_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 1000/10);
    }
}