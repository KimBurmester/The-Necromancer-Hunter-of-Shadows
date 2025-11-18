class ImageTemplateManager {
    static characterTemplates = null;
    static enemyTemplates = null;

    /**
     * Initialisiert die Template-Manager mit den jeweiligen Template-Objekten
     */
    static initialize() {
        this.characterTemplates = new CharacterImageTemplates();
        this.enemyTemplates = new EnemyImageTemplates();
    }

    /**
     * Gibt die Charakter-Bild-Arrays zurück
     * @param {string} animationType - Der Typ der Animation (z.B. 'walking', 'idle', etc.)
     * @returns {Array} Array mit Bildpfaden
     */
    static getCharacterImages(animationType) {
        if (!this.characterTemplates) {
            this.initialize();
        }
        return this.characterTemplates.getImages(animationType);
    }

    /**
     * Gibt die Enemy-Bild-Arrays zurück
     * @param {string} enemyType - Der Typ des Enemys (z.B. 'wraith_01', 'wraith_02', etc.)
     * @param {string} animationType - Der Typ der Animation (z.B. 'walking', 'attacking', etc.)
     * @returns {Array} Array mit Bildpfaden
     */
    static getEnemyImages(enemyType, animationType) {
        if (!this.enemyTemplates) {
            this.initialize();
        }
        return this.enemyTemplates.getImages(enemyType, animationType);
    }

    /**
     * Gibt alle verfügbaren Charakter-Animationstypen zurück
     * @returns {Array} Array mit verfügbaren Animationstypen
     */
    static getAvailableCharacterAnimations() {
        if (!this.characterTemplates) {
            this.initialize();
        }
        return this.characterTemplates.getAvailableAnimations();
    }

    /**
     * Gibt alle verfügbaren Enemy-Typen zurück
     * @returns {Array} Array mit verfügbaren Enemy-Typen
     */
    static getAvailableEnemyTypes() {
        if (!this.enemyTemplates) {
            this.initialize();
        }
        return this.enemyTemplates.getAvailableEnemyTypes();
    }

    static getEndbossImages(animationType) {
    const basePath = 'TheNecromancer/img/endboss/level1/';
    const animations = {
        'idle': { folder: 'Idle/', count: 6, name: 'Idle' },
        'idle_blinking': { folder: 'Idle Blinking/', count: 9, name: 'Idle Blinking' },
        'walking': { folder: 'Walking/', count: 12, name: 'Walking' },
        'running': { folder: 'Running/', count: 8, name: 'Running' },
        'hurt': { folder: 'Hurt/', count: 3, name: 'Hurt' },
        'dying': { folder: 'Dying/', count: 15, name: 'Dying' },
        'slashing': { folder: 'Slashing/', count: 12, name: 'Slashing' },
        'throwing': { folder: 'Throwing/', count: 12, name: 'Throwing' }
    };
    
    if (animations[animationType]) {
        return this.generateEndbossImagePaths(
            basePath + animations[animationType].folder,
            animations[animationType].count,
            animations[animationType].name
        );
    }
    return [];
    }
    static generateEndbossImagePaths(basePath, count, animationName) {
    const paths = [];
    for (let i = 0; i < count; i++) {
        // Format: 0_Golem_Walking_000.png
        const paddedNumber = i.toString().padStart(3, '0');
        paths.push(`${basePath}0_Golem_${animationName}_${paddedNumber}.png`);
    }
    console.log('Generierte Endboss-Pfade für ' + animationName + ':', paths);
    return paths;
}

static generateImagePaths(basePath, count) {
    const paths = [];
    for (let i = 1; i <= count; i++) {
        paths.push(`${basePath}${i}.png`);
    }
    return paths;
}
}