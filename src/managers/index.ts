import AudioManager from "./AudioManager";
import MapManager from "./MapManager";
import SceneManager from "./SceneManager";

export interface Managers {
	sceneManager: SceneManager;
	audioManager: AudioManager;
	mapManager: MapManager;
}

export function getManagers(): Managers {
	return {
		sceneManager: new SceneManager(),
		audioManager: new AudioManager(),
		mapManager: new MapManager(),
	}
}
