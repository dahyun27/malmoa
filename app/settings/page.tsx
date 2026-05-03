import { AppShell } from "@/components/layout/AppShell";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function SettingsPage() {
  return (
    <AppShell>
      <PlaceholderPage
        description="학원명, 원장명, 기본 톤, 자주 쓰는 서명을 저장해 연락문 생성 품질을 높이는 화면으로 확장할 예정입니다."
        eyebrow="설정"
        items={["학원명", "기본 톤", "연락문 서명"]}
        title="말모아 기본값 설정"
      />
    </AppShell>
  );
}
