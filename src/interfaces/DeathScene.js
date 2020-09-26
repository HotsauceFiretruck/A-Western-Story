import { Button } from "../entities/Button.js";

export class DeathScene extends Phaser.Scene {
    constructor() {
        super({ key: "death-scene" });
        this.previousScene = null;
    }

    init(data) {
        this.previousScene = data.scene;
        this.player = data.player;
        this.sceneObject = data.sceneObject;
    }

    create() {
        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        let returnToMenu = new Button(this, 600, 370, 'returnButton', () => {
            if (this.previousScene !== 'level-arena') {
                this.scene.stop(this.previousScene);
                this.scene.start('menu-scene');
            } else if (this.previousScene === 'level-arena') {
                this.sceneObject.connection.cleanup();
                this.scene.stop('level-arena');
                this.scene.start('server-select');
            }
        }).setScale(3).setInteractive();

        let respawn = new Button(this, 600, 230, 'respawnButton', () => {
            this.respawn()
        }).setScale(3).setInteractive();
    }

    respawn() {
        this.scene.start(this.previousScene);
    }
}
