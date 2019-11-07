import { ArenaPlayer } from "../entities/ArenaPlayer.js";

export class Connection {

    constructor() {
        this.socket = io('http://toxicserver.ddns.net:8123');
    }

    getSocket() {
        return this.socket;
    }

    connection(player, scene) {
        let socket = this.socket;
        let otherPlayers = {};

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

        socket.on('update-players', playersData => {
            let playersFound = {}
            // Iterate over all players
            for (let index in playersData) {
                const data = playersData[index]
                // In case a player hasn't been created yet
                // We make sure that we won't create a second instance of it
                if (otherPlayers[index] === undefined && index !== socket.id) {
                    const newPlayer = new ArenaPlayer(scene, data.x, data.y);
                    otherPlayers[index] = newPlayer;
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
            }
        
            // Check if there's no missing players, if there is, delete them
            for (let id in otherPlayers) {
                if (!playersFound[id]) {
                    //otherPlayers[id].deathOtherPlayer();
                    delete otherPlayers[id];
                }
            }
        })
    }
}