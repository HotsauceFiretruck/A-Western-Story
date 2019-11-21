export class PreloaderArena extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key: "preloader-arena"});
        this.PhaserGame = PhaserGame;
    }

    loadProgress()
    {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 720, 50);
        
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
            progressBar.fillRect(250, 280, 700 * value, 30);
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
        this.load.image('background2', 'assets/Background2.png');
        this.load.image('sand', 'assets/Sand.png');
        this.load.image('sand2', 'assets/Sand2.png');
        this.load.image('player', 'assets/Player.png');
        this.load.image('bullet', 'assets/Bullet.png');
        this.load.image('sun', 'assets/Sun1.png');
        this.load.image('cloud', 'assets/Cloud.png');
        this.load.image('cactus', 'assets/Cactus.png');
        this.load.image('crate', 'assets/Crate.png');
        this.load.image('deadtree', 'assets/DeadTree.png');
        this.load.image('barrel', 'assets/Barrel.png');
        this.load.image('title', 'assets/Title.PNG');
        this.load.image('bg', 'assets/MenuScreen.png');
        this.load.image('playbtn', 'assets/PlayButton.png');
        this.load.image('backbtn', 'assets/BackButton.png');
        this.load.image('dialogbg', 'assets/DialogBackground.png');
        this.load.image('death', 'assets/GameOver.png');
        this.load.image('returnButton', 'assets/ReturnToMenuButton.png');
        this.load.image('respawnButton', 'assets/RespawnButton.png');
        this.load.image('svr1btn', 'assets/Server1Button.png');
        this.load.image('svr2btn', 'assets/Server2Button.png');
        this.load.image('svr3btn', 'assets/Server3Button.png');
        this.load.image('svr4btn', 'assets/Server4Button.png');
        this.load.image('svr5btn', 'assets/Server5Button.png');
        this.load.image('pauseButton', 'assets/PauseButton.png');
        this.load.image('unpauseButton', 'assets/UnpauseButton.png');
        this.load.image('returnButton', 'assets/ReturnToMenuButton.png');
        this.load.spritesheet('dialogoptions', 'assets/OptionNumbers.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('hearts', 'assets/Hearts.png',  {frameWidth: 50/3, frameHeight: 16});
    }

    create()
    {
        this.scene.start('server-select');
    }
}