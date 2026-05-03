import { AppShell } from "@/components/layout/AppShell";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function DashboardPage() {
  return (
    <AppShell>
      <PlaceholderPage
        description="이번 달 생성량, 최근 연락문, 빠른 작업 진입점을 보여줄 예정입니다. 지금은 MVP 흐름 확인을 위한 기본 화면입니다."
        eyebrow="대시보드"
        items={["이번 달 생성 0건", "최근 연락문 준비 중", "학생 3명 더미 데이터"]}
        title="운영 현황을 한눈에"
      />
    </AppShell>
  );
}
