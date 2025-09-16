import React from "react";
import { Appointment } from "../lib/types";

interface AppointmentListProps {
  appointments: Appointment[];
  onSelect: (appt: Appointment) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onSelect,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Appointments</h2>
      <ul className="divide-y">
        {appointments.map((a) => (
          <li
            key={a.id}
            onClick={() => onSelect(a)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {a.date} - {a.reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
