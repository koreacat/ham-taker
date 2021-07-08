import React from "react";

interface GameControllerProp {
    keyDown: (e: any) => void;
}

const GameController = ({keyDown}: GameControllerProp) => {
	return (
		<div className={"hamTakerButtonWrap"}>
			<div className={"hamTakerButton"}>
				<div
					className={"hamTakerUpButton"}
					onClick={() => {
						keyDown({ key: "ArrowUp" });
					}}
				/>
				<div
					className={"hamTakerDownButton"}
					onClick={() => {
						keyDown({ key: "ArrowDown" });
					}}
				/>
				<div
					className={"hamTakerLeftButton"}
					onClick={() => {
						keyDown({ key: "ArrowLeft" });
					}}
				/>
				<div
					className={"hamTakerRightButton"}
					onClick={() => {
						keyDown({ key: "ArrowRight" });
					}}
				/>
			</div>
		</div>
	);
};

export default GameController;
