import { Button } from "../entities/Button.js";

export class NameScene extends Phaser.Scene {
    constructor(connection) {
        super({ key: "name-scene" });
        this.connection = connection;
    }

    create() {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // on resize listener
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            let scale = displaySize.width / gameSize.width;
            this.scaleBox(scale);
        });;

        // initial scale & values
        let box = document.getElementById('input-box');
        box.style.display = 'block';
        let scale = this.game.scale.displaySize.width / this.game.scale.gameSize.width;
        this.scaleBox(scale);

        // Creating buttons on screen
        let playBtn = new Button(this, 600, 400, 'playButton', () => {
            //Hide the name box
            document.getElementById('input-box').style.display = 'none';
            //Set the player name
            let username = document.getElementsByName('username')[0].value;
            this.connection.setUsername(username.trim());
            //Start the select screen
            this.scene.start('server-select');
        }).setScale(2).setInteractive();

        window.document.title = "A Western Story - Arena";
    }

    scaleBox(scale) {
        let box = document.getElementById('input-box')
        if (box) {
            box.style.transform = `scale(${scale})`
            box.style.transformOrigin = 'top left'
            box.style.top = `${this.game.canvas.offsetTop + this.scale.displaySize.height / 2 - (250 / 2) * scale}px`
            box.style.left = `${this.game.canvas.offsetLeft + this.scale.displaySize.width / 2 - (300 / 2) * scale}px`
        }
    }
}