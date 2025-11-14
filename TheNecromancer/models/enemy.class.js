class Enemy extends Model {
    
    Enemy_Walking = [
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
    ];
    currentImage = 0;
    
    constructor(){
        super().loadImage('TheNecromancer\\img\\enemy\\Wraith_01\\PNG Sequences\\Walking\\Wraith_01_Moving Forward_000.png');
        this.loadImages(this.Enemy_Walking);

        this.animate();
        this.positionX = 250 + Math.random() * 500;
        this.positionY = 240 + Math.random() * 20;

        this.animate();
    }
    animate(){
         setInterval(() =>{
            this.positionX -= 1;
        }, 1000/60);
        setInterval(() =>{
            let i = this.currentImage % this.Enemy_Walking.length;
            let path = this.Enemy_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 1000/10);
    }

    eat(){
    }
        
}