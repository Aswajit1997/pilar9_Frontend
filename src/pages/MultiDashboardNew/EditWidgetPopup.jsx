import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CrossButton, PlusButton } from "../../assets/svg/SvgIndex";
import axios from "../../components/Hooks/axios";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import styles from "./AddWidgetPopup.module.scss";

const EditWidgetPopup = ({ setOpenEditPopup, editableWidgetData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [title, setTitle] = useState(editableWidgetData?.title || "");
	const [selectedWidgets, setSelectedWidgets] = useState(editableWidgetData?.widgets || []);
	const [widgetButtons, setWidgetButtons] = useState(["ListAgent", "Dimensions", "Segments", "Time", "Filter"]);

	// Add widget to selectedWidgets
	const handleAddWidget = (widget) => {
		setSelectedWidgets((prev) => [...prev, { name: widget, isLocked: false, isCollapsed: false }]);
	};

	// Remove widget from selectedWidgets
	const handleRemoveWidget = (widgetName) => {
		setSelectedWidgets((prev) => prev.filter((widget) => widget.name !== widgetName));
	};

	const handleSaveChanges = () => {
		if (!title.trim()) {
			toast.error("Please provide a title for the dashboard.");
			return;
		}

		const layout = selectedWidgets.map((_, index) => ({
			i: `box${index + 1}`,
			x: (index % 2) * 6,
			y: Math.floor(index / 2) * 3,
			w: 6,
			h: 3,
		}));

		const payload = {
			title,
			widgets: selectedWidgets,
			layout,
		};

		console.log(payload);

		dispatch(setOpenLoadingPopup(true));
		axios
			.put(`/dashboard/update/${editableWidgetData?._id}`, payload)
			.then(({ data }) => {
				setOpenEditPopup(false);
				navigate("/multi-dashboard");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.response?.data?.message || "Error Updating Dashboard.");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	};

	return (
		<div className={styles.AddWidgetPopup} onClick={() => setOpenEditPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Edit Dashboard</h2>
						title :{" "}
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Dashboard Title" />
					</div>
					<div className={styles.Right}>
						<button onClick={() => setOpenEditPopup(false)}>Discard</button>
						<button onClick={handleSaveChanges}>Save</button>
					</div>
				</div>

				{/* Widget Buttons */}
				<div className={styles.WidgetButtons}>
					{widgetButtons.map((item, index) => (
						<div key={index} className={styles.WidgetBtn}>
							<p>{item}</p>
							{selectedWidgets.some((widget) => widget.name === item) ? (
								<span className={styles.CrossButton} onClick={() => handleRemoveWidget(item)}>
									<img src={CrossButton} alt="Remove" title="Remove" />
								</span>
							) : (
								<span className={styles.Show} onClick={() => handleAddWidget(item)}>
									<img src={PlusButton} alt="Add" title="Add" />
								</span>
							)}
						</div>
					))}
				</div>

				{/* Selected Widgets */}
				<div className={styles.AllWidgets}>
					{selectedWidgets.map((widget, i) => (
						<div key={i} className={styles.WidgetBox}>
							{widget.name} Widget
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default EditWidgetPopup;
