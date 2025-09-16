// pages/dashboard/appointments.tsx
import { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import AppointmentList from "@/components/ui/appointmentlist";
import AppointmentForm from "@/components/ui/appointmentform";
import { Appointment } from "@/components/lib/types";
import api from "@/components/lib/ehrClient";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data?.appointments || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (appt: Appointment) => {
    try {
      if (appt.id) await api.put(`/appointments/${appt.id}`, appt);
      else await api.post("/appointments", appt);

      setSelectedAppointment(null);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
          <AppointmentList appointments={appointments} onSelect={setSelectedAppointment} />
        </div>
        <div className="bg-card shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
          <AppointmentForm initialData={selectedAppointment || undefined} onSubmit={handleSave} />
        </div>
      </div>
    </Layout>
  );
}
