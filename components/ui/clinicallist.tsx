import React from "react";

export interface ClinicalRecord {
  id: string;
  type: "vitals" | "note" | "document";
  description: string;
  value?: string;
  date: string;
}

interface ClinicalListProps {
  records: ClinicalRecord[];
  onSelect: (record: ClinicalRecord) => void;
}

const ClinicalList: React.FC<ClinicalListProps> = ({ records, onSelect }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Clinical Records</h2>
      <ul className="divide-y">
        {records.map((r) => (
          <li
            key={r.id}
            onClick={() => onSelect(r)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            <span className="font-medium">{r.type.toUpperCase()}:</span> {r.description}{" "}
            {r.value && <span className="text-gray-600">- {r.value}</span>} 
            <span className="text-sm text-gray-500 ml-2">({r.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicalList;
