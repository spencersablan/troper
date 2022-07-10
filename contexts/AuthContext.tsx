import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-db";
import { signOut } from "firebase/auth";

const AuthContext = React.createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function logout() {
	signOut(auth);
}

export function AuthProvider({ children }) {
	const [user, loading, error] = useAuthState(auth);

	const value = {
		user,
		loading,
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
