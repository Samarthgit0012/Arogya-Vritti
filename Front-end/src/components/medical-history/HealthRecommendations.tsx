import React from 'react';
import {
  HeartIcon,
  FireIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Recommendation } from '../../../types/medical';

interface HealthRecommendationsProps {
  recommendations: Recommendation[];
}

const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations
}) => {
  const getIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'diet':
        return FireIcon;
      case 'exercise':
        return HeartIcon;
      case 'lifestyle':
        return ClockIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'success':
        return CheckCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Personalized Health Recommendations
        </h2>
        
        <div className="space-y-4">
          {recommendations.map((recommendation) => {
            const Icon = recommendation.icon || getIcon(recommendation.type);
            return (
              <div
                key={recommendation.id}
                className={`
                  p-4 rounded-lg border
                  ${getPriorityColor(recommendation.priority)}
                  transition-all duration-200 hover:shadow-md
                `}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{recommendation.title}</h3>
                    <p className="mt-1 text-sm">{recommendation.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Disclaimer */}
        <div className="mt-6 text-xs text-gray-500">
          <p>
            These recommendations are generated using AI and should be discussed with your healthcare provider.
            They are not a substitute for professional medical advice.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Schedule Consultation
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Export Recommendations
        </button>
      </div>
    </div>
  );
};

export default HealthRecommendations; 