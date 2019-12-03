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
            this.load.image('thumb', 'assets/Sprites/JoystickThumb.png');
            this.load.image('base', 'assets/Sprites/JoystickBase.png');
            this.load.image('gunbase', 'assets/Sprites/JoystickGunBase.png');
        }
        else {
            this.load.audio('cartheftmusic', 'assets/CarTheft.mp3');
        }
      
        this.load.image('background', 'assets/Backgrounds/Background.png');
        this.load.image('background2', 'assets/Backgrounds/Background2.png');
        this.load.image('background3', 'assets/Backgrounds/Background3.png');
        this.load.image('background4', 'assets/Backgrounds/Background4.png');
        this.load.image('background4r', 'assets/Backgrounds/Background4R.png');
        this.load.image('bg', 'assets/Backgrounds/MenuScreen.png');
        this.load.image('death', 'assets/Backgrounds/GameOver.png');
        this.load.image('woodBG', 'assets/Backgrounds/BackgroundWood.png');

        this.load.image('grass', 'assets/Textures/Grass.png');
        this.load.image('grass2', 'assets/Textures/Grass2.png');
        this.load.image('sand', 'assets/Textures/Sand.png');
        this.load.image('sand2', 'assets/Textures/Sand2.png');
        this.load.image('clear', 'assets/Textures/Clear.png');
        this.load.image('cactus3', 'assets/Textures/Cactus3.png');
        this.load.image('wood', 'assets/Textures/Wood.png');

        this.load.image('player', 'assets/Sprites/Player.png');
        this.load.image('bullet', 'assets/Sprites/Bullet.png');
        this.load.image('enemy', 'assets/Sprites/Outlaw.png');
        this.load.image('sun', 'assets/Sprites/Sun1.png');
        this.load.image('cloud', 'assets/Sprites/Cloud.png');
        this.load.image('sheriff', 'assets/Sprites/Sheriff.png');
        this.load.image('priest', 'assets/Sprites/Priest.png');
        this.load.image('snake', 'assets/Sprites/Snake.png');
        this.load.image('cross', 'assets/Sprites/Cross.png');
        this.load.image('win', 'assets/Sprites/YouWin.png');
        this.load.image('bull', 'assets/Sprites/Bull.png');
        this.load.image('cactus', 'assets/Sprites/Cactus2.png');
        this.load.image('crate', 'assets/Sprites/Crate.png');
        this.load.image('deadtree', 'assets/Sprites/DeadTree.png');
        this.load.image('barrel', 'assets/Sprites/Barrel.png');
        this.load.image('title', 'assets/Sprites/Title.PNG');
        this.load.image('healthbarback', 'assets/Sprites/BossHealthBarBackground.png');
        this.load.image('horse', 'assets/Sprites/Horse.png');
        this.load.image('horse2', 'assets/Sprites/Horse2.png');
        this.load.image('extrahealth', 'assets/Sprites/ExtraHealth.png');
        this.load.image('flight', 'assets/Sprites/Flight.png');
        this.load.image('tripleshot', 'assets/Sprites/TripleShot.png');
        this.load.image('gun', 'assets/Sprites/Gun.png');
        this.load.image('continueDialogButton', 'assets/Sprites/ContinueDialogButton.png');
        this.load.image('healthbarfront', 'assets/Sprites/BossHealthBar.png');
        this.load.image('dialogbg', 'assets/Sprites/DialogBackground.png');
        this.load.spritesheet('hearts', 'assets/Sprites/Hearts.png',  {frameWidth: 50/3, frameHeight: 16});

        this.load.image('sheriffhouse', 'assets/Structures/SheriffHouse.png');
        this.load.image('northSign', 'assets/Structures/NorthSign.png');
        this.load.image('southSign', 'assets/Structures/SouthSign.png');
        this.load.image('eastSign', 'assets/Structures/EastSign.png');
        this.load.image('westSign', 'assets/Structures/WestSign.png');
        this.load.image('signPost', 'assets/Structures/SignPost.png');
        this.load.image('fence', 'assets/Structures/Fence.png');
        this.load.image('church', 'assets/Structures/Church.png');
        this.load.image('churchDoor', 'assets/Structures/ChurchDoor.png');
        this.load.image('bigHouse', 'assets/Structures/BigHouse.png');
        this.load.image('saloon', 'assets/Structures/Saloon.png');
        this.load.image('waterTower', 'assets/Structures/WaterTower.png');
        this.load.image('house', 'assets/Structures/House.png');

        this.load.audio('cartheftmusic', 'assets/Music/CarTheft.mp3');

        this.load.image('playButton', 'assets/Buttons/PlayButton.png');
        this.load.image('tutorialButton', 'assets/Buttons/TutorialButton.png');
        this.load.image('nxtlvlButton', 'assets/Buttons/NextLevelButton.png');
        this.load.image('backButton', 'assets/Buttons/BackButton.png');
        this.load.image('lvl1Button', 'assets/Buttons/Lvl1Button.png');
        this.load.image('lvl2Button', 'assets/Buttons/Lvl2Button.png');
        this.load.image('lvl3Button', 'assets/Buttons/Lvl3Button.png');
        this.load.image('lvl4Button', 'assets/Buttons/Lvl4Button.png');
        this.load.image('lvl5Button', 'assets/Buttons/Lvl5Button.png');
        this.load.image('svr1btn', 'assets/Buttons/Server1Button.png');
        this.load.image('svr2btn', 'assets/Buttons/Server2Button.png');
        this.load.image('svr3btn', 'assets/Buttons/Server3Button.png');
        this.load.image('svr4btn', 'assets/Buttons/Server4Button.png');
        this.load.image('svr5btn', 'assets/Buttons/Server5Button.png');
        this.load.image('arenabtn', 'assets/Buttons/ArenaButton.png'); 
        this.load.image('pauseButton', 'assets/Buttons/PauseButton.png');
        this.load.image('unpauseButton', 'assets/Buttons/UnpauseButton.png');
        this.load.image('fullscreenButton', 'assets/Buttons/FullscreenButton.png');
        this.load.image('returnButton', 'assets/Buttons/ReturnToMenuButton.png');
        this.load.image('respawnButton', 'assets/Buttons/RespawnButton.png');
    }

    create()
    {
        this.scene.start('menu-scene');
    }
}
