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
			<div className={'textWrap'}>
				<span className={'text'}>당신은 주변이 심연으로 둘러싸인 것을 알아차립니다.</span>
				<button className={'startBtn'} onClick={onClick}>●</button>
			</div>
		</div>
	)
};

export default observer(Loading);
