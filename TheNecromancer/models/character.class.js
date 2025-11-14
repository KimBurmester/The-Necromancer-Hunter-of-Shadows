class Character extends Model {

    constructor(){
        super();
        
        // Lade Charakter-Bilder über den ImageTemplateManager
        this.Character_Walking = ImageTemplateManager.getCharacterImages('walking');
        
        // Lade das erste Bild als Standard
        if (this.Character_Walking.length > 0) {
            this.loadImage(this.Character_Walking[0]);
        }
        
        // Lade alle Walking-Bilder
        this.loadImages(this.Character_Walking);

        this.animate();
    }

    animate(){
        this.moveRight();
        setInterval(() =>{
            let i = this.currentImage % this.Character_Walking.length;
            let path = this.Character_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 100);
    }

    jump(){
    }
}