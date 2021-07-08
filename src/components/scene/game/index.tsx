import React, {useEffect, useState} from "react";
import GameController from "../../gameController";
import Characters from "../../characters";
import "./game.scss";

enum LandType {
	space,
	land,
	rock,
	thorn,
	goal,
	spikeTrap,
	skeleton,
}

const startPoint = () => {
	return {x: 0, y: 0};
};

const {
	space: SPACE,
	land: LAND,
	rock: ROCK,
	thorn: THORN,
	goal: GOAL,
	spikeTrap: SPIKE_TRAP,
	skeleton: SKELETON,
} = LandType;

const stage = () => {
	return [
		[LAND, THORN, SPACE, LAND, LAND, LAND],
		[LAND, ROCK, LAND, LAND, ROCK, LAND],
		[LAND, LAND, SPACE, THORN, SPIKE_TRAP, THORN],
		[SPIKE_TRAP, SKELETON, LAND, ROCK, LAND, SPIKE_TRAP],
		[THORN, SKELETON, LAND, LAND, ROCK, LAND],
		[SPIKE_TRAP, SPACE, THORN, SPACE, SPIKE_TRAP, ROCK],
		[THORN, SKELETON, ROCK, THORN, ROCK, LAND],
		[SPIKE_TRAP, LAND, LAND, ROCK, LAND, GOAL]
	];
}

const Game = () => {
	const distance = 50;
	const [clear, setClear] = useState(false);
	const [coordinates, setCoordinates] = useState(startPoint);
	const [life, setLife] = useState(20);
	const [spike, setSpike] = useState(false);
	const [failHeight, setFailHeight] = useState("0");
	const [failOpacity, setFailOpacity] = useState("0");
	const [controllable, setControllable] = useState(true);
	const [data, setData] = useState(stage);

	useEffect(() => {
		window.addEventListener("keydown", event);
		return () => {
			window.removeEventListener("keydown", event);
		};
	});

	const event = () => {
		document.getElementById("ham")?.focus();
	};

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
			case LandType.land:
				setSpike(!spike);
				setLife(life - 1);
				let moveSound01 = new Audio(require("../../../resources/audio/move.wav"));
				moveSound01.play();
				return true;
			case LandType.thorn:
				setSpike(!spike);
				if (life - 2 < 0) {
					reset();
					return;
				}
				setLife(life - 2);
				let spikesSound01 = new Audio(require("../../../resources/audio/spikes.wav"));
				spikesSound01.play();
				return true;
			case LandType.goal:
				setSpike(!spike);
				setLife(life - 1);
				let moveSound02 = new Audio(require("../../../resources/audio/move.wav"));
				moveSound02.play();

				let successSound = new Audio(require("../../../resources/audio/success.wav"));
				successSound.play();
				setClear(true);
				return true;
			case LandType.skeleton:
				return false;
			case LandType.spikeTrap:
				setSpike(!spike);
				if (!spike && life - 2 < 0) {
					reset();
					return;
				}

				if (spike) {
					let moveSound03 = new Audio(require("../../../resources/audio/move.wav"));
					moveSound03.play();
					setLife(life - 1);
				} else {
					let spikesSound02 = new Audio(require("../../../resources/audio/spikes.wav"));
					spikesSound02.play();
					setLife(life - 2);
				}
				return true;
			case LandType.rock:
				if (moveRock(y, x, dir)) {
					setSpike(!spike);
					if (
						data[coordinates.y][coordinates.x] === LandType.spikeTrap &&
						!spike
					) {
						let spikesSound = new Audio(require("../../../resources/audio/spikes.wav"));
						spikesSound.play();
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
			if (data[dy][dx] === LandType.land) {
				data[dy][dx] = LandType.rock;
				data[y][x] = LandType.land;
				let stoneSound = new Audio(require("../../../resources/audio/stone_kick.wav"));
				stoneSound.play();
				return true;
			}
		}
		return false;
	};

	const reset = () => {
		setControllable(false);
		// let deathSound = new Audio(require('./sound/death.wav'));
		// deathSound.play();
		failAnimation();
		setTimeout(function () {
			setData(stage);
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
		let part1Sound = new Audio(require("../../../resources/audio/screen_changer_part1.wav"));
		part1Sound.play();

		setTimeout(function () {
			setFailOpacity("100");
		}, 350);

		setTimeout(function () {
			setFailOpacity("0");
			let part2Sound = new Audio(require("../../../resources/audio/screen_changer_part2.wav"));
			part2Sound.play();
		}, 2200);

		setTimeout(function () {
			setFailHeight("0");
		}, 2500);
	};

	const hamTakerStyle = {
		width: distance,
		height: distance,
		transform: `translate(${coordinates.x * distance}px, ${
			coordinates.y * distance
		}px)`,
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
					<div
						id={"ham"}
						className={"ham"}
						tabIndex={0}
						onKeyDown={keyDown}
						style={hamTakerStyle}
					/>
					{data.map((line, x) => {
						return (
							<div key={x} className={"mapTile"}>
								{line.map((point, y) => {
									return (
										<p
											key={x + "" + y}
											className={
												point === LandType.spikeTrap
													? spike
													? "spikeTrapOn"
													: "spikeTrapOff"
													: LandType[point]
											}
											style={{width: distance, height: distance}}
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
