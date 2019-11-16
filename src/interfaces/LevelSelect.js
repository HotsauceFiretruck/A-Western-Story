export class LevelSelect extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"lvl-select"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        let scale = this.PhaserGame.scale;

        this.add.image(600 * scale, 300 * scale, 'bg').setDisplaySize(1200 * scale, 600 * scale);

        // Creating buttons on screen
        this.lvl1Button = this.add.sprite(300 * scale, 300 * scale, 'lvl1Button').setScale(4 * scale).setInteractive();
        this.lvl2Button = this.add.sprite(450 * scale, 300 * scale, 'lvl2Button').setScale(4 * scale).setInteractive();
        this.lvl3Button = this.add.sprite(600 * scale, 300 * scale, 'lvl3Button').setScale(4 * scale).setInteractive();
        this.lvl4Button = this.add.sprite(750 * scale, 300 * scale, 'lvl4Button').setScale(4 * scale).setInteractive();
        this.lvl5Button = this.add.sprite(900 * scale, 300 * scale, 'lvl5Button').setScale(4 * scale).setInteractive();
        this.backButton = this.add.sprite(350 * scale, 75 * scale, 'backButton').setScale(2 * scale).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        this.lvl1Button.on('pointerdown', (event) => {
            document.getElementById('menuMusic').pause();
            this.scene.start('level-1');
        });
        this.lvl1Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl1Button.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl2Button.on('pointerdown', (event) => {
            document.getElementById('menuMusic').pause();
            this.scene.start('level-2');
        });
        this.lvl2Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl2Button.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl3Button.on('pointerdown', (event) => {
            document.getElementById('menuMusic').pause();
            this.scene.start('level-3');
        });
        this.lvl3Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl3Button.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl4Button.on('pointerdown', (event) => {
            document.getElementById('menuMusic').pause();
            this.scene.start('level-4');
        });
        this.lvl4Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl4Button.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl5Button.on('pointerdown', (event) => {
            document.getElementById('menuMusic').pause();
            console.log("Button Clicked!");
            this.scene.start('level-5');
        });
        this.lvl5Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl5Button.on('pointerout', function (event) {
            this.clearTint();
        });

        this.backButton.on('pointerdown', (event) => {
            this.scene.start('menu-scene');
        });
        this.backButton.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.backButton.on('pointerout', function (event) {
            this.clearTint();
        });
    }

}
