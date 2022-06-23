import React from "react";
import styles from "../styles/modules/modal.module.scss";

export default function ModalBody({ children }) {
	return <div className={styles.modalBody}>{children}</div>;
}
