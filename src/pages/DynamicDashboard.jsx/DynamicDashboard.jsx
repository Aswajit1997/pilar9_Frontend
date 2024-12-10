import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../components/Hooks/axios";
import EditWidgetPopup from "../MultiDashboardNew/EditWidgetPopup";
import styles from "./DynamicDashboard.module.scss";
import FullScreenPopup from "./FullScreenPopup";
import Widgets from "./Widgets";

const DynamicDashboard = () => {
	const location = useLocation();
	const { data } = location.state;
	const [openEditPopup, setOpenEditPopup] = useState(false);
	const navigate = useNavigate();

	const [dashboardData, setDashboardData] = useState(data);

	//grid
	const [gridWidth, setGridWidth] = useState(window.innerWidth * 0.8);

	useEffect(() => {
		const updateGridWidth = () => {
			setGridWidth(window.innerWidth * 0.8);
		};

		updateGridWidth();

		window.addEventListener("resize", updateGridWidth);
		return () => window.removeEventListener("resize", updateGridWidth);
	}, []);

	const defaultLayout = [
		{ i: "box1", x: 0, y: 0, w: 12, h: 3, isDraggable: true, isResizable: true },
		{ i: "box2", x: 0, y: 3, w: 6, h: 3, isDraggable: true, isResizable: true },
		{ i: "box3", x: 6, y: 3, w: 6, h: 3, isDraggable: true, isResizable: true },
		{ i: "box4", x: 0, y: 6, w: 8, h: 3, isDraggable: true, isResizable: true },
		{ i: "box5", x: 8, y: 6, w: 4, h: 3, isDraggable: true, isResizable: true },
	];

	const [layout, setLayout] = useState(() => {
		const savedLayout = data?.layout;
		return savedLayout ? savedLayout : defaultLayout;
	});

	const handleLayoutChange = (newLayout) => {
		setLayout(newLayout);
		setDashboardData((prev) => ({
			...prev,
			layout: newLayout,
		}));
	};

	const handleWidgetStateChange = (index, key, value) => {
		setDashboardData((prev) => {
			const updatedWidgets = prev.widgets.map((widget, i) => (i === index ? { ...widget, [key]: value } : { ...widget }));

			return { ...prev, widgets: updatedWidgets };
		});
	};

	const { openWidgetInFullScreen } = useSelector((state) => state.widget);

	const [updatingLayout, setUpdatingLayout] = useState(false);
	const handleSaveLayout = () => {
		setUpdatingLayout(true);
		axios
			.put(`/dashboard/update/${dashboardData?._id}`, {
				title: dashboardData?.title,
				widgets: dashboardData?.widgets,
				layout: dashboardData?.layout,
			})
			.then(({ data }) => {
				toast.success("Updated Successfully...");
				navigate("/multi-dashboard");
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || "Error Updating Dashboard layout..");
			})
			.finally(() => setUpdatingLayout(false));
	};

	return (
		<>
			{openEditPopup && <EditWidgetPopup {...{ setOpenEditPopup, editableWidgetData: dashboardData }} />}
			{openWidgetInFullScreen && <FullScreenPopup />}
			<div className={styles.DynamicDashboard}>
				<div className={styles.Top}>
					<h1>Title : {dashboardData?.title}</h1>

					<div className={styles.Buttons}>
						<button onClick={() => navigate("/multi-dashboard")}>Back</button>
						<button onClick={() => setOpenEditPopup(true)}>Manage Widgets</button>
						{updatingLayout ? <button>Updating ....</button> : <button onClick={handleSaveLayout}>Save Layout</button>}
					</div>
				</div>

				<div className={styles.Widgets}>
					<GridLayout
						className="layout"
						layout={layout}
						cols={12}
						rowHeight={120}
						width={gridWidth}
						draggableHandle=".dragHandle"
						onLayoutChange={handleLayoutChange}>
						{dashboardData?.widgets?.map((widget, i) => (
							<div
								key={`box${i + 1}`}
								className={styles.gridItem}
								data-grid={{
									...layout[i],
									isDraggable: layout[i]?.isDraggable ?? true, // Default to true
									isResizable: layout[i]?.isResizable ?? true, // Default to true
									static: !layout[i]?.isDraggable && !layout[i]?.isResizable, // Make static if non-draggable and non-resizable
								}}>
								<Widgets item={widget} index={i} onWidgetStateChange={handleWidgetStateChange} />
							</div>
						))}
					</GridLayout>
				</div>
			</div>
		</>
	);
};

export default DynamicDashboard;
