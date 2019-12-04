export class BonusLevelSelect extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"bonuslvl-select"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.add.image(600, 300, 'bg').setDisplaySize(1200, 600);

        // Creating buttons on screen
        this.lvl1Button = this.add.sprite(600, 300, 'lvl1Button').setScale(4).setInteractive();

        // Adding functionality to buttons. Like click events and color change on hover.
        this.lvl1Button.on('pointerdown', (event) => {
            //document.getElementById('menuMusic').pause();
            this.scene.start('bonuslevel-1');
        });
        this.lvl1Button.on('pointerover', function (event) {
            this.setTint(616161);
        });
        this.lvl1Button.on('pointerout', function (event) {
            this.clearTint();
        });

        window.document.title = "A Western Story - Campaign";
    }
}