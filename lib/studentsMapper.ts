import type { Student, StudentFormValues } from "@/types/student";

export type StudentRow = {
  id: string;
  name: string;
  grade: string;
  school: string;
  parent_title: string;
  subject: string;
  memo: string;
};

export function mapStudentRow(row: StudentRow): Student {
  return {
    id: row.id,
    name: row.name,
    grade: row.grade,
    school: row.school,
    parentTitle: row.parent_title,
    subject: row.subject,
    memo: row.memo,
  };
}

export function mapStudentFormValues(values: StudentFormValues) {
  return {
    name: values.name.trim(),
    grade: values.grade.trim(),
    school: values.school.trim(),
    parent_title: values.parentTitle,
    subject: values.subject.trim(),
    memo: values.memo.trim(),
  };
}
