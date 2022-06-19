import { GoogleAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../firebase/firebase-db";
import styles from "../styles/components/login.module.scss";

// Configure FirebaseUI
const uiConfig = {
	// Redirect to / after login success
	signInSuccessUrl: "/",
	// Providers
	signInOptions: [GoogleAuthProvider.PROVIDER_ID],
};

export default function Login() {
	return (
		<div className={styles.login}>
			<h3 className={styles.loginHeader}>Login</h3>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
		</div>
	);
}
