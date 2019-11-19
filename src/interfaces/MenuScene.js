export class MenuScene extends Phaser.Scene {
    constructor(PhaserGame)
    {
        super({key:"menu-scene"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        let scale = this.PhaserGame.scale;

        this.add.image(600 * scale, 300 * scale, 'bg').setDisplaySize(1200 * scale, 600 * scale);
        this.add.image(600 * scale, 150 * scale, 'title').setDisplaySize(1100 * scale, 85 * scale);

        this.playbtn = this.add.sprite(600 * scale, 300 * scale, 'playbtn').setScale(2 * scale).setInteractive();
        this.arenabtn = this.add.sprite(475 * scale, 375 * scale, 'arenabtn').setScale(2 * scale).setInteractive();
        this.tutorialBtn = this.add.sprite(725 * scale, 375 * scale, 'tutorialbtn').setScale(2 * scale).setInteractive();

        this.playbtn.on('pointerdown', (event) => {
            this.scene.start('lvl-select');
        });
        this.playbtn.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.playbtn.on('pointerout', function (event) {
            this.clearTint();
        })

        this.arenabtn.on('pointerdown', (event) => {
            location.assign("https://a-western-story.js.org/arena.html");
        });
        this.arenabtn.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.arenabtn.on('pointerout', function (event) {
            this.clearTint();
        })

        this.tutorialBtn.on('pointerdown', (event) => { 
            document.getElementById('menuMusic').pause();
            this.scene.start('level-tutorial');
        })
        this.tutorialBtn.on('pointerover', function (event) {
            this.setTint(616161);
        })
        this.tutorialBtn.on('pointerout', function (event) {
            this.clearTint();
        })
    }

}
