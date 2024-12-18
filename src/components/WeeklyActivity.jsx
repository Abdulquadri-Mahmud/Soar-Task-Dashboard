import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

export default function WeeklyActivity() {
    const barData = {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Withdraw",
            backgroundColor: "#111827",
            data: [500, 350, 450, 500, 200, 400, 410],
            borderRadius: 50, // Rounded corners
          },
          {
            label: "Deposit",
            backgroundColor: "#3B82F6",
            data: [400, 300, 200, 450, 100, 350, 320],
            borderRadius: 50, // Rounded corners
          },
        ],
      };
      
    const barOptions = {
    responsive: true,
    layout: {
        padding: {
        bottom: 0, // Adds margin at the bottom
        },
    },
    plugins: {
        legend: {
        display: true,
        position: "top", // Position legend at the top
        align: "end", // Align legend to the right
        labels: {
            boxWidth: 12, // Small legend box
            usePointStyle: true, // Circle markers
            pointStyle: "circle", // Use circular icons
        },
        },
    },
    scales: {
        x: {
        grid: { display: false }, // Remove grid lines on x-axis
        barPercentage: 0.6, // Adjusts bar width (lower value = more space)
        categoryPercentage: 0.8, // Adjusts space between categories
        },
        y: {
        beginAtZero: true,
        grid: { borderDash: [3, 3] }, // Dashed grid lines on y-axis
        },
    },
    };
  return (
    <div className="col-span-2 w-full">
        <h3 className="text-gray-600 font-semibold mb-4">Weekly Activity</h3>
        <div className="bg-white md:p-6 p-3 rounded-2xl shadow w-full">
            {/* <h3 className="font-bold mb-"></h3> */}
            <Bar data={barData} options={barOptions} className='w-full'/>
        </div>
    </div>
  )
}
