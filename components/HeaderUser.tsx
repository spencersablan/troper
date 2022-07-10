import { useState } from "react";
import { useAuth, logout } from "../contexts/AuthContext";
import styles from "../styles/modules/headerUser.module.scss";

export default function HeaderUser() {
	const { user, loading, error } = useAuth();

	const [submenuActive, setSubmenuActive] = useState(false);

	return (
		<>
			{!user && <div></div>}

			{user && !loading && (
				<div
					className={styles.headerUser}
					onClick={() => setSubmenuActive(!submenuActive)}
					onMouseEnter={() => setSubmenuActive(true)}
					onMouseLeave={() => setSubmenuActive(false)}
				>
					<div
						className={styles.circle}
						style={{
							backgroundImage: `url(${user.photoURL})`,
						}}
					></div>
					<h5 className={styles.name}>{user.displayName}</h5>
					<div className={`${styles.submenu} ${submenuActive && styles.active}`}>
						<a className={styles.submenuOption} onClick={logout}>
							Logout
						</a>
					</div>
				</div>
			)}
		</>
	);
}
