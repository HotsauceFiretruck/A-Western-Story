export class BaseEntity extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y, image, 
        { 
            health=20, 
            maxVelocityX=3, 
            maxVelocityY=9,
            allowHorizontalMovement=true,
            allowVerticalMovement=true,
            allowMovement = true,
            collisionCategory=[0],
            collidesWith=[0],
            mass=1,
            scale=1,
            rotation=0,
            fixedRotation=true,
            enableSensor=true, //If your object does not need sensors, then set this to false.
            imageDepth=0
        }={})
    {
        super(scene.matter.world, x, y, 'player');
        scene.add.existing(this);

        //Setting Status
        this.status = 
        {
            health : health,
            maxVelocityX : maxVelocityX,
            maxVelocityY : maxVelocityY,
            allowHorizontalMovement : allowHorizontalMovement,
            allowVerticalMovement : allowVerticalMovement,
            allowMovement : allowMovement
        };

        //Setting Sprite
        this.setPosition(x, y)
            .setMass(2)
            .setScale(1.5)
            .setFixedRotation()
            .setDepth(0);
        
        let { Body, Bodies} = scene.PhaserGame.MatterPhysics;

        //Bodies.rectangle(centerX position IN the sprite, centerY position IN the sprite, 
        //                 width of the collision body, height of the collision body, {options});
        let mainBody = Bodies.rectangle(0, 0, this.width * 0.7, this.height, {chamfer: 1});

        
    }

    /**
     * Adds in extra additional status to the main status dictionary for tracking.
     *
     * @param {dictionary} additionalStatus
     * @memberof BaseEntity
     */
    modifyStatus(additionalStatus)
    {
        for (let key in additionalStatus)
        {
            this.status[key] == additionalStatus[key];
        }
    }
}