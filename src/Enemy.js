import { Bullet } from "./Bullet.js"

export class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'enemy');
        this.player = scene.player;

        scene.add.existing(this);
        scene.enemyGroup.add(this);

        //Status
        this.status = {
            health: 20,
            fireRange: 200,
            fireRate: .9, // 1 bullet every [fireRate] seconds
            isFireReloaded: true,
            distanceFromPlayer: 0,
            isPlayerInRange: false
        };

        //Settings
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.platformGroup);
        this.body.setCollideWorldBounds(true);
        this.body.drag.setTo(120, 30);
        this.body.setMaxVelocity(160, 250);
        this.body.setMass(10);
        this.setScale(2);
    }
    
    statusUpdate()
    {
        this.status.distanceFromPlayer = Math.sqrt((this.x - this.player.x) * (this.x - this.player.x) + 
                                                   (this.y - this.player.y) * (this.y - this.player.y));
        
        if (this.status.distanceFromPlayer <= this.status.fireRange)
        {
            this.status.isPlayerInRange = true;
        } else
        {
            this.status.isPlayerInRange = false;
        }

        // console.log(this.status.distanceFromPlayer + " " + this.status.isPlayerInRange);
    }

    reloadGun()
    {
        this.status.isFireReloaded = false;
        let timer = this.scene.time.addEvent({
            delay: this.status.fireRate * 1000,
            callback: () => this.status.isFireReloaded = true,
            callbackScope: this,
            loop: false
        });
    }

    update()
    {
        this.statusUpdate();

        // console.log(this.status.isFireReloaded);
        // console.log(this.status.isPlayerInRange + " " + this.status.isFireReloaded);
        if (this.status.isPlayerInRange && this.status.isFireReloaded)
        {
            this.shoot();
            this.reloadGun();
        }
    }

    changeHealth(changeHealthBy)
    {
        this.status.health += changeHealthBy;
        if (this.status.health < 0)
        {
            this.status.health = 0;
            this.destroy();
            //game over
        }
    }
    
    shoot()
    {
        new Bullet(this.scene, this.player, this.x, this.y, this.player.x, this.player.y);
    }
}