import React, { useState } from "react";
import { BiLockAlt, BiSolidLockOpen } from "react-icons/bi";
import { BsLockFill, BsThreeDotsVertical } from "react-icons/bs";
import { GrDrag } from "react-icons/gr";
import { useDispatch } from "react-redux";
import DataTable from "../DataTable/DataTable";
import styles from "./Dashboard.module.scss";

const GridItem = ({ index, toggleLock, isLocked, setFullScreenPopup }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const dispatch = useDispatch();

	const [openLockMenu, setOpenLockMenu] = useState(false);

	const handleLockUnlock = (status) => {
		setOpenLockMenu(false);
		toggleLock(index, status);
	};

	const handleToggleCollapse = () => {
		setIsCollapsed((prev) => !prev);
	};

	const handleViewFullScreen = () => {
		setFullScreenPopup({ status: true, data: index });
	};
	return (
		<>
			<div className={styles.Top}>
				<div className={styles.ActionButtons}>
					{isLocked && (
						<span>
							<BiLockAlt />
						</span>
					)}
					{isCollapsed ? (
						<span onClick={handleToggleCollapse}>UnCollapse</span>
					) : (
						<span onClick={handleToggleCollapse}>Collapse</span>
					)}

					<span onClick={handleViewFullScreen}>View Full Screen</span>
					{!isLocked && (
						<span className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
							<GrDrag />
						</span>
					)}

					<span className={styles.Menu}>
						<BsThreeDotsVertical onClick={() => setOpenLockMenu(!openLockMenu)} />
						<div className={`${styles.Submenu} ${openLockMenu ? styles.Open : ""}`}>
							{isLocked && (
								<p onClick={() => handleLockUnlock(false)}>
									<BiSolidLockOpen />
									UnLock
								</p>
							)}
							{!isLocked && (
								<p onClick={() => handleLockUnlock(true)}>
									<BsLockFill />
									Lock
								</p>
							)}
						</div>
					</span>
				</div>
			</div>
			<div className={`${styles.Content} ${isCollapsed ? styles.Collapse : ""}`}>
				{index === 0 && <DataTable pagination={"hide"} />}
			</div>
		</>
	);
};

export default GridItem;
