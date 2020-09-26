class BrowserInfo {
    constructor() {
        this.mobile = false;
        this.android = false;
        this.apple = false;
        this.desktop = false;
    }

    getBrowserInfo(game) {
        if (game.device.os.android ||
            game.device.os.iOS ||
            game.device.os.iPad ||
            game.device.os.iPhone ||
            game.device.os.windowsPhone) {
            BrowserInfo.mobile = true;
        }
        if (game.device.os.iOS || game.device.os.iPhone) {
            BrowserInfo.apple = true
        }
        else if (game.device.os.android) {
            BrowserInfo.androis = true
        }

        this.desktop = !this.mobile;
    }
}

export default new BrowserInfo();