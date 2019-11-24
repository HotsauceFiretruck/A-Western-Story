var cloudWidth = 52;
export class Cloud
{
    /*  scene: Scene (Level)
        centerX: X position in the Level
        centerY: Y position in the level
    */
    constructor(scene, centerX, centerY, levelWidth)
    {
        this.scene = scene;
        this.centerX = centerX;
        this.centerY = centerY;
        this.levelWidth = levelWidth;
        this.image = scene.add.image(centerX, centerY, 'cloud');
        scene.statics.list.push(this);
    }

    update()
    {
        if (!this.isOnStage)
        {
            this.centerX -= Math.sqrt(this.centerY) / 15;
            if(this.centerX < (cloudWidth / 2) * -1)
            {
                this.centerX = this.levelWidth + cloudWidth;
            }
            this.image.destroy();
            this.image = this.scene.add.image(this.centerX, this.centerY, 'cloud');
        }
    }

    remove()
    {
        this.image.destroy();
    }

    stageMode()
    {
        this.isOnStage = true;
        this.image.destroy();
    }

    playMode()
    {
        this.isOnStage = false;
    }
}