import { observer } from "mobx-react";
import { Scene } from "..";
import { useManagers } from "../../util/ManagerProvider";

interface Loading {
	setScene: (scene: Scene) => void;
}

const Loading = ({setScene}: Loading) => {
	const {audioManager} = useManagers();

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

export default observer(Loading);
