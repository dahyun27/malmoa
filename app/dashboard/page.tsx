import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage as DashboardOverviewPage } from "@/components/dashboard/DashboardPage";

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardOverviewPage />
    </AppShell>
  );
}
