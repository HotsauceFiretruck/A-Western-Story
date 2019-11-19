export class Joystick
{
    constructor(scene, baseImageKey, thumbImageKey, x, y, rad, size)
    {
        this.centerX = x;
        this.centerY = y; //scene.cameras.main.height - 150;
        this.rad = rad;

        this.isThumbTouched = false;
        this.isBaseTouched = false;

        this.base = scene.add.image(0, 0, baseImageKey).setDisplaySize(size, size).setAlpha(.85);
        this.base.setScrollFactor(0, 0).setInteractive().setDepth(5);
        this.base.on('pointerdown', () => { this.isBaseTouched = true});
        this.base.on('pointerup', () => { this.isBaseTouched = false});;

        this.thumb = scene.add.image(0, 0, thumbImageKey).setDisplaySize(size / 2, size / 2);
        this.thumb.setScrollFactor(0, 0).setInteractive().setDepth(5);
        this.thumb.on('pointerdown', () => { this.isThumbTouched = true});
        this.thumb.on('pointerup', () => { this.isThumbTouched = false});

        this.joystick = scene.rexVirtualJoyStick.add(scene, {
            x: this.centerX,
            y: this.centerY,
            radius: this.rad,
            base: this.base,
            thumb: this.thumb,
        });
    }

    checkState()
    {
        //console.log(this.pointer.isDown);
        if (!this.isThumbTouched && !this.isBaseTouched) 
        {
            this.thumb.x = this.centerX;
            this.thumb.y = this.centerY;
        }
        else if (this.isBaseTouched)
        {
            this.isThumbTouched = true;
        }

        return (this.distanceFrom(this.thumb.x, this.thumb.y, 
            this.base.x, this.base.y) >= this.rad - (this.rad / 1.1) && this.isThumbTouched);
    }

    distanceFrom(tx, ty, fx, fy)
    {
        return Math.sqrt((ty - fy)*(ty - fy) + (tx - fx)*(tx - fx));
    }

    getRotation()
    {
        return this.joystick.rotation;
    }

    getDistScale()
    {
        return this.distanceFrom(this.thumb.x, this.thumb.y, this.centerX, this.centerY) / this.rad;
    }

    disable()
    {
        this.base.setVisible(false);
        this.thumb.setVisible(false);
    }

    enable()
    {
        this.base.setVisible(true);
        this.thumb.setVisible(true);
    }
}