export class LevelSelect extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"lvl-select"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setScale(.4);

        // Creating buttons on screen
        this.lvl1Btn = this.add.sprite(300, 300, 'lvl1btn').setScale(.4).setInteractive();
        this.lvl2Btn = this.add.sprite(450, 300, 'lvl2btn').setScale(.4).setInteractive();
        this.lvl3Btn = this.add.sprite(600, 300, 'lvl3btn').setScale(.4).setInteractive();
        this.lvl4Btn = this.add.sprite(750, 300, 'lvl4btn').setScale(.4).setInteractive();
        this.lvl5Btn = this.add.sprite(900, 300, 'lvl5btn').setScale(.4).setInteractive();
        this.backBtn = this.add.sprite(350, 75, 'backbtn').setScale(.35).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        this.lvl1Btn.on('pointerdown', (event) => {
            console.log("Button Clicked!");
            this.scene.start('level-1');
        });
        this.lvl1Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl1Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl2Btn.on('pointerdown', (event) => {
            console.log("Button Clicked!");
            this.scene.start('level-2');
        });
        this.lvl2Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl2Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl3Btn.on('pointerdown', (event) => {
            console.log("Button Clicked!");
            this.scene.start('level-3');
        });
        this.lvl3Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl3Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl4Btn.on('pointerdown', (event) => {
            console.log("Button Clicked!");
            this.scene.start('level-4');
        });
        this.lvl4Btn.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl4Btn.on('pointerout', function (event) {
            this.clearTint();
        });

        this.lvl5Btn.on('pointerdown', (event) => {
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
