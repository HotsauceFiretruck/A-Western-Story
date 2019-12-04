export class Button
{
    /* scene: The scene to add the button to
        x: The x position of the button
        y: The y position of the button
        image: The image to load
        func: The function the run when the button is pressed
    */

    constructor(scene, x, y, image, func) {
        this.sprite = scene.add.sprite(x, y, image);

        // Variable used to only run pointerup function if pointer went down before that
        this.pointerWentDown = false;
        this.func = func;

        this.addListeners();
    }

    setScale(scale) {
        this.sprite.setScale(scale);
        return this;
    }

    setInteractive(state) {
        if (state === undefined)
            this.sprite.setInteractive();
        else if (state)
            this.sprite.setInteractive();
        else
            this.sprite.disableInteractive();

        return this;
    }

    setScrollFactor(x, y) {
        this.sprite.setScrollFactor(x, y);
    }

    addListeners() {
        let DARK_TINT = 8627623;
        let SLIGHT_TINT = 11592420;

        this.sprite.on('pointerup', () => { 
            if (this.pointerWentDown) {
                this.pointerWentDown = false;

                // Call the function specified when pointer is lifted
                this.func();
            }
        });
        this.sprite.on('pointerdown', () => { 
            this.pointerWentDown = true;

            // Darker tint when pressed
            this.sprite.setTint(DARK_TINT);
        });
        this.sprite.on('pointerover', () => {
            // Slight tint when hovering
            if (this.pointerWentDown) 
                this.sprite.setTint(DARK_TINT);
            else 
                this.sprite.setTint(SLIGHT_TINT);
        });
        this.sprite.on('pointerout', () => {
            this.sprite.clearTint();
        });
    }
}