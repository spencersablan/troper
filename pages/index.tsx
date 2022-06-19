import React from "react";
import Header from "../components/Header";
import styles from "../styles/components/wrapper.module.scss";

export default function Main() {
	return (
		<div className={styles.wrapper}>
			<Header />
		</div>
	);
}
