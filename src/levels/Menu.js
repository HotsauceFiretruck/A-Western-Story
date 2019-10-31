export class Menu extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"menu"});
        this.PhaserGame = PhaserGame;
    }

    preload()
    {
        this.load.image('title', 'assets/title.png');
        this.load.image('bg', 'assets/menuScreen.png');
        this.load.image('playbtn', 'assets/playButton.png');
        this.load.image('arenabtn', 'assets/playArenaButton.png');
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
