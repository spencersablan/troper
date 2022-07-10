import { collection, query, where } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase/firebase-db";
import ModalService from "../services/ModalService";
import styles from "../styles/modules/home.module.scss";
import ModalAddStudent from "./ModalAddStudent";
import Student from "./Student";

export default function Home() {
	/* ---------------------------------- User ---------------------------------- */
	const { user, loading, error } = useAuth();

	/* ---------------------------- Selected Student ---------------------------- */
	const [selectedStudent, setSelectedStudent] = useState(null);

	/* -------------------------------- Students -------------------------------- */
	const studentCollection = collection(firestore, "students");
	const studentsQuery = query(studentCollection, where("teacherID", "==", user.uid));
	const [students, studentsLoading, studentsError] = useCollectionData(studentsQuery);

	/** Opens add student modal */
	const openAddStudentModal = () => ModalService.open(ModalAddStudent);

	/** Sends user back to home page */
	const backToHome = () => setSelectedStudent(null);

	return (
		<>
			{!selectedStudent && (
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
										<a
											onClick={() => setSelectedStudent(student.studentID)}
											key={student.studentID}
											className={styles.student}
										>
											{`${student.firstName} ${student.lastName}`}
										</a>
									);
								})}
						</div>
					</div>
				</div>
			)}

			{selectedStudent && <Student studentID={selectedStudent} back={backToHome} />}
		</>
	);
}
