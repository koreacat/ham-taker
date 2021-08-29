import AudioManager from "./AudioManager";
import GameManager from "./GameManager";
import MapManager from "./MapManager";

export interface Managers {
	audioManager: AudioManager;
	mapManager: MapManager;
	gameManager: GameManager;
}

export function getManagers(): Managers {
	return {
		audioManager: new AudioManager(),
		mapManager: new MapManager(),
		gameManager: new GameManager()
	}
}
