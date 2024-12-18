import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
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

export default function BalanceHistory() {
  const chartRef = useRef(null);

  // Gradient Background Function
  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(55, 120, 250, 0.4)"); // Darker at top
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Fade to transparent
    return gradient;
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure custom height takes effect
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 800,
        ticks: {
          stepSize: 200,
          color: "gray",
        },
        grid: { color: "rgba(200, 200, 200, 0.2)" },
      },
    },
  };

  // Chart Data with Gradient
  const createChartData = () => {
    const ctx = chartRef.current?.ctx;
    const gradient = ctx ? getGradient(ctx) : "rgba(55, 120, 250, 0.4)";

    return {
      labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
      datasets: [
        {
          label: "Balance",
          data: [100, 350, 200, 800, 200, 600, 550],
          borderColor: "rgb(55, 120, 250)",
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
      ],
    };
  };

  return (
    <div className="md:w-[65%] w-full">
      <h3 className="text-gray-600 font-semibold mb-4">Balance History</h3>
      <div className="bg-white md:px-6 p-3 md:py-6 p-3 rounded-2xl shadow-md w-full h-[260px]">
        {/* Line Chart */}
        <Line ref={chartRef} data={createChartData()} options={options} />
      </div>
    </div>
  );
}
