import { Bullet } from "./Bullet.js"

export class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'player');
        this.scene = scene;
        scene.add.existing(this);
        
        //Status
        this.status = {
            health: 20
        };

        //Settings
        scene.physics.world.enableBody(this);
        //this.body.setSize(24, 21, true);
        //this.body.setOffset(6, 7);
        scene.physics.add.collider(this, scene.platformGroup);
        this.body.setCollideWorldBounds(true);
        this.body.drag.setTo(120, 30);
        this.body.setMaxVelocity(160, 250);
        this.body.setMass(10);
        this.setScale(2);

        //Cursors
        this.cursors = scene.input.keyboard.addKeys
                    ({
                        up: 'W',
                        left: 'A',
                        right: 'D'
                    });

        scene.input.on('pointerdown', (pointer) => 
        {
            this.shoot(pointer.x, pointer.y);
        });

        //Health
        this.healthSprite = scene.add.sprite(20, 20, 'hearts'); 
        scene.add.existing(this.healthSprite);
        this.healthSprite.setFrame(0);

        this.displayHealth = scene.add.text(30, 12, this.status.health, {color:'#DC143C'});
    }

    update()
    {
        //Update Controls/Cursors
        if (this.cursors.left.isDown)
        {
            this.body.setAccelerationX(-100);
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setAccelerationX(100);
        }
        else
        {
            this.body.setAccelerationX(0)
        }
        if (this.cursors.up.isDown && this.body.touching.down)
        {
            this.body.setVelocityY(-250);
        }
        
       // console.log("x: " + this.body.velocity.x + ", y: " + this.body.velocity.y);
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
    
    shoot(x, y)
    {
        new Bullet(this.scene, this.scene.enemyGroup, this.x, this.y, x, y);
    }
}