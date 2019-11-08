import { Enemy } from "./Enemy.js";

export class Snake extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'snake', 100, 3);
    }
}