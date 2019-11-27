import { DeathScene } from "../interfaces/DeathScene.js";
import { PreloaderScene } from "../interfaces/PreloaderScene.js";
import { MenuScene } from "../interfaces/MenuScene.js";
import { LevelSelect } from "../interfaces/LevelSelect.js";
import { PauseScene } from "../interfaces/PauseScene.js";

import { LevelTutorial } from "./LevelTutorial.js";
import { Level1 } from "./Level1.js";
import { Level1P2 } from "./Level1P2.js";
import { Level2 } from "./Level2.js";
import { Level3 } from "./Level3.js";
import { Level4 } from "./Level4.js";
import { Level5 } from "./Level5.js";

export class StoryMode 
{
    constructor() 
    {      
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = false;

        //Detecting the Device's Size and Set Max
        let defaultWidth = 1200;
        let defaultHeight = 600;

        //Initializing Levels
        let preloader = new PreloaderScene(this);
        let menu = new MenuScene(this);
        let levelSelect = new LevelSelect(this);
        let pauseScene = new PauseScene(this);
        let death = new DeathScene(this);

        let levelTutorial = new LevelTutorial(this);
        let level1 = new Level1(this);
        let level1P2 = new Level1P2(this);
        let level2 = new Level2(this);
        let level3 = new Level3(this);
        let level4 = new Level4(this);
        let level5 = new Level5(this);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,
            pixelArt: true,
            activePointers: 4,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1.3},
                    //debug: true
                },
            },
            scale: {
                mode: Phaser.Scale.FIT,
                parent: 'AWesternStory',
                width: defaultWidth,
                height: defaultHeight
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
          
            scene: [preloader, menu, pauseScene, levelTutorial, levelSelect, 
                    level1, level1P2, level2, level3, level4, level5, death]
        };

        let game = new Phaser.Game(this.config);
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

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
