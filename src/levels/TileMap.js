export class TileMap
{
    constructor(scene, levelArray, tileWidth, tileHeight, imageKey)
    {
        this.scene = scene;
        this.level = levelArray;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.imageKey = imageKey;

        this.finishedLoadTile = [];
        this.searchTiles();
    }

    consoleLogLoadTile(array)
    {
        for (let i = 0; i < array.length; i++)
        {
            console.log("--x Array: " + array[i]);
        }
    }

    searchTiles()
    {
        for (let y = 0; y < this.level.length; y++)
        {
            for (let x = 0; x < this.level[y].length; x++)
            {
                if (this.level[y][x] == 1 && !this.finishedLoadTile.includes([y, x]))
                {
                    this.setSurround(x, y);
                    this.consoleLogLoadTile(this.finishedLoadTile);
                    console.log(this.finishedLoadTile.includes([y, x]));
                    console.log("--! searchTiles: y: " + y + "; x: " + x);
                }
            }
        }
        // console.log(finishLoadTile);
    }

    setSurround(fromX, fromY)
    {
        //Check across
        let currentWidth = this.searchWide(fromX, fromY, -1);

        //Check below
        let currentLength = 0;
        // for (let y = fromY + 1; y < this.level.length; y++)
        // {   
        //     debugTimeRun++;
        //     console.log(debugTimeRun);
        //     if (this.searchWide(fromX, y, finishedLoadTile, currentWidth) != currentWidth)
        //     {
        //         currentLength = y - 1 - fromY;
        //         return;
        //     }
        // }
        this.generateBounds(fromX, fromY, fromX + currentWidth, fromY + currentLength);
    }

    searchWide(fromX, atY, optionalWidth) //Return the max tiles width
    {
        let width = 0;

        for (let x = fromX; x < this.level[atY].length; x++)
        {
            if (this.level[atY][x] == 1 && !this.finishedLoadTile.includes([atY, x])) //If the tile is grass and not in finishedLoadTile
            {
                console.log("-- searchWide: " + atY + ": " + x);
                this.finishedLoadTile.push([atY, x]);
                width += 1;
            }
            else // If the tile is not grass
            {
                return width;
            }
            if (width == optionalWidth)
            {
                return width;
            }
        }
        return width;
    }

    generateBounds(fromTileX, fromTileY, toTileX, toTileY)
    {
        let fromX = fromTileX *  (this.tileWidth);
        let fromY = fromTileY * (this.tileHeight);
        let toX = (toTileX + 1) * (this.tileWidth);
        let toY = (toTileY + 1) * (this.tileHeight); 
        let bodyWidth = toX - fromX;
        let bodyHeight = toY - fromY;
        let centerX = fromX + (bodyWidth / 2);
        let centerY = fromY + (bodyHeight / 2);

        this.scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true});

        for (let y = fromTileY; y < toTileY + 1; y++)
        {
            for (let x = fromTileX; x < toTileX + 1; x++)
            {
                this.scene.add.image(this.tileWidth * (x + 1/2), this.tileHeight * (y + 1/2), this.imageKey);
            }
        }
    }


}