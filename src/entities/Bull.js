import { Enemy } from "./Enemy.js";

export class Bull extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'bull', 20, 2);
    }

    shoot()
    { }
}