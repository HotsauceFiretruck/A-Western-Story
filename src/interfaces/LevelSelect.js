export class LevelSelect extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"lvl-select"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // Creating buttons on screen
        this.lvl1Button = this.add.sprite(300, 300, 'lvl1Button').setScale(4).setInteractive();
        this.lvl2Button = this.add.sprite(450, 300, 'lvl2Button').setScale(4).setInteractive();
        this.lvl3Button = this.add.sprite(600, 300, 'lvl3Button').setScale(4).setInteractive();
        this.lvl4Button = this.add.sprite(750, 300, 'lvl4Button').setScale(4).setInteractive();
        this.lvl5Button = this.add.sprite(900, 300, 'lvl5Button').setScale(4).setInteractive();
        this.backButton = this.add.sprite(350, 75, 'backButton').setScale(2).setInteractive();

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
            this.setTint(616161);
            console.log("Button Clicked!");
            this.scene.start('level-5');
        });
        this.lvl5Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl5Button.on('pointerout', function (event) {
            //this.clearTint();
        });

        this.backButton.on('pointerdown', (event) => {
            this.scene.start('menu-scene');
            this.setTint(616161);
        });
        this.backButton.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.backButton.on('pointerout', function (event) {
            //this.clearTint();
        });
    }

}
