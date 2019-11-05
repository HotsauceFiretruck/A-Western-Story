import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";

export class FinalEnemy extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'sheriff', 100, 3);

        this.healthSpriteBack = scene.add.sprite(402, 150, 'healthbarback'); 
        scene.add.existing(this.healthSpriteBack);
        this.healthSpriteBack.setFrame(0).setScrollFactor(0, 0);

        this.healthSpriteFront = scene.add.sprite(401, 38, 'healthbarfront'); 
        scene.add.existing(this.healthSpriteFront);
        this.healthSpriteFront.setFrame(0).setScrollFactor(0, 0);

        //The number 5 comes from the fact that the bullet damages enemy and player by 5 health points.
        this.DECREASE_BY = this.healthSpriteFront.displayWidth * 5 / this.status.health;
        console.log( this.DECREASE_BY + " " + this.healthSpriteFront.displayWidth + " " + this.status.health);
    }

    changeHealth(changeHealthBy)
    {
        super.changeHealth(changeHealthBy);
        this.healthSpriteFront.displayWidth -= this.DECREASE_BY;
        console.log( this.DECREASE_BY + " " + this.healthSpriteFront.displayWidth);
    }

}