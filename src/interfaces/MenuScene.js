export class MenuScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"menu-scene"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        let scale = this.PhaserGame.scale;

        this.add.image(600 * scale, 300 * scale, 'bg').setDisplaySize(1200 * scale, 600 * scale);
        this.add.image(600 * scale, 150 * scale, 'title').setDisplaySize(1100 * scale, 85 * scale);

        this.playButton = this.add.sprite(600 * scale, 300 * scale, 'playButton').setScale(2 * scale).setInteractive();
        this.tutorialBtn = this.add.sprite(600 * scale, 390 * scale, 'tutorialButton').setScale(2 * scale).setInteractive();

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
