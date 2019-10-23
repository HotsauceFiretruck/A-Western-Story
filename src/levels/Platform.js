export class Platform
{
    constructor(scene, centerX, centerY, bodyWidth, bodyHeight, category)
    {
        this.scene = scene;
        this.image = []
        this.MatterBody = scene.PhaserGame.MatterPhysics.Body;
        this.body = scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true});
        this.body.collisionFilter.category = category;
        this.status = {vX: 0, vY: 0, kinematic: false};
    }

    addSprite(width, height, fromTileX, fromTileY, toTileX, toTileY, image)
    {
        for (let y = fromTileY; y <= toTileY; y++)
        {
            for (let x = fromTileX; x <= toTileX; x++)
            {
                this.image.push(this.scene.add.image(width * (x + 1/2), height * (y + 1/2), image));
            }
        }
    }

    enableKinematic(vX, vY)
    {
        if (!this.status.kinematic)
        {
            this.status.vX = vX;
            this.status.vY = vY;
            this.status.kinematic = true;
            this.scene.events.on("update", this.update, this);
        }
    }

    disableKinematic()
    {
        if (this.status.kinematic)
        {
            this.status.vX = 0;
            this.status.vY = 0;
            this.status.kinematic = false;
            this.scene.events.off("update", this.update, this);
        }
    }

    update()
    {
        this.MatterBody.setVelocity(this.body, { x: this.status.vX, y: this.status.vY });
        this.MatterBody.setPosition(this.body, { x: this.body.position.x + this.status.vX, y: this.body.position.y + this.status.vY });
        for(let i = 0; i < this.image.length; ++i)
        {
            this.image[i].setX(this.status.vX + this.image[i].x);
            this.image[i].setY(this.status.vY + this.image[i].y);
        }
    }
}