class CharacterImageTemplates {
    constructor() {
        this.templates = {
            walking: [
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_001.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_002.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_003.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_004.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_005.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_006.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_007.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_008.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_009.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_010.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_011.png',
                 'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_010.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_009.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_008.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_007.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_006.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_005.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_004.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_003.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_002.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_001.png',
                'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_000.png'
            ],
            idle: [
                // Hier können Idle-Animationen hinzugefügt werden
                'TheNecromancer\\img\\character\\Idle\\0_Necromancer_of_the_Shadow_Idle_000.png'
            ],
            running: [
                // Hier können Running-Animationen hinzugefügt werden
            ],
            jumping: [
                // Hier können Jump-Animationen hinzugefügt werden
            ]
        };
    }

    /**
     * Gibt die Bild-Arrays für einen bestimmten Animationstyp zurück
     * @param {string} animationType - Der gewünschte Animationstyp
     * @returns {Array} Array mit Bildpfaden oder leeres Array falls nicht gefunden
     */
    getImages(animationType) {
        return this.templates[animationType] || [];
    }

    /**
     * Gibt alle verfügbaren Animationstypen zurück
     * @returns {Array} Array mit verfügbaren Animationstypen
     */
    getAvailableAnimations() {
        return Object.keys(this.templates);
    }

    /**
     * Fügt einen neuen Animationstyp hinzu oder aktualisiert einen bestehenden
     * @param {string} animationType - Der Name des Animationstyps
     * @param {Array} imageArray - Array mit Bildpfaden
     */
    addAnimation(animationType, imageArray) {
        this.templates[animationType] = imageArray;
    }
}