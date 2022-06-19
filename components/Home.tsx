import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase/firebase-db";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/components/home.module.scss";

export default function Home() {
	// User
	const { user, loading, error } = useAuth();

	// Students
	const studentCollection = collection(firestore, "students");
	const studentsQuery = query(studentCollection, where("teacherID", "==", user.uid));
	const [students, studentsLoading, studentsError] = useCollectionData(studentsQuery);

	// Add Student
	const addStudent = async () => {
		const newStudentID = uuidv4();
		const studentRef = doc(firestore, "students", newStudentID);
		await setDoc(studentRef, {
			teacherID: user.uid,
			firstName: "Keenan",
			lastName: "Allen",
			studentID: newStudentID,
		});
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
				<div className={styles.studentList}>
					{students &&
						students.map((student) => {
							return (
								<a key={student.studentID} className={styles.student}>
									{`${student.firstName} ${student.lastName}`}
								</a>
							);
						})}
				</div>
			</div>
		</div>
	);
}
