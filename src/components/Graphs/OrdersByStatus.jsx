import React, { useState } from "react";
import Chart from "react-apexcharts";
import { GrDrag } from "react-icons/gr";
import styles from "./Dashboard.module.scss";

const OrdersByStatus = () => {
	const [options, setOptions] = useState({
		series: [
			{
				name: "Processing Orders",
				data: [40, 50, 45, 60, 55, 65, 70, 80], // Example data for Processing Orders
			},
			{
				name: "Shipped Orders",
				data: [30, 40, 35, 50, 45, 55, 60, 70], // Example data for Shipped Orders
			},
			{
				name: "Delivered Orders",
				data: [20, 30, 25, 40, 35, 45, 50, 60], // Example data for Delivered Orders
			},
		],
		chart: {
			type: "bar",
			height: 350,
		},
		colors: ["#F9C235", "#2C2C2C", "#34c38f"],
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "45%",
				endingShape: "rounded",
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ["transparent"],
		},
		xaxis: {
			categories: ["Feb 23", "Feb 24", "Feb 25", "Feb 26", "Feb 27", "Feb 28", "Feb 29", "Feb 30"],
		},
		yaxis: {
			title: {
				text: "Orders Count",
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val + " Orders";
				},
			},
		},
		title: {
			text: "Orders Status Overview",
			align: "left",
			style: {
				fontSize: "18px",
				fontWeight: "bold",
			},
		},
		subtitle: {
			text: "Order counts for the last week of February",
			align: "left",
			style: {
				fontSize: "14px",
				color: "#34c38f",
			},
		},
	});

	return (
		<div className={styles.OrdersByStatus}>
			<Chart options={options} series={options.series} type="bar" height={350} />
			<div className={styles.Buttons}>
				<span className={`${styles.dragHandleButton} dragHandle`}>
					<GrDrag />
				</span>
			</div>
		</div>
	);
};

export default OrdersByStatus;
