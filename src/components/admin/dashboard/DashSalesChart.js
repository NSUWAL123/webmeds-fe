import React, { useEffect } from "react";
import * as d3 from "d3";

const DashSalesChart = (props) => {
  const { figures,  monthYear } = props;
  const orderTotal = figures.orderTotal;
  const prescriptionTotal = figures.prescriptionTotal;
  const data = [
    {
      label: "Prescription Orders",
      value: prescriptionTotal,
      color: "#31D490",
    },
    { label: "Product Orders", value: orderTotal, color: "#5D94E7" },
  ];

  let totalValue = 0;
  data.map((ind, i) => {
    return (totalValue += ind.value);
  });
  console.log(totalValue);

  let outerRadius = 150;
  let innerRadius = 0;
  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const width = 2 * outerRadius;
  const height = 2 * outerRadius;

  useEffect(() => {
    drawChart();
  }, [data]);

  const colorScale = d3
    .scaleQuantize()
    // .interpolator(d3.interpolateCool)
    .domain([0, data.length])
    .range([data[0].color, data[1].color]);

  function drawChart() {
    // draw the chart here
    d3.select("#pie-container").select("svg").remove();

    // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    // Append text labels
    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      // .text((d) => d.data.label)
      // .style('fill', (_, i) => colorScale(data.length - i))
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }
  return (
    <div className=" flex flex-col items-center">
      <p className="text-2xl font-medium text-[#8a8a8a]">Revenue breakdown of {monthYear}:</p>
      {orderTotal === 0 && prescriptionTotal === 0 ? (
        <h2 className="mt-5 text-[#8a8a8a] text-lg">
          No revenue generated on {monthYear}
        </h2>
      ) : (
        <div className="flex flex-col sm:flex-row  ">
          <div id="pie-container" className="flex justify-center my-5"></div>
          <div className="sm:flex sm:flex-col sm:justify-center">
            {data.map((indData, i) => {
              return (
                <div className="flex my-1" key={i}>
                  <div
                    className={`w-[20px] h-[20px] mx-3`}
                    style={{ backgroundColor: indData.color }}
                  ></div>
                  <p>
                    {indData.label}{" "}
                    <span className="font-semibold">
                      - {((indData.value / totalValue) * 100).toFixed(2)}%
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashSalesChart;
