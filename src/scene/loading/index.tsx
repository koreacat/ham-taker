import { SCENE } from "../../managers/SceneManager";
import { useManagers } from "../../util/ManagerProvider";

interface Loading {
	setScene: (scene: SCENE) => void;
}

const Loading = (props: Loading) => {
	const {sceneManager, audioManager} = useManagers();
	const {setScene} = props;

	const onClick = () => {
		audioManager.playHamTakerSound();
		setScene('GAME');
	};

	return (
		<div>
			<button onClick={onClick}>start</button>
		</div>
	)
};

export default Loading;
