import React from "react";
import DashSales from "./DashSales";
import DashUserRevenue from "./DashUserRevenue";

const DashMonth = () => {
  const searchMonthYear = (monthYear) => {
    console.log(monthYear);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[#919191] text-lg font-semibold">Dashboard</p>
        <div>
          <input
            type="month"
            className="bg-[#ffffff] px-2 rounded-md outline-none border-2 border-[#232539]"
            onChange={(e) => searchMonthYear(e.target.value)}
          />
        </div>
      </div>

      <div>
        <DashSales/>
        <DashUserRevenue/>
      </div>
    </div>
  );
};

export default DashMonth;
