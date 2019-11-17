import { OtherPlayer } from "./OtherPlayer.js";
import { Bullet } from "../entities/Bullet.js";

export class Connection {

    constructor() {
        this.socket = io('https://western-server.herokuapp.com');
        this.otherPlayers = [];
    }

    getSocket() {
        return this.socket;
    }

    reload(player, scene) {
        this.socket.close();
        this.socket = io('https://western-server.herokuapp.com');
        this.connection(player, scene);
    }

    createText(scene, target, text, color) {
        let textObject = null;
        if (color !== undefined) {
            textObject = new Phaser.GameObjects.Text(scene, target.x, target.y, text, {
                fontSize: '12px',
                fill: color,
                align: 'center'
            })
        }
        else {
            textObject = new Phaser.GameObjects.Text(scene, target.x, target.y, text, {
                fontSize: '12px',
                fill: '#FFF',
                align: 'center'
            })
        }
        return textObject;
    }

    updateName(player) {
        player.nameText.x = player.x-65;
        player.nameText.y = player.y-35;
    }

    connection(player, scene) {
        let socket = this.socket;
        this.otherPlayers = [];
        let otherPlayers = this.otherPlayers;

        socket.close();
        socket.open();

        socket.on('connect', () => {
            socket.emit('new-player', {
                x: player.x,
                y: player.y,
                playerName: {
                    name: String(socket.id)
                },
                velocity: {
                    x: player.body.velocity.x,
                    y: player.body.velocity.y
                }
            })
            player.playerName = socket.id;
            player.nameText = this.createText(scene, player, player.playerName, "#1937ff");
            scene.add.existing(player.nameText);
        })

        socket.on('disconnect', () => {
            player.nameText.destroy();
        })

        socket.on('send-bullet', data => {
            const { x, y, to, playerData } = data;
            if (playerData === player.playerName) {
                new Bullet(scene, player, x, y, to.x, to.y, player);
            }
            else {
                new Bullet(scene, player, x, y, to.x, to.y, otherPlayers[player]);
            }
        })

        socket.on('update-players', playersData => {
            let playersFound = {}
            // Iterate over all players
            for (let index in playersData) {
                const data = playersData[index]
                // In case a player hasn't been created yet
                // We make sure that we won't create a second instance of it
                if (otherPlayers[index] === undefined && index !== socket.id) {
                    const newPlayer = new OtherPlayer(scene, data.x, data.y);
                    newPlayer.nameText = this.createText(scene, newPlayer, data.playerName.name, "#373737");
                    scene.add.existing(newPlayer.nameText);
                    otherPlayers[index] = newPlayer;
                }
            
                playersFound[index] = true;
            
                // Update players data
                if (index !== socket.id) {
                    // Update players target but not their real position
                    otherPlayers[index].target_x = data.x;
                    otherPlayers[index].target_y = data.y;
            
                    otherPlayers[index].velocity_target_x = data.velocity.x;
                    otherPlayers[index].velocity_target_y = data.velocity.y;
                }
            }
        
            // Check if there's no missing players, if there is, delete them
            for (let id in otherPlayers) {
                if (!playersFound[id]) {
                    otherPlayers[id].nameText.destroy();
                    otherPlayers[id].destroy();
                    delete otherPlayers[id];
                }
            }
        })
    }

    playerMovementInterpolation() {
        let otherPlayers = this.otherPlayers;

        for (let id in otherPlayers) {
          let player = otherPlayers[id]
          if (player.x !== undefined) {
            // Interpolate the player's position
            player.x += (player.target_x - player.x) * 0.30;
            player.y += (player.target_y - player.y) * 0.30;
            
            player.setVelocityX(player.body.velocity.x + (player.velocity_target_x - player.body.velocity.x)  * 0.30);
            player.setVelocityY(player.body.velocity.y + (player.velocity_target_y - player.body.velocity.y)  * 0.30);

            player.nameText.x = player.x-65;
            player.nameText.y = player.y-35;
          }
        }
      }

    sendBullet(fromX, fromY, toX, toY, player) {
        let socket = this.socket;

        socket.emit('new-bullet', {
            x: fromX,
            y: fromY,
            to: {
                x: toX,
                y: toY
            },
            playerData: player.playerName
        })
    }

    updatePosition(player) {
        let socket = this.socket;

        if (player.body.velocity.x != 0 || player.body.velocity.y != 0) {
            socket.emit('move-player', {
                x: player.x,
                y: player.y,
                playerName: {
                  name: String(socket.id)
                },
                velocity: {
                    x: player.body.velocity.x,
                    y: player.body.velocity.y
                }
            })
        }
    }
}