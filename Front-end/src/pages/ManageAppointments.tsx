import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppointmentList from "@/components/AppointmentList";
import AppointmentDetails from "@/components/AppointmentDetails";
import VideoConsultation from "@/components/VideoConsultation";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Appointment {
  id: string;
  patientName: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      try {
        const parsedAppointments = JSON.parse(savedAppointments);
        setAppointments(parsedAppointments);
      } catch (error) {
        console.error("Error parsing appointments:", error);
      }
    }
  }, []);

  const handleReschedule = (id: string) => {
    navigate(`/appointments?reschedule=${id}`);
  };

  const handleJoinCall = (id: string) => {
    console.log("Joining call for appointment:", id); // Debug log
    const appointment = appointments.find((apt) => apt.id === id);
    if (appointment) {
      console.log("Found appointment:", appointment); // Debug log
      setSelectedAppointment(appointment);
      setIsInCall(true);
    } else {
      console.log("Appointment not found"); // Debug log
    }
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setSelectedAppointment(null);
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed" || apt.status === "cancelled"
  );

  // Debug logs
  console.log("isInCall:", isInCall);
  console.log("selectedAppointment:", selectedAppointment);

  if (isInCall && selectedAppointment) {
    return (
      <VideoConsultation
        appointmentId={selectedAppointment.id}
        doctorName={selectedAppointment.doctor}
        patientName={selectedAppointment.patientName}
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft size={20} />
              <span className="ml-1">Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold text-blue-700">Manage Appointments</h1>
          </div>
          <Link to="/book-appointment">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Book New Appointment
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-500">{appointment.department}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReschedule(appointment.id)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageAppointments; 