import { Enemy } from "./Enemy.js";

export class Snake extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'snake', 20);
    }

    shoot()
    {
        //new Bullet(this.scene, this.player, this.x, this.y, this.player.x, this.player.y);
        console.log("Hi");
    }
}