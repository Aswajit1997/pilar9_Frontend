import React from "react";
import Chart from "react-apexcharts";
import { GrDrag } from "react-icons/gr";
import styles from "./Dashboard.module.scss";

const OrdersByProductCategory = () => {
	const options = {
		chart: {
			height: 350,
			type: "bar",
		},
		plotOptions: {
			bar: {
				columnWidth: "60%",
			},
		},
		colors: ["#F9C235"], // Color for the bars
		dataLabels: {
			enabled: true, // Enable data labels to show values on the bars
		},
		title: {
			text: "Orders by Product Category",
			align: "left",
			style: {
				fontSize: "18px",
				fontWeight: "bold",
			},
		},
		subtitle: {
			text: "(Order counts across all categories)",
			align: "left",
			style: {
				fontSize: "14px",
				color: "#34c38f",
			},
		},
	};

	const series = [
		{
			name: "Order Count",
			data: [
				{ x: "Cat 1", y: 200 },
				{ x: "Cat 2", y: 400 },
				{ x: "Cat 3", y: 600 },
				{ x: "Cat 4", y: 800 },
				{ x: "Cat 5", y: 300 },
				{ x: "Cat 6", y: 900 },
				{ x: "Cat 7", y: 500 },
				{ x: "Cat 8", y: 700 },
				{ x: "Cat 9", y: 600 },
				{ x: "Cat 10", y: 400 },
				{ x: "Cat 11", y: 300 },
				{ x: "Cat 12", y: 800 },
				{ x: "Cat 13", y: 1000 },
				{ x: "Cat 14", y: 1200 },
			],
		},
	];

	return (
		<div className={styles.OrdersByProductCategory}>
			<Chart options={options} series={series} type="bar" height={350} />
			<div className={styles.Buttons}>
				<span className={`${styles.dragHandleButton} dragHandle`}>
					<GrDrag />
				</span>
			</div>
		</div>
	);
};

export default OrdersByProductCategory;
