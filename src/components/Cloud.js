export class Cloud extends Phaser.Physics.Matter.Sprite
{
    /*  scene: Scene (Level)
        centerX: X position in the Level
        centerY: Y position in the level
    */
    constructor(scene, centerX, centerY)
    {
        super(scene.matter.world, centerX, centerY, "cloud");
        scene.add.existing(this);
        scene.clouds.list.push(this);
        this.scene = scene;
        this.centerX = centerX;
        this.centerY = centerY;

        let Bodies = scene.PhaserGame.MatterPhysics.Bodies;
        let mainBody = Bodies.rectangle(centerX, centerY, 52, 46, { isStatic: true, isSensor: false });
        this.setExistingBody(mainBody);
    }

    update()
    {
        this.centerX--;
        if(this.centerX < -26)
        {
            this.centerX = 100;
        }
        
        console.log("cloud update")
    }
}