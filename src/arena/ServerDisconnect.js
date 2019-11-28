export class ServerDisconnect extends Phaser.Scene {
    constructor(PhaserGame, connection)
    {
        super({key:"server-disconnect"});
        this.PhaserGame = PhaserGame;
        this.connection = connection;
        this.previousScene = null;
        this.previousKey = null;
    }

    init(data)
    {
        this.previousKey = data.key;
        this.previousScene = data.scene;
        this.errorMessage = data.message;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // Creating buttons on screen
        this.text = this.createText(this, 600, 300, "Generic disconnect", "#000");
        let returnBtn = this.add.sprite(600, 400, 'returnButton').setScale(2).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        returnBtn.on('pointerdown', (event) => {
            this.connection.cleanup();
            //Start the select screen
            this.scene.start('server-select');
        });
        returnBtn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        returnBtn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.text.text = this.errorMessage;
        this.add.existing(this.text);
    }

    createText(scene, x, y, text, color) {
        let textObject = null;
        if (color !== undefined) {
            textObject = new Phaser.GameObjects.Text(scene, x, y, text, {
                fontSize: '24px',
                fill: color,
                align: 'center'
            }).setOrigin(0.5);
        }
        else {
            textObject = new Phaser.GameObjects.Text(scene, x, y, text, {
                fontSize: '24px',
                fill: '#FFF',
                align: 'center'
            }).setOrigin(0.5);
        }
        return textObject;
    }
}