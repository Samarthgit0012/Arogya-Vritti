
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useApi } from '@/contexts/ApiContext';

const ApiSettings = () => {
  const { apiUrl, setApiUrl, apiKey, setApiKey, isConnected, testConnection } = useApi();
  
  const [localApiUrl, setLocalApiUrl] = useState(apiUrl);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [isTesting, setIsTesting] = useState(false);
  
  const handleSave = async () => {
    setApiUrl(localApiUrl);
    setApiKey(localApiKey);
    
    setIsTesting(true);
    await testConnection();
    setIsTesting(false);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MongoDB Atlas API Settings</CardTitle>
        <CardDescription>
          Configure your connection to MongoDB Atlas API endpoints
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-url">API Base URL</Label>
          <Input
            id="api-url"
            placeholder="https://your-api-endpoint.com"
            value={localApiUrl}
            onChange={(e) => setLocalApiUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The base URL for your MongoDB Atlas API endpoint
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Your API Key"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Authentication key for your API. Keep this secure!
          </p>
        </div>
        
        <div className="pt-2">
          {isConnected ? (
            <div className="flex items-center text-sm text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Connected to MongoDB Atlas API
            </div>
          ) : (
            <div className="flex items-center text-sm text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Not connected to API
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          disabled={isTesting}
          className="w-full"
        >
          {isTesting ? "Testing Connection..." : "Save & Test Connection"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiSettings;
