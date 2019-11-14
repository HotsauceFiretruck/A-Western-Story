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
        this.lvl1Btn = this.add.sprite(300 * scale, 300 * scale, 'lvl1btn').setScale(4 * scale).setInteractive();
        this.lvl2Btn = this.add.sprite(450 * scale, 300 * scale, 'lvl2btn').setScale(4 * scale).setInteractive();
        this.lvl3Btn = this.add.sprite(600 * scale, 300 * scale, 'lvl3btn').setScale(4 * scale).setInteractive();
        this.lvl4Btn = this.add.sprite(750 * scale, 300 * scale, 'lvl4btn').setScale(4 * scale).setInteractive();
        this.lvl5Btn = this.add.sprite(900 * scale, 300 * scale, 'lvl5btn').setScale(4 * scale).setInteractive();
        this.backBtn = this.add.sprite(350 * scale, 75 * scale, 'backbtn').setScale(2 * scale).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        this.lvl1Btn.on('pointerdown', (event) => {
            //document.getElementById('menuMusic').pause();
            this.scene.start('level-1');
        });
        this.lvl1Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl1Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl2Btn.on('pointerdown', (event) => {
            //document.getElementById('menuMusic').pause();
            this.scene.start('level-2');
        });
        this.lvl2Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl2Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl3Btn.on('pointerdown', (event) => {
            //document.getElementById('menuMusic').pause();
            this.scene.start('level-3');
        });
        this.lvl3Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl3Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl4Btn.on('pointerdown', (event) => {
            //document.getElementById('menuMusic').pause();
            this.scene.start('level-4');
        });
        this.lvl4Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl4Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl5Btn.on('pointerdown', (event) => {
            //document.getElementById('menuMusic').pause();
            console.log("Button Clicked!");
            this.scene.start('level-5');
        });
        this.lvl5Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl5Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.backBtn.on('pointerdown', (event) => {
            this.scene.start('menu-scene');
        });
        this.backBtn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.backBtn.on('pointerout', function (event) {
            this.clearTint();
        });
    }

}
