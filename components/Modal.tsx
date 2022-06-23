import styles from "../styles/modules/modal.module.scss";

export default function Modal({ children }) {
	return <div className={styles.modalContent}>{children}</div>;
}
