import { OtherPlayer } from "../entities/OtherPlayer.js";
import { Bullet } from "../entities/Bullet.js";

export class Connection {

    constructor(server) {
        this.server = server;
        this.socket = io(server);
        this.otherPlayers = [];
        this.isSetup = false;

        this.socket.close();
    }

    getSocket() {
        return this.socket;
    }

    reload(player, scene) {
        this.socket.close();
        this.socket = io(this.server);
        this.connection(player, scene);
    }

    firstSetup(scene, player) {
        this.isSetup = true;

        this.socket.on('connect', () => {
            this.socket.emit('new-player', {
                x: player.x,
                y: player.y,
                playerName: {
                    name: String(this.socket.id)
                },
                velocity: {
                    x: player.body.velocity.x,
                    y: player.body.velocity.y
                }
            })
            player.playerName = this.socket.id;
            player.nameText = this.createText(scene, player, player.playerName, "#1937ff");
            scene.add.existing(player.nameText);
        })

        this.socket.on('disconnect', () => {
            player.nameText.destroy();
        })

        this.socket.on('incoming-bullet', data => {
            const { x, y, to, playerData } = data;
            if (playerData === player.playerName) {
                new Bullet(scene, player, x, y, to.x, to.y, player);
            }
            else {
                new Bullet(scene, player, x, y, to.x, to.y, this.otherPlayers[player]);
            }
        })

        this.socket.on('update-players', playersData => {
            let playersFound = {}
            // Iterate over all players
            for (let index in playersData) {
                const data = playersData[index]
                // In case a player hasn't been created yet
                // We make sure that we won't create a second instance of it
                if (this.otherPlayers[index] === undefined && index !== this.socket.id) {
                    const newPlayer = new OtherPlayer(scene, data.x, data.y);
                    newPlayer.nameText = this.createText(scene, newPlayer, data.playerName.name, "#373737");
                    scene.add.existing(newPlayer.nameText);
                    this.otherPlayers[index] = newPlayer;
                }
            
                playersFound[index] = true;
            
                // Update players data
                if (index !== this.socket.id) {
                    // Update players target but not their real position
                    this.otherPlayers[index].target_x = data.x;
                    this.otherPlayers[index].target_y = data.y;
            
                    this.otherPlayers[index].velocity_target_x = data.velocity.x;
                    this.otherPlayers[index].velocity_target_y = data.velocity.y;
                }
            }
        
            // Check if there's no missing players, if there is, delete them
            for (let id in this.otherPlayers) {
                if (!playersFound[id]) {
                    this.otherPlayers[id].nameText.destroy();
                    this.otherPlayers[id].destroy();
                    delete otherPlayers[id];
                }
            }
        })
        
        this.socket.close();
        this.socket.open();
    }

    sceneSetup(scene, player) {
        console.log("SETUP CALLED", this.socket.connected);

        player.playerName = this.socket.id;
        player.nameText = this.createText(scene, player, player.playerName, "#1937ff");
        scene.add.existing(player.nameText);

        let timer = scene.time.addEvent({
            delay: 80,
            callback: () => {this.updatePosition(player); console.log(player.x, player.y)},
            callbackScope: this,
            loop: true
        });
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

    update(player) {
        if (this.socket.connected && !player.isDead) {
            player.nameText.x = player.x-65;
            player.nameText.y = player.y-35;

            this.playerMovementInterpolation();
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

    playerMovementInterpolation() {
        for (let id in this.otherPlayers) {
          let player = this.otherPlayers[id]
          if (player.x !== undefined) {
            let smoothness = 0.18;

            // Interpolate the player's position
            player.x += (player.target_x - player.x) * smoothness;
            player.y += (player.target_y - player.y) * smoothness;
            
            player.setVelocityX(player.body.velocity.x + (player.velocity_target_x - player.body.velocity.x) * smoothness);
            player.setVelocityY(player.body.velocity.y + (player.velocity_target_y - player.body.velocity.y) * smoothness);

            player.nameText.x = player.x-65;
            player.nameText.y = player.y-35;
          }
        }
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