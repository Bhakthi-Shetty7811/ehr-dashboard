// pages/index.tsx
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">EHR Dashboard</h1>
        <p className="mb-6 text-gray-600">
          Login to access patients, appointments, and clinical records.
        </p>
        <Button
          className="w-full"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
          onClick={() => router.push("/dashboard")}
        >
          Enter Dashboard
        </Button>
      </div>
    </main>
  );
}
