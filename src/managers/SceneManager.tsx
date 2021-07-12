import { ReactElement } from "react";
import Game from "../scene/game";

class SceneManager {
	private _scene = <Game/>;

	get scene() {
		return this._scene
	};

	setScene = (scene: ReactElement) => {
		this._scene = scene;
	};

}

export default SceneManager;
