import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/modules/wrapper.module.scss";
import ModalRoot from "../components/ModalRoot";

export default function Main() {
	const { user, loading, error } = useAuth();

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.body}>
				{loading && <h4>Loading...</h4>}

				{!user && <Login />}

				{user && <Home />}
			</div>
			<ModalRoot />
		</div>
	);
}
