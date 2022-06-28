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
import { useState, useRef } from "react";

export default function ModalAddStudent(props) {
	// Handle gender toggler
	const [checked, setChecked] = useState(false);

	// User
	const { user, loading, error } = useAuth();

	// Add Student
	const firstName = useRef(null as HTMLInputElement | null);
	const lastName = useRef(null as HTMLInputElement | null);
	const gender = useRef(null as HTMLInputElement | null);

	// TODO: Add error handling
	const addStudent = async () => {
		const genderValue = gender.current.checked ? "Male" : "Female";
		const newStudentID = uuidv4();
		const studentRef = doc(firestore, "students", newStudentID);

		await setDoc(studentRef, {
			firstName: firstName.current.value,
			lastName: lastName.current.value,
			gender: genderValue,
			teacherID: user.uid,
			studentID: newStudentID,
		});

		props.close();
	};

	return (
		<Modal>
			<ModalHeader>Add Student</ModalHeader>

			<ModalBody>
				<div className={mainStyles.body}>
					<input ref={firstName} className={inputStyles.input} placeholder="First Name" autoFocus />
					<input ref={lastName} className={inputStyles.input} placeholder="Last Name" />
					<label className={toggleStyles.toggle}>
						<input ref={gender} type="checkbox" className={toggleStyles.checkbox} checked={checked} />
						<div className={`${toggleStyles.option} ${toggleStyles.optionA}`} onClick={() => setChecked(true)}>
							Male
						</div>
						<div className={`${toggleStyles.option} ${toggleStyles.optionB}`} onClick={() => setChecked(false)}>
							Female
						</div>
					</label>
				</div>
			</ModalBody>

			<ModalFooter>
				<button onClick={addStudent} className={btnStyles.btn}>
					Create Student
				</button>
			</ModalFooter>
		</Modal>
	);
}
