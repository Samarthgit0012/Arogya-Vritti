import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Image, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';

interface ReportUploaderProps {
  onUpload: (file: File) => void;
}

const ReportUploader: React.FC<ReportUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [reportType, setReportType] = useState('other');
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      // Check file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('report', file);
      formData.append('description', description);
      formData.append('reportType', reportType);

      const response = await api.post('/api/medical/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Report uploaded successfully');
      onUpload(file);
      // Reset form
      setFile(null);
      setDescription('');
      setReportType('other');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload report');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* File Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-center space-x-2">
                {file.type.startsWith('image/') ? (
                  <Image className="h-8 w-8 text-blue-500" />
                ) : (
                  <FileText className="h-8 w-8 text-blue-500" />
                )}
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">
                  Drag and drop a file here, or click to select
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, PNG, JPG (max 5MB)
                </p>
              </div>
            )}
          </div>

          {/* Report Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <Select
              value={reportType}
              onValueChange={setReportType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lab">Lab Report</SelectItem>
                <SelectItem value="imaging">Imaging Report</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter a description for this report..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Report'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportUploader; 