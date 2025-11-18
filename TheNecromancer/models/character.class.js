class Character extends Model {
    world;
    speed = 5;

    constructor(){
        super();
        this.Character_Walking = ImageTemplateManager.getCharacterImages('walking');
        if (this.Character_Walking.length > 0) {
            this.loadImage(this.Character_Walking[0]);
            this.positionX = -820;
        }
        this.loadImages(this.Character_Walking);
    };

    startAnimation() {
        this.animate();
    }

    animate(){
            setInterval(() => {
            if (this.world && this.world.keyboard) {
                
                let isMoving = false;
                
                if (this.world.keyboard.RIGHT) {
                    this.positionX += this.speed;
                    console.log('RIGHT gedrückt - Position X:', this.positionX);
                    this.otherDirection = false;
                    isMoving = true;
                }
                if (this.world.keyboard.LEFT) {
                    this.positionX -= this.speed;
                    console.log('LEFT gedrückt - Position X:', this.positionX);
                    this.otherDirection = true;
                    isMoving = true;
                }
                if (this.world.keyboard.UP) {
                    this.positionY -= this.speed;
                    console.log('UP gedrückt - Position Y:', this.positionY);
                    isMoving = true;
                }
                if (this.world.keyboard.DOWN) {
                    this.positionY += this.speed;
                    console.log('DOWN gedrückt - Position Y:', this.positionY);
                    isMoving = true;
                }
                if (isMoving) {
                    let i = this.currentImage % this.Character_Walking.length;
                    let path = this.Character_Walking[i];
                    this.img = this.walkingImages[path];
                    this.currentImage++;
                }
                this.world.camera_x = -this.positionX + 60;
            }
        }, 1000/30);
    }

}