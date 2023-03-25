import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../../../utils/handleToken";
import DashSales from "./DashSales";
import DashSalesChart from "./DashSalesChart";
import DashTopProductsBar from "./DashTopProductsBar";
import DashUserRevenue from "./DashUserRevenue";

const DashMonth = () => {
  let currentDate = new Date().toJSON().slice(0, 7);
  const [monthYear, setMonthYear] = useState(currentDate);
  const [figures, setFigures] = useState({
    orderTotal: 0,
    prescriptionTotal: 0,
    productSales: 0,
    ordersFulfilled: 0,
    prescriptionsFulfilled: 0,
    failedDeliveries: 0,
    totalCustomers: 0,
  })

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/dashboard/details/${monthYear}`,
        config
      );
      setFigures(data);
    })()
  }, [monthYear])
  // console.log(monthYear)
  console.log(figures);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[#919191] text-lg font-semibold">Dashboard</p>
        <div>
          <input
            type="month"
            className="bg-[#ffffff] px-2 rounded-md outline-none border-2 border-[#232539]"
            value={monthYear}
            onChange={(e) => setMonthYear(e.target.value)}
            min="2023-01"
            max={currentDate}
          />
        </div>
      </div>

      <div>
        <DashSales figures={figures}/>
        <DashUserRevenue  figures={figures}/>
        <div className="bg-[#f9f9f9] mt-10 py-5 rounded-lg xl:flex  xl:justify-around items-center">
          <DashSalesChart  figures={figures}/>
          <DashTopProductsBar  figures={figures}/>
        </div>
      </div>
    </div>
  );
};

export default DashMonth;
