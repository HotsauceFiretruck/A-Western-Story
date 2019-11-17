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
        let scale = this.PhaserGame.scale;

        this.add.image(600 * scale, 300 * scale, 'death').setDisplaySize(1200 * scale, 600 * scale);

        this.returnToMenu = this.add.image(600 * scale, 370 * scale, 'returnButton')
                        .setDisplaySize(360 * scale, 90 * scale)
                        .setInteractive();
        this.returnToMenu.on('pointerdown', () => {this.scene.start('menu-scene');});
        this.returnToMenu.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.returnToMenu.on('pointerout', function (event) {
            this.clearTint();
        });

        this.respawn = this.add.image(600 * scale, 230 * scale, 'respawnButton')
                        .setDisplaySize(360 * scale, 90 * scale)
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