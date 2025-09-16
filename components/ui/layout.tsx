// components/ui/layout.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session/local storage if needed
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-blue-600">
          EHR Dashboard
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/dashboard" className="hover:bg-blue-600 p-2 rounded block">
            Home
          </Link>
          <Link
            href="/dashboard/patients"
            className="hover:bg-blue-600 p-2 rounded block"
          >
            Patients
          </Link>
          <Link
            href="/dashboard/appointments"
            className="hover:bg-blue-600 p-2 rounded block"
          >
            Appointments
          </Link>
          <Link
            href="/dashboard/clinical"
            className="hover:bg-blue-600 p-2 rounded block"
          >
            Clinical
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="font-semibold text-lg">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </header>
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
