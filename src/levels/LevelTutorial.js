import { Player } from "../entities/Player.js";
import { Enemy } from "../entities/Enemy.js";
import { TileMap } from "../components/TileMap.js";
import { Area } from "../components/Area.js";
import { DialogTree } from "../interfaces/DialogTree.js";

export class LevelTutorial extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key:"level-tutorial"});

        this.PhaserGame = PhaserGame;
    }

    create()
    {
        this.projectiles = {
            category: 2,
            list: [] 
        };

        this.enemies = {
            category: 4,
            list: []
        };

        /* Creating Level using an Array + Tile Map
           1 is for block/tile; 0 is for empty space
           Note: Each block/tile is 32 pixels wide and 32 pixels long
           This level is 25 tiles wide by 19 tiles long
           Therefore, this level is 800 pixels wide and 600 pixels long
        */
        let level = 
        [   
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        //Looping background with level
        this.loopImage('background', 720, 420, level[0].length * 32, level.length * 32, 1.45);

        // Create map
        this.map = new TileMap(this, level, 32, 32, 'grass');

        //Adding static images
        this.add.image(50, 525, 'house');

        this.player = new Player(this, 300, 400);
        this.basicEnemy = new Enemy(this, 750, 400);

        //Add an Area Example
        //Scene, ImageKey, CenterX (Position), CenterY (Position), Collision Body Width, Collision Body Height
        let nextLevelGoal = new Area(this, 'house', 1150, 525, 75, 104);
        nextLevelGoal.whenTouched(this.player, () => {this.nextLevel()});

        //Enable Dialog Tree: Dialog Tree should be the last thing to load.
        this.dialogTree = new DialogTree(this, 600, 100);

        //Getting options to store into this method --> check update function/method
        this.optionsChosen = [];

        this.dialogSetup(this.dialogTree);
    }

    dialogSetup(dialogTree)
    {
        let sequence0 = dialogTree.addSequence(); //sequence0 have the id of 0 because of index array start at 0
        let sequence1 = dialogTree.addSequence();
        let sequence2 = dialogTree.addSequence();

        //dialogTree.addDialog(sequenceID, text, actor, options)
        dialogTree.addDialog(sequence0, "Welcome to this game.", this.player);
        dialogTree.addDialog(sequence0, "Press A to go right.", this.player);
        dialogTree.addDialog(sequence0, "Press D to go left.", this.player);
        dialogTree.addDialog(sequence0, "Press W to jump.", this.player);
        dialogTree.addDialog(sequence0, "Right click to shoot.", this.player);
        dialogTree.addDialog(sequence0, "Have fun, bye.", this.player,
            [
                ["Go to sequence 1", () => {dialogTree.changeSequence(1);}],
                ["Go to sequence 2", () => {
                    dialogTree.changeSequence(2);
                }],
            ]
        );

        dialogTree.addDialog(sequence1, "This is sequence 1.", this.basicEnemy);
            
        dialogTree.addDialog(sequence2, "This is sequence 2.", this.basicEnemy,
            [
                ["Go to sequence 1", () => {
                    dialogTree.changeSequence(1);
                    this.optionsChosen = dialogTree.globalOptionsChosen; //Get the options that was chosen as an array
                }],
                ["Go to sequence 0", () => {
                    dialogTree.changeSequence(0);
                }]
            ]
        );

        dialogTree.playSequence(sequence0);
    }

    //Next Level Method; Calls when player touches the interactive area (nextLevelGoal)
    nextLevel()
    {
        this.scene.start('level-1');
    }

    

    //Load in image to fill in the level
    /*
        imageKey: the image key
        imageWidth: the width of the image in pixels
        imageHeight: the height of the image in pixels
        levelWidth: the width of the level in pixels
        levelHeight: the height of the level in pixels
        scale: how large you what the image to be display onscreen
    */
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

    update ()
    { 
        //Update platforms
        for (let i = 0; i < this.map.platforms.list.length; ++i)
        {
            this.map.platforms.list[i]
        }

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
        
        //When there are no more enemies in the level, add a new one at that position
        if (this.enemies.list.length == 0) 
        {
            new Enemy(this, 600, 100);
        }

        //Update player
        this.player.update();
    }
}