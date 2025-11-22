class ImageTemplateManager {
    static characterTemplates = null;
    static enemyTemplates = null;

    static initialize() {
        this.characterTemplates = new CharacterImageTemplates();
        this.enemyTemplates = new EnemyImageTemplates();
    }

    static getCharacterImages(animationType) {
        if (!this.characterTemplates) {
            this.initialize();
        }
        return this.characterTemplates.getImages(animationType);
    }

    // ✅ KORRIGIERT: Endboss wird separat behandelt
    static getEnemyImages(enemyType, animationType) {
        if (!this.enemyTemplates) {
            this.initialize();
        }
        
        // ✅ Prüfe ob Endboss
        if (enemyType === 'endboss') {
            return this.getEndbossImages(animationType);
        }
        
        return this.enemyTemplates.getImages(enemyType, animationType);
    }

    static getAvailableCharacterAnimations() {
        if (!this.characterTemplates) {
            this.initialize();
        }
        return this.characterTemplates.getAvailableAnimations();
    }

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
            'hurt': { folder: 'Hurt/', count: 3, name: 'Hurt' },
            'dying': { folder: 'Dying/', count: 15, name: 'Dying' },
            'slashing': { folder: 'Slashing/', count: 12, name: 'Slashing' }
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
            const paddedNumber = i.toString().padStart(3, '0');
            paths.push(`${basePath}0_Golem_${animationName}_${paddedNumber}.png`);
        }
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