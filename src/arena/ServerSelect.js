import { Connection } from "./Connection.js";

export class ServerSelect extends Phaser.Scene {
    constructor(PhaserGame, connection)
    {
        super({key:"server-select"});
        this.PhaserGame = PhaserGame;

        this.connection = connection;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // Creating buttons on screen
        this.svr1Btn = this.add.sprite(600, 100, 'svr1btn').setScale(2).setInteractive();
        this.svr2Btn = this.add.sprite(600, 200, 'svr2btn').setScale(2).setInteractive();
        this.svr3Btn = this.add.sprite(600, 300, 'svr3btn').setScale(2).setInteractive();
        this.svr4Btn = this.add.sprite(600, 400, 'svr4btn').setScale(2).setInteractive();
        this.svr5Btn = this.add.sprite(600, 500, 'svr5btn').setScale(2).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        this.svr1Btn.on('pointerdown', (event) => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("http://127.0.0.1:3000");
            this.scene.start('level-arena');
        });
        this.svr1Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.svr1Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.svr2Btn.on('pointerdown', (event) => {
            this.connection.setServer("https://western-server2.herokuapp.com");
            this.scene.start('level-arena');
        });
        this.svr2Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.svr2Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.svr3Btn.on('pointerdown', (event) => {
            this.connection.setServer("https://western-server3.herokuapp.com");
            this.scene.start('level-arena');
        });
        this.svr3Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.svr3Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.svr4Btn.on('pointerdown', (event) => {
            this.connection.setServer("https://western-server4.herokuapp.com");
            this.scene.start('level-arena');
        });
        this.svr4Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.svr4Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.svr5Btn.on('pointerdown', (event) => {
            this.connection.setServer("https://western-server5.herokuapp.com");
            this.scene.start('level-arena');
        });
        this.svr5Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.svr5Btn.on('pointerout', function (event) {
            this.clearTint();
        });
    }

    getServer() {
        return this.connection;
    }
}