import React, { useState } from "react";
import Chart from "react-apexcharts";
import { GrDrag } from "react-icons/gr";
import styles from "./Dashboard.module.scss";

const OrderByPrice = () => {
	const [options, setOptions] = useState({
		series: [40, 40, 20],
		chart: {
			width: 380,
			type: "donut",
			toolbar: {
				show: true, // Disable the default toolbar
			},
		},
		colors: ["#2C2C2C", "#F9C235", "#87CEEB"],
		plotOptions: {
			pie: {
				startAngle: 0,
				endAngle: 360,
				donut: {
					labels: {
						show: true,
						total: {
							show: true,
							label: "80% Transactions",
							color: "#333",
							fontSize: "16px",
							fontWeight: 600,
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			type: "gradient",
		},
		legend: {
			show: true,
			position: "bottom",
			horizontalAlign: "center",
			formatter: function (val, opts) {
				if (opts.seriesIndex === 0) return "$200";
				if (opts.seriesIndex === 1) return "$100-$200";
				return "others";
			},
			labels: {
				useSeriesColors: true,
			},
		},
		title: {
			text: "Orders by Price Tiers",
			align: "left",
			style: {
				fontSize: "18px",
				fontWeight: "bold",
			},
		},
		subtitle: {
			text: "(+5) more in 2023",
			align: "left",
			style: {
				fontSize: "14px",
				color: "#34c38f",
			},
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	});

	return (
		<div className={styles.OrderByPrice}>
			<Chart options={options} series={options.series} type="donut" height={350} />
			<div className={styles.Buttons}>
				<span className={`${styles.dragHandleButton} dragHandle`}>
					<GrDrag />
				</span>
			</div>
		</div>
	);
};

export default OrderByPrice;
