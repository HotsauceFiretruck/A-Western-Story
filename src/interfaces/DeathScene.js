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
        this.player = data.player;
        this.sceneObject = data.sceneObject;
    }

    create()
    {
        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        let returnToMenu = this.add.image(600, 370, 'returnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        returnToMenu.on('pointerdown', () => {
            if (this.previousScene !== 'level-arena') {
                this.scene.stop(this.previousScene);
                this.scene.start('menu-scene');
            } else if (this.previousScene === 'level-arena') {
                this.sceneObject.connection.cleanup();
                this.scene.stop('level-arena');
                this.scene.start('server-select');
            }
        });
        returnToMenu.on('pointerover', function (event) {
            this.setTint(616161);
        });
        returnToMenu.on('pointerout', function (event) {
            this.clearTint();
        });

        let respawn = this.add.image(600, 230, 'respawnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        respawn.on('pointerdown', () => {this.respawn()});
        respawn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        respawn.on('pointerout', function (event) {
            this.clearTint();
        });
    }

    respawn()
    {
        this.scene.start(this.previousScene);
    }
}
