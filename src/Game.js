import { Player } from "./Player.js";
import { LevelTutorial } from "./levels/LevelTutorial.js";
import { AlexLevel } from "./levels/AlexLevel.js";
import { EthanLevel } from "./levels/EthanLevel.js";
import { LoganLevel } from "./levels/LoganLevel.js";

export class Game 
{
    constructor() {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;

        let levelTutorial = new LevelTutorial(this);
        let alexlevel = new AlexLevel(this);
        let ethanlevel = new EthanLevel(this);
        let loganlevel = new LoganLevel(this);

        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            pixelArt: true,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: .5},
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
            scene: [loganlevel]

        };

        let game = new Phaser.Game(this.config);
    }
}
