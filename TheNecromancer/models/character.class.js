class Character extends Model {

    world;
    speed = 5;

    constructor(){
        super();
        
        // Lade Charakter-Bilder über den ImageTemplateManager
        this.Character_Walking = ImageTemplateManager.getCharacterImages('walking');
        

        console.log('Character_Walking Array:', this.Character_Walking);
        console.log('Anzahl Walking Bilder:', this.Character_Walking.length);


        // Lade das erste Bild als Standard
        if (this.Character_Walking.length > 0) {
            this.loadImage(this.Character_Walking[0]);
        }
        
        // Lade alle Walking-Bilder
        this.loadImages(this.Character_Walking);

       console.log('walkingImages geladen:', this.walkingImages);
    };

    startAnimation() {
        console.log('startAnimation() aufgerufen');
        this.animate();
    }

    animate(){
        console.log('animate() gestartet');
                setInterval(() => {
            if (this.world && this.world.keyboard) {
                
                let isMoving = false;
                
                // Bewegung nach rechts
                if (this.world.keyboard.RIGHT) {
                    this.positionX += this.speed;
                    console.log('RIGHT gedrückt - Position X:', this.positionX);
                    this.otherDirection = false;
                    isMoving = true;
                }
                
                // Bewegung nach links
                if (this.world.keyboard.LEFT) {
                    this.positionX -= this.speed;
                    console.log('LEFT gedrückt - Position X:', this.positionX);
                    this.otherDirection = true;
                    isMoving = true;
                }

                // Bewegung nach oben
                if (this.world.keyboard.UP) {
                    this.positionY -= this.speed;
                    console.log('UP gedrückt - Position Y:', this.positionY);
                    isMoving = true;
                }

                // Bewegung nach unten
                if (this.world.keyboard.DOWN) {
                    this.positionY += this.speed;
                    console.log('DOWN gedrückt - Position Y:', this.positionY);
                    isMoving = true;
                }

                // Animation nur wenn sich bewegend
                if (isMoving) {
                    let i = this.currentImage % this.Character_Walking.length;
                    let path = this.Character_Walking[i];
                    this.img = this.walkingImages[path];
                    this.currentImage++;
                }
            }
        }, 1000/30);
    }

}