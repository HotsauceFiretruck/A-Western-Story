import { PowerUp } from "./PowerUp.js";

export class TripleShot extends PowerUp
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
                this.player.status.numOfBullets += 2;
                this.scene.time.addEvent({
                    delay: 5000,
                    callback: () => this.player.status.numOfBullets -= 2,
                    callbackScope: this.player,
                    loop: false
                })  
                this.scene.statics.list.splice(this.scene.statics.list.indexOf(this), 1);
                this.remove();
            },
            context: this
        });
    }
}