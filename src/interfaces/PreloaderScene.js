export class PreloaderScene extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key: "preloader-scene"});
        this.PhaserGame = PhaserGame;
    }

    preload()
    {
        if(this.PhaserGame.isMobile)
        {
            this.load.image('thumb', 'assets/JoystickThumb.png');
            this.load.image('base', 'assets/JoystickBase.png');
            this.load.image('gunbase', 'assets/JoystickGunBase.png');
            this.load.image('jump', 'assets/JumpButton.png');
        }
        this.load.image('background', 'assets/Background.png');
        this.load.image('background2', 'assets/Background2.png');
        this.load.image('grass', 'assets/Grass.png');
        this.load.image('sand', 'assets/Sand.png');
        this.load.image('player', 'assets/Player.png');
        this.load.image('bullet', 'assets/Bullet.png');
        this.load.image('house', 'assets/House.png');
        this.load.image('enemy', 'assets/Outlaw.png');
        this.load.spritesheet('hearts', 'assets/Hearts.png',  {frameWidth: 50/3, frameHeight: 16});
        this.load.image('sun', 'assets/Sun1.png');
        this.load.image('cloud', 'assets/Cloud.png');
        this.load.image('sheriff', 'assets/Sheriff.png');
        this.load.audio('cartheftmusic', 'assets/CarTheft.mp3');
        this.load.image('cactus', 'assets/Cactus.png');
        this.load.image('crate', 'assets/Crate.png');
        this.load.image('deadtree', 'assets/DeadTree.png');
        this.load.image('title', 'assets/Title.png');
        this.load.image('bg', 'assets/MenuScreen.png');
        this.load.image('playbtn', 'assets/PlayButton.png');
        this.load.image('arenabtn', 'assets/PlayArenaButton.png');
        this.load.image('nxtlvlbtn', 'assets/NextLevelBTN.png');
        this.load.image('healthbarback', 'assets/BossHealthBarBackground.png');
        this.load.image('healthbarfront', 'assets/BossHealthBar.png');
    }

    create()
    {
        this.scene.start('menu-scene');
    }
}