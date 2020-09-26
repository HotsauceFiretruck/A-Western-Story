import SceneLoader from './SceneLoader.js';
import BrowserInfo from './BrowserInfo.js';

//Detecting the Device's Size and Set Max
let defaultWidth = 1200;
let defaultHeight = 600;

//Initializing Config
const config = {
    parent: 'phaser-div',
    type: Phaser.AUTO,
    pixelArt: true,
    activePointers: 4,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1.3 }
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

    scene: SceneLoader.scenes

};

const game = new Phaser.Game(config);
//Disable right click menu on canvas
game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
BrowserInfo.getBrowserInfo(game);
