import { Player } from "../entities/Player.js";
import { Enemy } from "../entities/Enemy.js";
import { TileMap } from "../components/TileMap.js";
import { DialogTree } from "../interfaces/DialogTree.js";
import { Platform } from "../components/Platform.js";

export class LoganLevel extends Phaser.Scene
{
    
    constructor(PhaserGame)
    {
        super({key:"level-3"});
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        let scale = this.PhaserGame.scale;
        //game.load.audio('background_music', ['assets/CarTheft.mp3']);
        this.add.image(50, 503, 'house');
        this.add.image(800, 503, 'house');
        this.add.image(600,200, 'cloud');
        this.add.image(470,125, 'cloud');
        this.add.image(200,210, 'cloud');
        this.add.image(50,505, 'cactus');
        

        for(let i = -1; i < 40; i++){

            new Platform(this, 2, i, 16, 0, 0, 32, 32);

        }
        let groundLayer = 
        [   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ];
        this.loopImage('background2', 720, 420, groundLayer[0].length * 32, groundLayer.length * 32, 1.45);
        this.map = new TileMap(this, groundLayer, 32, 32, 'sand');

        this.platformCreation = [];
        this.isLevelEnded = false;

        this.projectiles = {
            category: 2, //telling what collision category these objects belong in
            list: [] 
        };

        this.enemies = {
            category: 4,
            list: []
        };

        this.player = new Player(this, 300, 100);
        this.player.disableHorizontalMovement();
        this.player.status.maxVelocityY = 13;
        this.horse = this.add.image(this.player.x, this.player.y, 'horse2').setScale(4);

        this.storyMessage = new DialogTree(this, 600, 100);
        this.dialogSetup(this.storyMessage, this);
    }
    startGame(scene){
        this.storyMessage.sequences[0].nextDialog();
        this.countdown = 45;
        this.timer = scene.add.text(1150, 20, this.countdown, {color:'#DC143C'});
        this.timer.setScale(1.5);
        scene.time.addEvent({
            delay: 45000,
            callback: () => this.isLevelEnded = true,
            callbackScope: this,
            loop: false
        });

        scene.time.addEvent({
            delay: 1000  ,
            callback: () => {
                if(!this.isLevelEnded){
                    this.countdown -= 1;
                    this.timer.setText(this.countdown);
                    let random = Math.random()*3;
                    let platform1 = new Platform(this, 4, 50, 17-Math.floor(random +2), 0, Math.floor(random +2), 32, 32);
                    if(Math.random() > .3)
                    {
                        platform1.addSprite('barrel');
                    }
                    else
                    {
                        platform1.addSprite('cactus3');
                        platform1.enableDamage(-2, this.player);
                    }
                    platform1.enableKinematic(-1*random-1, 0);
                    this.platformCreation.push(platform1);
                }
            },
            callbackScope: this,
            loop: true
            
        });
    }

    dialogSetup(storyMessage, scene)
    {
        let sequence0 = storyMessage.addSequence(); 

         //dialogTree.addDialog(sequenceID, text, actor, options)
        storyMessage.addDialog(sequence0, "Chase the sheriff!", this.player);
        storyMessage.addDialog(sequence0, "Last 45 seconds... To survive!", this.player);

        storyMessage.addDialog(sequence0, "Are you ready?", this.player,
            [
                ["I'm Ready!", ()=>{this.startGame(scene)}],
            ]
        );

        storyMessage.playSequence(sequence0);
    }



    update ()
    {

        //Update bullets
        for (let i = 0; i < this.projectiles.list.length; i++)
        {
            this.projectiles.list[i].update();
        }

        //Update enemies
        for (let i = 0; i < this.enemies.list.length; i++)
        {
            this.enemies.list[i].update();
        }

        for(let i = 0; i < this.platformCreation.length; i++)
        {
           if (this.platformCreation[i].body.position.x < 0)
           {
                this.platformCreation[i].destroy();
                this.platformCreation.splice(i, 1);
           }
        }
        //Update player
        this.player.update();

        //Update Horse
        this.horse.setPosition(this.player.x, this.player.y + 32);

        if(this.isLevelEnded)
        {
            this.scene.start('level-4');
        }


    }

    loopImage(imageKey, imageWidth, imageHeight, levelWidth, levelHeight, scale) 
    {
        let maxWidth = Math.max(this.cameras.main.worldView.width, levelWidth);
        let maxHeight = Math.max(this.cameras.main.worldView.height, levelHeight);

        let widthRatio = maxWidth / (imageWidth * scale); //Getting the ratio between level size and background image size
        let heightRatio = maxHeight / (imageHeight * scale);

        let numberOfWidth = Math.ceil(widthRatio);
        let numberOfHeight = Math.ceil(heightRatio);
        for (let w = 0; w < numberOfWidth; ++w)
        {
            for (let h = 0; h < numberOfHeight; ++h)
            {
                let bgImage = new Phaser.GameObjects.Image(this, 0, 0, imageKey);
                bgImage.setOrigin(0, 0).setScale(scale).setPosition(imageWidth * w * scale, imageHeight * h * scale);
                this.add.existing(bgImage);
            }
        }
    }
}

