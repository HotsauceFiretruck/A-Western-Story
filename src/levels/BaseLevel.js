export class Level extends Phaser.Scene
{
    constructor(PhaserGame)
    {
        this.PhaserGame = PhaserGame;
    }

    create()
    {
        let defaultTileMap = [];
        this.map = new TileMap(this, defaultTileMap, 32, 32, blockKey);

        this.projectiles = {category: 2, list: []};

        this.enemies = {category: 4, list: []};

        this.dialogTree = new DialogTree(this, 600, 100);
    }

    update()
    {
        
    }

    addTileMap(tileMap, blockKey)
    {
        this.map = new TileMap(this, tileMap, 32, 32, blockKey);
    }
}