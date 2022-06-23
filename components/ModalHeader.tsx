import React from "react";
import styles from "../styles/components/modal.module.scss";

export default function ModalHeader({ children }) {
	return <h3 className={styles.modalHeader}>{children}</h3>;
}
