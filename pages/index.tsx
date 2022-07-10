import React, { useEffect } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/modules/wrapper.module.scss";
import ModalRoot from "../components/ModalRoot";

export default function Main() {
	const { user, loading, error } = useAuth();

	useEffect(() => {}, [user, loading, error]);

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.body}>
				{!user && !loading && <Login />}

				{loading && <h4>Loading...</h4>}

				{user && <Home />}
			</div>
			<ModalRoot />
		</div>
	);
}
