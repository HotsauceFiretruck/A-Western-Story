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

        this.testButton = this.add.sprite(600, 300, 'playbtn').setScale(.6).setInteractive();
        this.testButton2 = this.add.sprite(600, 390, 'arenabtn').setScale(.4).setInteractive();

        this.testButton.on('pointerdown', (event) => {
            console.log("Button Clicked!");
            this.scene.start('level-tutorial');
        });
        this.testButton.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.testButton.on('pointerout', function (event) {
            this.clearTint();
        })
        this.testButton2.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.testButton2.on('pointerout', function (event) {
            this.clearTint();
        })
    }

}
