import classNames from "classnames/bind";
import { observer } from "mobx-react";
import { useManagers } from "../../../../util/ManagerProvider";
import styles from "./success.module.scss";

const cx = classNames.bind(styles);

const Success = () => {
	const {gameManager} = useManagers();
	const {clear} = gameManager;

    return (
        <div
            className={cx("success")}
            style={{ display: clear ? "block" : "none" }}
        >
            <div className={cx("successLeft")} />
            <div className={cx("successRight")} />
            <div className={cx("successSentence")}>
                <h3>GLORIOUS</h3>
                <h2>SUCCESS</h2>
            </div>
        </div>
    )
}

export default observer(Success);