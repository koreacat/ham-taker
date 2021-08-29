import classNames from "classnames/bind";
import { DISTANCE } from "../../../../managers/GameManager";
import { LandType, SPIKE_TRAP } from "../../../../managers/MapManager";
import { useManagers } from "../../../../util/ManagerProvider";
import styles from "./map.module.scss";

const cx = classNames.bind(styles);

const Map = () => {
	const { gameManager} = useManagers();

    return (
        <div className={cx('map')}>
        {gameManager.mapData.map((line, x) => {
            return (
                <div key={x} className={cx("mapTile")}>
                    {line.map((point, y) => {
                        return (
                            <p
                                key={x + "" + y}
                                className={cx(
                                    point === SPIKE_TRAP
                                        ? gameManager.isSpike
                                        ? "spikeTrapOn"
                                        : "spikeTrapOff"
                                        : LandType[point])
                                }
                                style={{width: DISTANCE, height: DISTANCE}}
                            />
                        );
                    })}
                </div>
            );
        })}
        </div>
    )
}

export default Map;