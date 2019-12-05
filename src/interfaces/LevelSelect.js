import { Button } from "../entities/Button.js"

export class LevelSelect extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"lvl-select"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // Creating buttons on screen
        this.lvl1Button = new Button(this, 300, 300, 'lvl1Button', () => {
            this.scene.start('level-1');
        }).setScale(4).setInteractive();

        this.lvl2Button = new Button(this, 450, 300, 'lvl2Button', () => {
            this.scene.start('level-2');
        }).setScale(4).setInteractive();

        this.lvl3Button = new Button(this, 600, 300, 'lvl3Button', () => {
            this.scene.start('level-3');
        }).setScale(4).setInteractive();

        this.lvl4Button = new Button(this, 750, 300, 'lvl4Button', () => {
            this.scene.start('level-4');
        }).setScale(4).setInteractive();

        this.lvl5Button = new Button(this, 900, 300, 'lvl5Button', () => {
            this.scene.start('level-5');
        }).setScale(4).setInteractive();

        this.backButton = new Button(this, 350, 75, 'backButton', () => {
            this.scene.start('menu-scene');
        }).setScale(2).setInteractive();

        window.document.title = "A Western Story - Campaign";
    }
}
