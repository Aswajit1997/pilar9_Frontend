import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowUp } from "react-icons/io";
import "react-resizable/css/styles.css";
import { SoldProduct } from "../../assets/svg/SvgIndex";
import CompletedOrdersChart from "../../components/Graphs/CompletedOrdersChart";
import OrdersByCategory from "../../components/Graphs/OrdersByCategory";
import OrdersByPrice from "../../components/Graphs/OrdersByPrice";
import OrdersByStatus from "../../components/Graphs/OrdersByStatus";
import RevenueGrowth from "../../components/Graphs/RevenueGrowth";
import EditViewBar from "./EditViewBar";
import styles from "./Home.module.scss";

const Home = () => {
	const [gridWidth, setGridWidth] = useState(window.innerWidth * 0.8);

	useEffect(() => {
		// Function to calculate 80vw based on window width
		const updateGridWidth = () => {
			setGridWidth(window.innerWidth * 0.8);
		};

		updateGridWidth();

		window.addEventListener("resize", updateGridWidth);
		return () => window.removeEventListener("resize", updateGridWidth);
	}, []);
	const layout = [
		{ i: "box1", x: 0, y: 0, w: 6, h: 3 },
		{ i: "box2", x: 6, y: 0, w: 6, h: 3 },
		{ i: "box3", x: 0, y: 3, w: 4, h: 3 },
		{ i: "box4", x: 4, y: 3, w: 8, h: 3 },
		{ i: "box5", x: 0, y: 6, w: 12, h: 3 },
	];

	// const

	const [ViewBarEditPopup, setViewBarEditPopup] = useState(false);
	const [currentEditData, setCurrentEditData] = useState({});

	const handleOpenPopup = (data) => {
		setCurrentEditData(data);
		setViewBarEditPopup(true);
	};

	const handleUpdate = (updatedData) => {
		console.log("Updated Data:", updatedData);
		// Update the relevant data in state or make an API call to save
	};
	return (
		<>
			{ViewBarEditPopup && (
				<EditViewBar setViewBarEditPopup={setViewBarEditPopup} currentData={currentEditData} onUpdate={handleUpdate} />
			)}
			<div className={styles.Home}>
				<div className={styles.Row1}>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Sold Product</p>
							<h2>157,367</h2>
							<h3>
								<span>
									<IoMdArrowUp />
								</span>
								6.7% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Sold Product", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Total Revenues</p>
							<h2>$9,741</h2>
							<h3 className={true ? styles.Down : ""}>
								<span>
									<IoMdArrowUp />
								</span>
								13.5% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Total Revenues", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Web Visiters</p>
							<h2>973K</h2>
							<h3>
								<span>
									<IoMdArrowUp />
								</span>
								6.7% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Web Visiters", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
					<div className={styles.Col}>
						<div className={styles.Left}>
							<p>Bounce Rate</p>
							<h2>81.92%</h2>
							<h3>
								<span>
									<IoMdArrowUp />
								</span>
								6.7% Increase
							</h3>
						</div>
						<div className={styles.Right}>
							<div className={styles.Icon}>
								<img src={SoldProduct} alt="" />
							</div>
							<span onClick={() => handleOpenPopup({ title: "Bounce Rate", icon: SoldProduct })}>
								<BsThreeDots />
							</span>
						</div>
					</div>
				</div>
				<GridLayout className="layout" layout={layout} cols={12} rowHeight={120} width={gridWidth} draggableHandle=".dragHandle">
					<div key="box1" className={styles.gridItem}>
						<RevenueGrowth />
					</div>
					<div key="box2" className={styles.gridItem}>
						<CompletedOrdersChart />
					</div>
					<div key="box3" className={styles.gridItem}>
						<OrdersByPrice />
					</div>

					<div key="box4" className={styles.gridItem}>
						<OrdersByStatus />
					</div>
					<div key="box5" className={styles.gridItem}>
						<OrdersByCategory />
					</div>
				</GridLayout>
			</div>
		</>
	);
};

export default Home;
