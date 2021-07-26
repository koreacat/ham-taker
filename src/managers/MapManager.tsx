export enum LandType {
	SPACE,
	LAND,
	ROCK,
	THORN,
	GOAL,
	SPIKE_TRAP,
	SKELETON,
}

export const {SPACE, LAND, ROCK, THORN, GOAL, SPIKE_TRAP, SKELETON} = LandType;

const stageParser = (stage: LandType[][]) => {
	return JSON.parse(JSON.stringify(stage));
};

class MapManager {
	private _stage01 = [
		[LAND, THORN, SPACE, LAND, LAND, LAND],
		[LAND, ROCK, LAND, LAND, ROCK, LAND],
		[LAND, LAND, SPACE, THORN, SPIKE_TRAP, THORN],
		[SPIKE_TRAP, SKELETON, LAND, ROCK, LAND, SPIKE_TRAP],
		[THORN, SKELETON, LAND, LAND, ROCK, LAND],
		[SPIKE_TRAP, SPACE, THORN, SPACE, SPIKE_TRAP, ROCK],
		[THORN, SKELETON, ROCK, THORN, ROCK, LAND],
		[SPIKE_TRAP, LAND, LAND, ROCK, LAND, GOAL]
	];

	get stage01(): LandType[][] {
		return stageParser(this._stage01);
	}


}

export default MapManager;
