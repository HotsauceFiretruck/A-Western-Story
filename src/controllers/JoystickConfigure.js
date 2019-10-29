export class Joystick
{
    constructor(scene, baseImageKey, thumbImageKey, x, y, rad, size, pointer)
    {
        let scale = scene.PhaserGame.scale;

        this.pointer = pointer;

        this.centerX = x;
        this.centerY = y; //scene.cameras.main.height - 150;
<<<<<<< HEAD
        this.rad = rad;
        this.pointer = pointer;
=======
        this.rad = rad * scale;
>>>>>>> cf99856c9134540fadba75b47479eeab7d50554b

        this.isThumbTouched = false;
        this.isBaseTouched = false;

        this.base = scene.add.image(0, 0, baseImageKey).setDisplaySize(size * scale, size * scale);
        this.base.setScrollFactor(0, 0).setInteractive();
<<<<<<< HEAD
        this.base.on(pointer.isDown, () => { this.isBaseTouched = true});
        this.base.on(pointer.isUp, () => { this.isBaseTouched = false});;
=======
        this.base.on('pointerdown', () => {this.isBaseTouched = true});
        //this.base.on('pointerup', () => {this.isBaseTouched = true});;
>>>>>>> cf99856c9134540fadba75b47479eeab7d50554b

        this.thumb = scene.add.image(0, 0, thumbImageKey).setDisplaySize((size / 2) * scale, (size / 2) * scale);
        this.thumb.setScrollFactor(0, 0).setInteractive();
<<<<<<< HEAD
        this.thumb.on(pointer.isDown, () => { this.isThumbTouched = true});
        this.thumb.on(pointer.isUp, () => { this.isThumbTouched = false});
=======
        this.thumb.on('pointerdown', () => {this.isThumbTouched = true});
        //this.thumb.on('pointerup', () => {this.isThumbTouched = true});
>>>>>>> cf99856c9134540fadba75b47479eeab7d50554b

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
            this.base.x, this.base.y) >= this.rad - 5 && this.isThumbTouched);
    }



    distanceFrom(tx, ty, fx, fy)
    {
        return Math.sqrt((ty - fy)*(ty - fy) + (tx - fx)*(tx - fx));
    }

    getRotation()
    {
        return this.joystick.rotation;
    }
}