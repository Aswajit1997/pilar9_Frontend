import React from "react";
import DataTable from "../DataTable/DataTable";
import styles from "./FullScreenPopup.module.scss";

const FullScreenPopup = ({ setFullScreenPopup, fullScreenPopup }) => {
	return (
		<div className={styles.FullScreenPopup}>
			<div className={styles.Wrapper}>
				<div className={styles.Top}>
					{fullScreenPopup?.data}
					<p onClick={() => setFullScreenPopup()}>Close Full Screen</p>
				</div>

				<div className={styles.Contents}>{fullScreenPopup?.data === 0 ? <DataTable /> : ""}</div>
			</div>
		</div>
	);
};

export default FullScreenPopup;
