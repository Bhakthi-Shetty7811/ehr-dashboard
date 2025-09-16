// components/ui/patientlist.tsx
import React from "react";
import { Patient } from "../lib/types";

interface PatientListProps {
  patients: Patient[];
  onSelect: (p: Patient | null) => void;
  onDelete?: (id: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelect, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Patients</h2>
      <ul className="divide-y">
        {patients.length === 0 && <li className="p-2">No patients found</li>}
        {patients.map((p) => (
          <li key={p.id} className="p-2 flex justify-between items-center">
            <div className="cursor-pointer" onClick={() => onSelect(p)}>
              {p.firstName} {p.lastName} <span className="text-sm text-gray-500">({p.age})</span>
            </div>
            {onDelete && (
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(p.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
