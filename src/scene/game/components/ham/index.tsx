import { observer } from "mobx-react";
import React, {useEffect} from "react";

import classNames from "classnames/bind";
import styles from "./ham.module.scss";
import { useManagers } from "../../../../util/ManagerProvider";
import { DISTANCE } from "../../../../managers/GameManager";
import { GOAL, LAND, ROCK, SKELETON, SPIKE_TRAP, THORN } from "../../../../managers/MapManager";

const cx = classNames.bind(styles);

const Ham = () => {
	const {audioManager, gameManager} = useManagers();
	const {
		playMoveSound,
		playSpikeSound,
		playSuccessSound,
		playStoneKickSound,
	} = audioManager;

	useEffect(() => {
		console.log('rerender');
		focusHam();
		window.addEventListener("keydown", focusHam);
		return () => {
			window.removeEventListener("keydown", focusHam);
		};
	}, []);

	const focusHam = () => {
		document.getElementById("ham")?.focus();
	};

	const hamTakerStyle = {
		width: DISTANCE,
		height: DISTANCE,
		transform: `translate(${gameManager.coordinates.x * DISTANCE}px, ${
			gameManager.coordinates.y * DISTANCE
		}px)`,
	};

	const keyDown = (e: any) => {
		const {controllable, clear, reset, mapData, coordinates, setCoordinates} = gameManager;

		if (!controllable) return;
		clear && reset();
		switch (e.key) {
			case "ArrowUp":
				if (
					!mapData[coordinates.y - 1] ||
					!movable(coordinates.y - 1, coordinates.x, "UP")
				)
					return;
				setCoordinates({x: coordinates.x, y: coordinates.y - 1});
				break;
			case "ArrowDown":
				if (
					!mapData[coordinates.y + 1] ||
					!movable(coordinates.y + 1, coordinates.x, "DOWN")
				)
					return;
				setCoordinates({x: coordinates.x, y: coordinates.y + 1});
				break;
			case "ArrowLeft":
				if (
					!mapData[coordinates.x - 1] ||
					!movable(coordinates.y, coordinates.x - 1, "LEFT")
				)
					return;
				setCoordinates({x: coordinates.x - 1, y: coordinates.y});
				break;
			case "ArrowRight":
				if (
					!mapData[coordinates.x + 1] ||
					!movable(coordinates.y, coordinates.x + 1, "RIGHT")
				)
					return;
				setCoordinates({x: coordinates.x + 1, y: coordinates.y});
				break;
		}
	};

	const movable = (y: number, x: number, dir: string) => {
		const {reset, setIsSpike, setLife, clear, setClear, isSpike, life, mapData, coordinates} = gameManager;

		if (life - 1 < 0 || clear) {
			reset();
			return;
		}
		switch (mapData[y][x]) {
			case LAND:
				setIsSpike(!isSpike);
				setLife(life - 1);
				playMoveSound();
				return true;
			case THORN:
				setIsSpike(!isSpike);
				if (life - 2 < 0) {
					reset();
					return;
				}
				setLife(life - 2);
				playSpikeSound();
				return true;
			case GOAL:
				setIsSpike(!isSpike);
				setLife(life - 1);
				playMoveSound();
				playSuccessSound();
				setClear(true);
				return true;
			case SKELETON:
				return false;
			case SPIKE_TRAP:
				setIsSpike(!isSpike);
				if (!isSpike && life - 2 < 0) {
					reset();
					return;
				}

				if (isSpike) {
					playMoveSound();
					setLife(life - 1);
				} else {
					playSpikeSound();
					setLife(life - 2);
				}
				return true;
			case ROCK:
				if (moveRock(y, x, dir)) {
					setIsSpike(!isSpike);
					if (
						mapData[coordinates.y][coordinates.x] === SPIKE_TRAP &&
						!isSpike
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
		const {mapData} = gameManager;

		let dy = y;
		let dx = x;

		dir === "UP" && dy--;
		dir === "DOWN" && dy++;
		dir === "LEFT" && dx--;
		dir === "RIGHT" && dx++;

		//진행 방향의 앞칸에 돌 옮길 수 있는지 체크
		if (mapData[dy] && mapData[dy][dx]) {
			//진행 방향의 앞칸이 땅이나 가시, 트랩, 골일 경우 그 방향으로 돌 옮기기
			if (mapData[dy][dx] === LAND) {
				mapData[dy][dx] = ROCK;
				mapData[y][x] = LAND;
				playStoneKickSound();
				return true;
			}
		}
		return false;
	};

	return (
		<div
			id={"ham"}
			className={cx("ham")}
			tabIndex={0}
			onKeyDown={keyDown}
			style={hamTakerStyle}
		/>
	)
};

export default observer(Ham);
