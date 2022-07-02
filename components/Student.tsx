import React from "react";
import SvgChevron from "./SvgChevron";
import styles from "../styles/modules/student.module.scss";

export default function Student({ student, back }) {
	return (
		<div>
			<a className={styles.back} onClick={back}>
				<SvgChevron className={styles.backChevron} />
				<span className={styles.backText}>Back to Home</span>
			</a>
		</div>
	);
}
