import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportUploader from './ReportUploader';
import api from '@/lib/axios';
import { FileText, Trash2, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

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
    await fetchReports(); // Refresh the reports list after upload
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

  const handleDownload = async (report: MedicalReport) => {
    try {
      // Get the full URL by combining the base URL with the file path
      const fileUrl = `${import.meta.env.VITE_API_URL}${report.fileUrl}`;
      
      // Fetch the file
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to download file');
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = report.fileName; // Use the original filename
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
      
      toast.success('File downloaded successfully');
    } catch (err) {
      console.error('Error downloading report:', err);
      toast.error('Failed to download file');
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
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{report.fileName}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {new Date(report.uploadDate).toLocaleDateString()}
                      </p>
                      {report.description && (
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(report._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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