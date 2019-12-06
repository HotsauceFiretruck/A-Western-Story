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
        if (!this.isOnStage && !this.removed)
        {
            this.centerX -= Math.sqrt(this.centerY) / 20;
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
        this.removed = true;
        this.image.destroy();
        this.scene.statics.list.splice(this.scene.statics.list.indexOf(this), 1);
    }

    stageMode()
    {
        this.isOnStage = true;
    }

    playMode()
    {
        this.isOnStage = false;
    }
}