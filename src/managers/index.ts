import AudioManager from "./AudioManager";
import MapManager from "./MapManager";

export interface Managers {
	audioManager: AudioManager;
	mapManager: MapManager;
}

export function getManagers(): Managers {
	return {
		audioManager: new AudioManager(),
		mapManager: new MapManager(),
	}
}
