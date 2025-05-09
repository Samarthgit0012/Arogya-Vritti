import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import HealthTimeline from './HealthTimeline';
import HealthDashboard from './HealthDashboard';
import { healthMetrics } from './healthMetricsData';

export interface HealthMetric {
  id: string;
  name: string;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  data: {
    date: string;
    value: number;
    type: string;
  }[];
}

const HealthMetricsTimeline: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(healthMetrics[0].id);

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={activeMetric} className="w-full">
        {/* Section 1: Options */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Health Metrics</h2>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => {/* TODO: Add new reading */}}
            >
              Add New Reading
            </button>
          </div>
          <TabsList className="grid grid-cols-4 gap-2">
            {healthMetrics.map((metric) => (
              <TabsTrigger
                key={metric.id}
                value={metric.id}
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 whitespace-nowrap text-sm"
              >
                {metric.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Section 2: Graph */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {healthMetrics.map((metric) => (
            <TabsContent key={metric.id} value={metric.id}>
              <div className="h-[400px] w-full">
                <HealthTimeline
                  data={metric.data}
                  metricType={metric.name}
                  unit={metric.unit}
                  normalRange={metric.normalRange}
                />
              </div>
            </TabsContent>
          ))}
        </div>

        {/* Section 3: Dashboard */}
        <div className="bg-white rounded-lg shadow p-6">
          {healthMetrics.map((metric) => (
            <TabsContent key={metric.id} value={metric.id}>
              <HealthDashboard selectedMetric={metric} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default HealthMetricsTimeline; 