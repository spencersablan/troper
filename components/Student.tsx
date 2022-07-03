import React, { useRef, useState } from "react";
import SvgChevron from "./SvgChevron";
import SvgSettings from "./SvgSettings";
import styles from "../styles/modules/student.module.scss";
import btnStyles from "../styles/components/button.module.scss";
import tabsStyles from "../styles/components/tabs.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import SvgPlus from "./SvgPlus";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-db";

enum Quarters {
	Q1 = 1,
	Q2,
	Q3,
	Q4,
}

export default function Student({ student, back }) {
	const [activeQuarter, setActiveQuarter] = useState(Quarters.Q1);
	const [addingTemplate, setAddingTemplate] = useState(false);

	/** Show/hide textarea to add template */
	const toggleAddingTemplate = () => {
		setAddingTemplate(!addingTemplate);
	};

	// User
	const { user, loading, error } = useAuth();

	// Manipulating DB
	const newTemplateEl = useRef<HTMLDivElement>(null);
	/** Stores new template in DB */
	const submitNewTemplate = async () => {
		const newTemplateID = uuidv4();
		const templateRef = doc(firestore, "users", user.uid, "templates", newTemplateID);

		await setDoc(templateRef, {
			quarters: [activeQuarter],
			template: newTemplateEl.current.innerText,
		});
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
				<textarea className={`${styles.output} ${inputStyles.textArea}`}></textarea>
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
						<div className={styles.template}>{student.firstName} is really cool.</div>
					</div>
				</div>
			</div>
		</div>
	);
}
