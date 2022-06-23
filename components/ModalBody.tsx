import React from "react";
import styles from "../styles/components/modal.module.scss";

export default function ModalBody({ children }) {
	return <div className={styles.modalBody}>{children}</div>;
}
