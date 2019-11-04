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
        let scale = this.PhaserGame.scale;

        this.add.image(600 * scale, 300 * scale, 'death').setDisplaySize(1200 * scale, 600 * scale);

        let returnToMenu = this.add.image(600 * scale, 370 * scale, 'returnButton')
                        .setDisplaySize(360 * scale, 90 * scale)
                        .setInteractive();
        returnToMenu.on('pointerdown', () => {this.scene.start('menu-scene');});

        let respawn = this.add.image(600 * scale, 230 * scale, 'respawnButton')
                        .setDisplaySize(360 * scale, 90 * scale)
                        .setInteractive();
        respawn.on('pointerdown', () => {this.respawn()});
    }

    respawn()
    {
        this.scene.start(this.previousScene);
    }
}