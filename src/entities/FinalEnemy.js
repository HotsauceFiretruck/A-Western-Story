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

        this.status.fireRange = 600;

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

    shoot()
    {
        let startRadians = ((Math.PI / 8) /2) * (2);
        let startPoint = this.rotateAroundPoint([this.x, this.y], [this.player.x, this.player.y], startRadians);

        for (let i = 0; i < 3; ++i)
        {
            let nextPoint = this.rotateAroundPoint([this.x, this.y], startPoint, -(Math.PI / 8) * i);
            new Bullet(this.scene, this.player, this.x, this.y, nextPoint[0], nextPoint[1]);
        }
    }

    rotateAroundPoint(origin, point, angle)
    {
        let ox = origin[0];
        let oy = origin[1];
        let px = point[0];
        let py = point[1];
        let qx = ox + Math.cos(angle) * (px - ox) - Math.sin(angle) * (py - oy);
        let qy = oy + Math.sin(angle) * (px - ox) + Math.cos(angle) * (py - oy);
        return [qx, qy];
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