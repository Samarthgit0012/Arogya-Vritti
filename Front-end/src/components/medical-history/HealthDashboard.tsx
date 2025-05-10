import React from 'react';
import { HealthMetric } from './healthMetricsData';

interface HealthDashboardProps {
  selectedMetric: HealthMetric;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ selectedMetric }) => {
  const getMetricInsights = (metric: HealthMetric) => {
    if (!metric.data || metric.data.length === 0) {
      return {
        latestValue: null,
        trend: 'no data',
        isNormal: true,
        normalRange: metric.normalRange,
        unit: metric.unit
      };
    }

    const latestReading = metric.data[metric.data.length - 1];
    const previousReading = metric.data.length > 1 ? metric.data[metric.data.length - 2] : null;
    const trend = previousReading 
      ? latestReading.value > previousReading.value ? 'increasing' : 'decreasing'
      : 'no trend';
    const isNormal = latestReading.value >= metric.normalRange.min && latestReading.value <= metric.normalRange.max;

    return {
      latestValue: latestReading.value,
      trend,
      isNormal,
      normalRange: metric.normalRange,
      unit: metric.unit
    };
  };

  const insights = getMetricInsights(selectedMetric);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Current Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Current Status</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Latest Reading</span>
            <span className="font-medium">
              {insights.latestValue !== null 
                ? `${insights.latestValue} ${insights.unit}`
                : 'No readings yet'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <span className={`font-medium ${insights.isNormal ? 'text-green-600' : 'text-red-600'}`}>
              {insights.latestValue !== null 
                ? (insights.isNormal ? 'Normal' : 'Outside Normal Range')
                : 'No data'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trend</span>
            <span className={`font-medium ${
              insights.trend === 'increasing' ? 'text-red-600' : 
              insights.trend === 'decreasing' ? 'text-green-600' : 
              'text-gray-600'
            }`}>
              {insights.trend.charAt(0).toUpperCase() + insights.trend.slice(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Normal Range</span>
            <span className="font-medium">
              {insights.normalRange.min} - {insights.normalRange.max} {insights.unit}
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h4>
        <div className="space-y-4">
          <ul className="space-y-2">
            {insights.latestValue === null ? (
              <li className="text-gray-600">
                • Add your first reading to get personalized recommendations.
              </li>
            ) : (
              <>
                {!insights.isNormal && (
                  <li className="text-red-600">
                    • Your reading is outside the normal range. Consider consulting with your healthcare provider.
                  </li>
                )}
                {insights.trend === 'increasing' && insights.latestValue > insights.normalRange.max && (
                  <li className="text-amber-600">
                    • Your {selectedMetric.name.toLowerCase()} is trending upward. Monitor closely and consider lifestyle adjustments.
                  </li>
                )}
                {insights.trend === 'decreasing' && insights.latestValue < insights.normalRange.min && (
                  <li className="text-amber-600">
                    • Your {selectedMetric.name.toLowerCase()} is trending downward. Monitor closely and consider lifestyle adjustments.
                  </li>
                )}
                <li className="text-gray-600">
                  • Continue regular monitoring and maintain a healthy lifestyle.
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Historical Data */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Historical Data</h4>
        <div className="space-y-4">
          {selectedMetric.data.length === 0 ? (
            <p className="text-gray-500">No historical data available. Add your first reading!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Value</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMetric.data.map((reading, index) => {
                    const isNormal = reading.value >= selectedMetric.normalRange.min && reading.value <= selectedMetric.normalRange.max;
                    return (
                      <tr key={index} className="border-b">
                        <td className="py-2">{new Date(reading.date).toLocaleDateString()}</td>
                        <td className="py-2">{reading.value} {selectedMetric.unit}</td>
                        <td className="py-2">
                          <span className={isNormal ? 'text-green-600' : 'text-red-600'}>
                            {isNormal ? 'Normal' : 'Outside Range'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Related Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Related Metrics</h4>
        <div className="space-y-4">
          <ul className="space-y-2">
            {selectedMetric.id === 'blood-pressure' && (
              <>
                <li className="text-gray-600">• Heart Rate</li>
                <li className="text-gray-600">• Blood Oxygen</li>
                <li className="text-gray-600">• Cholesterol Levels</li>
              </>
            )}
            {selectedMetric.id === 'blood-glucose' && (
              <>
                <li className="text-gray-600">• Hemoglobin A1C</li>
                <li className="text-gray-600">• Insulin Levels</li>
                <li className="text-gray-600">• Weight/BMI</li>
              </>
            )}
            {/* Add more related metrics for other types */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard; 