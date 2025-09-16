export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface Appointment {
  id: string;
  date: string;
  reason: string;
  patientId: string;
}

export interface ClinicalRecord {
  id: string;
  type: "vitals" | "note" | "document";
  description: string;
  value?: string;
  date: string;
}
