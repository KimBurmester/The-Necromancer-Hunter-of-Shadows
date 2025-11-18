class Endboss extends Model{
    isIdle = true;
    idleTime = 3000;    
    
    constructor(){
        super();
        
        console.log('Endboss wird erstellt...');
        
        // Lade Endboss-Bilder
        this.Endboss_Idle = ImageTemplateManager.getEndbossImages('idle');
        this.Endboss_Walking = ImageTemplateManager.getEndbossImages('walking');
        this.Endboss_Hurt = ImageTemplateManager.getEndbossImages('hurt');
        this.Endboss_Dying = ImageTemplateManager.getEndbossImages('dying');
        
        console.log('Endboss Idle Bilder:', this.Endboss_Idle);
        console.log('Endboss Walking Bilder:', this.Endboss_Walking);
        
        // Lade das erste Idle-Bild als Standard
        if (this.Endboss_Idle.length > 0) {
            this.loadImage(this.Endboss_Idle[0]);
            console.log('Erstes Endboss-Bild geladen:', this.Endboss_Idle[0]);
        } else {
            console.error('Keine Endboss Idle-Bilder gefunden!');
        }
        
        // Lade alle Bilder
        this.loadImages(this.Endboss_Idle);
        this.loadImages(this.Endboss_Walking);
        this.loadImages(this.Endboss_Hurt);
        this.loadImages(this.Endboss_Dying);
        
        // Position am Ende der Karte - Golem ist größer
        this.positionX = 7480;
        this.positionY = 180;
        this.width = 280;
        this.height = 300;

        this.baseY = this.positionY;
        
        this.startIdlePhase();
    }

    startIdlePhase() {
        this.animateIdle();
        
        // Nach idleTime zu Walking wechseln
        setTimeout(() => {
            this.isIdle = false;
            this.animate();
        }, this.idleTime);
    }

    animateIdle() {
        let idleInterval = setInterval(() => {
            if (!this.isIdle) {
                clearInterval(idleInterval);
                return;
            }
            let i = this.currentImage % this.Endboss_Idle.length;
            let path = this.Endboss_Idle[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 150); // Langsamere Animation für schweren Golem
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            if (this.isIdle) return;
            
            // Bewege Endboss nach links (langsamer als normale Enemies)
            this.positionX -= this.speed;
            
            let i = this.currentImage % this.Endboss_Walking.length;
            let path = this.Endboss_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 120); // Schwerfälligere, langsamere Animation
    }
}