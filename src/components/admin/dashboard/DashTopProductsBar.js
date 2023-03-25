import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data1 = [4, 4, 3, 5, 6, 7, 3];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: data1,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const DashTopProductsBar = () => {
  return (
    <div className="w-full xl:w-auto mt-10 xl:mt-0 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-[#8a8a8a]">
        Top Selling Products:
      </h1>

      <Bar options={options} data={data} className="my-4 w-[500px]" />
    </div>
  );
};

export default DashTopProductsBar;
