import { Player } from "./Player.js";
import { LevelTutorial } from "./levels/LevelTutorial.js";

export class Game 
{
    constructor(width, height) {

        this.width = width;
        this.height = height;

        let levelTutorial = new LevelTutorial(this.width, this.height);

        var config = {
            type: Phaser.AUTO,
            width: this.width,
            height: this.height,
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200},
                    debug: true
                }
            },
            scene: [levelTutorial]
        };

        let phaserGame = new Phaser.Game(config);
    }
}
