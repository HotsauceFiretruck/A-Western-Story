export class Platform
{
    constructor(scene, centerX, centerY, width, height, imageKey, type)
    {
        const {Body} = scene.PhaserGame.MatterPhysics;

        scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: false});
    }
}