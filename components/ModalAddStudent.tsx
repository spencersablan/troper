import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import { firestore, Genders } from "../firebase/firebase-db";
import btnStyles from "../styles/components/button.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import toggleStyles from "../styles/components/toggle.module.scss";
import mainStyles from "../styles/modules/modal-add-student.module.scss";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

interface Props {
	currentStudent?: {
		firstName: string;
		lastName: string;
		gender: string;
		studentID: string;
	};
	back?: () => void;
	close: () => void;
}

export default function ModalAddStudent({ currentStudent, back, close }: Props) {
	const [checked, setChecked] = useState(false);
	const [saveBtnEnabled, setsaveBtnEnabled] = useState(false);

	/* ---------------------------------- User ---------------------------------- */
	const { user, loading, error } = useAuth();

	/* ------------------------------- Add Student ------------------------------ */
	const firstName = useRef(null as HTMLInputElement | null);
	const lastName = useRef(null as HTMLInputElement | null);
	const gender = useRef(null as HTMLInputElement | null);

	// TODO: Add error handling
	const saveStudent = async () => {
		const genderValue = gender.current.checked ? Genders.male : Genders.female;
		const studentID = currentStudent ? currentStudent.studentID : uuidv4();
		const studentRef = doc(firestore, "students", studentID);

		await setDoc(
			studentRef,
			{
				firstName: firstName.current.value,
				lastName: lastName.current.value,
				gender: genderValue,
				teacherID: user.uid,
				studentID,
			},
			{ merge: true }
		);

		close();
	};

	const handleNameInput = (event) => {
		if (event.target.value.length) return setsaveBtnEnabled(true);

		setsaveBtnEnabled(false);
	};

	const toggleGender = (event) => {
		if (event.keyCode !== 13) return;

		setChecked(!checked);
	};

	const deleteStudent = async () => {
		await deleteDoc(doc(firestore, "students", currentStudent.studentID));
		close();
		back();
	};

	useEffect(() => {
		if (currentStudent) {
			firstName.current.value = currentStudent.firstName;
			lastName.current.value = currentStudent.lastName;
			gender.current.checked = currentStudent.gender === Genders.male;
		}
	}, []);

	return (
		<Modal>
			<ModalHeader>Add Student</ModalHeader>

			<ModalBody>
				<div className={mainStyles.body}>
					<input
						ref={firstName}
						className={inputStyles.input}
						placeholder="First Name*"
						onKeyDown={handleNameInput}
						autoFocus
					/>
					<input ref={lastName} className={inputStyles.input} placeholder="Last Name" />
					<label tabIndex={0} onKeyDown={toggleGender} className={toggleStyles.toggle}>
						<input ref={gender} type="checkbox" className={toggleStyles.checkbox} defaultChecked={checked} />
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
				<button
					type="submit"
					onClick={saveStudent}
					className={`${btnStyles.btn} ${!saveBtnEnabled && !currentStudent ? btnStyles.disabled : ""}`}
				>
					{currentStudent ? "Save Student" : "Create Student"}
				</button>
				{currentStudent && (
					<button type="submit" onClick={deleteStudent} className={`${btnStyles.btn} ${btnStyles.danger}`}>
						Delete Student
					</button>
				)}
			</ModalFooter>
		</Modal>
	);
}
