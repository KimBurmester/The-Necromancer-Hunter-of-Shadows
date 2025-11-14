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
}