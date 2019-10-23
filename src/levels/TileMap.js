import { Platform } from "./Platform.js";

export class TileMap
{
    constructor(scene, levelArray, tileWidth, tileHeight, imageKey)
    {
        this.scene = scene;
        this.level = levelArray;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.imageKey = imageKey;

        this.platforms = {
            category: 2,
            collision: [1, 4],
            list: []
        };

        this.finishedLoadTile = [];
        this.searchTiles();
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
                }
            }
        }
    }

    setSurround(fromTileX, fromTileY)
    {
        //Check across
        let currentWidth = this.searchWide(fromTileX, fromTileY, -1);

        //Check below
        let currentLength = 1;
        for (let y = fromTileY + 1; y < this.level.length; y++)
        {   
            if (this.searchWide(fromTileX, y, currentWidth) == currentWidth)
            {
                currentLength++;
            } 
            else 
            {
                break;
            }
        }

        this.generateBounds(fromTileX, fromTileY, fromTileX + currentWidth - 1, fromTileY + currentLength - 1);
    }

    searchWide(fromX, atY, optionalWidth) //Return the max tiles width
    {
        let width = 0;

        for (let x = fromX; x < this.level[atY].length; x++)
        {
            if (this.level[atY][x] == 1 && !this.isArrayinArray(this.finishedLoadTile, [atY, x])) //If the tile is grass and not in finishedLoadTile
            {
                width += 1;
            }
            else // If the tile is not grass
            {
                break;
            }
            if (width == optionalWidth)
            {
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
        return width;
    }

    generateBounds(fromTileX, fromTileY, toTileX, toTileY)
    {
        let fromX = (fromTileX) *  this.tileWidth;
        let fromY = (fromTileY) * this.tileHeight;
        let toX = (toTileX + 1) * this.tileWidth;
        let toY = (toTileY + 1) * this.tileHeight; 
        let bodyWidth = toX - fromX;
        let bodyHeight = toY - fromY;
        let centerX = fromX + (bodyWidth / 2);
        let centerY = fromY + (bodyHeight / 2);

        let platf = new Platform(this.scene, centerX, centerY, bodyWidth, bodyHeight, this.platforms.category);
        platf.addSprite(this.tileWidth, this.tileHeight, fromTileX, fromTileY, toTileX, toTileY, this.imageKey);
        
        this.platforms.list.push(platf);
    }

    enableKinematicAll(vX, vY)
    {
        for(let i = 0; i < this.platforms.list.length; ++i)
        {
            this.platforms.list[i].enableKinematic(vX, vY);
        }
    }

    disableKinematicAll()
    {
        for(let i = 0; i < this.platforms.list.length; ++i)
        {
            this.platforms.list[i].disableKinematic();
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