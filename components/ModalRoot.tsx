import React, { ReactComponentElement, useEffect, useState } from "react";
import ModalService from "../services/ModalService";
import styles from "../styles/components/modal.module.scss";

export default function ModalRoot() {
	const initialModalState = { component: null, props: null, close: null };
	const [modal, setModal] = useState(initialModalState);

	useEffect(() => {
		ModalService.on("open", ({ component, props }) => {
			setModal({
				component,
				props,
				close: () => setModal(initialModalState),
			});
		});
	}, []);

	const ModalComponent = modal.component ? modal.component : null;

	return (
		<>
			{ModalComponent && (
				<div className={styles.modalBackground}>
					<div className={styles.modal}>
						<ModalComponent {...modal.props} close={modal.close} />
					</div>
				</div>
			)}
		</>
	);
}
