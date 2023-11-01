import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options = {
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
    },
  },
};

function LineChart({ data, labels, containerClass, color }) {
  const chartData = {
    labels,
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
