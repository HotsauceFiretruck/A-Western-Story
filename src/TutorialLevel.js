import { Player } from "./Player.js"
import { Bullet } from "./Bullet.js"

export class TutorialLevel extends Phaser.Scene
{
    constructor(width, height)
    {
        super({key:"tutoriallevel"});
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
        this.load.image('enemy', 'assets/Enemy.png');
        this.load.spritesheet('hearts', 'assets/Hearts.png',  {frameWidth: 50/3, frameHeight: 16});
    }

    create()
    {
        this.add.image(400, 300, 'background').setScale(2);
        
        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < this.width/36; i++)
        {
            this.platforms.create((this.width-790)+36*i, this.height-12.5, 'grass');
        }

        this.projectiles = this.add.group();
        this.enemies = this.add.group();

        this.add.image(50, 503, 'house');
        this.player = new Player(this, 300, 100);
    }

    update ()
    {  
        let bullets = this.projectiles.getChildren();

        for (let i = 0; i < this.projectiles.getLength(); i++)
        {
            bullets[i].update();
        }
        
        this.player.update();
    }
}