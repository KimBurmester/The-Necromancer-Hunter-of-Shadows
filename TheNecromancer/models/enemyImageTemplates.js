class EnemyImageTemplates {
    constructor() {
        this.templates = {
            wraith_01: {
                walking: [
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_001.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_002.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_003.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_004.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_005.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_006.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_007.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_008.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_009.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_010.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_011.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_010.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_009.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_008.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_007.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_006.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_005.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_004.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_003.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_002.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_001.png',
                    'TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_000.png'
                ],
                attacking: [
                    // Hier können Attacking-Animationen hinzugefügt werden
                ],
                idle: [
                    // Hier können Idle-Animationen hinzugefügt werden
                ]
            },
            wraith_02: {
                walking: [
                    // Hier können Wraith_02 Walking-Animationen hinzugefügt werden
                ],
                attacking: [
                    // Hier können Wraith_02 Attacking-Animationen hinzugefügt werden
                ]
            },
            wraith_03: {
                walking: [
                    // Hier können Wraith_03 Walking-Animationen hinzugefügt werden
                ],
                attacking: [
                    // Hier können Wraith_03 Attacking-Animationen hinzugefügt werden
                ]
            }
        };
    }

    /**
     * Gibt die Bild-Arrays für einen bestimmten Enemy-Typ und Animationstyp zurück
     * @param {string} enemyType - Der gewünschte Enemy-Typ (z.B. 'wraith_01')
     * @param {string} animationType - Der gewünschte Animationstyp (z.B. 'walking')
     * @returns {Array} Array mit Bildpfaden oder leeres Array falls nicht gefunden
     */
    getImages(enemyType, animationType) {
        if (this.templates[enemyType] && this.templates[enemyType][animationType]) {
            return this.templates[enemyType][animationType];
        }
        return [];
    }

    /**
     * Gibt alle verfügbaren Enemy-Typen zurück
     * @returns {Array} Array mit verfügbaren Enemy-Typen
     */
    getAvailableEnemyTypes() {
        return Object.keys(this.templates);
    }

    /**
     * Gibt alle verfügbaren Animationstypen für einen bestimmten Enemy-Typ zurück
     * @param {string} enemyType - Der Enemy-Typ
     * @returns {Array} Array mit verfügbaren Animationstypen
     */
    getAvailableAnimations(enemyType) {
        if (this.templates[enemyType]) {
            return Object.keys(this.templates[enemyType]);
        }
        return [];
    }

    /**
     * Fügt einen neuen Enemy-Typ oder eine neue Animation hinzu
     * @param {string} enemyType - Der Enemy-Typ
     * @param {string} animationType - Der Animationstyp
     * @param {Array} imageArray - Array mit Bildpfaden
     */
    addAnimation(enemyType, animationType, imageArray) {
        if (!this.templates[enemyType]) {
            this.templates[enemyType] = {};
        }
        this.templates[enemyType][animationType] = imageArray;
    }
}