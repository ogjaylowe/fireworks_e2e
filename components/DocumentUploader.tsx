"use client";

import React, { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, X, Scan } from "lucide-react";

interface DocumentUploaderProps {
  onScan?: (file: File) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onScan }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleScan = () => {
    if (selectedFile && onScan) {
      onScan(selectedFile);
    }
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    return (
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md mt-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-500" />
          <span>{selectedFile.name}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleRemoveFile}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderImagePreview = () => {
    if (!previewUrl) return null;

    return (
      <div className="mt-4 relative w-full">
        <div className="w-full aspect-w-16 aspect-h-9 border rounded-md overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="mb-4"
        />
        {renderFilePreview()}
        {renderImagePreview()}
        {selectedFile && (
          <Button 
            onClick={handleScan} 
            className="w-full mt-4"
          >
            <Scan className="mr-2 h-4 w-4" />
            Scan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;