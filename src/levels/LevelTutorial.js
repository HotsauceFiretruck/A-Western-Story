import { Player } from "../Player.js"
import { Enemy } from "../Enemy.js"
import { Platform } from "../Platform.js";
import { TileMap } from "./TileMap.js";

export class LevelTutorial extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        super({key:"level-tutorial"});
        
        console.log("Tutorial Level Created!");

        this.PhaserGame = PhaserGame;
    }

    preload()
    {
        this.load.image('background', 'assets/Background.png');
        this.load.image('grass', 'assets/Grass.png');
        this.load.image('player', 'assets/Player.png');
        this.load.image('bullet', 'assets/Bullet.png');
        this.load.image('house', 'assets/House.png');
        this.load.image('enemy', 'assets/Outlaw.png');
        this.load.spritesheet('hearts', 'assets/Hearts.png',  {frameWidth: 50/3, frameHeight: 16});
    }

    create()
    {
        console.log("Create Function Initialized!");

        let level = 
        [
            [0, 0, 1, 1, 1, 1, 1]
        ];

        this.map = new TileMap(this, level, 32, 32, 'grass');

        this.add.image(400, 300, 'background').setScale(2);
        this.add.image(50, 503, 'house');

        //this.testSprite = this.matter.add.sprite(200, 200, 'grass');

        // this.generateBounds(1, 1, 1, 1);
        // this.add.image(0 + 16, 0 + 16, 'grass');
        // this.add.image(32 + 16, 32 + 16, 'grass');
        // this.add.image(64 + 16, 64 + 16, 'grass');
        // this.add.image(96 + 16, 96 + 16, 'grass');
        // this.add.image(128 + 16, 128 + 16, 'grass');
        //Setting Sprite
        // this.testSprite
        //     .setExistingBody(body)
        //     .setFixedRotation()
        //     .setStatic(true);
            //.setPosition(200, 200);

        // this.platformGroup = this.add.group();

        // for (let i = 0; i < 22; i++)
        // {
        //     new Platform(this, 12+36*i, 587);
        // }

        //this.projectileGroup = this.add.group();
        //this.enemyGroup = this.add.group();

        this.player = new Player(this, 300, 100);
       // this.basicEnemy = new Enemy(this, 600, 100);  
    }

    update ()
    {  
        //Update bullets
        // let bullets = this.projectileGroup.getChildren();
        // for (let i = 0; i < bullets.length; i++)
        // {
        //     bullets[i].update();
        // }

        // //Update enemies
        // let enemies = this.enemyGroup.getChildren();
        // for (let i = 0; i < enemies.length; i++)
        // {
        //     enemies[i].update();
        // }
        
        // if (this.enemyGroup.getLength() == 0)
        // {
        //     new Enemy(this, 600, 100);
        // }

        this.player.update();
    }
}