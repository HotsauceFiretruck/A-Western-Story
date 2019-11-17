import { LevelTutorial } from "./levels/LevelTutorial.js";
import { DustinLevel } from "./levels/DustinLevel.js";
import { AlexLevel } from "./levels/AlexLevel.js";
import { AlexLevelPart2 } from "./levels/AlexLevelPart2.js";
import { EthanLevel } from "./levels/EthanLevel.js";
import { LoganLevel } from "./levels/LoganLevel.js";
import { FinalLevel } from "./levels/FinalLevel.js";
import { DeathScene } from "./interfaces/DeathScene.js";
import { PreloaderScene } from "./interfaces/PreloaderScene.js";
import { MenuScene } from "./interfaces/MenuScene.js";
import { LevelSelect } from "./interfaces/LevelSelect.js";

export class StoryMode 
{
    constructor() 
    {
        
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = false;

        //Detecting the Device's Size and Set Max
        let defaultWidth = 1200;
        let defaultHeight = 600;
        
        let scaleWidth = window.innerWidth / defaultWidth;
        let scaleHeight = window.innerHeight / defaultHeight;
        this.scale = Math.min(scaleWidth, scaleHeight);
        
        // let modifiedWidth = maxWidth * this.scale;
        // let modifiedHeight = maxHeight * this.scale;

        // if (this.scale < 1) 
        // {
        //     maxHeight = modifiedHeight;
        //     maxWidth = modifiedWidth;
        // } else 
        // {
        //     this.scale = 1;
        // }

        //Initializing Levels
        let preloader = new PreloaderScene(this);
        let menu = new MenuScene(this);
        let levelSelect = new LevelSelect(this);

        let levelTutorial = new LevelTutorial(this);
        let level1 = new AlexLevel(this);
        let level1Continued = new AlexLevelPart2(this);
        let level2 = new DustinLevel(this);
        let level3 = new LoganLevel(this);
        let level4 = new EthanLevel(this);
        let level5 = new FinalLevel(this);
        let death = new DeathScene(this);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,
            pixelArt: true,
            activePointers: 4,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1.3}
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                parent: 'AWesternStory',
                width: defaultWidth,
                height: defaultHeight,
            },
            canvasStyle: 'padding: 0; margin: auto; display: block; position: absolute; top: 0; bottom: 0; left: 0; right: 0;',
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
          
            scene: [preloader, menu, levelTutorial, levelSelect, level1, level1Continued, level2, level3, level4, level5, death]
        };

        let game = new Phaser.Game(this.config);

        if (game.device.os.android || 
            game.device.os.iOS || 
            game.device.os.iPad || 
            game.device.os.iPhone ||
            game.device.os.windowsPhone)
        {
            this.isMobile = true;
        }
    }
}

let A_Western_Story = new StoryMode();
