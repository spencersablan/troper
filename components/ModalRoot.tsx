import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import ModalService from "../services/ModalService";
import styles from "../styles/modules/modal.module.scss";

export default function ModalRoot() {
	// Modal State
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

	// Close modal when clicked outside
	const modalRef = useRef(null);

	useClickAway(modalRef, () => {
		modal.close();
	});
	return (
		<>
			{ModalComponent && (
				<div className={styles.modalBackground}>
					<div ref={modalRef} className={styles.modal}>
						<ModalComponent {...modal.props} close={modal.close} />
					</div>
				</div>
			)}
		</>
	);
}
