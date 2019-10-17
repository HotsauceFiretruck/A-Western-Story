import { Player } from "./Player.js";
import { LevelTutorial } from "./levels/LevelTutorial.js";

export class Game 
{
    constructor() {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;

        let levelTutorial = new LevelTutorial(this);

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
            scene: [levelTutorial]
        };

        let game = new Phaser.Game(this.config);
    }
}
