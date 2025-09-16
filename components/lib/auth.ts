export type Role = "admin" | "doctor" | "staff";

export function canAccess(role: Role, page: string): boolean {
  const rules: Record<Role, string[]> = {
    admin: ["patients", "appointments", "clinical"],
    doctor: ["patients", "appointments"],
    staff: ["appointments"],
  };
  return rules[role]?.includes(page) ?? false;
}
