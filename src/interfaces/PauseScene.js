export class PauseScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"pause-scene"});
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
        this.pauseScreen = this.add.image(600, 300, 'death').setDisplaySize(1200, 600);
        this.unPauseBtn = this.add.image(600, 250, 'unpauseButton').setScale(5).setInteractive();
        this.unPauseBtn.on('pointerdown',  () => {
            if (this.previousScene !== 'level-arena') {
                this.scene.setVisible(true, this.previousScene);
            } else if (this.previousScene === 'level-arena') {
                this.sceneObject.connection.setupPlayers(this.sceneObject, this.player, "unpause");
                this.scene.setVisible(true, 'level-arena');
            }
            this.scene.resume(this.previousScene);
            this.scene.stop('pause-scene');
        });

        // Functions to tint the buttons on hover to look nice. :)
        this.unPauseBtn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.unPauseBtn.on('pointerout', function (event) {
            this.clearTint();
        });
        
        this.returnToMenu = this.add.image(600, 390, 'returnButton').setDisplaySize(360, 90).setInteractive();
        this.returnToMenu.on('pointerdown', () => {
            if (this.previousScene !== 'level-arena') {
                this.scene.stop(this.previousScene);
                this.scene.start('menu-scene');
            } else if (this.previousScene === 'level-arena') {
                this.sceneObject.connection.cleanup();
                this.scene.stop('level-arena');
                this.scene.start('server-select');
            }
        });
        
        this.returnToMenu.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.returnToMenu.on('pointerout', function (event) {
            this.clearTint();
        });
    }
}
