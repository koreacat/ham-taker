import classNames from "classnames/bind";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useState } from "react";
import { useManagers } from "../../../../util/ManagerProvider";
import styles from "./fail.module.scss";

const cx = classNames.bind(styles);

const Fail = () => {
	const {audioManager, gameManager} = useManagers();

    const [failHeight, setFailHeight] = useState("0");
	const [failOpacity, setFailOpacity] = useState("0");

    const {
		playScreenChangerPart1Sound,
		playScreenChangerPart2Sound,
	} = audioManager;

    const {isFail, setIsFail} = gameManager;

    useEffect(() => {
        if(isFail) failAnimation();
    }, [isFail]);

    const failAnimation = () => {
		setFailHeight("50%");
		playScreenChangerPart1Sound();
		setTimeout(() => {
			setFailOpacity("100");
		}, 350);

		setTimeout(() => {
			setFailOpacity("0");
			playScreenChangerPart2Sound();
		}, 2200);

		setTimeout(() => {
			setFailHeight("0");
            setIsFail(false);
		}, 2500);
	};

    const failStyle = {
		height: failHeight,
	};

	const failStyleCenter = {
		opacity: failOpacity,
	};

    return (
        <div className={cx("fail")}>
            <div className={cx("failUp")} style={failStyle} />
            <div className={cx("failDown")} style={failStyle} />
            <div className={cx("failCenter")} style={failStyleCenter}>
                <h2>HAMTAKER</h2>
            </div>
        </div>
    )
}

export default observer(Fail);