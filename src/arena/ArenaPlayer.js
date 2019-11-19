import { DesktopController } from "../controllers/DesktopController.js";
import { MobileController } from "../controllers/MobileController.js";

export class ArenaPlayer extends Phaser.Physics.Matter.Sprite
{
    /* scene: Scene (Level)
       x: X position of player in level (pixel unit)
       y: Y position of player in level (pixel unit)
    */
    constructor(scene, x, y, connection)
    {
        super(scene.matter.world, x, y, 'player');
        this.scene = scene;
        this.connection = connection;
        scene.add.existing(this);
        scene.cameras.main.startFollow(this, false, 0.5, 0.5);
        scene.cameras.main.setBounds(0, 0, scene.map.level[0].length * 32, scene.map.level.length * 32);

        //Status
        this.status = {
            health: 20,
            maxVelocityX: 3,
            maxVelocityY: 9,
            moveForce: 0.01,
            nodamage: false,
            isTouching: { left: false, right: false, down: false },
            canJump: true,
            fireRate: .3, // 1 bullet every [fireRate] seconds
            isFireReloaded: true,
            jumpCooldownTimer: null,
            allowHorizontal: true,
            allowMove: true,
        };

        //Creating Collision Body and Sensors using Phaser.Matter engine
        let { Body, Bodies} = scene.PhaserGame.MatterPhysics;

        //Bodies.rectangle(centerX position IN the sprite, centerY position IN the sprite, 
        //                 width of the collision body, height of the collision body, {options});
        let mainBody = Bodies.rectangle(0, 0, this.width * 0.7, this.height, {chamfer: 1});
        
        //Sensors: only for detecting, not for collision
        this.sensors = {
            bottom: Bodies.rectangle(0, this.height * 0.5, this.width * 0.4, 2, { isSensor: true }),
            left: Bodies.rectangle(-this.width * 0.35, 0, 2, this.height * 0.5, { isSensor: true }),
            right: Bodies.rectangle(this.width * 0.35, 0, 2, this.height * 0.5, { isSensor: true })
        };

        let compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.03,
            friction: .012
        });

        //Set collision category
        this.category = 16;

        //Add Collision Events
        scene.matter.world.on("beforeupdate", this.resetTouching, this);

        scene.matterCollision.addOnCollideStart({
            objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });

        scene.matterCollision.addOnCollideActive({
            objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });
        
        //Setting Sprite
        this.setExistingBody(compoundBody)
            .setPosition(x, y)
            .setMass(2)
            .setScale(1.5)
            .setFixedRotation()
            .setCollisionCategory(this.category)
            .setDepth(1);

        // Creating Controls/Cursors
        this.controller = scene.PhaserGame.isMobile ? new MobileController(scene, this) : new DesktopController(scene, this);

        //Creating Health Display
        this.healthSprite = scene.add.sprite(20, 20, 'hearts'); 
        scene.add.existing(this.healthSprite);
        this.healthSprite.setFrame(0).setScrollFactor(0, 0);

        this.displayHealth = scene.add.text(30, 12, this.status.health, {color:'#DC143C'});
        this.displayHealth.setScrollFactor(0, 0);
    }

    update()
    {
        if (this.status.allowMove)
        {
            //Update Controls/Cursors
            this.controller.update();
        }
        
        if (this.y > 600)
        {
            this.death();
        }
    }

    //Sensor Update: ({bodyA: this collision body, bodyB: that collision body, pair: both collision body})
    onSensorCollide({ bodyA, bodyB, pair }) {
        if (bodyB.isSensor) return;
        if (bodyA === this.sensors.left) 
        {
          this.status.isTouching.left = true;
          if (pair.separation > 0.5) this.x += pair.separation - 0.5;
        } 
        else if (bodyA === this.sensors.right) 
        {
          this.status.isTouching.right = true;
          if (pair.separation > 0.5) this.x -= pair.separation - 0.5;
        } 
        else if (bodyA === this.sensors.bottom) 
        {
          this.status.isTouching.down = true;
        }
    }
    
    resetTouching() {
        this.status.isTouching.left = false;
        this.status.isTouching.right = false;
        this.status.isTouching.down = false;
    }

    //Important for entities
    changeHealth(changeHealthBy)
    {
        this.status.health += changeHealthBy;
        if (changeHealthBy < 0 && this.status.nodamage)
        {
            this.status.health -= changeHealthBy;
        }
        if (changeHealthBy < 0 && !this.status.nodamage)
        {
            this.damagedEffects();
        }
        
        if (this.status.health < 0)
        {
            this.status.health = 0;
            //death() // game over
        }
        if (this.status.health < 10)
        {
            this.healthSprite.setFrame(2);
        }
        this.displayHealth.setText(this.status.health);
        if (this.status.health <= 0) 
        {
            this.death();
        }
    }

    damagedEffects()
    {
        this.alpha = .5;
        this.status.nodamage = true;
        let timer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => 
            {
                this.alpha = 1;
                this.status.nodamage = false;
            },
            callbackScope: this,
            loop: false
        });
        
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

    shoot(x, y)
    {
        if (this.status.isFireReloaded)
        {
            this.scene.connection.shootBullet(this.x, this.y, x, y, this)
            //new Bullet(this.scene, this, this.x, this.y, x, y);
            this.reloadGun();
        }
    }

    disableHorizontalMovement()
    {
        this.status.allowHorizontal = false;
    }

    enableHorizontalMovement()
    {
        this.status.allowHorizontal = true;
    }

    disableAllMovement()
    {
        this.status.allowMove = false;
    }

    enableAllMovement()
    {
        this.status.allowMove = true;
    }

    stageMode()
    {
        this.scene.cameras.main.stopFollow();
        this.disableAllMovement();
        this.healthSprite.setVisible(false);
        this.displayHealth.setVisible(false);
        if (this.scene.PhaserGame.isMobile)
        {
            this.controller.disable();
        } 
        else
        {
            this.controller.disableShoot();
        }
    }

    playMode()
    {
        this.scene.cameras.main.startFollow(this, false, 0.5, 0.5);
        this.enableAllMovement();
        this.healthSprite.setVisible(true);
        this.displayHealth.setVisible(true);
        if (this.scene.PhaserGame.isMobile)
        {
            this.controller.enable();
        } 
        else
        {
            this.controller.enableShoot();
        }
    }

    //Initializing death sequence
    death() {
        //Freeze our character and delete nametag
        this.stageMode();
        this.name.destroy();

        // Event listeners
        // if (this.scene.matter.world) {
        //     this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
        // }

        // Matter collision plugin
        // const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];
        // this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
        // this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });

        // if (this.jumpCooldownTimer) this.jumpCooldownTimer.destroy();

        this.scene.scene.start('arena-death', {scene: this.scene.scene.key});
        
        //this.destroy();
    }

    
}
