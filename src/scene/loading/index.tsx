import { observer } from "mobx-react";
import { Scene } from "..";
import { useManagers } from "../../util/ManagerProvider";
import "./loading.scss";

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
		<div className={'loadingWrap'}>
			<button className={'startBtn'} onClick={onClick}>start</button>
		</div>
	)
};

export default observer(Loading);
