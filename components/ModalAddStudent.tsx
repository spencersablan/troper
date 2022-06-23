import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase/firebase-db";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import mainStyles from "../styles/modules/modal-add-student.module.scss";
import btnStyles from "../styles/components/button.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import toggleStyles from "../styles/components/toggle.module.scss";
import { useRef } from "react";

export default function ModalAddStudent(props) {
	// User
	const { user, loading, error } = useAuth();

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

	// Handle gender toggler
	const checkbox = useRef(null);

	return (
		<Modal>
			<ModalHeader>Add Student</ModalHeader>
			<ModalBody>
				<div className={mainStyles.body}>
					<input className={inputStyles.input} placeholder="First Name" />
					<input className={inputStyles.input} placeholder="Last Name" />
					<label className={toggleStyles.toggle}>
						<input type="checkbox" className={toggleStyles.checkbox} />
						<div className={`${toggleStyles.option} ${toggleStyles.optionA}`}>Male</div>
						<div className={`${toggleStyles.option} ${toggleStyles.optionB}`}>Female</div>
					</label>
				</div>
			</ModalBody>
			<ModalFooter>
				<button onClick={props.close} className={btnStyles.btn}>
					Create Student
				</button>
			</ModalFooter>
		</Modal>
	);
}
