import React from "react";
import {DISTANCE} from "../index";

interface Ham {
	keyDown: any;
	coordinates: any;
}

const Ham = (props: Ham) => {
	const {keyDown, coordinates} = props;

	const hamTakerStyle = {
		width: DISTANCE,
		height: DISTANCE,
		transform: `translate(${coordinates.x * DISTANCE}px, ${
			coordinates.y * DISTANCE
		}px)`,
	};

	return (
		<div
			id={"ham"}
			className={"ham"}
			tabIndex={0}
			onKeyDown={keyDown}
			style={hamTakerStyle}
		/>
	)
};

export default Ham;