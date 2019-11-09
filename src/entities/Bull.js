import { Enemy } from "./Enemy.js";

export class Bull extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'bull', 20, 3);
    }

    shoot()
    {
        //new Bullet(this.scene, this.player, this.x, this.y, this.player.x, this.player.y);
        console.log("Hi");
    }
}