import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, MessageSquare, AlertTriangle } from "lucide-react";
import HealthSummary from "@/components/medical-history/HealthSummary";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Health Summary Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">Your health metrics and recommendations at a glance</p>
          </div>
          <Link to="/instant-care">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Instant Care
            </Button>
          </Link>
        </div>
        <div className="p-6">
          <HealthSummary />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Health Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} className="text-blue-600" />
              Health Status
            </CardTitle>
            <CardDescription>Your current health overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Heart Rate</span>
                <span className="text-sm">72 BPM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Blood Pressure</span>
                <span className="text-sm">120/80 mmHg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm">Today, 10:30 AM</span>
              </div>
            </div>
            <Link to="/health-dashboard">
              <Button variant="link" className="mt-4 p-0 h-auto">
                View health dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Cardiology</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Tomorrow</p>
                    <p className="text-sm text-gray-500">10:00 AM</p>
                  </div>
                </div>
              </div>
              <Link to="/appointments">
                <Button variant="link" className="mt-4 p-0 h-auto">
                  Manage appointments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-600" />
              AI Assistant
            </CardTitle>
            <CardDescription>Health insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
              <p className="text-sm">Your blood pressure reading is slightly elevated. Consider reducing sodium intake and staying hydrated.</p>
            </div>
            <Link to="/assistant">
              <Button variant="link" className="mt-4 p-0 h-auto">
                Chat with assistant
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
