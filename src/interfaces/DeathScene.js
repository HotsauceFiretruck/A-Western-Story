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

    create()
    {
        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        let returnToMenu = this.add.image(600, 370, 'returnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        returnToMenu.on('pointerdown', () => {this.scene.start('menu-scene');});

        let respawn = this.add.image(600, 230, 'respawnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        respawn.on('pointerdown', () => {this.respawn()});
    }

    respawn()
    {
        this.scene.start(this.previousScene);
    }
}