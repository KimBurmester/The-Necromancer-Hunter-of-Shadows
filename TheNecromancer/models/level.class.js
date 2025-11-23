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
    }

calculateLevelEnd() {
    let maxX = 0;
    
    if (this.background.length > 0) {
        let lastBg = this.background[this.background.length - 1];
        maxX = lastBg.positionX + lastBg.width;
    }
    
    if (this.endboss) {
        this.levelEndX = this.endboss.positionX + 200;
    } else {
        this.levelEndX = maxX;
    }
    
    this.levelStartX = -200;
}
}