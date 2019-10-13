import { Player } from "../Player.js"
import { Enemy } from "../Enemy.js"
import { Platform } from "../Platform.js";

export class LevelTutorial extends Phaser.Scene
{
    constructor(width, height)
    {
        super({key:"level-tutorial"});
        this.width = width;
        this.height = height;
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
        this.add.image(400, 300, 'background').setScale(2);
        this.add.image(50, 503, 'house');

        this.platformGroup = this.add.group();
        for (let i = 0; i < this.width/36; i++)
        {
            new Platform(this, (this.width-790)+36*i, this.height-12.5);
        }

        this.projectileGroup = this.add.group();
        this.enemyGroup = this.add.group();

        this.player = new Player(this, 300, 100);
        this.basicEnemy = new Enemy(this, 600, 100);  
    }

    update ()
    {  
        //Update bullets
        let bullets = this.projectileGroup.getChildren();
        for (let i = 0; i < bullets.length; i++)
        {
            bullets[i].update();
        }

        //Update enemies
        let enemies = this.enemyGroup.getChildren();
        for (let i = 0; i < enemies.length; i++)
        {
            enemies[i].update();
        }
        
        if (this.enemyGroup.getLength() == 0)
        {
            new Enemy(this, 600, 100);
        }

        this.player.update();
    }
}