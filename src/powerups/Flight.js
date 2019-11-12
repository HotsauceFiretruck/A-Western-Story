import { PowerUp } from "./PowerUp.js";

export class Flight extends PowerUp
{
    constructor(scene, imageKey, x, y)
    {
        super(scene, imageKey, x, y);
        this.activatePowers();
    }

    activatePowers()
    {
        this.scene.matterCollision.addOnCollideStart({
            objectA: this,
            objectB: this.player,
            callback: () => {
                this.player.status.maxVelocityY = 17;
                this.player.status.maxVelocityX = 5;
                this.destroy();
            },
            context: this
        });
    }
}