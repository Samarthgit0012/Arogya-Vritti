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
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  // Sort data by date
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartData = {
    labels: sortedData.map(item => item.date),
    datasets: [
      {
        label: `${metricType} (${unit})`,
        data: sortedData.map(item => item.value),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Upper Normal Range',
        data: sortedData.map(() => normalRange.max),
        borderColor: 'rgba(34, 197, 94, 0.5)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Lower Normal Range',
        data: sortedData.map(() => normalRange.min),
        borderColor: 'rgba(34, 197, 94, 0.5)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
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
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} ${unit}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return `${value} ${unit}`;
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="w-full h-full">
      {data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No data available. Add your first reading!</p>
        </div>
      )}
    </div>
  );
};

export default HealthTimeline; 