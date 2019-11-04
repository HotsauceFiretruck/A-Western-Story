export class DesktopController
{
    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;

        scene.input.on('pointerdown', (pointer) => { player.shoot(pointer.worldX, pointer.worldY)});

        this.cursors = scene.input.keyboard.addKeys ({
            up: 'W',
            left: 'A',
            right: 'D',
            down: 'S'
        });
    }

    update()
    {
        if (this.player.status.allowHorizontal)
        {
            if (this.cursors.left.isDown && 
                this.player.body.velocity.x > -this.player.status.maxVelocityX)
            {
                this.player.setFlipX(false);
                if (!this.player.status.isTouching.left) {
                    this.player.applyForce({ x: -this.player.status.moveForce, y: 0 });
                }
            }
            else if (this.cursors.right.isDown &&
                    this.player.body.velocity.x < this.player.status.maxVelocityX)
            {
                this.player.setFlipX(true);

                if (!this.player.status.isTouching.right) {
                    this.player.applyForce({ x: this.player.status.moveForce, y: 0 });
                }
            }
        }

        if (this.cursors.up.isDown && 
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
    }
}