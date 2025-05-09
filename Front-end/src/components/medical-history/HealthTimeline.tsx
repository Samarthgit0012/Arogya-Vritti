import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthTimelineProps {
  data: {
    date: string;
    value: number;
    type: string;
  }[];
  metricType: string;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
}

const HealthTimeline: React.FC<HealthTimelineProps> = ({
  data,
  metricType,
  unit,
  normalRange
}) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: `${metricType} (${unit})`,
        data: data.map(item => item.value),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Normal Range',
        data: data.map(() => normalRange.max),
        borderColor: 'rgba(34, 197, 94, 0.5)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderDash: [5, 5],
        fill: '+1',
      },
      {
        label: 'Normal Range',
        data: data.map(() => normalRange.min),
        borderColor: 'rgba(34, 197, 94, 0.5)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${metricType} Over Time`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HealthTimeline; 