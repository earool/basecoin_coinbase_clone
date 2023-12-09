import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, [
  Tooltip,
]);

const defaultOptions = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 0,
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
};

function LineChart({
  data,
  labels,
  containerClass,
  color,
  options = defaultOptions,
}) {
  const chartData = {
    labels,
    type: 'line',
    datasets: [
      {
        label: '',
        data,
        fill: false,
        borderColor: color,
        borderWidth: 1,
        responsive: true,
      },
    ],
  };

  return (
    <div className={containerClass}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;
