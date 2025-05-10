import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, FileText, AlertTriangle, User, Home, LogOut, Menu, ChevronLeft, Stethoscope, Baby, MapPin, HeartPulse, BarChart3, Hospital } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Sidebar is hidden by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Auto-close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/health-dashboard", icon: BarChart3, label: "Health Metrics" },
    { path: "/appointments", icon: Calendar, label: "Appointments" },
    { path: "/assistant", icon: MessageSquare, label: "AI Assistant" },
    { path: "/medical-records", icon: FileText, label: "Medical Records" },
    { path: "/symptom-checker", icon: Stethoscope, label: "Symptom Checker" },
    { path: "/instant-care", icon: AlertTriangle, label: "Instant Care" },
    { path: "/shecare", icon: HeartPulse, label: "SheCare" },
    { path: "/emergency", icon: Hospital, label: "Nearby Hospitals" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'left-64' : 'left-4'}`}
        style={{ transitionProperty: 'left, background, box-shadow' }}
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - only render when open */}
      {isSidebarOpen && (
        <aside
          className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40"
        >
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-700">Arogya-Vritti</h1>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? item.label === "SheCare"
                        ? "bg-pink-50 text-pink-700"
                        : "bg-blue-50 text-blue-700"
                      : item.label === "SheCare"
                      ? "hover:bg-pink-50 text-gray-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Icon size={20} className={item.label === "Instant Care" ? "text-red-500" : ""} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t">
            <div className="flex items-center justify-between">
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700">
                <User size={20} />
                <span>Profile</span>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  window.location.href = '/auth';
                }}
                className="text-gray-700"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`${isSidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300 ease-in-out`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 