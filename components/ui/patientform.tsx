// components/ui/patientform.tsx
import React, { useState, useEffect } from "react";
import { Patient } from "../lib/types";

interface PatientFormProps {
  initialData?: Patient;
  onSubmit: (p: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Patient>(
    initialData || { id: "", firstName: "", lastName: "", age: 0 }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "age" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      alert("First name and last name are required.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 space-y-3">
      <h2 className="font-semibold text-lg">{formData.id ? "Edit Patient" : "Add Patient"}</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        name="age"
        type="number"
        min={0}
        placeholder="Age"
        value={String(formData.age)}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save
      </button>
    </form>
  );
};

export default PatientForm;
