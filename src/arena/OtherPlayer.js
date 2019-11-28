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

        let { Body, Bodies} = scene.PhaserGame.MatterPhysics;

        //Bodies.rectangle(centerX position IN the sprite, centerY position IN the sprite, 
        //                 width of the collision body, height of the collision body, {options});
        let mainBody = Bodies.rectangle(0, 0, this.width * 0.7, this.height, {chamfer: 1});
        
        //Sensors: only for detecting, not for collision
        this.sensors = {
            bottom: Bodies.rectangle(0, this.height * 0.5, this.width * 0.4, 2, { isSensor: true }),
            left: Bodies.rectangle(-this.width * 0.35, 0, 2, this.height * 0.5, { isSensor: true }),
            right: Bodies.rectangle(this.width * 0.35, 0, 2, this.height * 0.5, { isSensor: true })
        };

        let compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.03,
            friction: .012
        });

        //Set collision category
        this.category = 16;
        
        //Setting Sprite
        this.setExistingBody(compoundBody)
            .setPosition(x, y)
            .setMass(2)
            .setScale(1.5)
            .setFixedRotation()
            .setCollisionCategory(this.category)
            .setDepth(1);

        this.gun = scene.add.image(this.x, this.y, 'gun');
        this.gun.setDepth(1).setScale(2);
    }

    //Important for entities
    changeHealth(changeHealthBy)
    {
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
