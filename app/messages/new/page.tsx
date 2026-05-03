import { AppShell } from "@/components/layout/AppShell";
import { MessageCreatePage } from "@/components/messages/MessageCreatePage";

export default function NewMessagePage() {
  return (
    <AppShell>
      <MessageCreatePage />
    </AppShell>
  );
}
