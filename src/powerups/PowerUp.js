export class PowerUp extends Phaser.Physics.Matter.Image
{
    constructor(scene, imageKey, x, y)
    {
        super(scene.matter.world, x, y, imageKey);
        scene.add.existing(this);
        scene.statics.list.push(this);
        this.scene = scene;
        this.player = this.scene.player;
        this.setCollidesWith([2, this.player.category]);
    }

    activatePowers()
    { 
        //Add implementation here
    }

    stageMode()
    {}

    playMode()
    {}

    remove()
    {
        this.destroy();
        this.scene.statics.list.splice(this.scene.statics.list.indexOf(this), 1);
    }
}