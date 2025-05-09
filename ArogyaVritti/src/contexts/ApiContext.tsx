
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

type ApiContextType = {
  apiUrl: string;
  setApiUrl: (url: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isConnected: boolean;
  testConnection: () => Promise<boolean>;
  fetchWithAuth: <T>(endpoint: string, options?: RequestInit) => Promise<T>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [apiUrl, setApiUrl] = useState<string>(localStorage.getItem('mongoApiUrl') || '');
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('mongoApiKey') || '');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Save to localStorage when values change
  React.useEffect(() => {
    if (apiUrl) localStorage.setItem('mongoApiUrl', apiUrl);
    if (apiKey) localStorage.setItem('mongoApiKey', apiKey);
  }, [apiUrl, apiKey]);

  const testConnection = async (): Promise<boolean> => {
    if (!apiUrl || !apiKey) {
      toast("API URL and Key are required", {
        description: "Please set both API URL and key to connect to MongoDB Atlas",
      });
      return false;
    }
    
    try {
      const response = await fetch(`${apiUrl}/health`, {
        headers: {
          'x-api-key': apiKey,
        },
      });
      
      const connected = response.ok;
      setIsConnected(connected);
      
      if (connected) {
        toast("Connected to MongoDB Atlas API", {
          description: "Your API connection is working correctly",
        });
      } else {
        toast("Failed to connect to API", {
          description: "Check your API URL and key",
        });
      }
      
      return connected;
    } catch (error) {
      console.error("Connection error:", error);
      setIsConnected(false);
      toast("Connection error", {
        description: "Could not reach the API endpoint",
      });
      return false;
    }
  };

  const fetchWithAuth = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    if (!apiUrl || !apiKey) {
      throw new Error("API URL and Key must be set before making requests");
    }

    const url = `${apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    return response.json();
  };

  const value = {
    apiUrl,
    setApiUrl,
    apiKey,
    setApiKey,
    isConnected,
    testConnection,
    fetchWithAuth,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
