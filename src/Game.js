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



        //Initializing Levels
        let levelTutorial = new LevelTutorial(this);
        let level1 = new AlexLevel(this);
        let level4 = new EthanLevel(this);
        let level2 = new DustinLevel(this);
        let level3 = new LoganLevel(this);

        //Detecting the Device's Size and Set Max
        let maxWidth = 1200;
        let maxHeight = 600;
        
        let scaleWidth = maxWidth / window.innerWidth;
        let scaleHeight = maxHeight / window.innerHeight;
        let setScale = Math.max(scaleWidth, scaleHeight);
        
        let modifiedWidth = maxWidth / setScale;
        let modifiedHeight = maxHeight / setScale;

        if (modifiedHeight < maxHeight && modifiedWidth < maxWidth) 
        {
            maxHeight = modifiedHeight;
            maxWidth = modifiedWidth;
        }

        //console.log(modifiedWidth + " " + modifiedHeight + " " + scaleWidth + " " + scaleHeight + " " + window.innerWidth + " " + window.innerHeight);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,

            width: maxWidth,
            height: maxHeight,
            parent: 'phaser-game',
            autoCenter: Phaser.Scale.CENTER_BOTH,

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
          
            scene: [level3]
          
        };

        let game = new Phaser.Game(this.config);

        //If game is played on mobile devices -> lock screen orientation to landscape.

        //Need further testings
        // if (game.device.os.android || 
        //     game.device.os.iOS || 
        //     game.device.os.iPad || 
        //     game.device.os.iPhone ||
        //     game.device.os.windowsPhone)
        // {
        //     console.log("Mobile Detected! Configuring Game Window...");
        //     game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// 	game.scale.forceOrientation(true, false);
        //     game.scale.enterIncorrectOrientation.add(handleIncorrect);
        //     game.scale.leaveIncorrectOrientation.add(handleCorrect);
        // }
        // function handleIncorrect(){
        //     document.getElementById("playlandscape").style.display="block";
        // }
        // function handleCorrect(){
        //     if(!game.device.desktop){
        //         if(game.scale.isGameLandscape){		
        //             game.width = maxWidth;
        //             game.height = maxHeight;
        //             game.renderer.resize(game.width,game.height);
        //         }
        //     }
        //     document.getElementById("playlandscape").style.display="none";
        // }
    }
}
