import { action, observable } from "mobx";

export type SCENE = 'LOADING' | 'GAME';

class SceneManager {
	@observable private _scene: SCENE = 'LOADING';

	@action
	get scene() {
		return this._scene
	};

	@action
	setScene = (scene: SCENE) => {
		this._scene = scene;
	};

	@action
	startGame = () => {
		this._scene = 'GAME';
	};

}

export default SceneManager;
