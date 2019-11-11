import { Enemy } from "./Enemy.js";

export class Snake extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'snake', 15, undefined, 10);

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
            this.setVelocityX(this.status.maxVelocityX * mag * (Math.random() + .4));
        }

        if(this.status.isTouching.left || this.status.isTouching.right)
        {
            if (this.status.isTouching.down)
            {
                this.setVelocityY(-10);
            }
        }

        
    }

    damagePlayer()
    {
        this.setVelocityY(-10);
        this.player.changeHealth(-2);
    }

    shoot()
    { }
}