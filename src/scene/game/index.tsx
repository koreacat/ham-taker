import "./game.scss";
import Map from "./map";
import Ham from "./ham";
import Life from "./life";
import Success from "./success";
import Fail from "./fail";
import GameController from "./gameController";
import Characters from "./characters";

const Game = () => {
	return (
		<div className={"hamTaker"}>
			<div className={"hamTakerWrap"}>
				<div className={"mapWrap"}>
					<Ham/>
					<Map/>
					<Life/>
				</div>
				<Success/>
				<Fail/>
				{/* <GameController keyDown={keyDown} /> */}
			</div>
			<Characters/>
		</div>
	);
};

export default Game;
