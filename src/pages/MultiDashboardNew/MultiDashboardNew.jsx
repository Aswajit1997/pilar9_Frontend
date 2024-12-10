import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DashboardDemo } from "../../assets";
import axios from "../../components/Hooks/axios";
import { useDeleteAlert } from "../../components/Hooks/UseDeleteAlert";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import AddWidgetPopup from "./AddWidgetPopup";
import DashboardTitlePopup from "./DashboardTitlePopup";
import styles from "./MultiDashboardNew.module.scss";
import { formatTimestamp } from "../../components/utils/HelperFunctions";

const MultiDashboardNew = () => {
	const dispatch = useDispatch();
	const [openTitlePopup, setOpenTitlePopup] = useState(false);
	const [title, setTitle] = useState("");
	const [openAddWidgetPopup, setOpenAddWidgetPopup] = useState(false);
	const [reload, setReload] = useState(0); 

	const navigate = useNavigate();

	const handleOpenEdit = (data) => {
		navigate("/dynamic-dashboard", {
			state: {
				data,
			},
		});
		// setOpenEditPopup(true);
	};

	//get all dashboards of user
	const [loading, setLoading] = useState(false);
	const [dashboards, setDashboards] = useState([]);
	useEffect(() => {
		dispatch(setOpenLoadingPopup(true));
		axios
			.get(`/dashboard/user`)
			.then(({ data }) => {
				setDashboards(data?.data);
				console.log(data.data)
			})
			.catch((err) => console.log(err))
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	}, [reload]);
	//delete dashboard

	const handleDelete = async (id) => {
		let isConfirmed = await useDeleteAlert();
		if (!isConfirmed) return;

		dispatch(setOpenLoadingPopup(true));

		axios
			.delete(`dashboard/delete/${id}`)
			.then(({ data }) => {
				setReload(Math.random());
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.response?.data?.message || "Error deleing dashboard....");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	};

	return (
		<>
			{openTitlePopup && <DashboardTitlePopup {...{ setOpenTitlePopup, setOpenAddWidgetPopup, title, setTitle }} />}
			{openAddWidgetPopup && <AddWidgetPopup {...{ setOpenAddWidgetPopup, title, setTitle, setReload }} />}

			<div className={styles.MultiDashboardNew}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Build Your Dashboard</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur. Tellus risus ut massa quis vitae viverra aenean. Sapien in amet amet velit
							congue. Interdum id in libero placerat malesuada. Vel aliquam scelerisque ut .
						</p>
					</div>
					<button onClick={() => setOpenTitlePopup(true)}>Create Your Dashboard</button>
				</div>

				<div className={styles.Bottom}>
					<div className={styles.SavedDashboards}>
						{dashboards?.map((item, index) => (
							<div className={styles.DashboardCard} key={index}>
								<div className={styles.TopSection}>
									<div className={styles.Left}>
										<h3>{item?.title}</h3>
										<p>{formatTimestamp(item?.createdAt) }</p>
									</div>
									<span onClick={() => handleDelete(item?._id)} style={{ cursor: "pointer" }}>
										<MdDeleteForever size={"1.25rem"} color="red" />
									</span>
									<button onClick={() => handleOpenEdit(item)}>View</button>
								</div>
								<div className={styles.Image}>
									<img src={DashboardDemo} alt="" height={"100%"} width={"100%"} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MultiDashboardNew;
