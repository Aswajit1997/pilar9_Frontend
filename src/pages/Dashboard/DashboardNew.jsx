import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import FullScreenPopup from "./FullScreenPopup";
import GridItem from "./GridItem";

const DashboardNew = () => {
	const navigate = useNavigate();
	const [gridWidth, setGridWidth] = useState(window.innerWidth * 0.8);

	const defaultLayout = [
		{ i: "box1", x: 0, y: 0, w: 12, h: 3 },
		{ i: "box2", x: 0, y: 3, w: 6, h: 3 },
		{ i: "box3", x: 6, y: 3, w: 6, h: 3 },
		{ i: "box4", x: 0, y: 6, w: 8, h: 3 },
		{ i: "box5", x: 8, y: 6, w: 4, h: 3 },
	];

	// Load saved layout and locked states from localStorage or use defaults
	const [layout, setLayout] = useState(() => {
		const savedLayout = JSON.parse(localStorage.getItem("dashboardLayout")) || defaultLayout;
		return savedLayout.map((item) => ({
			...item,
			isDraggable: item.isDraggable ?? true,
			isResizable: item.isResizable ?? true,
		}));
	});
	const [lockedItems, setLockedItems] = useState(() => {
		return JSON.parse(localStorage.getItem("lockedItems")) || {};
	});

	useEffect(() => {
		const updateGridWidth = () => setGridWidth(window.innerWidth * 0.8);
		window.addEventListener("resize", updateGridWidth);
		return () => window.removeEventListener("resize", updateGridWidth);
	}, []);

	const handleLayoutChange = (newLayout) => {
		// Update layout state and save to localStorage
		setLayout(newLayout);
		localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
	};

	const toggleLock = (index, status) => {
		// Update lock state and save to localStorage
		setLockedItems((prev) => {
			const updatedLocks = { ...prev, [index]: status };
			localStorage.setItem("lockedItems", JSON.stringify(updatedLocks));
			return updatedLocks;
		});

		// Update layout to reflect lock state
		setLayout((prevLayout) =>
			prevLayout.map((item, idx) => (idx === index ? { ...item, isDraggable: !status, isResizable: !status } : item))
		);
	};

	//fullscreen popup
	const [fullScreenPopup, setFullScreenPopup] = useState({
		status: false,
		data: "",
	});

	return (
		<>
			{fullScreenPopup?.status && <FullScreenPopup {...{ fullScreenPopup, setFullScreenPopup }} />}
			<div className={styles.Dashboard}>
				<GridLayout
					className="layout"
					layout={layout.map((item, idx) => ({
						...item,
						static: lockedItems[idx], // Make item static if locked
					}))}
					cols={12}
					rowHeight={120}
					width={gridWidth}
					draggableHandle=".dragHandle"
					onLayoutChange={handleLayoutChange}>
					{layout.map((item, index) => (
						<div
							key={item.i}
							className={styles.gridItem}
							data-grid={{
								...item,
								static: lockedItems[index],
							}}>
							<GridItem
								index={index}
								toggleLock={toggleLock}
								isLocked={lockedItems[index]}
								setFullScreenPopup={setFullScreenPopup}
							/>
						</div>
					))}
				</GridLayout>
			</div>
		</>
	);
};

export default DashboardNew;
