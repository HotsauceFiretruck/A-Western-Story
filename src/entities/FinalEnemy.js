import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";

export class FinalEnemy extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'sheriff', 120, 5, undefined, .8);

        this.healthSpriteBack = scene.add.sprite(602, 150, 'healthbarback'); 
        scene.add.existing(this.healthSpriteBack);
        this.healthSpriteBack.setFrame(0).setScrollFactor(0, 0);

        this.healthSpriteFront = scene.add.sprite(601, 38, 'healthbarfront'); 
        scene.add.existing(this.healthSpriteFront);
        this.healthSpriteFront.setFrame(0).setScrollFactor(0, 0);

        //The number 5 comes from the fact that the bullet damages enemy and player by 5 health points.
        this.DECREASE_BY = this.healthSpriteFront.displayWidth * 5 / this.status.health;

        this.status.fireRange = 320;

        this.setDepth(0);
    }

    moveAI()
    {
        if(this.status.isTouching.left)
        {
            if (this.status.maxVelocityX < 0)
            {
                this.status.maxVelocityX = -this.status.maxVelocityX;
            }
        }
        else if(this.status.isTouching.right)
        {
            if (this.status.maxVelocityX > 0)
            {
                this.status.maxVelocityX = -this.status.maxVelocityX;
            }
        }
        this.setVelocityX(this.status.maxVelocityX * .5);
    }

    changeHealth(changeHealthBy)
    {
        super.changeHealth(changeHealthBy);
        this.healthSpriteFront.displayWidth -= this.DECREASE_BY;
    }

    death()
    {
        if(this.scene != undefined)
        {
            this.scene.matterCollision.removeOnCollideStart();
            const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];
            this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
            this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });
            this.scene.enemies.list.splice(this.scene.enemies.list.indexOf(this), 1);
        }
        this.destroy();
        this.healthSpriteBack.destroy();
        this.healthSpriteFront.destroy();
    }
}