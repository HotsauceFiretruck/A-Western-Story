export class Platform
{
    constructor(scene, x, y)
    {
        this.sprite = scene.matter.add.sprite(x, y, 'grass');
        scene.platformGroup.add(this.sprite);

        //Creating Collision Body
        let body = scene.PhaserGame.MatterPhysics.Bodies.rectangle
            (0, 0, this.sprite.width, this.sprite.height);
        //Setting Sprite
        this.sprite
            .setExistingBody(body)
            .setFixedRotation()
            .setStatic(true); 
            //.setPosition(x, y);
    }
}