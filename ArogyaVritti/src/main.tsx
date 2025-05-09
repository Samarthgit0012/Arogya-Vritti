
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApiProvider } from './contexts/ApiContext.tsx'

createRoot(document.getElementById("root")!).render(
  <ApiProvider>
    <App />
  </ApiProvider>
);
