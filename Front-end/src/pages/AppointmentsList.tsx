import React, { useEffect, useState } from "react";

interface Appointment {
  department: string;
  doctor: string;
  date: string;
  time: string;
  patientName: string;
}

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt, index) => (
            <li key={index} className="border p-4 rounded bg-gray-50">
              <p><strong>Patient:</strong> {appt.patientName}</p>
              <p><strong>Department:</strong> {appt.department}</p>
              <p><strong>Doctor:</strong> {appt.doctor}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <button
                onClick={() => window.open("https://meet.jit.si/your-room-" + index, "_blank")}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Join Call
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsList;
