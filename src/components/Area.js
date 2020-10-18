export class Area extends Phaser.Physics.Matter.Sprite {
    /*  scene: Scene (Level)
        imageKey: The image key
        centerX: X position in the Level
        centerY: Y position in the level
        bodyWidth: The width of the collision body
        bodyHeight: The height of the collision body
    */
    constructor(scene, imageKey, centerX, centerY, bodyWidth, bodyHeight) {
        super(scene.matter.world, centerX, centerY, imageKey);
        scene.add.existing(this);
        this.scene = scene;

        const Bodies = Phaser.Physics.Matter.Matter.Bodies;
        const mainBody = Bodies.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true, isSensor: true });
        this.setExistingBody(mainBody);
    }

    // method: The method that is going to be activated when the target collides with this object
    // target: The object that this InteractiveCollider is listening for collision (IF the target have a collision body)
    whenTouched(byTarget, activateMethod) {
        this.body.collisionFilter.mask = byTarget.category;
        this.scene.matterCollision.addOnCollideStart({
            objectA: this,
            objectB: byTarget,
            callback: ({ bodyB }) => {
                if (bodyB.isSensor) return;
                activateMethod();
            },
            context: this
        });
    }

    //When not touched by the target -> activate method
    whenNotTouched(byTarget, activateMethod) {
        this.body.collisionFilter.mask = byTarget.category;
        this.scene.matterCollision.addOnCollideEnd({
            objectA: this,
            objectB: byTarget,
            callback: ({ bodyB }) => {
                if (bodyB.isSensor) return;
                activateMethod();
            },
            context: this
        });
    }
}