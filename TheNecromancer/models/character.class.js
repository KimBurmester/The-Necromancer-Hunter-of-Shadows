class Character extends Model {

    world;
    speed = 10;

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
            if(this.world.keyboard.RIGHT){
            this.positionX += this.speed;
            }
        }, 1000/30);


        setInterval(() => {
            if (this.world && this.world.keyboard) {
                
                if (this.world.keyboard.RIGHT) {
                    this.positionX += this.speed;
                }
                
                if (this.world.keyboard.LEFT) {
                    this.positionX -= this.speed;
                }

                if (this.world.keyboard.UP) {
                    this.positionY -= this.speed;
                }

                if (this.world.keyboard.DOWN) {
                    this.positionY += this.speed;
                }

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || 
                    this.world.keyboard.UP || this.world.keyboard.DOWN) {

                    console.log('Character bewegt sich! currentImage:', this.currentImage);

                    let i = this.currentImage % this.Character_Walking.length;
                    let path = this.Character_Walking[i];
                    console.log('Lade Bild:', path);
                    console.log('Verfügbares Bild:', this.walkingImages[path]);

                    this.img = this.walkingImages[path];
                    this.currentImage++;
                }
            }
        }, 50);
    }

/*     animate(){
    setInterval(() =>{
        this.moveRight();
        if(this.world.keyboard.RIGHT){
            let i = this.currentImage % this.Character_Walking.length;
            let path = this.Character_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        };
    },100);
    } */
}