export class Bullet extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, vX, vY, target)
    {
        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        scene.projectiles.add(this);
        scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.body.velocity.x = vX;
        this.body.velocity.y = vY;


        //Uncomment this and commment the bottom one to get the deflecting bullet effect
        //scene.physics.add.collider(this, scene.platforms);
        //scene.physics.add.collider(this, scene.player);
        if (target != null) {
            scene.physics.add.collider(target, this, this.hit, null, this); //bottom one
        }
    } 
      
    update()
    {
        if(this.x > 800 || this.y > 600 || this.y < 0 || this.x < 0){
            this.destroy();
        }
    }

    hit(target)
    {
        if (target != null) {
            target.changeHealth(-5);
            this.destroy();
        }
    }


}