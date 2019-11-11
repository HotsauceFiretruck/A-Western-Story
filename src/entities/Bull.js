import { Enemy } from "./Enemy.js";

export class Bull extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'bull', 50, 3, 6);
        this.scene.matterCollision.addOnCollideStart({
            objectA: this,
            objectB: this.player,
            callback: this.damagePlayer,
            context: this
        });
    }

    moveAI()
    {
        if (Math.abs(this.player.x - this.x) > 20)
        {
            let mag = (this.player.x - this.x) / Math.abs(this.player.x - this.x); 
            this.setVelocityX(this.status.maxVelocityX * mag * 2 * (Math.random() + .4));
        }

        if(this.status.isTouching.left || this.status.isTouching.right)
        {
            if (this.status.isTouching.down)
            {
                this.setVelocityY(-10);
            }
        }

        if (this.body.velocity.x < 0)
        {
            this.setFlipX(true);
        } else
        {
            this.setFlipX(false);
        }
    }

    damagePlayer()
    {
        this.status.maxVelocityX = 1;
        this.scene.time.addEvent({
            delay: 5000,
            callback: () => this.status.maxVelocityX = 3,
            callbackScope: this,
            loop: false
        });
        this.player.changeHealth(-6);
        this.player.setVelocityX(((this.player.x - this.x) * 5) / Math.abs(this.player.x - this.x));
        this.player.setVelocityY(-10);
    }

    shoot()
    { }
}