
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EmergencyServices = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft size={20} />
            <span className="ml-1">Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-700">Emergency Services</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Find Emergency Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Emergency services location functionality will be implemented in the next phase.</p>
            <p className="mt-2">
              This will include geolocation services to find nearby hospitals and emergency centers,
              quick contact options, and automatic sharing of medical information in emergencies.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmergencyServices;
