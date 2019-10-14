export class Platform extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'grass');
        scene.add.existing(this);
        scene.platformGroup.add(this);
        //Settings
        scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
    }
}