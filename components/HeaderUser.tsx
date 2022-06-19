import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-db";
import styles from "../styles/components/headerUser.module.scss";

export default function HeaderUser() {
	const [user, loading, error] = useAuthState(auth);

	return (
		<>
			{!user && <div></div>}

			{user && (
				<div className={styles.headerUser}>
					<div
						className={styles.headerUserCircle}
						style={{
							backgroundImage: `url(${user.photoURL})`,
						}}
					></div>
					<h5 className={styles.headerUserName}>{user.displayName}</h5>
				</div>
			)}
		</>
	);
	return <div>HeaderUser</div>;
}
