export class Platform
{
    /* scene: Scene (Level)
       collisionCategory: collision category (Always set to 2 please)
       fromTileX: Top-Left X Position of the Platform (In TILE UNITS)
       fromTileY: Top-Left Y Position of the Platform (In TILE UNITS)
       tileBodyWidth: The Width of the Platform (In TILE UNITS)
       tileBodyHeight: The Height of the Platform (In TILE UNITS)
       pixelWidthPerTile: The width of a single tile (In PIXEL UNITS) (Always set to 32 please)
       pixelHeightPerTile: The height of a single tile (In PIXEL UNITS) (Always set to 32 please)
    */
    constructor(scene, collisionCategory, 
                fromTileX, fromTileY, 
                tileBodyWidth, tileBodyHeight, 
                pixelWidthPerTile, pixelHeightPerTile)
    {
        //Doing maths to get the centerX, centerY, bodyWidth, bodyHeight IN PIXELS of the platform
        //This is to create the collision body of the platform in Phaser.Matter engine
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

        //Creating Collision Body in Phaser.Matter engine using the maths above
        this.MatterBody = scene.PhaserGame.MatterPhysics.Body;
        this.body = scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true});
        this.body.collisionFilter.category = collisionCategory;

        //In case of using a moving platform, use .enableKinematic(vX, vY)
        this.status = {vX: 0, vY: 0, kinematic: false};
    }

    //Add tile images to fill the collision body ("image" refers to the image key)
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

    //Enable one-way kinematic movements
    //If you want to simulate two-way kinematic body movements, 
    //disable kinematic body and enable it in the other direction.
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

    //Disable all movements
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

    enableDamage(changeHealthBy, target)
    {
        this.scene.matterCollision.addOnCollideActive({
            objectA: this.body,
            objectB: target,
            callback: () => target.changeHealth(changeHealthBy),
            context: this
        });
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