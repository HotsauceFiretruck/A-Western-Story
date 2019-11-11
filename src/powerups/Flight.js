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
                this.scene.time.addEvent({
                    delay: 10000,
                    callback: () => 
                    {
                        this.player.status.maxVelocityY = 9;
                        this.player.status.maxVelocityX = 3;
                    },
                    callbackScope: this.player,
                    loop: false
                })
                this.destroy();
            },
            context: this
        });
    }
}