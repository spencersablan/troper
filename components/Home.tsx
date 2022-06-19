import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-db";
import styles from "../styles/components/home.module.scss";

export default function Home() {
	const [user, loading, error] = useAuthState(auth);

	// Add Student
	const addStudent = () => {
		console.log("hey");
	};

	return (
		<div className={styles.home}>
			<h2 className={styles.greeting}>Hello, {user.displayName}</h2>
			<div className={styles.students}>
				<div className={styles.studentsHeader}>
					<h4 className={styles.studentsTitle}>Students</h4>
					<span className={styles.addStudent} onClick={() => addStudent()}>
						&#43;
					</span>
				</div>
				<div className={styles.student}>
					{/* {students.map((student) => {
						return (
							<a key={student.id} className="home--students--student">
								{student.name}
							</a>
						);
					})} */}
				</div>
			</div>
		</div>
	);
}
