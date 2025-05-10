import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Consultation from "./pages/Consultation";
import DeviceMonitoring from "./pages/DeviceMonitoring";
import AIAssistant from "./pages/AIAssistant";
import MedicalRecords from "./pages/MedicalRecords";
import EmergencyServices from "./pages/EmergencyServices";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import ManageAppointments from "./pages/ManageAppointments";
import InstantCare from "./components/InstantCare";
import Layout from "./components/Layout";
import MedicalHistory from './pages/MedicalHistory';
import ViewHealthDashboard from './pages/ViewHealthDashboard';
import SymptomChecker from "@/pages/SymptomChecker";
import BookAppointment from "@/components/BookAppointment";
import SheCare from './pages/SheCare';
import { Toaster as HotToaster } from 'react-hot-toast';
import Emergency from "./components/Emergency";
// import PregnancyProgress from '@/components/PregnancyProgress';
// import Emergency from '@/components/Emergency';

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/auth" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HotToaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/manage-appointments" element={<ProtectedRoute><ManageAppointments /></ProtectedRoute>} />
          <Route path="/book-appointment" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path="/consultation/:id" element={<ProtectedRoute><Consultation /></ProtectedRoute>} />
          <Route path="/devices" element={<ProtectedRoute><DeviceMonitoring /></ProtectedRoute>} />
          <Route path="/assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/medical-records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />
          <Route path="/shecare" element={<ProtectedRoute><SheCare /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/instant-care" element={<ProtectedRoute><InstantCare onStartConsultation={() => {}} /></ProtectedRoute>} />
          <Route path="/health-dashboard" element={<ProtectedRoute><ViewHealthDashboard /></ProtectedRoute>} />
          <Route path="/symptom-checker" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
          <Route path="/records" element={<Navigate to="/medical-records" replace />} />
          <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
