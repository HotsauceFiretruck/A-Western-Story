import { Button } from "../entities/Button.js";
import UI from "../components/UI.js";

export class NameScene extends Phaser.Scene {
    constructor(connection) {
        super({ key: "name-scene" });
        this.connection = connection;
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // on resize listener
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            let scale = displaySize.width / gameSize.width;
            this.scaleBox(scale);
        });;

        const data = { text: '' };
        const background = this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x577e7f);
        const titleField = this.add.text(0, 0, 'Enter your username here', { font: "24px Arial" });
        const usernameField = UI.createTextInput(this, 200, "", data);

        this.rexUI.add.sizer({
            orientation: 'y',
            x: 600,
            y: 250
        })
            .addBackground(background)
            .add(titleField, 0, 'center', { top: 30, bottom: 30, left: 20, right: 20 }, false)
            .add(usernameField, 0, 'left', { bottom: 10, left: 20, right: 20 }, true)
            .layout()
            .popUp(500);

        // Creating buttons on screen
        let playBtn = new Button(this, 600, 400, 'playButton', () => {
            this.connection.setUsername(data.text.trim());
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