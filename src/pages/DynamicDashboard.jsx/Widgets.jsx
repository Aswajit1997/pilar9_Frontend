import React, { useState } from "react";
import { BiLockAlt, BiSolidLockOpen } from "react-icons/bi";
import { BsLockFill, BsThreeDotsVertical } from "react-icons/bs";
import { GrDrag } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { openFullScreenPopup } from "../../redux/slice/widgetSlice";
import DataTable from "../DataTable/DataTable";
import styles from "./DynamicDashboard.module.scss";

const Widgets = ({ item, index, onWidgetStateChange }) => {
	// console.log(item);
	const [isCollapsed, setIsCollapsed] = useState(item.isCollapsed);
	const [isLocked, setIsLocked] = useState(item.isLocked);
	const dispatch = useDispatch();

	const [openLockMenu, setOpenLockMenu] = useState(false);

	const handleLockUnlock = (status) => {
		setOpenLockMenu(false);
		setIsLocked(status);
		onWidgetStateChange(index, "isLocked", status);
	};

	const handleToggleCollapse = () => {
		setIsCollapsed((prev) => !prev);
		onWidgetStateChange(index, "isCollapsed", !isCollapsed);
	};

	const handleViewFullScreen = (data) => {
		dispatch(openFullScreenPopup(data));
	};
	return (
		<>
			<div className={styles.ActionButtons}>
				<div className={styles.Left}>{item?.name}</div>
				<div className={styles.Right}>
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

					<span onClick={() => handleViewFullScreen(item)}>View Full Screen</span>
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
				{item?.name === "ListAgent" ? <DataTable /> : item?.name + ` widget`}
			</div>
		</>
	);
};

export default Widgets;
