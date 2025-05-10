import React from "react";
import { Calendar, Clock, User, MapPin, Video } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface AppointmentListProps {
  appointments: Appointment[];
  onReschedule: (id: string) => void;
  onJoinCall: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onReschedule,
  onJoinCall,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleJoinCall = (id: string) => {
    // Open Jitsi Meet in a new tab with a unique room name based on appointment id
    const roomName = `ArogyaVrittiMeet_${id}`;
    window.open(`https://meet.jit.si/${roomName}`, "_blank");
    onJoinCall(id);
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{appointment.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{appointment.time}</span>
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <div className="flex justify-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
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
              
              {appointment.status === "upcoming" && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onReschedule(appointment.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleJoinCall(appointment.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Join Call
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList; 