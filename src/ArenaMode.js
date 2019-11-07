import { ArenaLevel } from "./levels/ArenaLevel.js";
import { DeathScene } from "./interfaces/DeathScene.js";
import { PreloaderArena } from "./interfaces/PreloaderArena.js";
import { MenuScene } from "./interfaces/MenuScene.js";
import { LevelSelect } from "./interfaces/LevelSelect.js";
import { BonusLevel } from "./levels/BonusLevel.js";


export class ArenaMode 
{
    constructor() 
    {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = false;

        //Detecting the Device's Size and Set Max
        let maxWidth = 1200;
        let maxHeight = 600;
        
        let scaleWidth = window.innerWidth / maxWidth;
        let scaleHeight = window.innerHeight / maxHeight;
        this.scale = Math.min(scaleWidth, scaleHeight);
        
        let modifiedWidth = maxWidth * this.scale;
        let modifiedHeight = maxHeight * this.scale;

        if (this.scale < 1) 
        {
            maxHeight = modifiedHeight;
            maxWidth = modifiedWidth;
        } else 
        {
            this.scale = 1;
        }

        //Initializing Level
        let preloader = new PreloaderArena(this);
        let menu = new MenuScene(this);
        let levelarena = new ArenaLevel(this);
        let death = new DeathScene(this);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,
            width: maxWidth,
            height: maxHeight,
            parent: 'phaser-game',
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            pixelArt: true,
            activePointers: 4,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1.3},
                    debug: true
                }
            },
            plugins: {
                scene: [
                    {
                        plugin: rexvirtualjoystickplugin,
                        key: "rexVirtualJoyStick",
                        mapping: "rexVirtualJoyStick"
                    },
                    {
                        plugin: PhaserMatterCollisionPlugin,
                        key: "matterCollision",
                        mapping: "matterCollision"
                    }
                ]
            },
         
            scene: [preloader, levelarena, death]

        };

        let game = new Phaser.Game(this.config);

        if (game.device.os.android || 
            game.device.os.iOS || 
            game.device.os.iPad || 
            game.device.os.iPhone ||
            game.device.os.windowsPhone)
        {
            this.isMobile = true;
            ScreenOrientation.lock("landscape");
        }
    }
}

let A_Western_Story = new ArenaMode();

