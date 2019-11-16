import { Connection } from "../components/Connection.js";

export class ServerSelect extends Phaser.Scene {
    constructor(PhaserGame, connection)
    {
        super({key:"server-select"});
        this.PhaserGame = PhaserGame;

        this.connection = connection;
    }

    create()
    {
        let scale = this.PhaserGame.scale;

        this.add.image(600 * scale, 300 * scale, 'bg').setDisplaySize(1200 * scale, 600 * scale);

        // Creating buttons on screen
        this.lvl1Btn = this.add.sprite(300 * scale, 300 * scale, 'svr1btn').setScale(2 * scale).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        this.lvl1Btn.on('pointerdown', (event) => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("http://127.0.0.1:3000");
            this.scene.start('level-arena');
        });
        this.lvl1Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl1Btn.on('pointerout', function (event) {
            this.clearTint();
        });
    }

    getServer() {
        return this.connection;
    }
}
