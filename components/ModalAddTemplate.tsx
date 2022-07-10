import { collection, doc, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import btnStyles from "../styles/components/button.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import mainStyles from "../styles/modules/modal-add-student.module.scss";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { firestore, Template } from "../firebase/firebase-db";
import { useAuth } from "../contexts/AuthContext";
import { PronounService } from "../services/PronounService";

interface Props {
	studentFirstName: string;
	activeQuarter: number;
	editing?: boolean;
	close: () => void;
}

export default function ModalAddTemplate(props: Props) {
	const [saveBtnEnabled, setSaveBtnEnabled] = useState(false);

	/* ---------------------------------- User ---------------------------------- */
	const { user, loading, error } = useAuth();

	/* -------------------------------- Firestore ------------------------------- */
	const templateCollection = collection(firestore, "users", user.uid, "templates");

	const template = useRef(null);

	const validateTemplate = () => {
		setSaveBtnEnabled(template.current.value.length);
	};

	/** Stores new template in DB */
	const saveNewTemplate = () => {
		const newTemplateID = uuidv4();
		const templateRef = doc(templateCollection, newTemplateID);
		const newText = PronounService.toDB(template.current.value, props.studentFirstName);

		const newTemplate: Template = {
			quarters: [props.activeQuarter],
			text: newText,
			templateID: newTemplateID,
		};

		setDoc(templateRef, newTemplate);
		props.close();
	};

	return (
		<Modal>
			<ModalHeader>New Template</ModalHeader>

			<ModalBody>
				<div className={mainStyles.body}>
					<textarea
						ref={template}
						className={inputStyles.textArea}
						placeholder="Create a new template..."
						onChange={() => validateTemplate()}
						autoFocus
					/>
				</div>
			</ModalBody>

			<ModalFooter>
				<button
					type="submit"
					onClick={saveNewTemplate}
					className={`${btnStyles.btn} ${!saveBtnEnabled ? btnStyles.disabled : ""}`}
				>
					Save Template
				</button>
			</ModalFooter>
		</Modal>
	);
}
