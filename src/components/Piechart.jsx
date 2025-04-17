import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { ToolboxComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// Register necessary components
echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const NightingaleChart = () => {
  const chartRef = useRef(null); // This holds the DOM element

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" },
          ],
        },
      ],
    };

    chartInstance.setOption(option);

    // Auto-resize on window resize
    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full h-[500px] rounded-lg shadow-md bg-white dark:bg-slate-800"
    />
  );
};

export default NightingaleChart;
