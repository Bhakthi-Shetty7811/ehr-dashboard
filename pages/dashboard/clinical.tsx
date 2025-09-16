// pages/dashboard/clinical.tsx
import { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import ClinicalList, { ClinicalRecord } from "@/components/ui/clinicallist";
import ClinicalForm from "@/components/ui/clinicalform";
import api from "@/components/lib/ehrClient";

export default function ClinicalPage() {
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);

  const fetchRecords = async () => {
    try {
      // If you need patient-scoped records, call: /clinical?path=patientid/notes etc.
      const res = await api.get("/clinical"); // normalized: { records: [...] }
      setRecords(res.data?.records || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (record: ClinicalRecord & { patientId?: string }) => {
    try {
      // If Athena requires a specific path like /chart/{patientId}/notes, adjust:
      // await api.post(`/clinical?path=${record.patientId}/notes`, { ...record })
      if (record.id) await api.put(`/clinical/${record.id}`, record);
      else await api.post("/clinical", record);

      setSelectedRecord(null);
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Clinical Records</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
          <ClinicalList records={records} onSelect={setSelectedRecord} />
        </div>
        <div className="bg-card shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
          <ClinicalForm initialData={selectedRecord || undefined} onSubmit={handleSave} />
        </div>
      </div>
    </Layout>
  );
}
