export class InteractiveArea
{
    /*  scene: Scene (Level)
        imageKey: The image key
        centerX: X position in the Level
        centerY: Y position in the level
        bodyWidth: The width of the collision body
        bodyHeight: The height of the collision body
    */
    constructor(scene, imageKey, centerX, centerY, bodyWidth, bodyHeight)
    {
        this.scene = scene;
        this.MatterBody = scene.PhaserGame.MatterPhysics.Body;
        this.body = scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true, isSensor: true });
        this.image = scene.add.image(centerX, centerY, imageKey);
    }

    // method: The method that is going to be activated when the target collides with this object
    // target: The object that this InteractiveCollider is listening for collision (IF the target have a collision body)
    whenTouched(byTarget, activateMethod)
    {
        console.log(byTarget.body);
        this.scene.matterCollision.addOnCollideStart({
            objectA: this.body,
            objectB: byTarget.body,
            callback: this.debug,
            context: this
        });
    }

    debug()
    {
        console.log("I AM TOUChING SOMETHING.");
    }

    //When not touched by the target -> activate method
    whenNotTouched(byTarget, activateMethod)
    {
        this.scene.matterCollision.addOnCollideEnd({
            objectA: this.body,
            objectB: byTarget.body,
            callback: activateMethod,
            context: this
        });
    }
}