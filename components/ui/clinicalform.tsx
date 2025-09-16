// components/ui/clinicalform.tsx
import React, { useState, useEffect } from "react";
import { ClinicalRecord } from "./clinicallist";

interface ClinicalFormProps {
  initialData?: ClinicalRecord & { patientId?: string };
  onSubmit: (record: ClinicalRecord & { patientId?: string }) => void;
}

const ClinicalForm: React.FC<ClinicalFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ClinicalRecord & { patientId?: string }>(
    initialData || { id: "", type: "vitals", description: "", value: "", date: "", patientId: "" }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientId) {
      alert("Patient ID is required to attach the clinical record.");
      return;
    }
    if (!formData.description) {
      alert("Description is required.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="bg-white shadow rounded-lg p-4 space-y-3" onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg">{formData.id ? "Edit Record" : "Add Clinical Record"}</h2>

      <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} className="border p-2 rounded w-full" />

      <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="vitals">Vitals</option>
        <option value="note">Note</option>
        <option value="document">Document</option>
      </select>

      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="value" placeholder="Value (optional)" value={formData.value} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 rounded w-full" />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </form>
  );
};

export default ClinicalForm;

