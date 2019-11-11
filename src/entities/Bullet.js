import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";
import { ArenaPlayer } from "./ArenaPlayer.js";
import { OtherPlayer } from "./OtherPlayer.js";

export class Bullet
{
    /* scene: Scene (Level) (To add the bullet to the projectiles List)
       target: The target that this bullet meant for (Enemies/Other Players)
       fromX, fromY: Create bullet at this position
       toX, toY: The mouse position (This is only to set the velocity of the bullet.
                                     It is not for the bullet to be destroyed when it 
                                     reached the position)
     */
    constructor(scene, target, fromX, fromY, toX, toY, self)
    {
        this.scene = scene;
        this.target = target;
        this.sprite = scene.matter.add.sprite(fromX, fromY, 'bullet');
        
        //Add to Group
        scene.projectiles.list.push(this);

        //Add Collision Body using Phaser.Matter engine.
        let { Bodies} = scene.PhaserGame.MatterPhysics

        //Bodies.rectangle(x position IN the sprite, y position IN the sprite, 
        //                 width of the collision body, height of the collision body, {options});
        let mainBody = Bodies.rectangle
            (0, 0, this.sprite.width, this.sprite.height, {frictionAir: 0});

        //Add Collision Events
        scene.matterCollision.addOnCollideStart({
            objectA: this.sprite,
            // If it collides with the platforms -> destroy it immediately
            objectB: this.scene.map.platforms.list, 
            callback: this.destroy,
            context: this
        });

        scene.matterCollision.addOnCollideStart({
            objectA: this.sprite,
            // If it collides with anything else -> call the method hit
            callback: ({gameObjectB, bodyB}) => {
                if (bodyB.isSensor) return;
                this.hit(gameObjectB, self);
            },
            context: this
        });
        
        //Set a speed value
        let speed = 10;

        //Normalize Vector X, Y and Multiply by Speed
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

        let vX = normalizeX * speed;
        let vY = normalizeY * speed;

        let radians = Math.atan2(vY, vX);

        //Setting Sprite

        this.sprite
            .setExistingBody(mainBody)
            .setPosition(fromX+normalizeX*30, fromY+normalizeY*35)
            .setIgnoreGravity(true)
            .setVelocity(vX, vY)
            .setRotation(radians)
            .setFixedRotation()
            .setCollisionCategory(8)
            .setDepth(900)
            .setCollidesWith([2, 16]);

        if (target != null) {
            //Setting the collision category that this bullet will interacts with
            this.sprite.setCollidesWith([2, 16, target.category]); 
        }
    } 
      
    update()
    {
        //Checking if the bullet is out of level. If it is -> destroy it
        if (this.scene.cameras.main.worldView.width > this.scene.map.levelWidth &&
            this.sprite.x > this.scene.cameras.main.worldView.width)
        {
            this.destroy();
            return;
        } 
        else if (this.scene.cameras.main.worldView.width < this.scene.map.levelWidth)
        { 
            let xBound = this.sprite.x - this.scene.cameras.main.worldView.x;

            if(xBound > this.scene.map.levelWidth)
            {
                this.destroy();
                return;
            }
        }

        if (this.scene.cameras.main.worldView.height > this.scene.map.levelHeight &&
            this.sprite.y > this.scene.cameras.main.worldView.height)
        {
            this.destroy();
            return;
        }
        else if (this.scene.cameras.main.worldView.height < this.scene.map.levelHeight)
        {
            let yBound = this.sprite.y - this.scene.cameras.main.worldView.y;

            if(yBound > this.scene.map.levelHeight)
            {
                this.destroy();
                return;
            }
        }

        if(this.sprite.y < 0 || this.sprite.x < 0)
        {
            this.destroy();
            return;
        }
    }

    hit(target, self)
    {
        //If the bullet hits any collision targets -> destroy
        if (self !== undefined) {
            if (target != null && (target instanceof Enemy || target instanceof Player || target instanceof ArenaPlayer || target instanceof OtherPlayer) && target !== self) {
                target.changeHealth(-5);
            }
            this.destroy();
        }
        else {
            if (target != null && (target instanceof Enemy || target instanceof Player || target instanceof ArenaPlayer || target instanceof OtherPlayer)) {
                target.changeHealth(-5);
            }
            this.destroy();
        }
    }

    destroy()
    {   
        //Setting the conditions of destruction (removing the collision detectors and removing from scene list)
        //console.log("Bullet Destroyed!");
        this.scene.matterCollision.removeOnCollideStart();
        this.scene.projectiles.list.splice(this.scene.projectiles.list.indexOf(this), 1);
        this.sprite.destroy();
    }
}