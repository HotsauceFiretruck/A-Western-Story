export class ArenaDeathScene extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key:"arena-death"});

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

        let respawn = this.add.image(600, 300, 'respawnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        respawn.on('pointerdown', () => {this.respawn()});
    }

    respawn()
    {
        this.scene.start(this.previousScene);
    }
}