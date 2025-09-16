// components/ui/appointmentform.tsx
import React, { useState, useEffect } from "react";
import { Appointment } from "../lib/types";

interface AppointmentFormProps {
  initialData?: Appointment;
  onSubmit: (appt: Appointment) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Appointment>(
    initialData || { id: "", date: "", reason: "", patientId: "" }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.patientId) {
      alert("Date and Patient ID are required for an appointment.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="bg-white shadow rounded-lg p-4 space-y-3" onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg mb-2">{formData.id ? "Edit Appointment" : "Add Appointment"}</h2>

      <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} className="border p-2 rounded w-full" />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </form>
  );
};

export default AppointmentForm;

