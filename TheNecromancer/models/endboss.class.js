class Endboss extends Model{
    isIdle = true;
    idleTime = 3000;
    speed = 2;
    hasStarted = false;
    world;
    animationDirection = 1; // 1 = vorwärts, -1 = rückwärts
    currentIdleImage = 0;
    currentWalkImage = 0;
    
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
        this.positionX = 720;
        this.positionY = 17;
        this.width = 500;
        this.height = 500;
        this.otherDirection = true;

        this.baseY = this.positionY;
        
        this.animateIdle();
        this.checkCharacterDistance();
    }

    checkCharacterDistance() {
        setInterval(() => {
            if (!this.hasStarted && this.world && this.world.character) {
                let distanceToEndboss = this.positionX - this.world.character.positionX;
                
                console.log('--- Endboss Distance Check ---');
                console.log('Character Position X:', this.world.character.positionX);
                console.log('Endboss Position X:', this.positionX);
                console.log('Distanz zum Endboss:', distanceToEndboss);
                console.log('Canvas Breite (Sichtweite):', 720);
                console.log('Ist in Sichtweite?', distanceToEndboss <= 720);
                console.log('----------------------------');
                
                if (distanceToEndboss <= 720) {
                    console.log('🔥 Character hat Endboss erreicht! Starte Kampf...');
                    this.hasStarted = true;
                    this.startIdlePhase();
                }
            }
        }, 100);
    }

    startIdlePhase() {
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
            
            // Zeige aktuelles Bild
            let path = this.Endboss_Idle[this.currentIdleImage];
            this.img = this.walkingImages[path];
            
            // Nächstes Bild berechnen
            this.currentIdleImage += this.animationDirection;
            
            // Richtung umkehren wenn Ende erreicht (0→5→4→3...→0)
            if (this.currentIdleImage >= this.Endboss_Idle.length - 1) {
                this.animationDirection = -1; // Ab jetzt rückwärts
            } else if (this.currentIdleImage <= 0) {
                this.animationDirection = 1; // Ab jetzt vorwärts
            }
        }, 150);
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            if (this.isIdle) return;
            
            // Bewege Endboss nach links
            this.positionX -= this.speed;
            
            // Zeige aktuelles Bild
            let path = this.Endboss_Walking[this.currentWalkImage];
            this.img = this.walkingImages[path];
            
            // Nächstes Bild berechnen
            this.currentWalkImage += this.animationDirection;
            
            // Richtung umkehren wenn Ende erreicht (0→11→10→9...→0)
            if (this.currentWalkImage >= this.Endboss_Walking.length - 1) {
                this.animationDirection = -1; // Ab jetzt rückwärts
            } else if (this.currentWalkImage <= 0) {
                this.animationDirection = 1; // Ab jetzt vorwärts
            }
        }, 120);
    }
}