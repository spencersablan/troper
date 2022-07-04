import React, { useEffect, useRef, useState } from "react";
import SvgChevron from "./SvgChevron";
import SvgSettings from "./SvgSettings";
import styles from "../styles/modules/student.module.scss";
import btnStyles from "../styles/components/button.module.scss";
import tabsStyles from "../styles/components/tabs.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import SvgPlus from "./SvgPlus";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, setDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { firestore, Template } from "../firebase/firebase-db";

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
	const [currentStudentReport, setCurrentStudentReport] = useState({ output: "", templateIDs: [] });

	useEffect(() => {
		updateTemplatesInQuarter();
		changeActiveReport();
	}, [activeQuarter]);

	useEffect(() => {
		reportEl.current.value = currentStudentReport.output;
	}, [currentStudentReport]);

	// Form functionality
	const reportEl = useRef(null as HTMLTextAreaElement | null);
	/** Show/hide textarea to add template */
	const toggleAddingTemplate = () => {
		setAddingTemplate(!addingTemplate);
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

	// Template Controls
	const newTemplateEl = useRef(null as HTMLInputElement | null);
	const templateCollection = collection(firestore, "users", user.uid, "templates");

	/** Stores new template in DB */
	const submitNewTemplate = () => {
		const newTemplateID = uuidv4();
		const templateRef = doc(templateCollection, newTemplateID);
		const newTemplate: Template = {
			quarters: [activeQuarter],
			text: newTemplateEl.current.innerText,
			templateID: newTemplateID,
		};

		setDoc(templateRef, newTemplate);
	};

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
				<textarea ref={reportEl} className={`${styles.report} ${inputStyles.textArea}`}></textarea>
				<div className={styles.templateSection}>
					<div className={styles.addTemplateIconContainer} onClick={toggleAddingTemplate}>
						<SvgPlus className={`${styles.addTemplateIcon} ${addingTemplate && styles.cancel}`} />
					</div>
					<div className={styles.templateContainer}>
						{addingTemplate && (
							<div
								ref={newTemplateEl}
								onBlur={submitNewTemplate}
								onKeyDown={(e) => e.key === "Enter" && submitNewTemplate}
								className={`${styles.addTemplate} ${inputStyles.textArea}`}
								contentEditable
							></div>
						)}

						{templates &&
							templates.map((template: Template) => {
								return (
									<div key={template.templateID} className={styles.template} onClick={() => {}}>
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
