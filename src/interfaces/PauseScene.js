import { Button } from "../entities/Button.js";

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
        this.unPauseBtn = new Button(this, 600, 250, 'unpauseButton', () => {
            if (this.previousScene !== 'level-arena') {
                this.scene.setVisible(true, this.previousScene);
            } else if (this.previousScene === 'level-arena') {
                this.sceneObject.connection.setupPlayers(this.sceneObject, this.player, "unpause");
                this.scene.setVisible(true, 'level-arena');
            }
            this.scene.resume(this.previousScene);
            this.scene.stop('pause-scene');
        }).setScale(5).setInteractive();
        
        this.returnToMenu = new Button(this, 600, 390, 'returnButton', () => {
            if (this.previousScene !== 'level-arena') {
                this.scene.stop(this.previousScene);
                this.scene.start('menu-scene');
            } else if (this.previousScene === 'level-arena') {
                this.sceneObject.connection.cleanup();
                this.scene.stop('level-arena');
                this.scene.start('server-select');
            }
        }).setScale(3).setInteractive();
    }
}
