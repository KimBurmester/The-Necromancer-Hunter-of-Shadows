/**
 * Background layer image path templates
 * @class
 */
class BackgroundImageTemplates {
    /**
     * Initializes background image templates with all layer paths
     * @method
     */
    constructor() {
        this.layers = {
            'background': this.generateLayerPath('background', '1.png'),
            'hills': this.generateLayerPath('background-hill', '4.png'),
            'fence': this.generateLayerPath('background-fence', '5.png'),
            'graves': this.generateLayerPath('background-graves', '6.png'),
            'street': this.generateLayerPath('street', '9.png'),
            'clouds': this.generateLayerPath('clouds', '2.png')
        };
    }

    /**
     * Generates image path for specific layer
     * @method
     * @param {string} folder - Folder name in img directory
     * @param {string} filename - Image filename
     * @returns {string} Complete image path
     */
    generateLayerPath(folder, filename) {
        return `TheNecromancer/img/${folder}/${filename}`;
    }

    /**
     * Retrieves image path for specific layer type
     * @method
     * @param {string} layerType - Layer type name
     * @returns {string} Image path
     */
    getLayerPath(layerType) {
        return this.layers[layerType] || '';
    }

    /**
     * Gets all available layer type names
     * @method
     * @returns {Array<string>} Layer type names
     */
    getAvailableLayers() {
        return Object.keys(this.layers);
    }

    /**
     * Adds new layer type with image path
     * @method
     * @param {string} layerType - Layer type name
     * @param {string} folder - Folder name
     * @param {string} filename - Image filename
     */
    addLayer(layerType, folder, filename) {
        this.layers[layerType] = this.generateLayerPath(folder, filename);
    }
}
