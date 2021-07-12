class AudioManager {
	private _moveSound = new Audio(require("../resources/audio/move.wav"));
	private _spikeSound = new Audio(require("../resources/audio/spikes.wav"));
	private _successSound = new Audio(require("../resources/audio/success.wav"));
	private _stoneKickSound = new Audio(require("../resources/audio/stone_kick.wav"));
	private _deathSound = new Audio(require("../resources/audio/death.wav"));
	private _screenChangerPart1Sound = new Audio(require("../resources/audio/screen_changer_part1.wav"));
	private _screenChangerPart2Sound = new Audio(require("../resources/audio/screen_changer_part2.wav"));

	playMoveSound = () => {
		this._moveSound.play();
	};

	playSpikeSound = () => {
		this._spikeSound.play();
	};

	playSuccessSound = () => {
		this._successSound.play();
	};

	playStoneKickSound = () => {
		this._stoneKickSound.play();
	};

	playDeathSound = () => {
		this._deathSound.play();
	};

	playScreenChangerPart1Sound = () => {
		this._screenChangerPart1Sound.play();
	};

	playScreenChangerPart2Sound = () => {
		this._screenChangerPart2Sound.play();
	};
}

export default AudioManager;
