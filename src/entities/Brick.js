import { Enemy } from "./Enemy.js";
import { ExtraHealth } from "../powerups/ExtraHealth.js";
import { TripleShot } from "../powerups/TripleShot.js";
import { Flight } from "../powerups/Flight.js";

export class Brick extends Enemy
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'brick', 20);
    }

    moveAI()
    {
        console.log("Hi!");
    }

    shoot()
    {
        console.log("Hi!");
    }

    changeHealth(changeHealthBy)
    {
        this.status.health += changeHealthBy;
        if (this.status.health <= 0)
        {
            this.status.health = 0;
            if (Math.random() < .2)
            {
                new TripleShot(this.scene, 'tripleshot', this.x, this.y - 20);
            } else if (Math.random() < .9)
            {
                new ExtraHealth(this.scene, 'extrahealth', this.x, this.y - 20);
            } else if (Math.random() < 1)
            {
                new Flight(this.scene, 'flight', this.x, this.y - 20);
            }
            this.death();
        }
    }
}