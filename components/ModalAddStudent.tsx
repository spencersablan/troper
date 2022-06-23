import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase/firebase-db";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

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
	return (
		<Modal>
			<ModalHeader>This is a test</ModalHeader>
			<ModalBody>
				<p>Body of modal #1</p>
			</ModalBody>
			<ModalFooter>
				<button onClick={props.close} className="btn btn-primary">
					Close Modal
				</button>
			</ModalFooter>
		</Modal>
	);
}
