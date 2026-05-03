import { AppShell } from "@/components/layout/AppShell";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function StudentsPage() {
  return (
    <AppShell>
      <PlaceholderPage
        description="학생 이름, 학년, 과목, 보호자 호칭, 메모를 등록하고 수정하는 CRUD 화면으로 이어질 자리입니다."
        eyebrow="학생 관리"
        items={["학생 등록", "학생 정보 수정", "보호자 호칭 관리"]}
        title="연락문에 쓸 학생 정보를 관리"
      />
    </AppShell>
  );
}
