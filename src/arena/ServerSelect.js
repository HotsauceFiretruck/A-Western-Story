import { Connection } from "./Connection.js";
import { Button } from "../entities/Button.js";

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
        this.svr1Btn = new Button(this, 300, 200, 'svr1btn', () => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("https://western-server.herokuapp.com");
            this.scene.start('level-arena');
        }).setScale(2).setInteractive();

        this.svr2Btn = new Button(this, 600, 200, 'svr2btn', () => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("https://western-server2.herokuapp.com");
            this.scene.start('level-arena');
        }).setScale(2).setInteractive();

        this.svr3Btn = new Button(this, 900, 200, 'svr3btn', () => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("https://western-server3.herokuapp.com");
            this.scene.start('level-arena');
        }).setScale(2).setInteractive();

        this.svr4Btn = new Button(this, 450, 275, 'svr4btn', () => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("https://western-server4.herokuapp.com");
            this.scene.start('level-arena');
        }).setScale(2).setInteractive();

        this.svr5Btn = new Button(this, 750, 275, 'svr5btn', () => {
            //Set the server IP based on the button & start the level
            this.connection.setServer("https://western-server5.herokuapp.com");
            this.scene.start('level-arena');
        }).setScale(2).setInteractive();

        this.returnBtn = new Button(this, 600, 425, 'returnButton', () => {
            this.scene.start('menu-scene');
        }).setScale(2).setInteractive();

    }

    getServer() {
        return this.connection;
    }
}