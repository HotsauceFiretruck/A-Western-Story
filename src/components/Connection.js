import { OtherPlayer } from "../entities/OtherPlayer.js";
import { Bullet } from "../entities/Bullet.js";

export class Connection {

    constructor() {
        this.socket = io('https://western-server.herokuapp.com');
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
        let otherPlayers = [];

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
        })

        socket.on('send-bullet', data => {
            const { x, y, to } = data;
            new Bullet(scene, player, x, y, to.x, to.y);
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
                    otherPlayers[index].x = data.x;
                    otherPlayers[index].y = data.y;
            
                    otherPlayers[index].body.velocity.x = data.velocity.x;
                    otherPlayers[index].body.velocity.x = data.velocity.x;
                }
                //console.log(otherPlayers[index]);
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

    sendBullet(fromX, fromY, toX, toY) {
        let socket = this.socket;

        socket.emit('new-bullet', {
            x: fromX,
            y: fromY,
            to: {
                x: toX,
                y: toY
            }
        })
    }

    updateMovement(player) {
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