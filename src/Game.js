import { ArenaLevel } from "./arena/ArenaLevel.js";
import { DeathScene } from "./interfaces/DeathScene.js";
import { PreloaderScene } from "./interfaces/PreloaderScene.js";
import { Connection } from "./arena/Connection.js";
import { ServerSelect } from "./arena/ServerSelect.js";
import { MenuScene } from "./interfaces/MenuScene.js";
import { LevelSelect } from "./interfaces/LevelSelect.js";
import { BonusLevelSelect } from "./interfaces/BonusLevelSelect.js";
import { PauseScene } from "./interfaces/PauseScene.js";
import { NameScene } from "./arena/NameScene.js";
import { ServerDisconnect } from "./arena/ServerDisconnect.js";

import { LevelTutorial } from "./campaign/LevelTutorial.js";
import { Level1 } from "./campaign/Level1.js";
import { Level1P2 } from "./campaign/Level1P2.js";
import { Level2 } from "./campaign/Level2.js";
import { Level3 } from "./campaign/Level3.js";
import { Level4 } from "./campaign/Level4.js";
import { Level5 } from "./campaign/Level5.js";
import { BonusLevel1 } from "./campaign/BonusLevel1.js";
import { BonusLevel2 } from "./campaign/Nic's_Bonus_Level.js";
import { BonusLevel4 } from "./campaign/BonusLevel4.js";

export class Game 
{
    constructor() 
    {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = false;

        //Detecting the Device's Size and Set Max
        let defaultWidth = 1200;
        let defaultHeight = 600;

        //Connection for arena
        let connection = new Connection();

        //Initializing Levels
        let preloader = new PreloaderScene(this);
        let menu = new MenuScene(this);
        let levelSelect = new LevelSelect(this);
        let bonusLevelSelect = new BonusLevelSelect(this);
        let pauseScene = new PauseScene(this);
        let death = new DeathScene(this);

        let levelTutorial = new LevelTutorial(this);
        let level1 = new Level1(this);
        let level1P2 = new Level1P2(this);
        let level2 = new Level2(this);
        let level3 = new Level3(this);
        let level4 = new Level4(this);
        let level5 = new Level5(this);
        let bonuslevel1 = new BonusLevel1(this);
        let bonusLevel2 = new BonusLevel2(this);
        let bonusLevel4 = new BonusLevel4(this);

        //Arena stuff
        let nameInput = new NameScene(this, connection);
        let serverList = new ServerSelect(this, connection);
        let levelArena = new ArenaLevel(this, connection);
        let serverDisconnect = new ServerDisconnect(this, connection);

        //Initializing Config
        this.config = {
            parent: 'phaser-div',
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
                parent: 'phaser-div',
                width: defaultWidth,
                height: defaultHeight
            },
            canvasStyle: 'padding: 0; margin: auto; display: block; position: absolute; top: 0; bottom: 0; left: 0; right: 0;',
            dom: {
                createContainer: true
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
            
            scene: [preloader, menu, pauseScene, levelTutorial, levelSelect, bonusLevelSelect, 
                    level1, level1P2, level2, level3, level4, level5, 
                    bonuslevel1, bonusLevel2, bonusLevel4, 
                    death, nameInput, serverList, levelArena, serverDisconnect]

        };

        let game = new Phaser.Game(this.config);
        //Disable right click menu on canvas
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

let A_Western_Story = new Game();

