class Endboss extends Model{
    isIdle = true;
    idleTime = 3000;
    speed = 2;
    hasStarted = false; // Flag, um zu prüfen, ob Endboss bereits aktiviert wurde
    world;     
    
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
        this.positionX = 720; //7350
        this.positionY = 185;
        this.width = 280;
        this.height = 300;
        this.otherDirection = true;

        this.baseY = this.positionY;
        
        this.animateIdle();
        this.checkCharacterDistance();
    }

    checkCharacterDistance() {
    setInterval(() => {
        if (!this.hasStarted && this.world && this.world.character) {
            // Prüfe, ob Character in Sichtweite ist (Canvas-Breite = 720)
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
    }, 100); // Prüfe alle 100ms
}

    startIdlePhase() {
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
        }, 150);
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
        }, 120);
    }
}