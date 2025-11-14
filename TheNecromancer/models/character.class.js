class Character extends Model {

    Character_Walking = [
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
            'TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_000.png',
    ];

    currentImage = 0;

    constructor(){
        super().loadImage('TheNecromancer\\img\\character\\Walking\\0_Necromancer_of_the_Shadow_Walking_000.png');
        this.loadImages(this.Character_Walking);

        this.animate();
    }

    animate(){
        setInterval(() =>{
            let i = this.currentImage % this.Character_Walking.length;
            let path = this.Character_Walking[i];
            this.img = this.walkingImages[path];
            this.currentImage++;
        }, 100);

    }

    jump(){
    }

}