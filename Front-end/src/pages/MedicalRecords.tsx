import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicalHistory from "@/components/medical-history/MedicalHistory";
import MedicalReports from "@/components/medical-history/MedicalReports";
import Telehealth from "@/components/medical-history/Telehealth";

const MedicalRecords = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft size={20} />
            <span className="ml-1">Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-700">Medical Records</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="reports">Medical Reports</TabsTrigger>
            <TabsTrigger value="telehealth">Telehealth</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <MedicalHistory />
          </TabsContent>

          <TabsContent value="reports">
            <MedicalReports />
          </TabsContent>

          <TabsContent value="telehealth">
            <Telehealth />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MedicalRecords;
