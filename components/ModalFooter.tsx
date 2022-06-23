import React from "react";
import styles from "../styles/components/modal.module.scss";

export default function ModalFooter({ children }) {
	return <div className={styles.modalFooter}>{children}</div>;
}
