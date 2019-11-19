export class PauseScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"pause-scene"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.pauseScreen = this.add.image(600, 300, 'death').setDisplaySize(1200, 600);
        this.unPauseBtn = this.add.image(600, 250, 'unpauseButton').setScale(5).setInteractive();
        this.unPauseBtn.on('pointerdown',  () => {
            this.scene.switch('level-4');
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
