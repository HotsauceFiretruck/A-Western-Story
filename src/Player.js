 import { Bullet } from "./Bullet.js"

export class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'player');
        this.scene = scene;
        scene.add.existing(this);
        
        //Settings
        scene.physics.world.enableBody(this);
        this.body.setSize(24, 21, true);
        this.body.setOffset(6, 7);
        scene.physics.add.collider(this, scene.platforms);
        this.body.setCollideWorldBounds(true);
        this.scale = 2;

        //Cursors
        this.cursors = scene.input.keyboard.createCursorKeys();
    
        scene.input.keyboard.on('keydown-SPACE', (event) =>
        {
            this.shoot();
        });

        scene.input.keyboard.on('keydown-L', (event) =>
        {
            new Bullet(this.scene, 700, 500, -200, 0, this);
        });

        //Health
        this.healthSprite = scene.add.sprite(20, 20, 'hearts'); 
        scene.add.existing(this.healthSprite);
        this.healthSprite.setFrame(0);

        this.status = {
            health: 20
        };

        this.displayHealth = scene.add.text(30, 12, this.status.health, {color:'#DC143C'});

        // Testing Health
        this.keyObj =  scene.input.keyboard.addKey('H');
    }

    update()
    {
        //Update Controls/Cursors
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(160);
        }
        else
        {
            this.body.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.body.touching.down)
        {
            this.body.setVelocityY(-200);
        }

        if (this.keyObj.isDown)
        {
            this.changeHealth(-1);
        }
    }

    changeHealth(changeHealthBy)
    {
        this.status.health += changeHealthBy;
        if (this.status.health < 0)
        {
            this.status.health = 0;
            //game over
        }
        if (this.status.health < 10)
        {
            this.healthSprite.setFrame(2);
        }
        this.displayHealth.setText(this.status.health);
    }
    
    shoot()
    {
        new Bullet(this.scene, this.x, this.y, 200, 0, null);
    }
}