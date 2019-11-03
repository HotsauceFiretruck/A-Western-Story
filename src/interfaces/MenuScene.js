export class MenuScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"menu-scene"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setScale(.4);
        this.add.image(600,200, 'title').setScale(.5);

        this.playbtn = this.add.sprite(600, 300, 'playbtn').setScale(.4).setInteractive();
        this.tutorialBtn = this.add.sprite(600, 390, 'tutorialbtn').setScale(.3).setInteractive();

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
