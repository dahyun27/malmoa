import { AppShell } from "@/components/layout/AppShell";
import { MessageHistoryPage as MessageHistoryManagementPage } from "@/components/messages/MessageHistoryPage";

export default function MessageHistoryPage() {
  return (
    <AppShell>
      <MessageHistoryManagementPage />
    </AppShell>
  );
}
