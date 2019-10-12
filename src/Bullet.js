export class Bullet extends Phaser.GameObjects.Sprite
{
    constructor(scene, target, fromX, fromY, toX, toY)
    {
        super(scene, fromX, fromY, 'bullet');

        //Add to Scene
        scene.add.existing(this);
        scene.projectileGroup.add(this);

        //Set a speed value
        let speed = 300;

        //Normalize Vector X, Y and Multiply by Speed
        let distX = toX - fromX;
        let distY = toY - fromY;
        let magnitude = Math.sqrt(distX * distX + distY * distY);
        let normalizeX = 0;
        let normalizeY = 0;

        if (magnitude > 0)
        {
            normalizeX = distX / magnitude;
            normalizeY = distY / magnitude;
        } else 
        {
            normalizeX = 1;
        }

        let vX = normalizeX * speed;
        let vY = normalizeY * speed;
        let radians = Math.atan2(vY, vX);

        //Settings
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(scene.platformGroup, this, this.destroy, null, this);
        this.body.setAllowGravity(false);
        this.body.setVelocity(vX, vY);
        this.setRotation(radians);
        this.body.allowRotation = true;
        this.body.rotation = radians; 

        if (target != null) {
            scene.physics.add.collider(target, this, this.hit, null, this);
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