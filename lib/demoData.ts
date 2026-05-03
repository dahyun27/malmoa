import type { Student } from "@/types/student";

export const students: Student[] = [
  {
    id: "student-jungwon",
    name: "정원",
    grade: "중2",
    school: "루트중",
    parentTitle: "어머니",
    subject: "영어",
    memo: "서술형 적용 연습이 더 필요함",
  },
  {
    id: "student-yejin",
    name: "예진",
    grade: "초6",
    school: "하늘초",
    parentTitle: "어머니",
    subject: "수학",
    memo: "테스트 집중도가 좋고 복습 습관이 안정적임",
  },
  {
    id: "student-doyoung",
    name: "도영",
    grade: "중1",
    school: "새봄중",
    parentTitle: "아버님",
    subject: "영어",
    memo: "결석 후 복습 연결이 끊기지 않도록 확인 필요",
  },
];

export const situations = ["숙제 미이행", "결석/지각", "시험 피드백", "칭찬 연락", "교재 안내", "일반 수업 피드백"];

export const tones = ["부드럽게", "단호하게", "전문적으로", "짧게"];

export const sampleMemo =
  "최근 숙제를 2주 연속 해오지 않았습니다. 개념 이해는 가능하지만 반복 연습이 부족하고, 특히 서술형 적용 연습이 더 필요합니다.";
