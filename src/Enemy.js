import { Bullet } from "./Bullet.js"

export class Enemy extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'enemy');
        this.player = scene.player;

        //Add to Group
        scene.enemies.list.push(this);
        scene.add.existing(this);

        //Status
        this.status = {
            health: 20,
            fireRange: 200,
            fireRate: .9, // 1 bullet every [fireRate] seconds
            isFireReloaded: true,
            distanceFromPlayer: 0,
            isPlayerInRange: false
        };

        //Add Collision Body
        let { Bodies} = scene.PhaserGame.MatterPhysics

        let mainBody = Bodies.rectangle
            (0, 0, this.width * 0.7, this.height, {chamfer: 10});
        
         //Setting Sprite
        this.setExistingBody(mainBody)
            .setMass(2)
            .setScale(1.5)
            .setPosition(x, y)
            .setFixedRotation()
            .setCollisionCategory(scene.enemies.category);
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

        //console.log(this.status.distanceFromPlayer + " " + this.status.isPlayerInRange);
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
        if (this.status.health <= 0)
        {
            this.status.health = 0;
            this.death();
        }
    }
    
    shoot()
    {
        new Bullet(this.scene, this.player, this.x, this.y, this.player.x, this.player.y);
    }

    death()
    {
        this.scene.matterCollision.removeOnCollideStart();
        this.scene.enemies.list.splice(this.scene.enemies.list.indexOf(this), 1);
        this.destroy();
    }
}