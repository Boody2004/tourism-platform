import type { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/DashboardShell';

export const metadata: Metadata = {
  title: { default: 'Admin Dashboard', template: '%s | Touriva Admin' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
