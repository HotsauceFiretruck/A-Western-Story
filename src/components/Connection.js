import { OtherPlayer } from "../entities/OtherPlayer.js";
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
        })

        socket.on('send-bullet', data => {
            const { x, y, to, player } = data;
            new Bullet(scene, otherPlayers[player], x, y, to.x, to.y, this.player);
        })

        socket.on('update-players', playersData => {
            let playersFound = {}
            // Iterate over all players
            for (let index in playersData) {
                const data = playersData[index]
                // In case a player hasn't been created yet
                // We make sure that we won't create a second instance of it
                if (otherPlayers[index] === undefined && index !== socket.id) {
                    otherPlayers[index] = new OtherPlayer(scene, data.x, data.y);
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
            player: player.playerName
        })
    }

    updatePosition(player) {
        let socket = this.socket;

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