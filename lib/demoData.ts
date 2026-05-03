import type { Student } from "@/types/student";

export const students: Student[] = [
  { name: "정원", grade: "중2", parentTitle: "어머니", subject: "영어" },
  { name: "예진", grade: "초6", parentTitle: "어머니", subject: "수학" },
  { name: "도영", grade: "중1", parentTitle: "아버님", subject: "영어" },
];

export const situations = ["숙제 미이행", "결석/지각", "시험 피드백", "칭찬 연락", "교재 안내", "일반 수업 피드백"];

export const tones = ["부드럽게", "단호하게", "전문적으로", "짧게"];

export const sampleMemo =
  "최근 숙제를 2주 연속 해오지 않았습니다. 개념 이해는 가능하지만 반복 연습이 부족하고, 특히 서술형 적용 연습이 더 필요합니다.";
