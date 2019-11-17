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

        this.playButton = this.add.sprite(600, 300, 'playButton').setScale(2).setInteractive();
        this.tutorialBtn = this.add.sprite(600, 390, 'tutorialButton').setScale(2).setInteractive();

        this.playButton.on('pointerdown', (event) => {
            this.scene.start('lvl-select');
        });
        this.playButton.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.playButton.on('pointerout', function (event) {
            this.clearTint();
        })

        this.tutorialBtn.on('pointerdown', (event) => { 
            document.getElementById('menuMusic').pause();
            this.scene.start('level-tutorial');
        })
        this.tutorialBtn.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.tutorialBtn.on('pointerout', function (event) {
            this.clearTint();
        })
    }

}
