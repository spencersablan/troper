import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Home from "../components/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-db";
import styles from "../styles/components/wrapper.module.scss";

export default function Main() {
	const [user, loading, error] = useAuthState(auth);

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.body}>
				{loading && <h4>Loading...</h4>}

				{!user && <Login />}

				{user && <Home />}
			</div>
		</div>
	);
}
