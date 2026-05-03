import { AppShell } from "@/components/layout/AppShell";
import { SettingsPage as SettingsManagementPage } from "@/components/settings/SettingsPage";

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsManagementPage />
    </AppShell>
  );
}
