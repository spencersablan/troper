import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import styles from "../styles/components/wrapper.module.scss";

export default function Main() {
	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.body}>
				<Login />
			</div>
		</div>
	);
}
