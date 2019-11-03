export class PreloaderScene extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key: "preloader-scene"});
        this.PhaserGame = PhaserGame;
    }

    loadProgress()
    {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let scale = this.PhaserGame.scale;

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240 * scale, 270 * scale, 720 * scale, 50 * scale);
        
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250 * scale, 280 * scale, 700 * scale * value, 30 * scale);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    preload()
    {
        this.loadProgress();

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
        this.load.image('barrel', 'assets/Barrel.png');
        this.load.image('title', 'assets/Title.png');
        this.load.image('bg', 'assets/MenuScreen.png');
        this.load.image('playbtn', 'assets/PlayButton.png');
        this.load.image('tutorialbtn', 'assets/tutorialButton.png');
        this.load.image('nxtlvlbtn', 'assets/NextLevelBTN.png');
        this.load.image('backbtn', 'assets/BackButton.png');
        this.load.image('lvl1btn', 'assets/lvl1.png');
        this.load.image('lvl2btn', 'assets/lvl2.png');
        this.load.image('lvl3btn', 'assets/lvl3.png');
        this.load.image('lvl4btn', 'assets/lvl4.png');
        this.load.image('lvl5btn', 'assets/lvl5.png');
    }

    create()
    {
        this.scene.start('menu-scene');
    }
}