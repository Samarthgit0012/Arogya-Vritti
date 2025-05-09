import React, { useState, useEffect } from "react";
import { departments, doctors } from "../data";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Appointment {
  id: string;
  patientName: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const AppointmentForm = () => {
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rescheduleId = searchParams.get("reschedule");

  useEffect(() => {
    if (rescheduleId) {
      // Load existing appointment data for rescheduling
      const savedAppointments = localStorage.getItem("appointments");
      if (savedAppointments) {
        const appointments = JSON.parse(savedAppointments);
        const appointment = appointments.find((apt: Appointment) => apt.id === rescheduleId);
        if (appointment) {
          setDepartment(appointment.department);
          setDoctor(appointment.doctor);
          setDate(appointment.date);
          setTime(appointment.time);
          setPatientName(appointment.patientName);
        }
      }
    }
  }, [rescheduleId]);

  const handleSubmit = () => {
    if (!department || !doctor || !date || !time || !patientName) return;

    const newAppointment: Appointment = {
      id: rescheduleId || Date.now().toString(),
      patientName,
      department,
      doctor,
      date,
      time,
      status: "upcoming"
    };

    // Get existing appointments
    const savedAppointments = localStorage.getItem("appointments");
    let appointments: Appointment[] = [];
    
    if (savedAppointments) {
      appointments = JSON.parse(savedAppointments);
      if (rescheduleId) {
        // Remove the old appointment if rescheduling
        appointments = appointments.filter(apt => apt.id !== rescheduleId);
      }
    }

    // Add new appointment
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-green-100 p-6 rounded mt-10 text-center">
        <h2 className="text-xl font-semibold text-green-700">Appointment Confirmed!</h2>
        <p className="mt-2">
          Thank you, {patientName}. We'll see you in {department} with {doctor} on {date} at {time}.
        </p>
        <button
          onClick={() => navigate("/manage-appointments")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Manage Your Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">
        {rescheduleId ? "Reschedule Appointment" : "Book an Appointment"}
      </h2>

      <label className="block mb-2">Department</label>
      <select
        className="w-full p-2 border mb-4 rounded"
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
          setDoctor(""); // reset doctor when department changes
        }}
      >
        <option value="">Select department</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {department && (
        <>
          <label className="block mb-2">Doctor</label>
          <select
            className="w-full p-2 border mb-4 rounded"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select doctor</option>
            {doctors[department]?.map((doc) => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>
        </>
      )}

      <label className="block mb-2">Date</label>
      <input
        type="date"
        className="w-full p-2 border mb-4 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="block mb-2">Time</label>
      <input
        type="time"
        className="w-full p-2 border mb-4 rounded"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <label className="block mb-2">Your Name</label>
      <input
        type="text"
        className="w-full p-2 border mb-4 rounded"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        {rescheduleId ? "Reschedule Appointment" : "Book Appointment"}
      </button>
    </div>
  );
};

export default AppointmentForm;