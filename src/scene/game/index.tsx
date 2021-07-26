import React, {useState} from "react";
import GameController from "./gameController";
import Characters from "./characters";
import "./game.scss";
import {useManagers} from "../../util/ManagerProvider";
import {LandType, LAND, ROCK, THORN, GOAL, SPIKE_TRAP, SKELETON} from "../../managers/MapManager";
import Ham from "./ham";

export const DISTANCE = 50;

const startPoint = () => {
	return {x: 0, y: 0};
};

const Game = () => {
	const {audioManager, mapManager} = useManagers();
	const {
		playMoveSound,
		playSpikeSound,
		playSuccessSound,
		playStoneKickSound,
		playDeathSound,
		playScreenChangerPart1Sound,
		playScreenChangerPart2Sound,
	} = audioManager;

	const {stage01} = mapManager;

	const [clear, setClear] = useState(false);
	const [coordinates, setCoordinates] = useState(startPoint);
	const [life, setLife] = useState(20);
	const [spike, setSpike] = useState(false);
	const [failHeight, setFailHeight] = useState("0");
	const [failOpacity, setFailOpacity] = useState("0");
	const [controllable, setControllable] = useState(true);
	const [data, setData] = useState(stage01);

	const keyDown = (e: any) => {
		if (!controllable) return;
		clear && reset();
		switch (e.key) {
			case "ArrowUp":
				if (
					!data[coordinates.y - 1] ||
					!movable(coordinates.y - 1, coordinates.x, "UP")
				)
					return;
				setCoordinates({x: coordinates.x, y: coordinates.y - 1});
				break;
			case "ArrowDown":
				if (
					!data[coordinates.y + 1] ||
					!movable(coordinates.y + 1, coordinates.x, "DOWN")
				)
					return;
				setCoordinates({x: coordinates.x, y: coordinates.y + 1});
				break;
			case "ArrowLeft":
				if (
					!data[coordinates.x - 1] ||
					!movable(coordinates.y, coordinates.x - 1, "LEFT")
				)
					return;
				setCoordinates({x: coordinates.x - 1, y: coordinates.y});
				break;
			case "ArrowRight":
				if (
					!data[coordinates.x + 1] ||
					!movable(coordinates.y, coordinates.x + 1, "RIGHT")
				)
					return;
				setCoordinates({x: coordinates.x + 1, y: coordinates.y});
				break;
		}
	};

	const movable = (y: number, x: number, dir: string) => {
		if (life - 1 < 0 || clear) {
			reset();
			return;
		}
		switch (data[y][x]) {
			case LAND:
				setSpike(!spike);
				setLife(life - 1);
				playMoveSound();
				return true;
			case THORN:
				setSpike(!spike);
				if (life - 2 < 0) {
					reset();
					return;
				}
				setLife(life - 2);
				playSpikeSound();
				return true;
			case GOAL:
				setSpike(!spike);
				setLife(life - 1);
				playMoveSound();
				playSuccessSound();
				setClear(true);
				return true;
			case SKELETON:
				return false;
			case SPIKE_TRAP:
				setSpike(!spike);
				if (!spike && life - 2 < 0) {
					reset();
					return;
				}

				if (spike) {
					playMoveSound();
					setLife(life - 1);
				} else {
					playSpikeSound();
					setLife(life - 2);
				}
				return true;
			case ROCK:
				if (moveRock(y, x, dir)) {
					setSpike(!spike);
					if (
						data[coordinates.y][coordinates.x] === SPIKE_TRAP &&
						!spike
					) {
						playSpikeSound();
						setLife(life - 2);
					} else {
						setLife(life - 1);
					}
				}
				return false;
			default:
				return false;
		}
	};

	const moveRock = (y: number, x: number, dir: string) => {
		let dy = y;
		let dx = x;

		dir === "UP" && dy--;
		dir === "DOWN" && dy++;
		dir === "LEFT" && dx--;
		dir === "RIGHT" && dx++;

		//진행 방향의 앞칸에 돌 옮길 수 있는지 체크
		if (data[dy] && data[dy][dx]) {
			//진행 방향의 앞칸이 땅이나 가시, 트랩, 골일 경우 그 방향으로 돌 옮기기
			if (data[dy][dx] === LAND) {
				data[dy][dx] = ROCK;
				data[y][x] = LAND;
				playStoneKickSound();
				return true;
			}
		}
		return false;
	};

	const reset = () => {
		setControllable(false);
		// playDeathSound();
		failAnimation();
		setTimeout(function () {
			setData(stage01);
			setLife(20);
			setCoordinates({x: 0, y: 0});
			setClear(false);
			setSpike(false);
		}, 350);

		setTimeout(function () {
			setControllable(true);
		}, 3000);
	};

	const failAnimation = () => {
		setFailHeight("50%");
		playScreenChangerPart1Sound();
		setTimeout(function () {
			setFailOpacity("100");
		}, 350);

		setTimeout(function () {
			setFailOpacity("0");
			playScreenChangerPart2Sound();
		}, 2200);

		setTimeout(function () {
			setFailHeight("0");
		}, 2500);
	};

	const failStyle = {
		height: failHeight,
	};

	const failStyleCenter = {
		opacity: failOpacity,
	};

	return (
		<div className={"hamTaker"}>
			<div className={"hamTakerWrap"}>
				<div className={"map"}>
					<Ham
						keyDown={keyDown}
						coordinates={coordinates}
					/>
					{data.map((line, x) => {
						return (
							<div key={x} className={"mapTile"}>
								{line.map((point, y) => {
									return (
										<p
											key={x + "" + y}
											className={
												point === SPIKE_TRAP
													? spike
													? "spikeTrapOn"
													: "spikeTrapOff"
													: LandType[point]
											}
											style={{width: DISTANCE, height: DISTANCE}}
										/>
									);
								})}
							</div>
						);
					})}
					<h2 className={"life"}>{life}</h2>
				</div>
				<div
					className={"hamTakerSuccess"}
					style={{display: clear ? "block" : "none"}}
				>
					<div className={"hamTakerSuccessLeft"}/>
					<div className={"hamTakerSuccessRight"}/>
					<div className={"hamTakerSuccessSentence"}>
						<h3>GLORIOUS</h3>
						<h2>SUCCESS</h2>
					</div>
				</div>
				<div className={"hamTakerFail"}>
					<div className={"hamTakerFailUp"} style={failStyle}/>
					<div className={"hamTakerFailDown"} style={failStyle}/>
					<div className={"hamTakerFailCenter"} style={failStyleCenter}>
						<h2>HAMTAKER</h2>
					</div>
				</div>
				<GameController keyDown={keyDown} />
			</div>
			<Characters />
		</div>
	);
};

export default Game;
