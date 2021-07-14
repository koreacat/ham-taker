import soundHamTaker from "../resources/audio/soundHamTaker.mp3";
import soundMove from "../resources/audio/soundMove.wav";
import soundSpikes from "../resources/audio/soundSpikes.wav";
import soundSuccess from "../resources/audio/soundSuccess.wav";
import soundStoneKick from "../resources/audio/soundStoneKick.wav";
import soundDeath from "../resources/audio/soundDeath.wav";
import soundChanger01 from "../resources/audio/soundChanger01.wav";
import soundChanger02 from "../resources/audio/soundChanger02.wav";

class AudioManager {
	private play = (sound: any) => {
		new Audio(sound).play();
	};

	playHamTakerSound = () => {
		this.play(soundHamTaker);
	};

	playMoveSound = () => {
		this.play(soundMove);
	};

	playSpikeSound = () => {
		this.play(soundSpikes);
	};

	playSuccessSound = () => {
		this.play(soundSuccess);
	};

	playStoneKickSound = () => {
		this.play(soundStoneKick);
	};

	playDeathSound = () => {
		this.play(soundDeath);
	};

	playScreenChangerPart1Sound = () => {
		this.play(soundChanger01);
	};

	playScreenChangerPart2Sound = () => {
		this.play(soundChanger02);
	};
}

export default AudioManager;
