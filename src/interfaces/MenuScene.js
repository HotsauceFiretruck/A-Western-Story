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
        this.add.image(600 * scale, 150 * scale, 'title').setDisplaySize(900 * scale, 100 * scale);

        this.playbtn = this.add.sprite(600 * scale, 300 * scale, 'playbtn').setScale(.4 * scale).setInteractive();
        this.tutorialBtn = this.add.sprite(600 * scale, 390 * scale, 'tutorialbtn').setScale(.3 * scale).setInteractive();

        this.playbtn.on('pointerdown', (event) => {
            this.scene.start('lvl-select');
        });
        this.playbtn.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.playbtn.on('pointerout', function (event) {
            this.clearTint();
        })

        this.tutorialBtn.on('pointerdown', (event) => { 
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
