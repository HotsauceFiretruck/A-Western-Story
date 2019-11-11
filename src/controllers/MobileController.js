import { Joystick } from "./JoystickConfigure.js";

export class MobileController
{
    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;

        scene.input.addPointer(4);

        this.horizontalControls = new Joystick(scene, 'base', 'thumb', 
                                        (150 * scene.PhaserGame.scale), 
                                        scene.cameras.main.height - (150 * scene.PhaserGame.scale), 
                                        90, 240);
        this.fireControl = new Joystick(scene, 'gunbase', 'thumb', 
                                        scene.cameras.main.width - (150 * scene.PhaserGame.scale), 
                                        scene.cameras.main.height - (150 * scene.PhaserGame.scale), 
                                        90, 240);
        this.jumpButton = scene.add.image(scene.cameras.main.width - (350 * scene.PhaserGame.scale), 
                          scene.cameras.main.height - (90 * scene.PhaserGame.scale), 'jump')
                          .setDisplaySize(120 * scene.PhaserGame.scale, 120 * scene.PhaserGame.scale).setScrollFactor(0, 0).setAlpha(.9)
                          .setInteractive().setDepth(10);
        this.jumpButton.on('pointerdown', () => {this.jump(player)});
    }

    jump(player)
    {
        if (player.status.canJump && 
            player.status.isTouching.down)
        {
            player.setVelocityY(-player.status.maxVelocityY);
            player.canJump = false;
            this.jumpCooldownTimer = this.scene.time.addEvent({
                delay: 250,
                callback: () => (player.canJump = true)
            });
        }
    }

    update()
    {
        //Update Movements
        if (this.player.status.allowHorizontal)
        {
            if (this.horizontalControls.checkState())
            {
                let normalizedX = Math.cos(this.horizontalControls.getRotation());
                let speedScale = this.horizontalControls.getDistScale();

                //If normalizedX is negative => left
                if (normalizedX <= 0 &&
                    this.player.body.velocity.x > -this.player.status.maxVelocityX)
                {
                    this.player.setFlipX(false);
                    if (!this.player.status.isTouching.left) {
                        this.player.applyForce({ x: -this.player.status.moveForce * speedScale, y: 0 });
                    }
                }
                //If normalizedX is positive => right
                if (normalizedX > 0 &&
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

            //console.log(normalizedX + " " + normalizedY);

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
        this.horizontalControls.disable();
        this.fireControl.disable();
        this.jumpButton.setVisible(false);
        this.jumpButton.removeAllListeners();
    }

    enable()
    {
        this.horizontalControls.enable();
        this.fireControl.enable();
        this.jumpButton.setVisible(true);
        this.jumpButton.on('pointerdown', () => {this.jump(player)});
    }
}

