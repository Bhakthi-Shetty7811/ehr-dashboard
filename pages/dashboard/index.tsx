// pages/dashboard/index.tsx
import React from 'react';
import Layout from '@/components/ui/layout';
import Link from 'next/link';

export default function DashboardHome() {
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Welcome to EHR Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/patients">
            <div
              className="card cursor-pointer transition hover:bg-primary/10"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <h2 className="text-xl font-semibold mb-2">Patients</h2>
              <p>Manage patient records, add or update information.</p>
            </div>
          </Link>

          <Link href="/dashboard/appointments">
            <div
              className="card cursor-pointer transition hover:bg-primary/10"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <h2 className="text-xl font-semibold mb-2">Appointments</h2>
              <p>Schedule, view, and manage appointments.</p>
            </div>
          </Link>

          <Link href="/dashboard/clinical">
            <div
              className="card cursor-pointer transition hover:bg-primary/10"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <h2 className="text-xl font-semibold mb-2">Clinical</h2>
              <p>View vitals, labs, notes, and clinical data.</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
