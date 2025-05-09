import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentList from "@/components/AppointmentList";
import AppointmentDetails from "@/components/AppointmentDetails";
import VideoConsultation from "@/components/VideoConsultation";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>
        <Button
          onClick={() => navigate("/appointments")}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Book New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {upcomingAppointments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              <AppointmentList
                appointments={upcomingAppointments}
                onReschedule={handleReschedule}
                onJoinCall={handleJoinCall}
              />
            </div>
          )}

          {pastAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
              <AppointmentList
                appointments={pastAppointments}
                onReschedule={handleReschedule}
                onJoinCall={handleJoinCall}
              />
            </div>
          )}

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">No Appointments Found</h2>
              <p className="text-gray-600 mb-6">
                You haven't booked any appointments yet.
              </p>
              <Button
                onClick={() => navigate("/appointments")}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Your First Appointment
              </Button>
            </div>
          )}
        </div>

        {selectedAppointment && !isInCall && (
          <div className="lg:sticky lg:top-8">
            <AppointmentDetails appointment={selectedAppointment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments; 