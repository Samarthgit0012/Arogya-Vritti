import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import HealthTimeline from './HealthTimeline';
import HealthDashboard from './HealthDashboard';
import AddHealthReading from './AddHealthReading';
import { healthMetrics } from './healthMetricsData';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';

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
  const [metrics, setMetrics] = useState<HealthMetric[]>(healthMetrics);
  const [loading, setLoading] = useState(true);

  const fetchHealthMetrics = async () => {
    try {
      const response = await api.get('/api/medical/health-metrics');
      if (response.data) {
        // Sort the data by date
        const sortedData = response.data.sort((a: any, b: any) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Merge the fetched data with the existing metrics structure
        const updatedMetrics = healthMetrics.map(metric => ({
          ...metric,
          data: sortedData
            .filter((d: any) => d.type === metric.id)
            .map((d: any) => ({
              date: new Date(d.date).toISOString().split('T')[0],
              value: d.value,
              type: d.type
            }))
        }));

        console.log('Updated metrics:', updatedMetrics); // Debug log
        setMetrics(updatedMetrics);
      }
    } catch (error: any) {
      console.error('Error fetching health metrics:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load health metrics';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthMetrics();
  }, []);

  const handleReadingAdded = () => {
    fetchHealthMetrics();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={activeMetric} className="w-full" onValueChange={setActiveMetric}>
        {/* Section 1: Options */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-7xl mx-auto min-h-[200px]">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-900">Health Metrics</h2>
    <AddHealthReading onReadingAdded={handleReadingAdded} />
  </div>

  {/* Background added here */}
  <div className=" rounded p-2">
    {/* Remove background from here */}
<TabsList className="grid grid-cols-6 gap-2 w-full">
  {metrics.map((metric) => (
    <TabsTrigger
      key={metric.id}
      value={metric.id}
      className="bg-transparent data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 whitespace-nowrap text-sm"
    >
      {metric.name}
    </TabsTrigger>
  ))}
</TabsList>

  </div>
</div>


        {/* Section 2: Graph */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {metrics.map((metric) => (
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
          {metrics.map((metric) => (
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