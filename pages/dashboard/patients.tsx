// pages/dashboard/patients.tsx
import { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import PatientList from "@/components/ui/patientlist";
import PatientForm from "@/components/ui/patientform";
import { Patient } from "@/components/lib/types";
import api from "@/components/lib/ehrClient";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      // normalized response: { patients: [...] }
      setPatients(res.data?.patients || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (patient: Patient) => {
    try {
      if (patient.id) {
        await api.put(`/patients/${patient.id}`, patient);
      } else {
        await api.post("/patients", patient);
      }
      setSelectedPatient(null);
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this patient?")) return;
    try {
      await api.delete(`/patients/${id}`, { data: { id } });
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Patients</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
          <PatientList patients={patients} onSelect={setSelectedPatient} onDelete={handleDelete} />
        </div>
        <div className="bg-card shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
          <PatientForm initialData={selectedPatient || undefined} onSubmit={handleSave} />
        </div>
      </div>
    </Layout>
  );
}
