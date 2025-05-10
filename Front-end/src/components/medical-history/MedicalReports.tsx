import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportUploader from './ReportUploader';
import api from '@/lib/axios';
import { DocumentTextIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface MedicalReport {
  _id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  description: string;
  reportType: string;
  uploadDate: string;
}

const MedicalReports = () => {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      const response = await api.get('/api/medical/reports');
      setReports(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reports');
      console.error('Error fetching reports:', err);
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('report', file);
      formData.append('description', 'Medical report');
      formData.append('reportType', 'other');

      await api.post('/api/medical/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Report uploaded successfully');
      fetchReports(); // Refresh the reports list
    } catch (err) {
      console.error('Error uploading report:', err);
      setError('Failed to upload report');
      toast.error('Failed to upload report');
    }
  };

  const handleDelete = async (reportId: string) => {
    try {
      await api.delete(`/api/medical/reports/${reportId}`);
      toast.success('Report deleted successfully');
      fetchReports(); // Refresh the reports list
    } catch (err) {
      console.error('Error deleting report:', err);
      setError('Failed to delete report');
      toast.error('Failed to delete report');
    }
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
          {loading ? (
            <p className="text-gray-500">Loading reports...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-500">No reports uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <DocumentTextIcon className="h-8 w-8 text-indigo-500" />
                    <div>
                      <p className="font-medium">{report.fileName}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {new Date(report.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalReports; 