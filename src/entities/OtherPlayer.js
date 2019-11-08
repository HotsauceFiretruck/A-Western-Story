import { Bullet } from "./Bullet.js";

export class OtherPlayer extends Phaser.Physics.Matter.Sprite
{
    /* scene: Scene (Level)
       x: X position of player in level (pixel unit)
       y: Y position of player in level (pixel unit)
    */
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'player');
        this.scene = scene;
        scene.add.existing(this);

        //Status
        this.status = {
            health: 20,
            maxVelocityX: 3,
            maxVelocityY: 9,
            moveForce: 0.01,
            nodamage: false,
            isTouching: { left: false, right: false, down: false },
            canJump: true,
            fireRate: .3, // 1 bullet every [fireRate] seconds
            isFireReloaded: true,
            jumpCooldownTimer: null,
            allowHorizontal: true,
            allowMove: true,
        };

        //Set collision category
        this.category = 1;
        
        //Setting Sprite
        this.setPosition(x, y)
            .setMass(2)
            .setScale(1.5)
            .setFixedRotation()
            .setCollisionCategory(this.category)
            .setDepth(1);

    }

    //Important for entities
    changeHealth(changeHealthBy)
    {
        this.status.health += changeHealthBy;
        if (changeHealthBy < 0 && this.status.nodamage)
        {
            this.status.health -= changeHealthBy;
        }
        if (changeHealthBy < 0 && !this.status.nodamage)
        {
            this.damagedEffects();
        }
    }

    damagedEffects()
    {
        this.alpha = .5;
        this.status.nodamage = true;
        let timer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => 
            {
                this.alpha = 1;
                this.status.nodamage = false;
            },
            callbackScope: this,
            loop: false
        });
        
    }
}
