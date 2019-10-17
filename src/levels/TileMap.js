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
                if (this.level[y][x] == 1 && !this.isArrayinArray(this.finishedLoadTile, [y, x]))
                {
                    this.setSurround(x, y);
                    //this.consoleLogLoadTile(this.finishedLoadTile);
                    //console.log(this.finishedLoadTile.includes([y, x]));
                    //console.log("--! searchTiles: y: " + y + "; x: " + x);
                }
            }
        }
        // console.log(finishLoadTile);
    }

    setSurround(fromTileX, fromTileY)
    {
        //Check across
        // console.log(currentWidth);
        let currentWidth = this.searchWide(fromTileX, fromTileY, -1);
        // console.log("CW: " + currentWidth);
        //Check below
        // var debugTimeRun = 0;
        let currentLength = 1;
        for (let y = fromTileY + 1; y < this.level.length; y++)
        {   
            // debugTimeRun++;
            // console.log("frTY: " + fromTileY + "; tll: " + this.level.length);
            // console.log("y: " + y + "; debugTime " + debugTimeRun + "; cw: " + currentWidth);
            if (this.searchWide(fromTileX, y, currentWidth) == currentWidth)
            {
                currentLength++;
                // console.log("CL: " + currentLength);
            } else 
            {
                break;
            }
        }
        // console.log("Out - debugTime: " + debugTimeRun);
        this.generateBounds(fromTileX, fromTileY, fromTileX + currentWidth - 1, fromTileY + currentLength - 1);
    }

    searchWide(fromX, atY, optionalWidth) //Return the max tiles width
    {
        let width = 0;

        for (let x = fromX; x < this.level[atY].length; x++)
        {
            if (this.level[atY][x] == 1 && !this.isArrayinArray(this.finishedLoadTile, [atY, x])) //If the tile is grass and not in finishedLoadTile
            {
                // console.log("-- searchWide: " + atY + ": " + x);
                width += 1;
                //console.log("STILL-ADD-WIDTH: " + width);
            }
            else // If the tile is not grass
            {
                //console.log("WIDTH-WHEN-NOT-GRASS: " + width);
                break;
                
            }
            if (width == optionalWidth)
            {
                //console.log("WIDTH-EQUAL: " + width);
                break;
            }
        }

        if (optionalWidth == -1 || width == optionalWidth)
        {
            for (let x = fromX; x < fromX + width; x++)
            {
                this.finishedLoadTile.push([atY, x]);
            }
        }

        // console.log("WIDTH-OUTSIDE: " + width);
        return width;
    }

    generateBounds(fromTileX, fromTileY, toTileX, toTileY)
    {
        //console.log("Generating Bounds...");
        let fromX = (fromTileX) *  this.tileWidth;
        let fromY = (fromTileY) * this.tileHeight;
        let toX = (toTileX + 1) * this.tileWidth;
        let toY = (toTileY + 1) * this.tileHeight; 
        let bodyWidth = toX - fromX;
        let bodyHeight = toY - fromY;
        let centerX = fromX + (bodyWidth / 2);
        let centerY = fromY + (bodyHeight / 2);
        // console.log("ft x: " + fromTileX + "; ft y: " + fromTileY);
        // console.log("tt x: " + toTileX + "; tt y: " + toTileY);
        // console.log("from x: " + fromX + "; from y: " + fromY + "; toX: " + toX + "; toY: " + toY);
        // console.log("center x: " + centerX + "; center y: " + centerY);
        this.scene.matter.add.rectangle(centerX, centerY, bodyWidth, bodyHeight, { isStatic: true});

        for (let y = fromTileY; y <= toTileY; y++)
        {
            for (let x = fromTileX; x <= toTileX; x++)
            {
                this.scene.add.image(this.tileWidth * (x + 1/2), this.tileHeight * (y + 1/2), this.imageKey);
                // console.log("y: " + y + "; x: " + x);
            }
        }
    }

    isArrayinArray(arr, item)
    {
        let item_as_string = JSON.stringify(item);
        let contains = arr.some(function(ele) {
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }


}