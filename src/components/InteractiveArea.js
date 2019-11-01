export class InteractiveArea
{
    constructor(scene, imageKey, centerX, centerY, bodyWidth, bodyHeight)
    {
        this.scene = scene;
        this.MatterBody = scene.PhaserGame.MatterPhysics.Body;
        this.body = scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isSensor: true });
        this.image = scene.add.image(centerX, centerY, imageKey);
    }

    // method: The method that is going to be activated when the target collides with this object
    // target: The object that this InteractiveCollider is listening for collision.
    addInteraction(method, target)
    {
        this.scene.matterCollision.addOnCollideActive({
            objectA: this.body,
            callback: method,
            context: this
        });
    }
}