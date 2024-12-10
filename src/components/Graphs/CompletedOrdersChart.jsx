import React from "react";
import Chart from "react-apexcharts";
import { GrDrag } from "react-icons/gr";
import styles from "./Dashboard.module.scss";

const CompletedOrdersChart = () => {
	const series = [
		{
			name: "Completed",
			data: [200, 150, 230, 100, 170, 250, 220], // Sample data to mimic the curve
		},
	];

	const options = {
		chart: {
			type: "area",
			height: 350,
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
			width: 2,
			colors: ["#ffcd33"], // Yellow line color to match the image
		},
		title: {
			text: "Completed Orders Last 30 days",
			align: "left",
			style: {
				fontSize: "16px",
				fontWeight: "bold",
			},
		},
		subtitle: {
			text: "(+5) more in 2023",
			align: "left",
			style: {
				fontSize: "14px",
				color: "#34c38f", // Green color for subtitle
			},
		},
		labels: ["2023-02-23", "2023-02-24", "2023-02-25", "2023-02-26", "2023-02-27", "2023-02-28", "2023-02-29"],
		xaxis: {
			type: "datetime",
			title: {
				text: "Dates",
				style: {
					fontSize: "12px",
					fontWeight: "bold",
				},
			},
			labels: {
				format: "MMMdd",
			},
		},
		yaxis: {
			title: {
				text: "Orders",
				style: {
					fontSize: "12px",
					fontWeight: "bold",
				},
			},
			opposite: false,
		},
		legend: {
			horizontalAlign: "left",
		},
		fill: {
			type: "gradient",
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.3,
				opacityTo: 0.05,
				stops: [0, 90, 100],
			},
			colors: ["#ffcd33"],
		},
		tooltip: {
			x: {
				format: "MMM",
			},
			y: {
				formatter: (value) => `${value.toLocaleString()}`,
			},
			style: {
				fontSize: "12px",
			},
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				return `<div style="padding:5px; border-radius: 5px; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
          <span style="font-weight: 600; color: #6c757d">${w.globals.labels[dataPointIndex]}</span><br/>
          Completed: <strong>${series[seriesIndex][dataPointIndex].toLocaleString()}</strong>
        </div>`;
			},
		},
		grid: {
			borderColor: "#e7e7e7",
			strokeDashArray: 4,
		},
	};

	return (
		<div id="chart" className={styles.CompletedOrdersChart}>
			<Chart options={options} series={series} type="area" height={350} />
			<div className={styles.Buttons}>
				<span className={`${styles.dragHandleButton} dragHandle`}>
					<GrDrag />
				</span>
			</div>
		</div>
	);
};

export default CompletedOrdersChart;
