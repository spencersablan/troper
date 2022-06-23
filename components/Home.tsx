import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase/firebase-db";
import ModalAddStudent from "./ModalAddStudent";

import ModalService from "../services/ModalService";
import styles from "../styles/components/home.module.scss";

export default function Home() {
	// User
	const { user, loading, error } = useAuth();

	// Students
	const studentCollection = collection(firestore, "students");
	const studentsQuery = query(studentCollection, where("teacherID", "==", user.uid));
	const [students, studentsLoading, studentsError] = useCollectionData(studentsQuery);

	// Open add student modal
	const openAddStudentModal = () => ModalService.open(ModalAddStudent);

	return (
		<div className={styles.home}>
			<h2 className={styles.greeting}>Hello, {user.displayName}</h2>
			<div className={styles.students}>
				<div className={styles.studentsHeader}>
					<h4 className={styles.studentsTitle}>Students</h4>
					<span className={styles.addStudent} onClick={() => openAddStudentModal()}>
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
