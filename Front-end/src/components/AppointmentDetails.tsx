import React from "react";
import { Calendar, Clock, User, MapPin, Stethoscope } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface AppointmentDetailsProps {
  appointment: Appointment;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              appointment.status === "upcoming"
                ? "bg-green-100 text-green-800"
                : appointment.status === "completed"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-medium">{appointment.patientName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">Dr. {appointment.doctor}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{appointment.department}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(appointment.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{appointment.time}</p>
              </div>
            </div>
          </div>
        </div>

        {appointment.status === "upcoming" && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Please arrive 15 minutes before your scheduled appointment time.
              Don't forget to bring your ID and insurance card.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails; 