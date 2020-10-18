import { ArenaLevel } from "./arena/ArenaLevel.js";
import { DeathScene } from "./interfaces/DeathScene.js";
import { PreloaderScene } from "./interfaces/PreloaderScene.js";
import { Connection } from "./arena/Connection.js";
import { ServerSelect } from "./arena/ServerSelect.js";
import { MenuScene } from "./interfaces/MenuScene.js";
import { LevelSelect } from "./interfaces/LevelSelect.js";
import { BonusLevelSelect } from "./interfaces/BonusLevelSelect.js";
import { PauseScene } from "./interfaces/PauseScene.js";
import { NameScene } from "./arena/NameScene.js";
import { ServerDisconnect } from "./arena/ServerDisconnect.js";
import { LevelTutorial } from "./campaign/LevelTutorial.js";
import { Level1 } from "./campaign/Level1.js";
import { Level1P2 } from "./campaign/Level1P2.js";
import { Level2 } from "./campaign/Level2.js";
import { Level3 } from "./campaign/Level3.js";
import { Level4 } from "./campaign/Level4.js";
import { Level5 } from "./campaign/Level5.js";
import { BonusLevel1 } from "./campaign/BonusLevel1.js";
import { BonusLevel2 } from "./campaign/Nic's_Bonus_Level.js";
import { BonusLevel4 } from "./campaign/BonusLevel4.js";

class SceneLoader {
    constructor() {
        this.scenes = [...this.loadInterfaces(), ...this.loadCampaign(), ...this.loadArena(), ...this.loadBonuses()];
    }

    loadInterfaces() {
        const interfaces = [
            new PreloaderScene(),
            new MenuScene(),
            new LevelSelect(),
            new BonusLevelSelect(),
            new PauseScene(),
            new DeathScene()
        ];

        return interfaces;
    }

    loadCampaign() {
        const campaign = [
            new LevelTutorial(),
            new Level1(),
            new Level1P2(),
            new Level2(),
            new Level3(),
            new Level4(),
            new Level5(),
        ];

        return campaign;
    }

    loadArena() {
        //Connection for arena
        const connection = new Connection();

        const arena = [
            new NameScene(connection),
            new ServerSelect(connection),
            new ArenaLevel(connection),
            new ServerDisconnect(connection),
        ];

        return arena;
    }

    loadBonuses() {
        const bonuses = [
            new BonusLevel1(),
            new BonusLevel2(),
            new BonusLevel4(),
        ];

        return bonuses;
    }


}

export default new SceneLoader();