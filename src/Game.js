import { LevelTutorial } from "./levels/LevelTutorial.js";
import { DustinLevel } from "./levels/DustinLevel.js";
import { AlexLevel } from "./levels/AlexLevel.js";
import { EthanLevel } from "./levels/EthanLevel.js";
import { LoganLevel } from "./levels/LoganLevel.js";

export class Game 
{
    constructor() 
    {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;

        let levelTutorial = new LevelTutorial(this);
        let level1 = new AlexLevel(this);
        let level4 = new EthanLevel(this);
        let level2 = new DustinLevel(this);
        let level3 = new LoganLevel(this);


        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            pixelArt: true,
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
                    plugin: PhaserMatterCollisionPlugin,
                    key: "matterCollision",
                    mapping: "matterCollision"
                  }
                ]
            },
            scene: [levelTutorial]
        };

        let game = new Phaser.Game(this.config);

        if (game.device.os.desktop)
        {
            console.log("Desktop Detected! Configuring Game Window...");
        }
        if (game.device.os.iPad)
        {
            console.log("iPad Detected! Configuring Game Window...");
        }
        if (game.device.os.iPhone)
        {
            console.log("iPhone Detected! Configuring Game Window...");
        }

    }
}
