import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryPie } from "victory";

const AnnualSalesChart = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 border rounded-lg mt-6 w-full">
        <h3 className="text-xl font-semibold mb-4">Annual Sales Overview</h3>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 30, y: [0, 0] }}
          height={200}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryAxis
            style={{ tickLabels: { fontSize: 8, padding: 5, angle: -45, textAnchor: "end" } }}
            tickFormat={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
          />
          <VictoryAxis
            dependentAxis
            style={{ tickLabels: { fontSize: 7, padding: 5, fontWeight:'bold' } }}
            tickFormat={(x) => `RM${x / 1000}k`}
          />
          <VictoryBar
            data={data}
            x="month"
            y="sales"
            labels={({ datum }) => `$${datum.sales}`}
            labelComponent={<VictoryTooltip style={{ fontSize: 6, padding: 4, pointerEvents: "none" }} flyoutStyle={{ stroke: "#4C51BF", strokeWidth: 1, fill: "white", pointerEvents: "none" }} />}
            style={{ data: { fill: "#4C51BF" } }}
          />
        </VictoryChart>
      </div>

      <div className="bg-white p-4 border rounded-lg mt-6 w-full">
        <h3 className="text-xl font-semibold mb-4">Sales Distribution</h3>
        <VictoryPie
          data={data}
          x="month"
          y="sales"
          labels={({ datum }) => `${datum.month}: $${datum.sales}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 6, padding: 4, pointerEvents: "none" }} flyoutStyle={{ stroke: "#4C51BF", strokeWidth: 1, fill: "white", pointerEvents: "none" }} />}
          style={{ labels: { fontSize: 10, padding: 5 }, data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 1 } }}
          colorScale={["#4C51BF", "#6B7280", "#9CA3AF", "#D1D5DB", "#1E40AF", "#3B82F6", "#6366F1", "#60A5FA", "#818CF8", "#93C5FD", "#BFDBFE", "#DBEAFE"]}
          height={200}
        />
      </div>
    </div>
  );
};

export default AnnualSalesChart;
