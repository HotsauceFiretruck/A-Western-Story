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

        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        this.returnToMenu = this.add.image(600, 370, 'returnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        this.returnToMenu.on('pointerdown', () => {this.scene.start('menu-scene');});
        this.returnToMenu.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.returnToMenu.on('pointerout', function (event) {
            this.clearTint();
        });

        this.respawn = this.add.image(600, 230, 'respawnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        this.respawn.on('pointerdown', () => {this.respawn()});
        this.respawn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.respawn.on('pointerout', function (event) {
            this.clearTint();
        });
    }

    respawn()
    {
        this.scene.start(this.previousScene);
    }
}