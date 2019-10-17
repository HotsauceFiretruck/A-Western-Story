import { Bullet } from "./Bullet.js"

export class Player extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'player')
        scene.add.existing(this);
        scene.cameras.main.startFollow(this, false, 0.5, 0.5);
        scene.cameras.main.setBounds(0, 0, 1000, 600);
    
        //Status
        this.status = {
            health: 20,
            maxVelocityX: 4,
            maxVelocityY: 8,
            moveForce: 0.01,
            isTouching: { left: false, right: false, down: false },
            canJump: true,
            jumpCooldownTimer: null
        };

        //Creating Collision Body and Sensors
        let { Body, Bodies} = scene.PhaserGame.MatterPhysics

        let mainBody = Bodies.rectangle
            (0, 0, this.width * 0.7, this.height, {chamfer: 10});
        
        this.sensors = {
            bottom: Bodies.rectangle(0, this.height * 0.5, this.width * 0.6, 2, { isSensor: true }),
            left: Bodies.rectangle(-this.width * 0.35, 0, 2, this.height * 0.5, { isSensor: true }),
            right: Bodies.rectangle(this.width * 0.35, 0, 2, this.height * 0.5, { isSensor: true })
        };

        let compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: .005
        });

        this.category = 1;

        //Add Events
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
            .setScale(2)
            .setFixedRotation()
            .setCollisionCategory(this.category);

        // Creating Controls/Cursors
        this.cursors = scene.input.keyboard.addKeys ({
            up: 'W',
            left: 'A',
            right: 'D'
        });

        scene.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.worldX, pointer.worldY);
        });

        //Creating Health Display
        this.healthSprite = scene.add.sprite(20, 20, 'hearts'); 
        scene.add.existing(this.healthSprite);
        this.healthSprite.setFrame(0);

        this.displayHealth = scene.add.text(30, 12, this.status.health, {color:'#DC143C'});
    }

    preload()
    {
        this.load.image('Skull', 'assets/Skull.png');
    }

    update()
    {
        //Update Controls/Cursors
        if (this.cursors.left.isDown && this.body.velocity.x > -this.status.maxVelocityX)
        {
            this.setFlipX(false);
            if (!this.status.isTouching.left) {
                this.applyForce({ x: -this.status.moveForce, y: 0 });
            }
        }
        else if (this.cursors.right.isDown && this.body.velocity.x < this.status.maxVelocityX)
        {
            this.setFlipX(true);

            if (!this.status.isTouching.right) {
                this.applyForce({ x: this.status.moveForce, y: 0 });
            }
        }

        if (this.cursors.up.isDown && this.status.canJump && this.status.isTouching.down)
        {
            this.setVelocityY(-this.status.maxVelocityY);
            this.canJump = false;
            this.jumpCooldownTimer = this.scene.time.addEvent({
                delay: 250,
                callback: () => (this.canJump = true)
            });
        }
        
        //Update health label position
        this.healthSprite.setPosition(20 + this.scene.cameras.main.worldView.x, 
                                      20 + this.scene.cameras.main.worldView.y);

        this.displayHealth.setPosition(30 + this.scene.cameras.main.worldView.x,
                                       12 + this.scene.cameras.main.worldView.y);
    }

    onSensorCollide({ bodyA, bodyB, pair }) {
        if (bodyB.isSensor) return;
        if (bodyA === this.sensors.left) {
          this.status.isTouching.left = true;
          if (pair.separation > 0.5) this.x += pair.separation - 0.5;
        } else if (bodyA === this.sensors.right) {
          this.status.isTouching.right = true;
          if (pair.separation > 0.5) this.x -= pair.separation - 0.5;
        } else if (bodyA === this.sensors.bottom) {
          this.status.isTouching.down = true;
        }
    }
    
    resetTouching() {
        this.status.isTouching.left = false;
        this.status.isTouching.right = false;
        this.status.isTouching.down = false;
    }

    changeHealth(changeHealthBy)
    {
        this.status.health += changeHealthBy;
        if (this.status.health < 0)
        {
            this.status.health = 0;
            //game over
        }
        if (this.status.health < 10)
        {
            this.healthSprite.setFrame(2);
        }
        this.displayHealth.setText(this.status.health);
        
    }

    death() {
        // Event listeners
        if (this.scene.matter.world) {
            this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
        }

        // Matter collision plugin
        const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];
        this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
        this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });

        if (this.jumpCooldownTimer) this.jumpCooldownTimer.destroy();

        // this.destroy();
    }
    
    create()
    {
        if (this.status.health == 0)
        {
            this.add.image(400, 300, 'Skull');
        }
    }

    shoot(x, y)
    {
        new Bullet(this.scene, this.scene.enemies, this.x, this.y, x, y);
    }
}