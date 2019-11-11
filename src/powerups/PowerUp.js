export class PowerUp extends Phaser.Physics.Matter.Image
{
    constructor(scene, imageKey, x, y)
    {
        super(scene.matter.world, x, y, imageKey);
        scene.add.existing(this);
        this.scene = scene;
        //this.body.isSensor = true;
        this.player = this.scene.player;
        this.setCollidesWith([2, this.player.category]);
    }

    activatePowers()
    { 
        //Add implementation here
    }

}