import React from "react";
import classNames from "classnames/bind";
import styles from "./characters.module.scss";

const cx = classNames.bind(styles);

const Characters = () => {
	return (
		<div className={cx("charactersWrap")}>
			<p className={cx("character", "lucifer")}/>
			<p className={cx("character", "malina")}/>
			<p className={cx("character", "modeus")}/>
			<p className={cx("character", "azazel")}/>
			<p className={cx("character", "justice")}/>
			<p className={cx("character", "judgement")}/>
			<p className={cx("character", "zdrada")}/>
			<p className={cx("character", "pandemonica")}/>
			<p className={cx("character", "cerberus")}/>
			<p className={cx("character", "cerberus")}/>
			<p className={cx("character", "cerberus")}/>
		</div>
	);
};

export default Characters;
