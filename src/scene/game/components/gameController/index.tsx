import React from "react";
import classNames from "classnames/bind";
import styles from "./gameController.module.scss";

const cx = classNames.bind(styles);

interface GameControllerProps {
	keyDown: (e: any) => void;
}

const GameController = ({keyDown}: GameControllerProps) => {
	return (
		<div className={cx("gameControllerWrap")}>
			<div className={cx("buttonsWrap")}>
				<div
					className={cx("button", "up")}
					onClick={() => {
						keyDown({key: "ArrowUp"});
					}}
				/>
				<div
					className={cx("button", "down")}
					onClick={() => {
						keyDown({key: "ArrowDown"});
					}}
				/>
				<div
					className={cx("button", "left")}
					onClick={() => {
						keyDown({key: "ArrowLeft"});
					}}
				/>
				<div
					className={cx("button", "right")}
					onClick={() => {
						keyDown({key: "ArrowRight"});
					}}
				/>
			</div>
		</div>
	);
};

export default GameController;
