import HeaderUser from "./HeaderUser";
import styles from "../styles/modules/header.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<h1 className="logo">.troper</h1>
			<HeaderUser />
		</header>
	);
}
