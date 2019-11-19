export class PauseScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"pause-scene"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        let scale = this.PhaserGame.scale;

        this.pauseScreen = this.add.image(600 * scale, 300 * scale, 'death').setDisplaySize(1200 * scale, 600 * scale);
        this.unPauseBtn = this.add.image(600 * scale, 250 * scale, 'unpauseBtn').setScale(5 * scale).setInteractive();
        this.unPauseBtn.on('pointerdown', function (event) {
            this.scene.pause();
            this.scene.resume('level-4');
        });

        // Functions to tint the buttons on hover to look nice. :)
        this.unPauseBtn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.unPauseBtn.on('pointerout', function (event) {
            this.clearTint();
        });
        
        this.returnToMenu = this.add.image(600, 390, 'returnButton')
                        .setDisplaySize(360, 90)
                        .setInteractive();
        this.returnToMenu.on('pointerdown', () => {
            this.scene.stop('level-4');
            this.scene.start('menu-scene');
        });
        
        this.returnToMenu.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.returnToMenu.on('pointerout', function (event) {
            this.clearTint();
        });
    }
}
