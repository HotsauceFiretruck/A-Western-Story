

export class Connection {

    constructor(server) {
        this.socket = io(server);
        this.otherPlayers = [];
        
        this.socket.close();
    }
    
    setup() {
        this.socket.on('connect', () => {
            this.socket.emit('new-player', {
                
            });
        });
    }
}

