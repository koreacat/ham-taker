import { action, observable } from "mobx";
import MapManager, { LandType } from "./MapManager";

export const DISTANCE = 50;

class GameManager {
    @observable private _controllable = true;
    @observable private _clear = false;
    @observable private _isFail = false;
    @observable private _isSpike = false;
    @observable private _mapData: LandType[][] = MapManager._stage01;
    @observable private _life: number = 20;
    @observable private _coordinates: {x: number; y: number} = {x: 0, y: 0};

    get controllable() {
        return this._controllable; 
    }

    setControllable = (value: boolean) => {
        this._controllable = value;
    }

    get clear() {
        return this._clear;
    }

    setClear = (value: boolean) => {
        this._clear = value;
    }

    get isFail() {
        return this._isFail;
    }

    setIsFail = (value: boolean) => {
        this._isFail = value;
    }

    get isSpike() {
        return this._isSpike;
    }

    setIsSpike = (value: boolean) => {
        this._isSpike = value;
    }

    get mapData() {
        return this._mapData;
    }

    setMapData = (value: LandType[][]) => {
        this._mapData = value;
    }

    get life() {
        return this._life;
    }

    @action
    setLife = (value: number) => {
        this._life = value;
    }

    get coordinates() {
        return this._coordinates;
    }

    @action
    setCoordinates = (value: {x: number; y: number}) => {
        this._coordinates = value;
    }

    reset = () => {
        this.setControllable(false);
		// playDeathSound();
        this.setIsFail(true);
		setTimeout(() => {
			this.setMapData(MapManager._stage01);
			this.setLife(20);
			this.setCoordinates({x: 0, y: 0});
			this.setClear(false);
			this.setIsSpike(false);
		}, 350);

		setTimeout(() => {
			this.setControllable(true);
		}, 3000);
    }

}

export default GameManager;
