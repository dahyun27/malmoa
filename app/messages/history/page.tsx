import { AppShell } from "@/components/layout/AppShell";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function MessageHistoryPage() {
  return (
    <AppShell>
      <PlaceholderPage
        description="생성한 연락문을 학생, 상황, 날짜별로 다시 확인하고 복사할 수 있는 화면으로 확장할 예정입니다."
        eyebrow="생성 기록"
        items={["학생별 필터", "상황별 필터", "이전 문구 복사"]}
        title="이전에 만든 연락문"
      />
    </AppShell>
  );
}
