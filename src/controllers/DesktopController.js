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
            down: 'S',
            space: 'SPACE'
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

        if ((this.cursors.up.isDown || this.cursors.space.isDown) && 
            this.player.status.canJump && 
            this.player.status.isTouching.down)
        {
            this.player.setVelocityY(-this.player.status.maxVelocityY);
            this.player.status.canJump = false;
            this.scene.time.addEvent({
                delay: 700,
                callback: () => (this.player.status.canJump = true)
            });
        }
    }

    updateGun()
    {
        let norm = this.normalization(this.player.x, this.player.y, 
            this.scene.input.mousePointer.worldX, this.scene.input.mousePointer.worldY);
        let rotation = Math.atan2(norm[1], norm[0]);
        this.player.gun.setPosition(this.player.x + norm[0] * 35, this.player.y + norm[1] * 35);
        this.player.gun.setRotation(rotation);
        if (norm[0] < 0)
        {
            this.player.gun.setFlipY(true);
        } else
        {
            this.player.gun.setFlipY(false);
        }
    }

    normalization(fromX, fromY, toX, toY)
    {
        let distX = toX - fromX;
        let distY = toY - fromY;
        let magnitude = Math.sqrt(distX * distX + distY * distY);
        let normalizeX = 0;
        let normalizeY = 0;

        if (magnitude > 0)
        {
            normalizeX = distX / magnitude;
            normalizeY = distY / magnitude;
        } else 
        {
            normalizeX = 1;
        }

        return [normalizeX, normalizeY];
    }

    disableShoot()
    {
        this.scene.input.off('pointerdown');
    }

    enableShoot()
    {
        this.scene.input.on('pointerdown', (pointer) => { this.player.shoot(pointer.worldX, pointer.worldY)});
    }

    disable() {}

    enable() {}
}