import { Joystick } from "./JoystickConfigure.js";

export class MobileController
{
    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;

        scene.input.addPointer(4);

        this.movementControl = new Joystick(scene, 'base', 'thumb', 
                                200, 530, 120, {x: 325, y: 325});
        this.fireControl = new Joystick(scene, 'gunbase', 'thumb', 
                                        1065, 480, 60, {x: 165, y: 165});
    }

    update()
    {
        //Update Movements
        if (this.player.status.allowHorizontal)
        {
            if (this.movementControl.checkState())
            {
                if (this.movementControl.thumb.y > this.movementControl.centerY) 
                    this.movementControl.thumb.y = this.movementControl.centerY;

                let normalizedX = Math.cos(this.movementControl.getRotation());
                let speedScale = this.movementControl.getDistScale();

                if (this.movementControl.centerY - this.movementControl.thumb.y > 40)
                {
                    if (this.player.status.canJump && 
                        this.player.status.isTouching.down)
                    {
                        this.player.setVelocityY(-this.player.status.maxVelocityY);
                        this.player.status.canJump = false;
                        console.log(this.player.status.canJump)
                        this.scene.time.addEvent({
                            delay: 700,
                            callback: () => (this.player.status.canJump = true)
                        });
                    }
                }

                //If normalizedX is negative => left
                if (normalizedX <= 0 &&
                    this.movementControl.getRotation() < -(2*Math.PI / 3) &&
                    this.player.body.velocity.x > -this.player.status.maxVelocityX)
                {
                    this.player.setFlipX(false);
                    if (!this.player.status.isTouching.left) {
                        this.player.applyForce({ x: -this.player.status.moveForce * speedScale, y: 0 });
                    }
                }
                //If normalizedX is positive => right
                if (normalizedX > 0 &&
                    this.movementControl.getRotation() > -(Math.PI / 3) &&
                    this.player.body.velocity.x < this.player.status.maxVelocityX)
                {
                    this.player.setFlipX(true);
                    if (!this.player.status.isTouching.right) {
                        this.player.applyForce({ x: this.player.status.moveForce * speedScale, y: 0 });
                    }
                }
            }
        }

        //Update Shooting
        if (this.fireControl.checkState())
        {
            let normalizedY = Math.sin(this.fireControl.getRotation());
            let normalizedX = Math.cos(this.fireControl.getRotation());

            this.player.shoot(normalizedX + this.player.x, normalizedY + this.player.y);
        }
    }

    updateGun()
    {
        let normalizedY = Math.sin(this.fireControl.getRotation());
        let normalizedX = Math.cos(this.fireControl.getRotation());

        let rotation = Math.atan2(normalizedY, normalizedX);
        this.player.gun.setPosition(this.player.x + normalizedX * 35, this.player.y + normalizedY * 35);
        this.player.gun.setRotation(rotation);
        if (normalizedX < 0)
        {
            this.player.gun.setFlipY(true);
        } else
        {
            this.player.gun.setFlipY(false);
        }
    }

    disable()
    {
        this.movementControl.disable();
        this.fireControl.disable();
    }

    enable()
    {
        this.movementControl.enable();
        this.fireControl.enable();
    }
}

