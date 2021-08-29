import "./game.scss";
import Map from "./components/map";
import Ham from "./components/ham";
import Life from "./components/life";
import Success from "./components/success";
import Fail from "./components/fail";
import GameController from "./components/gameController";
import Characters from "./components/characters";

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
