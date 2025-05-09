import React, { useState } from 'react';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ReportUploaderProps {
  onUpload: (file: File) => void;
}

const ReportUploader: React.FC<ReportUploaderProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    onUpload(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const removeFile = () => {
    setFileName(null);
    setPreview(null);
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6
          ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
          transition-colors duration-200 ease-in-out
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        
        {!fileName ? (
          <div className="text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Drag and drop your medical report here, or click to select
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports PDF, JPG, JPEG, PNG
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-indigo-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{fileName}</p>
                <p className="text-xs text-gray-500">
                  {preview ? 'Image preview available' : 'Processing...'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="border rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Report preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportUploader; 