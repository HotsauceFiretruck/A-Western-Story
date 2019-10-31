export class DeathScene extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key:"death-scene"});

        this.PhaserGame = PhaserGame;
    }

    preload()
    {
        
        this.load.image('death', 'assets/gameOver.png');
        
    }

    create()
    {
        this.add.image(600, 300, 'death').setDisplaySize(1200, 600);

        
    }
}