export class Platform
{
    constructor(scene, collisionCategory, 
                fromTileX, fromTileY, 
                tileBodyWidth, tileBodyHeight, 
                pixelWidthPerTile, pixelHeightPerTile)
    {
        let fromX = (fromTileX) * pixelWidthPerTile;
        let fromY = (fromTileY) * pixelHeightPerTile; 
        let bodyWidth = (tileBodyWidth + 1) * pixelWidthPerTile;
        let bodyHeight = (tileBodyHeight + 1) * pixelHeightPerTile;
        let centerX = fromX + (bodyWidth / 2);
        let centerY = fromY + (bodyHeight / 2);

        this.pixelWidthPerTile = pixelWidthPerTile;
        this.pixelHeightPerTile = pixelHeightPerTile;
        this.fromTileY = fromTileY;
        this.fromTileX = fromTileX;
        this.toTileY = fromTileY + tileBodyHeight;
        this.toTileX = fromTileX + tileBodyWidth;

        //console.log("platform: " + bodyHeight + " " + bodyWidth + " " + centerX + " " + centerY);
        
        this.scene = scene;
        this.image = []

        this.MatterBody = scene.PhaserGame.MatterPhysics.Body;
        this.body = scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true});
        this.body.collisionFilter.category = collisionCategory;
        this.status = {vX: 0, vY: 0, kinematic: false};
    }

    addSprite(image)
    {
        for (let y = this.fromTileY; y <= this.toTileY; y++)
        {
            for (let x = this.fromTileX; x <= this.toTileX; x++)
            {
                this.image.push(this.scene.add.image(this.pixelWidthPerTile * (x + 1/2), 
                                                     this.pixelHeightPerTile * (y + 1/2), image));
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