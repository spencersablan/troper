import React from "react";
import styles from "../styles/modules/modal.module.scss";

export default function ModalFooter({ children }) {
	return <div className={styles.modalFooter}>{children}</div>;
}
