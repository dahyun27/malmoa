import { AppShell } from "@/components/layout/AppShell";
import { StudentsPage as StudentsManagementPage } from "@/components/students/StudentsPage";

export default function StudentsPage() {
  return (
    <AppShell>
      <StudentsManagementPage />
    </AppShell>
  );
}
