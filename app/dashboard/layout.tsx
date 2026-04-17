import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import agencyData from "@/data/agency.json";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: `%s | ${agencyData.name} Admin`,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
