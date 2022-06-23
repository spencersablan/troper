import { useRef, useState, FC } from "react";
import { useClickAway } from "react-use";
import styles from "../styles/components/modal.module.scss";

export default function Modal({ children }) {
	return <div className={styles.modalContent}>{children}</div>;
}
