
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, Video, Activity, MessageSquare, FileText, AlertTriangle, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Care Anywhere Now</h1>
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User size={16} />
                Profile
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => {
              localStorage.removeItem('isAuthenticated');
              window.location.href = '/auth';
            }}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Link to="/devices">
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
              </div>
              <Link to="/appointments">
                <Button variant="link" className="mt-4 p-0 h-auto">
                  Manage appointments
                </Button>
              </Link>
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

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/appointments">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <Calendar size={24} className="text-blue-600 mb-2" />
                <h3 className="font-medium">Book Appointment</h3>
                <p className="text-sm text-gray-500 mt-1">Schedule a consultation</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/assistant">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <MessageSquare size={24} className="text-blue-600 mb-2" />
                <h3 className="font-medium">AI Chatbot</h3>
                <p className="text-sm text-gray-500 mt-1">Get quick health advice</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/records">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <FileText size={24} className="text-blue-600 mb-2" />
                <h3 className="font-medium">Medical Records</h3>
                <p className="text-sm text-gray-500 mt-1">View & manage records</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/emergency">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <AlertTriangle size={24} className="text-red-600 mb-2" />
                <h3 className="font-medium">Emergency</h3>
                <p className="text-sm text-gray-500 mt-1">Find nearby assistance</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
