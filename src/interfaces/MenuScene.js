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

        let fullscreenButton = this.add.image(1150, 50, 'fullscreenButton').setScale(2).setInteractive();
        let playButton = this.add.sprite(475, 300, 'playButton').setScale(2).setInteractive();
        let tutorialBtn = this.add.sprite(725, 375, 'tutorialButton').setScale(2).setInteractive();
        let arenabtn = this.add.sprite(475, 375, 'arenabtn').setScale(2).setInteractive();
        let bonusButton = this.add.sprite(725, 300, 'bonusButton').setScale(2).setInteractive();

        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } 
            else {
                this.scale.startFullscreen();
                this.scale.mode = Phaser.Scale.FIT;
            }
        });       

        this.scale.on('fullscreenunsupported', () =>
        {
            this.add.text(0, 0, "Fullscreen Unsupported Error.");
        });

        this.scale.on('enterfullscreen', () =>
        {
            this.add.text(0, 0, "Fullscreen Mode Entered Successfully.");
        });

        fullscreenButton.on('pointerover', function (event) {
            this.setTint(616161);
        });
        fullscreenButton.on('pointerout', function (event) {
            this.clearTint();
        });

        playButton.on('pointerdown', () => {
            this.scene.start('lvl-select');
        });
        playButton.on('pointerover', function (event) {
            this.setTint(616161);
        });
        playButton.on('pointerout', function (event) {
            this.clearTint();
        });

        arenabtn.on('pointerdown', (event) => {
            this.scene.start('name-scene');
        });
        arenabtn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        arenabtn.on('pointerout', function (event) {
            this.clearTint();
        });

        tutorialBtn.on('pointerdown', (event) => { 
            this.scene.start('level-tutorial');
        });
        tutorialBtn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        tutorialBtn.on('pointerout', function (event) {
            this.clearTint();
        });

        bonusButton.on('pointerdown', (event) => {
            this.scene.start('bonuslvl-select');
        })
        bonusButton.on('pointerover', function (event) {
            this.setTint(616161);
        })
        bonusButton.on('pointerout', function (event) {
            this.clearTint();
        })
    
        window.document.title = "A Western Story";
    }   
}