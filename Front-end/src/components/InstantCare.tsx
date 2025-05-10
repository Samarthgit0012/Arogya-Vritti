import React, { useState } from "react";
import { Phone, MessageSquare, AlertTriangle, Heart, Clock, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import HealthChatbot from "./HealthChatbot";

interface InstantCareProps {
  onStartConsultation: () => void;
}

const InstantCare: React.FC<InstantCareProps> = ({ onStartConsultation }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const emergencyOptions = [
    {
      id: "emergency",
      title: "Emergency Care",
      description: "Immediate medical attention for life-threatening conditions",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      responseTime: "Immediate",
      action: "Call Emergency Services"
    },
    {
      id: "urgent",
      title: "Urgent Care",
      description: "Quick medical attention for non-life-threatening conditions",
      icon: <Heart className="w-6 h-6 text-orange-500" />,
      responseTime: "Within 15 minutes",
      action: "Connect to Doctor"
    },
    {
      id: "quick",
      title: "Quick Consultation",
      description: "General medical advice and minor concerns",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      responseTime: "Within 30 minutes",
      action: "Schedule Quick Call"
    },
    {
      id: "chatbot",
      title: "AI Health Assistant",
      description: "Get instant answers to your health questions",
      icon: <Bot className="w-6 h-6 text-purple-500" />,
      responseTime: "Instant",
      action: "Start Chat"
    }
  ];

  const handleOptionSelect = (optionId: string) => {
    if (optionId === "chatbot") {
      setShowChatbot(true);
    } else {
      setSelectedOption(optionId);
    }
  };

  const handleAction = () => {
    if (selectedOption === "emergency") {
      window.location.href = "tel:911";
    } else {
      onStartConsultation();
    }
  };

  if (showChatbot) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Health Assistant</h1>
            <Button
              variant="outline"
              onClick={() => setShowChatbot(false)}
              className="text-gray-600"
            >
              Back to Options
            </Button>
          </div>
          <HealthChatbot />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instant Medical Assistance</h1>
          <p className="text-gray-600">Get immediate help for your medical concerns</p>
        </div>

        <div className="grid gap-6">
          {emergencyOptions.map((option) => (
            <div
              key={option.id}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                selectedOption === option.id ? "ring-2 ring-blue-500" : "hover:shadow-lg"
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-gray-600 mt-1">{option.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{option.responseTime}</span>
                    </div>
                  </div>
                  {selectedOption === option.id && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={handleAction}
                        className={`${
                          option.id === "emergency"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {option.id === "emergency" ? (
                          <>
                            <Phone className="w-4 h-4 mr-2" />
                            {option.action}
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {option.action}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {/* Emergency component removed for standalone use */}
        </div>
      </div>
    </div>
  );
};

export default InstantCare; 