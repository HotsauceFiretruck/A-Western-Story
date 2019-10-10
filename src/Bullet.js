export class Bullet extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, vX, vY)
    {
        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        scene.projectiles.add(this);
        scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.body.velocity.x = vX;
        this.body.velocity.y = vY;
    }

    update()
    {
        if(this.x > 800 || this.y > 600 || this.y < 0 || this.x < 0){
            this.destroy();
        }
    }
}