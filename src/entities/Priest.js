import { Enemy } from "./Enemy.js";
import { Cross } from "./Cross.js";

export class Priest extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'priest', 100, 3);
    }

    shoot()
    {
        new Cross(this.scene, this.player, this.x, this.y, this.player.x, this.player.y);
    }
}