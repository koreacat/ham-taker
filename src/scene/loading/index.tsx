import { observer } from "mobx-react";
import { Scene } from "..";
import { ArrowButton } from "./components/ArrowButton";
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
			<div className={'cover'}/>
			<div className={'textWrap'}>
				<span className={'text'}>당신은 주변이 심연으로 둘러싸인 것을 알아차립니다.</span>
				<span className={'text'}>아무 버튼을 눌러 계속하기.</span>
				<ArrowButton onClick={onClick}/>
			</div>
		</div>
	)
};

export default observer(Loading);
