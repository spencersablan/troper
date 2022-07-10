import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext";
import { firestore, Template } from "../firebase/firebase-db";
import ModalService from "../services/ModalService";
import btnStyles from "../styles/components/button.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import tabsStyles from "../styles/components/tabs.module.scss";
import styles from "../styles/modules/student.module.scss";
import ModalAddTemplate from "./ModalAddTemplate";
import ModalAddStudent from "./ModalAddStudent";
import SvgChevron from "./SvgChevron";
import SvgPlus from "./SvgPlus";
import SvgSettings from "./SvgSettings";

enum Quarters {
	Q1 = 1,
	Q2,
	Q3,
	Q4,
}

interface Props {
	studentID: string;
	back: () => void;
}

export default function Student({ studentID, back }: Props) {
	const [activeQuarter, setActiveQuarter] = useState(Quarters.Q1);

	/* --------------------------- Form functionality --------------------------- */
	const reportEl = useRef(null as HTMLTextAreaElement | null);

	const openAddTemplateModal = () => {
		ModalService.open(ModalAddTemplate, { activeQuarter });
	};

	/* ---------------------------------- User ---------------------------------- */
	const { user, loading, error } = useAuth();

	/* ----------------------------- Report controls ---------------------------- */
	const reportCollection = collection(firestore, "students", studentID, "reports");
	const reportRef = doc(reportCollection, activeQuarter.toString());
	const [report, reportLoading, reportError] = useDocumentData(reportRef);

	/** Adds template to report */
	const addToReport = (templateToAdd: string) => {
		const newReport = `${report?.output || ""}${report?.output.length ? " " : ""}${templateToAdd}`;

		setDoc(reportRef, { output: newReport });
	};

	/** Handles user typing into report text area */
	const handleTextAreaChange = (value: string) => {
		setDoc(reportRef, { output: value });
	};

	/* ---------------------------- Template Controls --------------------------- */
	const templateCollection = collection(firestore, "users", user.uid, "templates");
	const templatesQuery = query(templateCollection, where("quarters", "array-contains", activeQuarter));
	const [templates, tempalatesLoading, templatesError] = useCollectionData(templatesQuery);

	/* --------------------------------- Student -------------------------------- */
	const studentCollection = collection(firestore, "students");
	const studentsDocument = doc(studentCollection, studentID);
	const [student, studentLoading, studentError] = useDocumentData(studentsDocument);

	const editStudent = () => {
		const { firstName, lastName, gender, studentID } = student;
		const currentStudent = { firstName, lastName, gender, studentID };
		ModalService.open(ModalAddStudent, { currentStudent, back });
	};

	return (
		<>
			{student ? (
				<div className={styles.student}>
					<div className={styles.topActions}>
						<a
							className={`${btnStyles.iconTextBtn} ${btnStyles.modIconOnlyMobile} ${btnStyles.modAlignLeft}`}
							onClick={back}
						>
							<SvgChevron className={`${btnStyles.btnIcon} ${btnStyles.backIcon}`} />
							<span className={btnStyles.btnText}>Back to Home</span>
						</a>

						{/* TODO: Create Student Settings Modal */}
						<a className={btnStyles.iconTextBtn} onClick={editStudent}>
							<SvgSettings className={`${btnStyles.btnIcon} ${btnStyles.settingsIcon}`} />
							<span className={btnStyles.btnText}>Edit Student</span>
						</a>
					</div>
					<div className={styles.studentFormHeader}>
						<h2 className={styles.studentName}>
							{student.firstName} {student.lastName}
						</h2>
						<div className={tabsStyles.tabsContainer}>
							<div
								className={`${tabsStyles.tab} ${activeQuarter === Quarters.Q1 && tabsStyles.active}`}
								onClick={() => setActiveQuarter(Quarters.Q1)}
							>
								Q1
							</div>
							<div
								className={`${tabsStyles.tab} ${activeQuarter === Quarters.Q2 && tabsStyles.active}`}
								onClick={() => setActiveQuarter(Quarters.Q2)}
							>
								Q2
							</div>
							<div
								className={`${tabsStyles.tab} ${activeQuarter === Quarters.Q3 && tabsStyles.active}`}
								onClick={() => setActiveQuarter(Quarters.Q3)}
							>
								Q3
							</div>
							<div
								className={`${tabsStyles.tab} ${activeQuarter === Quarters.Q4 && tabsStyles.active}`}
								onClick={() => setActiveQuarter(Quarters.Q4)}
							>
								Q4
							</div>
						</div>
					</div>

					<div className={styles.builder}>
						<textarea
							ref={reportEl}
							className={`${styles.report} ${inputStyles.textArea}`}
							onChange={(e) => handleTextAreaChange(e.target.value)}
							value={report ? report.output : ""}
						></textarea>
						<div className={styles.templateSection}>
							<div className={styles.addTemplateIconContainer} onClick={openAddTemplateModal}>
								<SvgPlus className={styles.addTemplateIcon} />
							</div>
							<div className={styles.templateContainer}>
								{templates &&
									templates.map((template: Template) => {
										return (
											<div
												key={template.templateID}
												className={styles.template}
												onClick={() => {
													addToReport(template.text);
												}}
											>
												{template.text}
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>Loading Student...</div>
			)}
		</>
	);
}
