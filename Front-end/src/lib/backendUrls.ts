// List of possible backend URLs to try
const BACKEND_URLS = [
    'http://localhost:8080',  // Local development
    'https://arogya-vritti-backend.onrender.com',  // Production
    'https://api.arogya-vritti.life',  // Custom domain
    import.meta.env.VITE_BACKEND_URL  // Environment variable as fallback
  ].filter(Boolean); // Remove any undefined values
  
  // Function to test if a URL is accessible
  const testBackendUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(`${url}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  
  // Function to get the first working backend URL
  export const getWorkingBackendUrl = async (): Promise<string> => {
    for (const url of BACKEND_URLS) {
      if (await testBackendUrl(url)) {
        return url;
      }
    }
    // If no URL works, return the first one as fallback
    return BACKEND_URLS[0];
  };
  
  // Export the current working URL
  export let currentBackendUrl = BACKEND_URLS[0];
  
  // Function to initialize and update the current URL
  export const initializeBackendUrl = async () => {
    currentBackendUrl = await getWorkingBackendUrl();
    return currentBackendUrl;
  };