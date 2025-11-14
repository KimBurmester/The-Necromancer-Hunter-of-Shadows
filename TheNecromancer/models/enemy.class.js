class Enemy extends Model {
    
    constructor(enemyType = 'wraith_01'){
        super();
        this.speed = 0.15 + Math.random() * 0.25;
        
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

        // Schwebende Bewegung - Variablen
        this.baseY = this.positionY; // Ursprüngliche Y-Position speichern
        this.floatAmplitude = 10 + Math.random() * 5; // Wie hoch/tief schwebt er (10-25px)
        this.floatSpeed = 0.02 + Math.random() * 0.03; // Geschwindigkeit der Schwebung
        this.floatOffset = Math.random() * Math.PI * 2;
        
        this.animate();
    }
    animate(){
        super.moveLeft();
        this.floatingMovement();
    }

    moveLeft(){
        setInterval(() =>{
            let i = this.currentImage % this.Enemy_Walking.length;
            let path = this.Enemy_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 1000/10);
    }

    floatingMovement(){
        setInterval(() => {
            // Schwebende Auf- und Abwärtsbewegung mit Sinus-Funktion
            this.floatOffset += this.floatSpeed;
            this.positionY = this.baseY + Math.sin(this.floatOffset) * this.floatAmplitude;
        }, 1000/60); // 60 FPS für smooth floating
    }
}