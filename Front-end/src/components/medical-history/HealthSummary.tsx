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
} from 'chart.js';
import { healthMetrics } from './healthMetricsData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HealthSummary: React.FC = () => {
  // Get the last 7 days of data for each metric
  const last7Days = healthMetrics.map(metric => {
    const recentData = metric.data.slice(-7);
    return {
      name: metric.name,
      data: recentData,
      unit: metric.unit,
      normalRange: metric.normalRange
    };
  });

  // Prepare data for the combined chart
  const chartData = {
    labels: last7Days[0].data.map(d => d.date),
    datasets: last7Days.map((metric, index) => ({
      label: metric.name,
      data: metric.data.map(d => d.value),
      borderColor: `hsl(${index * 30}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 30}, 70%, 50%, 0.1)`,
      tension: 0.4,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Health Metrics Overview (Last 7 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Get current status and recommendations
  const currentStatus = last7Days.map(metric => {
    const latestValue = metric.data[metric.data.length - 1].value;
    const isNormal = latestValue >= metric.normalRange.min && latestValue <= metric.normalRange.max;
    return {
      name: metric.name,
      value: latestValue,
      unit: metric.unit,
      status: isNormal ? 'Normal' : latestValue < metric.normalRange.min ? 'Low' : 'High',
      recommendation: isNormal 
        ? 'Continue maintaining current levels'
        : latestValue < metric.normalRange.min 
          ? 'Consider increasing your levels'
          : 'Consider reducing your levels'
    };
  });

  return (
    <div className="flex gap-6">
      {/* Combined Graph */}
      <div className="w-[65%] bg-white rounded-lg shadow p-6">
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Summary Cards - Scrollable */}
      <div className="w-[35%] bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-900">Current Status</h3>
        </div>
        <div className="h-[400px] overflow-y-auto">
          {currentStatus.map((status, index) => (
            <div key={index} className="p-4 border-b last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{status.name}</h4>
                <span className={`px-2 py-1 rounded text-sm ${
                  status.status === 'Normal' 
                    ? 'bg-green-100 text-green-800'
                    : status.status === 'High'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {status.status}
                </span>
              </div>
              <div className="text-2xl font-bold mb-2">
                {status.value} {status.unit}
              </div>
              <p className="text-sm text-gray-600">{status.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthSummary; 