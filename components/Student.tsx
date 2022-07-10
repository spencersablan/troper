import React, { useEffect, useRef, useState } from "react";
import SvgChevron from "./SvgChevron";
import SvgSettings from "./SvgSettings";
import styles from "../styles/modules/student.module.scss";
import btnStyles from "../styles/components/button.module.scss";
import tabsStyles from "../styles/components/tabs.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import SvgPlus from "./SvgPlus";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, setDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { firestore, Template } from "../firebase/firebase-db";
import ModalService from "../services/ModalService";
import ModalAddTemplate from "./ModalAddTemplate";

enum Quarters {
	Q1 = 1,
	Q2,
	Q3,
	Q4,
}

interface StudentReport {
	templateIDs: string[];
	output: string;
}

export default function Student({ student, back }) {
	const [activeQuarter, setActiveQuarter] = useState(Quarters.Q1);
	const [templates, setTemplates] = useState(null as Template[]);
	const [addingTemplate, setAddingTemplate] = useState(false);
	const [currentStudentReport, setCurrentStudentReport] = useState({ output: "", templateIDs: [] } as StudentReport);

	useEffect(() => {
		updateTemplatesInQuarter();
		changeActiveReport();
	}, [activeQuarter]);

	useEffect(() => {
		reportEl.current.value = currentStudentReport.output;

		setDoc(reportRef, currentStudentReport);
	}, [currentStudentReport]);

	useEffect(() => {
		if (addingTemplate) {
			newTemplateEl.current.focus();
		}
	}, [addingTemplate]);

	// Form functionality
	const reportEl = useRef(null as HTMLTextAreaElement | null);
	/** Show/hide textarea to add template */

	const openAddTemplateModal = () => {
		ModalService.open(ModalAddTemplate, { activeQuarter });
	};

	// User
	const { user, loading, error } = useAuth();

	// Report controls
	const reportCollection = collection(firestore, "students", student.studentID, "reports");
	const reportRef = doc(reportCollection, activeQuarter.toString());

	/** Changes which quarter report the user is viewing */
	const changeActiveReport = async () => {
		const reportSnapshot = await getDoc(reportRef);

		if (!reportSnapshot.exists()) {
			return setCurrentStudentReport({ output: "", templateIDs: [] });
		}

		setCurrentStudentReport(reportSnapshot.data() as StudentReport);
	};

	/** Adds template to report */
	const addToReport = (templateToAdd: { templateID: string; text: string }) => {
		const newOutput = `${currentStudentReport.output} ${templateToAdd.text}`;
		const newTemplateIDs = [...currentStudentReport.templateIDs, templateToAdd.templateID];

		const updatedStudentReport: StudentReport = {
			output: newOutput,
			templateIDs: newTemplateIDs,
		};

		setCurrentStudentReport(updatedStudentReport);
	};

	/** Handles user typing into report text area */
	const handleTextAreaChange = (value: string) => {
		setCurrentStudentReport({ output: value, templateIDs: currentStudentReport.templateIDs });
	};

	// Template Controls
	const newTemplateEl = useRef(null as HTMLInputElement | null);
	const templateCollection = collection(firestore, "users", user.uid, "templates");

	const updateTemplatesInQuarter = async () => {
		let templatesInQuarter = [];
		const templatesQuery = query(templateCollection, where("quarters", "array-contains", activeQuarter));
		const querySnapshot = await getDocs(templatesQuery);
		querySnapshot.forEach((doc) => {
			templatesInQuarter.push(doc.data());
		});
		setTemplates(templatesInQuarter);
	};

	return (
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
				<a className={btnStyles.iconTextBtn} onClick={back}>
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
				></textarea>
				<div className={styles.templateSection}>
					<div className={styles.addTemplateIconContainer} onClick={openAddTemplateModal}>
						<SvgPlus className={`${styles.addTemplateIcon} ${addingTemplate && styles.cancel}`} />
					</div>
					<div className={styles.templateContainer}>
						{templates &&
							templates.map((template: Template) => {
								return (
									<div
										key={template.templateID}
										className={styles.template}
										onClick={() => {
											addToReport({ templateID: template.templateID, text: template.text });
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
	);
}
