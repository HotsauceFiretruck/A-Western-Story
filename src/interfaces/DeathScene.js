export class DeathScene extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key:"death-scene"});

        this.PhaserGame = PhaserGame;

        this.previousScene = null;
    }

    init(data)
    {
        this.previousScene = data.scene;
    }

    preload()
    {
        this.load.image('death', 'assets/gameOver.png');
        this.load.image('returnButton', 'assets/ReturnToMenuButton.png');
        this.load.image('respawnButton', 'assets/RespawnButton.png');
    }

    create()
    {
        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        let returnToMenu = this.add.image(600, 370, 'returnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        returnToMenu.on('pointerdown', () => {this.returnToMenu()});

        let respawn = this.add.image(600, 230, 'respawnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        respawn.on('pointerdown', () => {this.respawn()});
    }

    returnToMenu()
    {
        //Add menu
    }

    respawn()
    {
        this.scene.start(this.previousScene);
    }
}