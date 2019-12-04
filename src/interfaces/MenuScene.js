import { Button } from "../entities/Button.js"

export class MenuScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"menu-scene"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);
        this.add.image(600, 150, 'title').setDisplaySize(1100, 85);

        let playButton = new Button(this, 600, 300, 'playButton', () => {
            this.scene.start('lvl-select');
        }).setScale(2).setInteractive();

        let arenabtn = new Button(this, 475, 375, 'arenabtn', () => {
            this.scene.start('name-scene');
        }).setScale(2).setInteractive();

        let tutorialBtn = new Button(this, 725, 375, 'tutorialButton', () => {
            this.scene.start('level-tutorial');
        }).setScale(2).setInteractive();

        let fullscreenButton = new Button(this, 1150, 50, 'fullscreenButton', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } 
            else {
                this.scale.startFullscreen();
                this.scale.mode = Phaser.Scale.FIT;
            }
        }).setScale(2).setInteractive();   

        this.scale.on('fullscreenunsupported', () =>
        {
            this.add.text(0, 0, "Fullscreen Unsupported Error.");
        });

        this.scale.on('enterfullscreen', () =>
        {
            this.add.text(0, 0, "Fullscreen Mode Entered Successfully.");
        });
    
        window.document.title = "A Western Story";
    }   
}