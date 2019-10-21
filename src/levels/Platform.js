export class Platform
{
    constructor(scene, centerX, centerY, width, height, imageKey, type)
    {
        const {Body} = scene.PhaserGame.MatterPhysics;
        this.sprites = []
        this.body = scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: false});
    }

    addSprite(width, height, fromTileX, fromTileY, toTileX, toTileY)
    {
        
    }
}