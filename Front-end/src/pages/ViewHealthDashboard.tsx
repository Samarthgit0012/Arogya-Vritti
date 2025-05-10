import React, { useState } from 'react';
import { 
  ChartBarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import HealthMetricsTimeline from '../components/medical-history/HealthMetricsTimeline';
import HealthRecommendations from '../components/medical-history/HealthRecommendations';
import { Recommendation } from '../types/medical';

const ViewHealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('metrics');

  const tabs = [
    { id: 'metrics', name: 'Health Metrics', icon: ChartBarIcon },
    { id: 'recommendations', name: 'Health Recommendations', icon: ClipboardDocumentListIcon },
  ];

  // Sample data for HealthRecommendations
  const sampleRecommendations: Recommendation[] = [
    {
      id: '1',
      type: 'diet',
      title: 'Increase Iron Intake',
      description: 'Your recent blood tests show low iron levels. Consider adding more iron-rich foods to your diet.',
      priority: 'high'
    },
    {
      id: '2',
      type: 'exercise',
      title: 'Regular Exercise',
      description: 'Maintain a regular exercise routine of 30 minutes daily to improve cardiovascular health.',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'lifestyle',
      title: 'Sleep Schedule',
      description: 'Try to maintain a consistent sleep schedule of 7-8 hours per night.',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor your health metrics and get personalized recommendations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                  aria-hidden="true"
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'metrics' && (
            <div className="bg-white shadow rounded-lg p-6 w-full max-w-full overflow-x-auto">
              <HealthMetricsTimeline />
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Health Recommendations</h2>
              <div className="space-y-6">
                <HealthRecommendations recommendations={sampleRecommendations} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewHealthDashboard; 