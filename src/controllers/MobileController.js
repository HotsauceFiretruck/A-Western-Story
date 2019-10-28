export class MobileController
{
    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;

        this.isThumbTouched = false;

        this.baseObject = scene.add.image(0, 0, 'base').setDisplaySize(90, 90);
        this.baseObject.setScrollFactor(0, 0);

        this.thumbObject = scene.add.image(0, 0, 'thumb').setDisplaySize(45, 45);
        this.thumbObject.setScrollFactor(0, 0).setInteractive();
        this.thumbObject.on('pointerdown', () => {this.isThumbTouched = true});
        this.thumbObject.on('pointerup', () => {this.isThumbTouched = false});

        this.joystick = scene.rexVirtualJoyStick.add(scene, {
            x: 90,
            y: scene.cameras.main.height - 90,
            radius: 30,
            base: this.baseObject,
            thumb: this.thumbObject,
            dir: '8dir'
        });

        //this.cursors = this.joystick.createCursorKeys();
    }

    update()
    {
        if (this.isThumbActive())
        {
            let normalizedY = Math.sin(this.joystick.rotation);
            let normalizedX = Math.cos(this.joystick.rotation);
            
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
            //console.log(normalizedX + ' ' + normalizedY);
        }
    }

    distanceFrom(tx, ty, fx, fy)
    {
        return Math.sqrt((ty - fy)*(ty - fy) + (tx - fx)*(tx - fx));
    }

    isThumbActive()
    {
        return (this.distanceFrom(this.thumbObject.x, this.thumbObject.y, 
                this.baseObject.x, this.baseObject.y) >= 28 && this.isThumbTouched);
    }
}

