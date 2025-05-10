import React, { useState } from 'react';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ReportUploaderProps {
  onUpload: (file: File) => void;
}

const ReportUploader: React.FC<ReportUploaderProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    // Avoid duplicates by name and size
    setSelectedFiles((prev) => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [...prev, ...files.filter(f => !existing.has(f.name + f.size))];
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    for (const file of selectedFiles) {
      await onUpload(file);
    }
    setSelectedFiles([]);
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
          multiple
        />
        {selectedFiles.length === 0 ? (
          <div className="text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Drag and drop your medical reports here, or click to select
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports PDF, JPG, JPEG, PNG. You can select multiple files.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedFiles.map((file, idx) => (
              <div key={file.name + file.size} className="flex items-center justify-between p-2 border rounded-lg mb-1">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-6 w-6 text-indigo-500" />
                  <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedFiles.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleUpload}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Upload {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportUploader; 