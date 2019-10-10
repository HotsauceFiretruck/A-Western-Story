import { Player } from "./Player.js";
import { TutorialLevel } from "./TutorialLevel.js";

const WIDTH = 800;
const HEIGHT = 600;

let tutorial = new TutorialLevel(WIDTH, HEIGHT);

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200},
            debug: true
        }
    },
    scene: [tutorial]
};

let game = new Phaser.Game(config);

