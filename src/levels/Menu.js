export class Menu extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"menu"});
        this.PhaserGame = PhaserGame;
    }

    preload()
    {
        this.load.image('bg', 'assets/newBG.png');
        this.load.image('grass', 'assets/Grass2.png');
    }

    create()
    {
        this.add.image(512, 290, 'bg').setScale(4);
        this.add.image(1536, 290, 'bg').setScale(4);

        this.testButton = this.add.sprite(200, 250, 'grass').setInteractive();
        this.testButton.on('pointerdown', (event) => {
            console.log("Button Clicked!");
            this.scene.start('level-tutorial');
        });
        this.testButton.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.testButton.on('pointerover', function (event) {
            this.clearTint();
        })
    }

}
