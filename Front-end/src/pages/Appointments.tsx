import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import BookAppointment from "@/components/BookAppointment";
import AppointmentList from "@/components/AppointmentList";

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  patientName: string;
  phone: string;
  email: string;
  reason: string;
  symptoms: string;
  status: "upcoming" | "completed" | "cancelled";
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBook, setShowBook] = useState(false);

  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      try {
        const parsedAppointments = JSON.parse(savedAppointments);
        setAppointments(parsedAppointments);
      } catch (error) {
        console.error("Error parsing appointments:", error);
      }
    }
  }, [showBook]);

  const handleReschedule = (id: string) => {
    window.location.href = `/book-appointment?reschedule=${id}`;
  };

  const handleJoinCall = (id: string) => {
    // No alert, just rely on Jitsi open in AppointmentList
  };

  // Map appointments to match AppointmentList expected fields
  const mappedAppointments = appointments.map((apt) => ({
    ...apt,
    doctor: apt.doctorName,
    department: apt.specialization,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">Appointments</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowBook(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showBook && (
          <div className="mb-8">
            <BookAppointment />
            <div className="flex justify-end mt-2">
              <Button variant="outline" onClick={() => setShowBook(false)}>Close</Button>
            </div>
          </div>
        )}
          <h2 className="text-xl font-semibold mb-4">
          📋 All Appointments
        </h2>

        <AppointmentList
          appointments={mappedAppointments}
          onReschedule={handleReschedule}
          onJoinCall={handleJoinCall}
        />
      </main>
    </div>
  );
};

export default Appointments;
