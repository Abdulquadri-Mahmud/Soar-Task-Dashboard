import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

export default function ExpensesStatistics() {
  // Pie Chart Data
  const pieData = {
    labels: ["Bill Expense", "Others", "Investment", "Entertainment"],
    datasets: [
      {
        data: [15, 35, 20, 30], // Data percentages
        backgroundColor: ["#1F2937", "#0e0d0d", "#60A5FA", "#F97316"], // Slice colors
        borderColor: "#ffffff", // White border between slices
        borderWidth: 4, // Border thickness
      },
    ],
  };

  // Pie Chart Options
  const pieOptions = {
    responsive: true,
    layout: {
      padding: {
        top: 0, // Add padding above the chart
        bottom: 0, // Add padding below the chart
        left: 0, // Add padding on the left
        right: 0, // Add padding on the right
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw || 0;
            let label = context.label || "";
            return `${value}% : ${label}`; // Custom tooltip format
          },
        },
      },
      datalabels: {
        color: "#fff", // White label text
        font: {
          weight: "500",
          size: 12,
        },
        formatter: (value, context) => {
          // Display both percentage and label
          const label = context.chart.data.labels[context.dataIndex];
          return `${value}%\n${label}`; // Show percentage and label stacked
        },
        anchor: "center", // Position label in the center of the slice
        align: "center", // Align text to center
        offset: 0, // Ensure text stays in the center
      },
    },
  };

  return (
    <div className="w-full mt-6 md:mt-0">
      <h3 className="text-gray-600 font-semibold mb-4">Expense Statistics</h3>
      <div className="bg-white px-6 md:py-10 py-6 rounded-2xl shadow w-full">
        <div className="relative w-full flex justify-center">
          {/* Add padding inside the chart area */}
          <Pie data={pieData} options={pieOptions} className="w-full" />
        </div>
      </div>
    </div>
  );
}
