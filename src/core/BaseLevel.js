import { Player } from "../entities/Player.js";
import { TileMap } from "../components/TileMap.js";
import { DialogTree } from "../interfaces/DialogTree.js";
import { Button } from "../entities/Button.js";

/*
    The base level for all levels
*/
export class BaseLevel extends Phaser.Scene {
    constructor(levelKey) {
        super({ key: levelKey });

    }

    create() {
        let defaultTileMap =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];

        this.map = new TileMap(this, 32, 32);

        this.images = [];

        this.projectiles = { category: 2, list: [] };

        this.enemies = { category: 4, list: [] };

        this.statics = { list: [] };

        this.player = new Player(this, 0, 0);

        this.createTileMap('grass', defaultTileMap);

        this.dialogTree = new DialogTree(this, 600, 100);

        let pauseButton = new Button(this, 1150, 45, 'pauseButton', () => {
            this.scene.pause(this.scene.key);
            this.scene.setVisible(false, this.scene.key);
            this.scene.launch('pause-scene', { scene: this.scene.key });
        }).setScale(2.25).setInteractive().setScrollFactor(0, 0);
    }

    update() {
        //Update bullets
        for (let i = 0; i < this.projectiles.list.length; i++) {
            this.projectiles.list[i].update();
        }

        //Update enemies
        for (let i = 0; i < this.enemies.list.length; i++) {
            this.enemies.list[i].update();
        }

        //Update all statics
        for (let i = 0; i < this.statics.list.length; i++) {
            this.statics.list[i].update();
        }

        //Update player
        this.player.update();
    }

    cameraFollowEntity(entity) {
        this.cameras.main.startFollow(entity, false, 0.5, 0.5);
        this.cameras.main.setBounds(0, 0, this.map.level[0].length * 32, this.map.level.length * 32);
    }

    setPlayer(player) {
        if (this.player != null) {
            this.player.destroy();
            this.player.gun.destroy();
            this.player.displayHealth.destroy();
        }
        this.player = player;
    }

    //Only use this when it is absolutely necessary
    getPlayer() {
        return this.player;
    }

    setPlayerPosition(x, y) {
        this.player.setPosition(x, y);
    }

    setPlayerHealth(health) {
        this.player.setHealth(health);
    }

    /*  Creating Level using an Array + Tile Map
        1 is for block/tile; 0 is for empty space
        Note: Each block/tile is 32 pixels wide and 32 pixels long
        A hypothetical level is 25 tiles wide by 19 tiles long
        Therefore, the hypothetical level is 800 pixels wide and 600 pixels long
    */
    createTileMap(tileImageKey, tileMap) //Note to self: tile image key needs to be change later
    {
        this.map.generateTileMap(tileImageKey, 32, 32, tileMap);
    }

    clearAllEnemies() {
        while (this.enemies.list.length > 0) {
            this.enemies.list[0].death();
        }
    }

    clearAllStaticEntities() {
        while (this.statics.list.length > 0) {
            this.statics.list[0].remove();
        }
    }

    clearAllPlatforms() {
        this.map.deleteAllPlatforms();
    }

    clearAllProjectiles() {
        for (let i = 0; i < this.projectiles.list.length; ++i) {
            this.projectiles.list[i].destroy();
        }
        this.projectiles.list = [];
    }

    addStaticImage(imageKey, x, y) {
        let image = this.add.image(x, y, imageKey).setDepth(-2);
        this.images.push(image);
        return image;
    }

    clearAllStaticImages() {
        for (let i = 0; i < this.images.length; ++i) {
            this.images[i].destroy();
        }
        this.images = [];
    }

    //Load in image to fill in the level
    /*
        backgroundImageKey: the image key
        imageWidth: the width of the image in pixels
        imageHeight: the height of the image in pixels
        levelWidth: the width of the level in pixels
        levelHeight: the height of the level in pixels
        scale: how large you what the image to be display onscreen
    */
    loopBackground(backgroundImageKey, imageWidth, imageHeight, scale) {
        let maxWidth = Math.max(this.cameras.main.worldView.width, this.map.level[0].length * 32);
        let maxHeight = Math.max(this.cameras.main.worldView.height, this.map.level.length * 32);

        let widthRatio = maxWidth / (imageWidth * scale); //Getting the ratio between level size and background image size
        let heightRatio = maxHeight / (imageHeight * scale);

        let numberOfWidth = Math.ceil(widthRatio);
        let numberOfHeight = Math.ceil(heightRatio);

        for (let w = 0; w < numberOfWidth; ++w) {
            for (let h = 0; h < numberOfHeight; ++h) {
                let backgroundImage = new Phaser.GameObjects.Image(this, 0, 0, backgroundImageKey);
                backgroundImage.setOrigin(0, 0).setScale(scale).setPosition(imageWidth * w * scale, imageHeight * h * scale).setDepth(-3);
                this.add.existing(backgroundImage);
                this.images.push(backgroundImage);
            }
        }
    }
}