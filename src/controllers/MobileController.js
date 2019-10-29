import { Joystick } from "./JoystickConfigure.js";

export class MobileController
{
    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;

        this.moveControls = new Joystick(scene, 'base', 'thumb', 
                                        (150 * scene.PhaserGame.scale), 
                                        scene.cameras.main.height - (150 * scene.PhaserGame.scale), 
                                        90, 240);
        this.fireControl = new Joystick(scene, 'gunbase', 'thumb', 
                                        scene.cameras.main.width - (150 * scene.PhaserGame.scale), 
                                        scene.cameras.main.height - (150 * scene.PhaserGame.scale), 
                                        90, 240);
    }

    update()
    {
        //Update Movements
        if (this.moveControls.checkState())
        {
            let normalizedY = Math.sin(this.moveControls.getRotation());
            let normalizedX = Math.cos(this.moveControls.getRotation());
            
            //If normalizedY is negative => jump
            if (normalizedY < 0 && 
                this.player.status.canJump && 
                this.player.status.isTouching.down)
            {
                this.player.setVelocityY(-this.player.status.maxVelocityY);
                this.player.canJump = false;
                this.jumpCooldownTimer = this.scene.time.addEvent({
                    delay: 250,
                    callback: () => (this.player.canJump = true)
                });
            }
            //If normalizedX is negative => left
            if (normalizedY > -(Math.sqrt(3))/2 && normalizedX <= 0 &&
                this.player.body.velocity.x > -this.player.status.maxVelocityX)
            {
                this.player.setFlipX(false);
                if (!this.player.status.isTouching.left) {
                    this.player.applyForce({ x: -this.player.status.moveForce, y: 0 });
                }
            }
            //If normalizedX is positive => right
            if (normalizedY > -(Math.sqrt(3))/2 && normalizedX > 0 &&
                this.player.body.velocity.x < this.player.status.maxVelocityX)
            {
                this.player.setFlipX(true);
                if (!this.player.status.isTouching.right) {
                    this.player.applyForce({ x: this.player.status.moveForce, y: 0 });
                }
            }
        }

        //Update Shooting
        if (this.fireControl.checkState())
        {
            let normalizedY = Math.sin(this.fireControl.getRotation());
            let normalizedX = Math.cos(this.fireControl.getRotation());

            //console.log(normalizedX + " " + normalizedY);

            this.player.shoot(normalizedX + this.player.x, normalizedY + this.player.y);
        }
    }
}

