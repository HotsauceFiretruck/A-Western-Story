import { OtherPlayer } from "./OtherPlayer.js";
import { Bullet } from "../entities/Bullet.js";

export class Connection {

    constructor() {
        //Init variables
        this.otherPlayers = [];
        this.firstSetup = true;
    }

    //Setup the server with an IP and options
    /*
        server: the ip of the server to connect to
    */
    setServer(server) {
        if (this.socket !== undefined) {
            this.socket.close();
        }
        let ioParams = {reconnection: true, reconnectionDelay: 3000, reconnectionAttempts: Number.MAX_VALUE, timeout: 7000}
        this.socket = io(server, ioParams);
        this.socket.close();
    }

    //Sets the player to the right player object
    /*
        scene: the scene the player is in
        player: our specified player
    */
    setupPlayer(scene, player) {
        this.player = player;
        this.player.name = this.createNameText(scene, this.player, "Connecting...", "#1937ff");
        scene.add.existing(this.player.name);
        if (!this.firstSetup) {
            this.player.name.text = String(this.socket.id);
        }
        this.updateTimer = scene.time.addEvent({
            delay: 80,
            callback: () => { this.movePlayer(this.player) },
            callbackScope: this,
            loop: true
        })
    }
    
    //Setup the socket listeners to listen to server requests
    /*
        scene: the scene to make events happen in
    */
    setupListeners(scene) {
        //don't setup the listeners more than once
        if (!this.firstSetup) {
            return;
        }
        this.firstSetup = false;

        //on first server connect
        this.socket.on('connect', () => {
            console.log("CONNECTED");
            //send new player info to the server
            this.socket.emit('new_player', {
                x: this.player.x,
                y: this.player.y,
                id: String(this.socket.id),
                velocity: {
                    x: this.player.body.velocity.x,
                    y: this.player.body.velocity.y
                }
            });
            //set the player name text of ourselves to our socket id (for now until name enter screen is made)
            this.player.name.text = String(this.socket.id);

            this.socket.emit()
        });

        //on disconnect from server
        this.socket.on('disconnect', (reason) => {
            console.log("DISCONNECTED");
            //set player name to show reconnect & retry connection
            this.player.stageMode();
            this.player.name.text = "Connecting...";
            this.socket.connect();
        });

        //on reconnect to server
        this.socket.on('reconnect', (attemptNumber) => {
            console.log("RECONNECTED");
            //send our player info to the server again
            this.socket.emit('new_player', {
                x: this.player.x,
                y: this.player.y,
                id: String(this.socket.id),
                velocity: {
                    x: this.player.body.velocity.x,
                    y: this.player.body.velocity.y
                }
            });
            this.player.name.text = String(this.socket.id);
        });

        this.socket.on('update_player', data => {

        });

        this.socket.on('update_players', data => {
            
        });

        this.socket.on('player_disconnect', data => {

        });

        //when our info is sent or we respawn the server will send us a random place to spawn
        this.socket.on('new_spawn', data => {
            //set player position and enable player
            this.player.x = data.x;
            this.player.y = data.y;
            this.player.playMode();
        });

        //when bullet comes from the server create it on client
        this.socket.on('new_bullet', data => {
            //putting data into variables
            const { x, y, to, id } = data;

            //if we are the player the bullet came from
            if (id === String(this.socket.id)) {
                //make bullet that can't damage us
                new Bullet(scene, this.player, x, y, to.x, to.y, this.player);
            }
            else {
                //make bullet from another player that can damage us
                new Bullet(scene, this.player, x, y, to.x, to.y, this.otherPlayers[id]);
            }
        });

        //open the connection after listeners are setup
        this.socket.open();
    }

    //Returns an object that can be used to display player names
    /*
        scene: the scene to create the text object
        target: the target player to attach the name to
        text: the text of the text object
        color: the color of the text object
    */
    createNameText(scene, target, text, color) {
        let textObject = null;
        if (color !== undefined) {
            textObject = new Phaser.GameObjects.Text(scene, target.x, target.y, text, {
                fontSize: '12px',
                fill: color,
                align: 'center'
            }).setOrigin(0.5);
        }
        else {
            textObject = new Phaser.GameObjects.Text(scene, target.x, target.y, text, {
                fontSize: '12px',
                fill: '#FFF',
                align: 'center'
            }).setOrigin(0.5);
        }
        return textObject;
    }

    //Send a bullet to the server from our player
    /*
        fromX: where to start the bullet (our player)
        fromY: where to start the bullet (our player)
        toX: direction to send the bullet (our cursor)
        toY: direction to send the bullet (our cursor)
        player: the player it came from
    */
    shootBullet(fromX, fromY, toX, toY, player) {
        this.socket.emit('shoot_bullet', {
            x: fromX,
            y: fromY,
            to: {
                x: toX,
                y: toY
            },
            id: String(this.socket.id)
        })
    }

    //Tell the server to move our player on other clients
    movePlayer() {
        if (Math.round(this.player.body.velocity.x) != 0 || Math.round(this.player.body.velocity.y) != 0) {
            this.socket.emit('move_player', {
                x: Math.round(this.player.x),
                y: Math.round(this.player.y),
                id: String(this.socket.id),
                velocity: {
                    x: parseFloat(this.player.body.velocity.x.toFixed(2)),
                    y: parseFloat(this.player.body.velocity.y.toFixed(2))
                }
            })
        }
    }

    //Main update function updated with the scene
    //Used to update positions of nametags
    //Used to interpolate the positions of other players
    update() {
        for (let id in this.otherPlayers) {
            let player = this.otherPlayers[id]
            if (player.x !== undefined && player.body !== undefined) {
                let smoothness = 0.18;
    
                // Interpolate the player's position
                player.x += (player.target_x - player.x) * smoothness;
                player.y += (player.target_y - player.y) * smoothness;
                
                player.setVelocityX(player.body.velocity.x + (player.velocity_target_x - player.body.velocity.x) * smoothness);
                player.setVelocityY(player.body.velocity.y + (player.velocity_target_y - player.body.velocity.y) * smoothness);
    
                player.name.x = player.x;
                player.name.y = player.y-30;
            }
        }

        this.player.name.x = this.player.x;
        this.player.name.y = this.player.y-30;
    }
}