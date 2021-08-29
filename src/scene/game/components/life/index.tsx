import classNames from "classnames/bind";
import { useManagers } from "../../../../util/ManagerProvider";
import styles from "./life.module.scss";

const cx = classNames.bind(styles);

const Life = () => {
	const { gameManager} = useManagers();

    return (
        <h2 className={cx("life")}>{gameManager.life}</h2>
    )
}

export default Life;