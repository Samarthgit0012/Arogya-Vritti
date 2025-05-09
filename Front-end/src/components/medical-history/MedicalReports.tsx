import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportUploader from './ReportUploader';

const MedicalReports = () => {
  const handleUpload = (file: File) => {
    // TODO: Implement file upload logic
    console.log('File uploaded:', file.name);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportUploader onUpload={handleUpload} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500">No reports uploaded yet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalReports; 