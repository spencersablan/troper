import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/components/headerUser.module.scss";

export default function HeaderUser() {
	const { user, loading, error } = useAuth();

	return (
		<>
			{!user && <div></div>}

			{user && (
				<div className={styles.headerUser}>
					<div
						className={styles.circle}
						style={{
							backgroundImage: `url(${user.photoURL})`,
						}}
					></div>
					<h5 className={styles.name}>{user.displayName}</h5>
				</div>
			)}
		</>
	);
	return <div>HeaderUser</div>;
}
