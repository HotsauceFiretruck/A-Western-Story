import { Bullet } from "./Bullet.js"

export class Player
{
    constructor(scene, x, y)
    {
        this.sprite = scene.matter.add.sprite(x, y, 'player');
        
        //Status
        this.status = {
            health: 20
        };

        //Creating Collision Body
        let { Body, Bodies} = scene.PhaserGame.MatterPhysics

        let mainBody = Bodies.rectangle
            (0, 0, this.sprite.width * 0.7, this.sprite.height, {chamfer: 10});
        
        this.sensors = {
            bottom: Bodies.rectangle(0, this.sprite.height * 0.5, this.sprite.width * 0.25, 2, { isSensor: true }),
            left: Bodies.rectangle(-this.sprite.width * 0.35, 0, 2, this.sprite.height * 0.5, { isSensor: true }),
            right: Bodies.rectangle(this.sprite.width * 0.35, 0, 2, this.sprite.height * 0.5, { isSensor: true })
        };

        const compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: .1
        });
        
        //Setting Sprite
        this.sprite
            .setExistingBody(compoundBody)
            .setPosition(x, y)
           // .setMass(2)
            .setScale(2)
            .setFixedRotation();

        // Creating Controls/Cursors
        this.cursors = scene.input.keyboard.addKeys ({
            up: 'W',
            left: 'A',
            right: 'D'
        });

        scene.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
        });

        //Creating Health Display
        this.healthSprite = scene.add.sprite(20, 20, 'hearts'); 
        scene.add.existing(this.healthSprite);
        this.healthSprite.setFrame(0);

        this.displayHealth = scene.add.text(30, 12, this.status.health, {color:'#DC143C'});
    }

    update()
    {
        const moveForce = 0.01;

        //Update Controls/Cursors
        if (this.cursors.left.isDown)
        {
            this.sprite.setFlipX(true);
            this.sprite.applyForce({ x: -moveForce, y: 0 });
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.setFlipX(false);
            this.sprite.applyForce({ x: moveForce, y: 0 });
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.setVelocityY(-5);
        }
        
        //Set Maximum Velocity
        if (this.sprite.body.velocity.x > 5) this.sprite.setVelocityX(5);
        else if (this.sprite.body.velocity.x < -5) this.sprite.setVelocityX(-5);

        //this.sprite.body.velocity.y = 0;
        if (this.sprite.body.velocity.y < 0)
        {
            //this.sprite.body.velocity.y = 0;
            console.log(this.sprite.body.velocity.y + "--- x: " +  this.sprite.x + ", y: " +  this.sprite.y);
        }

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
    
    shoot(x, y)
    {
        // new Bullet(this.scene, this.scene.enemyGroup, this.x, this.y, x, y);
    }
}