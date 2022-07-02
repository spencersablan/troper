import React, { useState } from "react";
import SvgChevron from "./SvgChevron";
import SvgSettings from "./SvgSettings";
import styles from "../styles/modules/student.module.scss";
import btnStyles from "../styles/components/button.module.scss";
import tabsStyles from "../styles/components/tabs.module.scss";
import inputStyles from "../styles/components/input.module.scss";
import SvgPlus from "./SvgPlus";

enum Quarters {
	Q1,
	Q2,
	Q3,
	Q4,
}

export default function Student({ student, back }) {
	const [activeQuarter, setActiveQuarter] = useState(Quarters.Q1);

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
					<SvgPlus className={styles.addTemplateIcon} />
					<div className={styles.templateContainer}>
						<div className={styles.template}>{student.firstName} is really cool.</div>
					</div>
				</div>
			</div>
		</div>
	);
}
