class Level {
    enemies;
    background;
    hill;
    grave;
    fence;
    street;
    clouds;
    endboss;
    levelStartX;
    levelEndX;

    constructor(enemies, background, hill, grave, fence, street, clouds, endboss) {
        this.enemies = enemies;
        this.background = background;
        this.hill = hill;
        this.grave = grave;
        this.fence = fence;
        this.street = street;
        this.clouds = clouds;
        this.endboss = endboss;
        
        this.levelStartX = -820;
    }

calculateLevelEnd() {
    let maxX = 0;
    
    if (this.background.length > 0) {
        this.background.forEach((bg) => {
            let bgEndX = bg.positionX + bg.width;
            if (bgEndX > maxX) {
                maxX = bgEndX;
            }
        });
    }
    if (this.endboss) {
        this.levelEndX = this.endboss.positionX - 225;
    } else {
        this.levelEndX = maxX - 720;
    }
}
}